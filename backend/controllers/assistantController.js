const Product = require("../models/Product");

const STORE_CONTEXT = `You are InkSpire Assistant for InkSpire — a premium stationery & art-supplies e-commerce site (notebooks, pens, pencils, art supplies, paper, organizers).

STYLE: Reply like a helpful human retail associate. Be concise but complete. Use short paragraphs or simple bullet lines (use "-" or "•") when listing steps — avoid markdown like **bold**. Match the customer's language if they write in a non-English language. Never invent products, prices, stock, or policies that are not in the catalog or STORE POLICIES below.

STORE POLICIES (authoritative):
- Shipping: Free on orders $50+; otherwise flat $5.99. Customer enters address at Checkout.
- Returns: 30-day easy returns (as advertised on the site). For disputes, direct them to contact support.
- Payments at checkout: Cash on Delivery, CBE Transfer, Telebirr.
- Categories: notebooks, pens, pencils, art-supplies, paper, organizers (URLs use slugs like notebooks, art-supplies).
- Cart: Guests use local cart; logged-in users sync cart via account; merge happens on login.
- Account: Login/Register from navbar; Dashboard for orders/profile; Admin panel only for staff.

CONTACT:
- Phone: +251956785524
- Email: sura56785524@gmail.com
- Address (placeholder on site): 123 Stationery Lane, Creative City, CC 10001

SITE MAP:
- Home: index.html — featured/trending, categories.
- Products: products.html — search, filters, ?category= & featured=true & trending=true.
- Cart: cart.html; Checkout: checkout.html; About: about.html; Login/Register: login.html, register.html; Dashboard: dashboard.html.

RULES:
- For product questions, ONLY recommend items from the PROVIDED CATALOG below. If nothing fits, say so and suggest browsing Products or refining the search.
- If asked about stock, use the stock number from the catalog for that item.
- Do not claim orders shipped or payments processed — you only explain how the site works.
- No medical/legal/financial advice.
- Keep answers under ~350 words unless the user asks for detail.`;

function pickProvider() {
  const pref = (process.env.AI_PROVIDER || "auto").toLowerCase();
  const hasGemini = !!process.env.GEMINI_API_KEY;
  const hasOpenAI = !!process.env.OPENAI_API_KEY;
  if (pref === "openai" && hasOpenAI) return "openai";
  if (pref === "gemini" && hasGemini) return "gemini";
  if (pref === "auto") {
    if (hasGemini) return "gemini";
    if (hasOpenAI) return "openai";
  }
  if (pref === "openai" && hasGemini) return "gemini";
  if (pref === "gemini" && hasOpenAI) return "openai";
  return null;
}

function sanitizeHistory(history) {
  if (!Array.isArray(history)) return [];
  const out = [];
  for (const h of history.slice(-12)) {
    if (!h || typeof h.text !== "string") continue;
    const role = h.role === "assistant" ? "assistant" : "user";
    out.push({ role, text: h.text.slice(0, 2500) });
  }
  return out;
}

async function buildCatalogText() {
  const products = await Product.find({})
    .sort({ updatedAt: -1 })
    .limit(55)
    .select("title description price originalPrice category stock brand rating featured trending")
    .lean();

  if (!products.length) {
    return "(No products in database yet. Tell the customer to check back later or contact the shop.)";
  }

  return products
    .map((p) => {
      const id = String(p._id);
      const desc = (p.description || "").replace(/\s+/g, " ").trim().slice(0, 90);
      const flags = [p.featured ? "featured" : null, p.trending ? "trending" : null].filter(Boolean).join(", ");
      return [
        `- ${p.title}`,
        `  id: ${id} | $${Number(p.price).toFixed(2)}` +
          (p.originalPrice > p.price ? ` (was $${Number(p.originalPrice).toFixed(2)})` : ""),
        `  category: ${p.category} | stock: ${p.stock}${p.brand ? ` | brand: ${p.brand}` : ""}${
          flags ? ` | ${flags}` : ""
        }`,
        desc ? `  note: ${desc}` : null,
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");
}

async function chatWithGemini(systemInstruction, userPayload, history) {
  const apiKey = process.env.GEMINI_API_KEY;
  const model = process.env.GEMINI_MODEL || "gemini-1.5-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const contents = [];
  for (const h of history) {
    if (h.role === "user") {
      contents.push({ role: "user", parts: [{ text: h.text }] });
    } else if (h.role === "assistant") {
      contents.push({ role: "model", parts: [{ text: h.text }] });
    }
  }
  contents.push({ role: "user", parts: [{ text: userPayload }] });

  const body = {
    systemInstruction: { parts: [{ text: systemInstruction }] },
    contents,
    generationConfig: {
      temperature: 0.55,
      maxOutputTokens: 1200,
    },
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = data.error?.message || `Gemini HTTP ${res.status}`;
    throw new Error(msg);
  }

  const text =
    data.candidates?.[0]?.content?.parts?.map((part) => part.text || "").join("") || "";
  if (!text.trim()) {
    const br = data.promptFeedback?.blockReason || data.candidates?.[0]?.finishReason;
    throw new Error(br ? `Response blocked: ${br}` : "Empty AI response");
  }
  return text.trim();
}

async function chatWithOpenAI(system, userPayload, history) {
  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";
  const messages = [{ role: "system", content: system }];
  for (const h of history) {
    if (h.role === "user") messages.push({ role: "user", content: h.text });
    if (h.role === "assistant") messages.push({ role: "assistant", content: h.text });
  }
  messages.push({ role: "user", content: userPayload });

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.55,
      max_tokens: 1200,
    }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error?.message || `OpenAI HTTP ${res.status}`);
  }
  const text = data.choices?.[0]?.message?.content?.trim() || "";
  if (!text) throw new Error("Empty AI response");
  return text;
}

/**
 * POST /api/assistant/chat
 * Body: { message, pageName?, cartItemCount?, history?: [{ role, text }] }
 */
async function chat(req, res) {
  const rawMessage = req.body?.message;
  if (typeof rawMessage !== "string" || !rawMessage.trim()) {
    return res.status(400).json({ message: "Message is required" });
  }

  const message = rawMessage.trim().slice(0, 4000);
  const pageName = typeof req.body?.pageName === "string" ? req.body.pageName.slice(0, 80) : "";
  const cartItemCount =
    typeof req.body?.cartItemCount === "number" && Number.isFinite(req.body.cartItemCount)
      ? Math.max(0, Math.floor(req.body.cartItemCount))
      : null;
  const history = sanitizeHistory(req.body?.history);

  const provider = pickProvider();
  if (!provider) {
    return res.status(503).json({
      message: "AI assistant is not configured",
      fallback: true,
      hint: "Set GEMINI_API_KEY and/or OPENAI_API_KEY in backend .env (see .env.example).",
    });
  }

  let catalogText;
  try {
    catalogText = await buildCatalogText();
  } catch (e) {
    catalogText = "(Catalog could not be loaded.)";
  }

  const systemInstruction = `${STORE_CONTEXT}\n\n---\nPROVIDED CATALOG:\n${catalogText}\n---`;
  const userPayload = [
    `Context for this message:`,
    `- Page: ${pageName || "unknown"}`,
    `- Cart items (total quantity across lines): ${cartItemCount !== null ? cartItemCount : "unknown (guest or not loaded)"}`,
    ``,
    `Customer message:`,
    message,
  ].join("\n");

  try {
    let reply;
    let used = provider;
    if (provider === "gemini") {
      try {
        reply = await chatWithGemini(systemInstruction, userPayload, history);
      } catch (geminiErr) {
        if (process.env.OPENAI_API_KEY) {
          reply = await chatWithOpenAI(systemInstruction, userPayload, history);
          used = "openai (fallback)";
        } else {
          throw geminiErr;
        }
      }
    } else {
      reply = await chatWithOpenAI(systemInstruction, userPayload, history);
    }
    return res.json({ reply, provider: used });
  } catch (error) {
    console.error("Assistant chat error:", error.message || error);
    return res.status(502).json({
      message: error.message || "Assistant request failed",
      fallback: true,
    });
  }
}

module.exports = { chat };

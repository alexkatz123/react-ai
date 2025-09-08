/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable @typescript-eslint/no-unused-vars */
import OpenAI from "openai";
import {
  ROAST_PROMPT,
  COMPLIMENT_PROMPT,
  AI_DECIDE_PROMPT,
} from "./constants.js";

export default async (context) => {
  const { req, res, error } = context;

  const sendJSON = (data, status = 200) =>
    res.send(typeof data === "string" ? data : JSON.stringify(data), status, {
      "content-type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "content-type, authorization, x-api-key",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
    });

  if (req.method === "OPTIONS") return sendJSON("", 204);
  if (req.method !== "GET")
    return sendJSON({ error: "Only GET is supported" }, 405);

  // 🔑 Check API key
  const clientKey = req.headers["x-api-key"];
  if (!clientKey || clientKey !== process.env.CLIENT_API_KEY) {
    return sendJSON({ error: "Unauthorized: Invalid API key" }, 401);
  }

  const q = req.query?.q;
  const mode = String(req.query?.mode || "roast").toLowerCase();
  const bucketId = req.query?.bucketId;
  const fileId = req.query?.fileId;
  let image = req.query?.image;

  try {
    if (!image && bucketId && fileId) {
      const endpoint =
        process.env.APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1";
      const project = process.env.APPWRITE_PROJECT;
      if (!project)
        return sendJSON({ error: "Missing APPWRITE_PROJECT env" }, 500);
      image = `${endpoint}/storage/buckets/${bucketId}/files/${fileId}/view?project=${project}`;
    }
  } catch (e) {
    return sendJSON(
      { error: "Failed to build image URL", detail: String(e) },
      400
    );
  }

  if (!q && !image)
    return sendJSON(
      {
        error:
          "Provide ?q=... or ?bucketId=...&fileId=... (or ?image=...)",
      },
      400
    );

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return sendJSON({ error: "Missing OPENAI_API_KEY" }, 500);

  const sys =
  {
    roast: ROAST_PROMPT,
    compliment: COMPLIMENT_PROMPT,
    random: Math.random() < 0.5 ? ROAST_PROMPT : COMPLIMENT_PROMPT,
    ai_decide: AI_DECIDE_PROMPT,
  }[mode] || "Be concise.";

  try {
    const client = new OpenAI({ apiKey });
    const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

    try {
      const userContent = [];
      if (q) userContent.push({ type: "input_text", text: q });
      if (image)
        userContent.push({ type: "input_image", image_url: { url: image } });

      const r = await client.responses.create({
        model,
        input: [
          { role: "system", content: sys },
          { role: "user", content: userContent },
        ],
      });

      return sendJSON({ ok: true, reply: (r.output_text || "").trim() });
    } catch (primaryErr) {
      const messages = [
        { role: "system", content: sys },
        {
          role: "user",
          content: [
            ...(q ? [{ type: "text", text: q }] : []),
            ...(image ? [{ type: "image_url", image_url: { url: image } }] : []),
          ],
        },
      ];

      const r2 = await client.chat.completions.create({
        model,
        messages,
      });

      const text =
        r2.choices?.[0]?.message?.content?.trim?.() ||
        r2.choices?.[0]?.message?.content ||
        "";
      return sendJSON({ ok: true, reply: text });
    }
  } catch (e) {
    if (req.query?.debug === "err") {
      return sendJSON({ error: "OpenAI request failed", detail: String(e) }, 502);
    }
    error?.(String(e));
    return sendJSON({ error: "OpenAI request failed" }, 502);
  }
};

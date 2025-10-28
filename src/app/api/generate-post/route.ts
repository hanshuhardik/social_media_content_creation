import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
// console.log("Gemini Key exists:", process.env.GEMINI_API_KEY ? "✅ Yes" : "❌ No");

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "15mb",
    },
  },
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    let {
      platform,
      tone,
      wordLimit,
      includeHashtags,
      includeEmoji,
      description,
      imageBase64,
    } = body;

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // ✅ Guarantee that Gemini always has context to work with
    if (!description || description.trim().length < 5) {
      switch (platform) {
        case "instagram":
          description = "a recent trip with friends filled with fun and adventure";
          break;
        case "facebook":
          description = "a joyful travel experience with great memories";
          break;
        case "linkedin":
          description = "a professional achievement or skill I recently gained";
          break;
        case "twitter":
          description = "a quick update about my latest experience";
          break;
        default:
          description = "a general moment worth sharing online";
      }
    }

    let prompt = "";

    // --- Platform-Specific Prompts ---
    if (platform === "blog") {
      prompt = `
      Write a detailed blog post on: "${description}".
      Requirements:
      - Tone: ${tone}
      - Word count: around ${wordLimit} words (between 1000–2500)
      - Include relevant headings and subheadings
      - Make it well-structured and SEO-friendly
      - ${includeHashtags ? "Add 3–5 relevant hashtags at the end (with #)" : "No hashtags"}
      - ${includeEmoji ? "Use emojis sparingly where relevant" : "Avoid emojis"}
      Only return the blog content.
      `;
    } else if (["instagram", "facebook", "linkedin", "twitter"].includes(platform)) {
      prompt = `
      You are an expert social media content creator.
      Create a ${platform} caption for this post.
      Description: "${description}".
      ${imageBase64 ? "An image is also provided for reference." : ""}
      Guidelines:
      - Tone: ${tone}
      - Word limit: ${wordLimit}
      - ${
        includeHashtags
          ? "Include relevant hashtags at the end (each starting with #)"
          : "Do not include hashtags"
      }
      - ${includeEmoji ? "Use emojis naturally" : "Avoid emojis"}
      Focus on making it engaging and context-aware.
      Return only the caption text — no explanations.
      `;
    } else {
      prompt = `
      Write a ${platform} post about: "${description}".
      - Tone: ${tone}
      - Word limit: ${wordLimit}
      - ${includeEmoji ? "Include emojis" : "No emojis"}
      - ${includeHashtags ? "Include hashtags (with #)" : "No hashtags"}
      Only output the final text.
      `;
    }

    // --- Input parts (text + optional image) ---
    const inputParts: any[] = [{ text: prompt }];
    if (imageBase64) {
      inputParts.push({
        inlineData: {
          data: imageBase64.split(",")[1],
          mimeType: "image/jpeg",
        },
      });
    }

    // --- Call Gemini ---
    const result = await model.generateContent({
      contents: [{ role: "user", parts: inputParts }],
    });

    let response = result.response.text().trim();

    // ✅ Fix hashtag formatting
    if (includeHashtags) {
      const lines = response.split("\n").map((line) => line.trim());
      const lastLine = lines[lines.length - 1];

      if (
        lastLine &&
        /^[A-Za-z\s#]+$/.test(lastLine) &&
        lastLine.split(" ").length <= 15
      ) {
        const hashtags = lastLine
          .split(/\s+/)
          .filter(Boolean)
          .map((word) => (word.startsWith("#") ? word : `#${word}`))
          .join(" ");
        lines[lines.length - 1] = hashtags;
        response = lines.join("\n");
      }
    }

    return new Response(JSON.stringify({ content: response }), { status: 200 });
  } catch (error) {
    console.error("Error generating post:", error);
    return new Response(
      JSON.stringify({ error: "Failed to generate content" }),
      { status: 500 }
    );
  }
}

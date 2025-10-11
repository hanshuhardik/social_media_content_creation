
//testing
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '15mb', // allow image uploads
    },
  },
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      platform,
      tone,
      wordLimit,
      includeHashtags,
      includeEmoji,
      description,
      imageBase64,
    } = body;

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    let prompt = "";

    // --- Platform-Specific Prompts ---
    if (platform === "blog") {
      prompt = `
      Write a detailed blog post on: "${description || 'a topic inferred from the image'}".
      Requirements:
      - Tone: ${tone}
      - Word count: around ${wordLimit} words (between 1000–2500)
      - Include relevant headings and subheadings
      - Make it well-structured and SEO-friendly
      - ${includeHashtags ? 'Add 3–5 relevant hashtags at the end' : 'No hashtags'}
      - ${includeEmoji ? 'Use emojis sparingly where relevant' : 'Avoid emojis'}
      Only return the blog content.
      `;
    } else if (["instagram", "facebook"].includes(platform)) {
      prompt = `
      You are an expert social media content creator.
      Create a caption for ${platform}, analyzing the provided ${
        imageBase64 ? "image" : "description"
      }${imageBase64 && description ? " and description together" : ""}.
      Guidelines:
      - Tone: ${tone}
      - Word limit: ${wordLimit}
      - ${includeHashtags ? "Include relevant hashtags" : "Do not include hashtags"}
      - ${includeEmoji ? "Use emojis naturally" : "Avoid emojis"}
      Focus on creating an engaging and context-aware caption.
      Return only the caption text.
      `;
    } else {
      prompt = `
      Write a ${platform} post about: ${description}.
      - Tone: ${tone}
      - Word limit: ${wordLimit}
      - ${includeEmoji ? "Include emojis" : "No emojis"}
      - ${includeHashtags ? "Include hashtags" : "No hashtags"}
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

    const result = await model.generateContent({
      contents: [{ role: "user", parts: inputParts }],
    });

    const response = result.response.text().trim();
    return new Response(JSON.stringify({ content: response }), { status: 200 });
  } catch (error) {
    console.error("Error generating post:", error);
    return new Response(JSON.stringify({ error: "Failed to generate content" }), { status: 500 });
  }
}







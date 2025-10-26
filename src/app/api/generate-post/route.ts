
//testing
// import { GoogleGenerativeAI } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

// export const config = {
//   api: {
//     bodyParser: {
//       sizeLimit: '15mb', // allow image uploads
//     },
//   },
// };

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const {
//       platform,
//       tone,
//       wordLimit,
//       includeHashtags,
//       includeEmoji,
//       description,
//       imageBase64,
//     } = body;

//     const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

//     let prompt = "";

//     // --- Platform-Specific Prompts ---
//     if (platform === "blog") {
//       prompt = `
//       Write a detailed blog post on: "${description || 'a topic inferred from the image'}".
//       Requirements:
//       - Tone: ${tone}
//       - Word count: around ${wordLimit} words (between 1000–2500)
//       - Include relevant headings and subheadings
//       - Make it well-structured and SEO-friendly
//       - ${includeHashtags ? 'Add 3–5 relevant hashtags at the end' : 'No hashtags'}
//       - ${includeEmoji ? 'Use emojis sparingly where relevant' : 'Avoid emojis'}
//       Only return the blog content.
//       `;
//     } else if (["instagram", "facebook","linkedin","twitter"].includes(platform)) {
//       prompt = `
//       You are an expert social media content creator.
//       Create a caption for ${platform}, analyzing the provided ${
//         imageBase64 ? "image" : "description"
//       }${imageBase64 && description ? " and description together" : ""}.
//       Guidelines:
//       - Tone: ${tone}
//       - Word limit: ${wordLimit}
//       - ${includeHashtags ? "Include relevant hashtags" : "Do not include hashtags"}
//       - ${includeEmoji ? "Use emojis naturally" : "Avoid emojis"}
//       Focus on creating an engaging and context-aware caption.
//       Return only the caption text.
//       `;
//     } else {
//       prompt = `
//       Write a ${platform} post about: ${description}.
//       - Tone: ${tone}
//       - Word limit: ${wordLimit}
//       - ${includeEmoji ? "Include emojis" : "No emojis"}
//       - ${includeHashtags ? "Include hashtags" : "No hashtags"}
//       Only output the final text.
//       `;
//     }

//     // --- Input parts (text + optional image) ---
//     const inputParts: any[] = [{ text: prompt }];

//     if (imageBase64) {
//       inputParts.push({
//         inlineData: {
//           data: imageBase64.split(",")[1],
//           mimeType: "image/jpeg",
//         },
//       });
//     }

//     const result = await model.generateContent({
//       contents: [{ role: "user", parts: inputParts }],
//     });
//     const response = result.response.text().trim();
//     return new Response(JSON.stringify({ content: response }), { status: 200 });
//   } catch (error) {
//     console.error("Error generating post:", error);
//     return new Response(JSON.stringify({ error: "Failed to generate content" }), { status: 500 });
//   }
// }

//----re
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
      - ${includeHashtags ? 'Add 3–5 relevant hashtags at the end (with #)' : 'No hashtags'}
      - ${includeEmoji ? 'Use emojis sparingly where relevant' : 'Avoid emojis'}
      Only return the blog content.
      `;
    } else if (["instagram", "facebook", "linkedin", "twitter"].includes(platform)) {
      prompt = `
      You are an expert social media content creator.
      Create a caption for ${platform}, analyzing the provided ${
        imageBase64 ? "image" : "description"
      }${imageBase64 && description ? " and description together" : ""}.
      Guidelines:
      - Tone: ${tone}
      - Word limit: ${wordLimit}
      - ${
        includeHashtags
          ? "Include relevant hashtags at the end (each should begin with #)"
          : "Do not include hashtags"
      }
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
      - ${includeHashtags ? "Include hashtags (with #)" : "No hashtags"}
      Only output the final text.
      `;
    }
    // console.log(includeHashtags); 
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

    let response = result.response.text().trim();

    // ✅ Force hashtags to start with "#" if includeHashtags is true
   if (includeHashtags) {
  // Split lines and remove empty ones
  const lines = response.split("\n").map(line => line.trim()).filter(Boolean);
  let lastLine = lines[lines.length - 1];

  // Loosen the condition — allow emojis, punctuation, etc.
  if (lastLine && lastLine.split(/\s+/).length <= 12) {
    // Convert words that aren't already hashtags
    console.log("lastline=",lastLine);
    const hashtags = lastLine
      .split(/\s+/)
      .filter(Boolean)
      .map(word => {
        // Strip punctuation like commas or periods
        const cleanWord = word.replace(/[^\w#]/g, "");
        return cleanWord.startsWith("#") ? cleanWord : `#${cleanWord}`;
      })
      .join(" ");
      // console.log("hashtags:",hashtags);
    // Only replace if the line doesn't already contain multiple "#"
    
      lines[lines.length - 1] = hashtags;
      // console.log(lines[lines.length-1]);
      response = lines.join("\n");
    // console.log(response);
  }
  // console.log(response)
  // return new Response(JSON.stringify({ content: response }), { status: 200 });
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
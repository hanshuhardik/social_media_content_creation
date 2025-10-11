// import { NextResponse } from 'next/server';
// import OpenAI from 'openai';

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// const getPromptForPlatform = (
//   platform: string, 
//   description: string, 
//   makeThread: boolean, 
//   wordLimit: number,
//   tone: string,
//   includeHashtags: boolean,
//   includeEmoji: boolean
// ) => {
//   const basePrompt = `Write a ${platform} post about: ${description}

// Key guidelines:
// - Write in a ${tone.toLowerCase()} tone
// - Aim for approximately ${wordLimit} words
// - Write in a natural, conversational style
// - Use simple, everyday language
// ${includeEmoji ? '- Include relevant emojis where appropriate' : '- Do not use any emojis'}
// ${includeHashtags ? '- Add relevant hashtags at the end' : '- Do not include any hashtags'}`;

//   switch (platform) {
//     case 'instagram':
//       return `${basePrompt}
// Additional notes:
// - Focus on visual storytelling
// - Keep the tone engaging and authentic
// ${includeHashtags ? '- Add 3-5 relevant hashtags at the end' : ''}`;
    
//     case 'facebook':
//       return `${basePrompt}
// Additional notes:
// - Write in a personal, engaging style
// - Share insights or experiences naturally
// - Add a subtle call-to-action if relevant
// ${includeHashtags ? '- Add 1-2 relevant hashtags if needed' : ''}`;
    
//     case 'twitter':
//       return makeThread 
//         ? `${basePrompt}
// Additional notes:
// - Break this into 3-5 connected tweets
// - Each tweet should flow naturally into the next
// - Keep each tweet under 280 characters
// - Number each tweet
// - Focus on telling a coherent story across the thread`
//         : `${basePrompt}
// Additional notes:
// - Keep it under 280 characters
// - Make it engaging and shareable
// ${includeHashtags ? '- Add 1-2 relevant hashtags' : ''}`;
    
//     case 'linkedin':
//       return `${basePrompt}
// Additional notes:
// - Maintain a professional tone
// - Include industry insights if relevant
// - Focus on value and expertise
// - Keep paragraphs short and scannable
// ${includeHashtags ? '- Add 2-3 relevant professional hashtags' : ''}`;
    
//     default:
//       return basePrompt;
//   }
// };

// export async function POST(req: Request) {
//   try {
//     const { 
//       platform, 
//       description, 
//       makeThread, 
//       wordLimit,
//       tone,
//       includeHashtags,
//       includeEmoji,
//     } = await req.json();

//     const prompt = getPromptForPlatform(
//       platform, 
//       description, 
//       makeThread, 
//       wordLimit,
//       tone,
//       includeHashtags,
//       includeEmoji
//     );

//     const systemPrompt = `You are a skilled social media writer who creates ${tone.toLowerCase()} content that resonates with the audience. Your writing should:

// - Maintain a consistent ${tone.toLowerCase()} tone throughout
// - Use natural, conversational language
// - Be concise and impactful
// ${includeEmoji ? '- Use emojis thoughtfully and sparingly' : '- Avoid using emojis'}
// ${includeHashtags ? '- Include relevant hashtags that add value' : '- Exclude hashtags'}
// - Express emotions and enthusiasm through well-crafted words
// - Focus on creating genuine connections with the audience

// ${platform === 'linkedin' 
//   ? 'For LinkedIn, maintain professionalism while being approachable and authentic.' 
//   : platform === 'twitter' && makeThread 
//     ? 'For Twitter threads, maintain a natural flow between tweets while keeping each one engaging.' 
//     : ''}`;

//     const completion = await openai.chat.completions.create({
//       messages: [
//         { 
//           role: "system", 
//           content: systemPrompt
//         },
//         {
//           role: "user",
//           content: prompt
//         }
//       ],
//       model: "gpt-3.5-turbo",
//       temperature: 0.7,
//     });

//     return NextResponse.json({ content: completion.choices[0].message.content });
//   } catch (error) {
//     console.error('Error:', error);
//     return NextResponse.json(
//       { error: 'Failed to generate content' },
//       { status: 500 }
//     );
//   }
// }


// gemini

// import { NextResponse } from 'next/server';
// import { GoogleGenerativeAI } from '@google/generative-ai';




// // Initialize Gemini with your API key
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

// const getPromptForPlatform = (
//   platform: string,
//   description: string,
//   makeThread: boolean,
//   wordLimit: number,
//   tone: string,
//   includeHashtags: boolean,
//   includeEmoji: boolean
// ) => {
//   const basePrompt = `Write a ${platform} post about: ${description}

// Key guidelines:
// - Write in a ${tone.toLowerCase()} tone
// - Aim for approximately ${wordLimit} words
// - Write in a natural, conversational style
// - Use simple, everyday language
// ${includeEmoji ? '- Include relevant emojis where appropriate' : '- Do not use any emojis'}
// ${includeHashtags ? '- Add relevant hashtags at the end' : '- Do not include any hashtags'}`;

//   switch (platform) {
//     case 'instagram':
//       return `${basePrompt}
// Additional notes:
// - Focus on visual storytelling
// - Keep the tone engaging and authentic
// ${includeHashtags ? '- Add 3-5 relevant hashtags at the end' : ''}`;

//     case 'facebook':
//       return `${basePrompt}
// Additional notes:
// - Write in a personal, engaging style
// - Share insights or experiences naturally
// - Add a subtle call-to-action if relevant
// ${includeHashtags ? '- Add 1-2 relevant hashtags if needed' : ''}`;

//     case 'twitter':
//       return makeThread
//         ? `${basePrompt}
// Additional notes:
// - Break this into 3-5 connected tweets
// - Each tweet should flow naturally into the next
// - Keep each tweet under 280 characters
// - Number each tweet
// - Focus on telling a coherent story across the thread`
//         : `${basePrompt}
// Additional notes:
// - Keep it under 280 characters
// - Make it engaging and shareable
// ${includeHashtags ? '- Add 1-2 relevant hashtags' : ''}`;

//     case 'linkedin':
//       return `${basePrompt}
// Additional notes:
// - Maintain a professional tone
// - Include industry insights if relevant
// - Focus on value and expertise
// - Keep paragraphs short and scannable
// ${includeHashtags ? '- Add 2-3 relevant professional hashtags' : ''}`;

//     default:
//       return basePrompt;
//   }
// };

// export async function POST(req: Request) {
//   try {
//     const {
//       platform,
//       description,
//       makeThread,
//       wordLimit,
//       tone,
//       includeHashtags,
//       includeEmoji,
//     } = await req.json();

//     const prompt = getPromptForPlatform(
//       platform,
//       description,
//       makeThread,
//       wordLimit,
//       tone,
//       includeHashtags,
//       includeEmoji
//     );

//     const systemPrompt = `You are a skilled social media writer who creates ${tone.toLowerCase()} content that resonates with the audience. Your writing should:

// - Maintain a consistent ${tone.toLowerCase()} tone throughout
// - Use natural, conversational language
// - Be concise and impactful
// ${includeEmoji ? '- Use emojis thoughtfully and sparingly' : '- Avoid using emojis'}
// ${includeHashtags ? '- Include relevant hashtags that add value' : '- Exclude hashtags'}
// - Express emotions and enthusiasm through well-crafted words
// - Focus on creating genuine connections with the audience

// ${platform === 'linkedin'
//         ? 'For LinkedIn, maintain professionalism while being approachable and authentic.'
//         : platform === 'twitter' && makeThread
//           ? 'For Twitter threads, maintain a natural flow between tweets while keeping each one engaging.'
//           : ''}`;

//     // ✅ Correct model for v1 API
//     // const model = genAI.getGenerativeModel({
//     //   model: 'gemini-1.5-flash-latest',
//     // });
// const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

//     const fullPrompt = `${systemPrompt}\n\n${prompt}`;

//     // ✅ Correct call method for SDK v0.24.1
//     const result = await model.generateContent({
//       contents: [{ role: 'user', parts: [{ text: fullPrompt }] }],
//     });

//     const response = result.response.text();

//     return NextResponse.json({ content: response });
//   } catch (error) {
//     console.error('Error:', error);
//     return NextResponse.json(
//       { error: 'Failed to generate content' },
//       { status: 500 }
//     );
//   }
// }

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







//gemini updated for the image 
// import { NextResponse } from "next/server";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// const getPromptForPlatform = (
//   platform: string,
//   description: string,
//   makeThread: boolean,
//   wordLimit: number,
//   tone: string,
//   includeHashtags: boolean,
//   includeEmoji: boolean,
//   numVariations: number
// ) => {
//   const basePrompt = description
//     ? `Write ${numVariations} ${tone.toLowerCase()} ${platform} post variations (each under ${wordLimit} words) about: "${description}".`
//     : `Generate ${numVariations} ${tone.toLowerCase()} ${platform} post variations (each under ${wordLimit} words) based on the uploaded image.`;

//   const notes = {
//     instagram: `
// - Focus on visual storytelling
// - Keep tone engaging and authentic
// ${includeHashtags ? "- Add 3-5 relevant hashtags" : ""}
// ${includeEmoji ? "- Use emojis naturally" : ""}`,

//     facebook: `
// - Use a friendly, conversational tone
// ${includeHashtags ? "- Add 1-2 relevant hashtags" : ""}
// ${includeEmoji ? "- Add emojis where they fit" : ""}`,

//     twitter: makeThread
//       ? `
// - Split into 3–5 connected tweets under 280 chars each
// - Number them (1/n, 2/n)`
//       : `
// - Keep under 280 characters
// ${includeHashtags ? "- Add 1-2 hashtags" : ""}
// ${includeEmoji ? "- Add emojis where they make sense" : ""}`,

//     linkedin: `
// - Professional yet friendly tone
// - Include insights or takeaways
// ${includeHashtags ? "- Add 2-3 professional hashtags" : ""}`,
//   };

//   return `${basePrompt}\n\nAdditional notes:${notes[platform as keyof typeof notes] ?? ""}`;
// };

// export async function POST(req: Request) {
//   try {
//     const {
//       platform,
//       description,
//       makeThread,
//       wordLimit,
//       tone,
//       includeHashtags,
//       includeEmoji,
//       imageBase64,
//       numVariations,
//     } = await req.json();

//     const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

//     const prompt = getPromptForPlatform(
//       platform,
//       description,
//       makeThread,
//       wordLimit,
//       tone,
//       includeHashtags,
//       includeEmoji,
//       numVariations
//     );

//     const systemPrompt = `You are a skilled social media content creator.
// Your task: return ${numVariations} short, ready-to-post ${platform} posts.
// Each variation must:
// - Match the ${tone.toLowerCase()} tone
// - Be natural, concise, and engaging
// ${includeEmoji ? "- Include emojis where suitable" : "- No emojis"}
// ${includeHashtags ? "- Include relevant hashtags" : "- No hashtags"}
// IMPORTANT: 
// - Do NOT include titles like "Variation 1" or "Post 1"
// - Do NOT include markdown, numbering, or formatting.
// - Separate each post with "---" only.`;

//     const contents: any[] = [{ role: "user", parts: [{ text: `${systemPrompt}\n\n${prompt}` }] }];

//     if (imageBase64) {
//       const base64Data = imageBase64.split(",")[1] || imageBase64;
//       contents[0].parts.push({
//         inlineData: { data: base64Data, mimeType: "image/jpeg" },
//       });
//     }

//     const result = await model.generateContent({ contents });
//     const response = result.response.text();

//     // 🧹 Clean the text output
//     const cleanText = response
//       .replace(/\*\*Variation\s*\d+\*\*:?/gi, "")
//       .replace(/Variation\s*\d+:?/gi, "")
//       .replace(/\*\*/g, "")
//       .replace(/^[-–—\s]+/gm, "")
//       .replace(/#+\s*/g, "")
//       .trim();

//     // Split into individual posts
//     const variations = cleanText
//       .split(/---+/)
//       .map((v) => v.trim())
//       .filter((v) => v.length > 0);

//     return NextResponse.json({ variations });
//   } catch (error) {
//     console.error("❌ Error generating content:", error);
//     return NextResponse.json({ error: "Failed to generate content" }, { status: 500 });
//   }
// }



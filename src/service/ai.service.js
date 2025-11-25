const { GoogleGenAI } = require("@google/genai");

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({});

async function generateCaption(base64ImageFile) {
  const contents = [
    {
      inlineData: {
        mimeType: "image/jpeg",
        data: base64ImageFile,
      },
    },
    { text: "Caption this image." },
  ];

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: contents,
    config: {
      systemInstruction: `
      you are an expert in generation captions for images.
      you generate single caption for the image.
      your caption should be sort and concise.
      you use hashtags and emojis in the caption.
      generate caption in tapori language.
      create aesthetic caption.
      The caption should be in a dark humor.
      `
    }
  });
  return response.text;
}

module.exports = generateCaption;

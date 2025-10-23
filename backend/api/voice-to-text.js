import fs from "fs";
import multer from "multer";
import OpenAI from "openai";

export const config = {
  api: {
    bodyParser: false,
  },
};

// Temporary storage for uploaded audio
const upload = multer({ dest: "/tmp" });

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  // Allow CORS (frontend-backend communication)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  upload.single("file")(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ error: "File upload failed" });
    }

    const filePath = req.file.path;

    try {
      const transcription = await openai.audio.transcriptions.create({
        file: fs.createReadStream(filePath),
        model: "whisper-1",
      });

      res.status(200).json({ transcribedText: transcription.text });
    } catch (error) {
      console.error("Transcription Error:", error);
      res.status(500).json({ error: "Failed to transcribe audio" });
    } finally {
      fs.unlinkSync(filePath); // delete uploaded temp file
    }
  });
}

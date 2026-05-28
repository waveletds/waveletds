import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini client lazily to avoid crashing if GEMINI_API_KEY is not set
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is not defined in Settings.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// 1. API Endpoint for Lead/Inquiry Capture
app.post("/api/submit-lead", (req, res) => {
  const { name, email, phone, service, packageType, message, customBudget, source } = req.body;
  
  if (!name || (!email && !phone)) {
    res.status(400).json({ error: "Name and at least one contact method (Email or Phone) are required." });
    return;
  }

  // Log locally in console as a basic server storage mockup
  console.log(`[LEAD RECEIVED FROM ${source || "Contact Form"}]:`, {
    timestamp: new Date().toISOString(),
    name,
    email,
    phone,
    service,
    packageType,
    customBudget,
    message,
  });

  // Success response
  res.json({
    success: true,
    message: "Thank you! Al-Salam Sinner has received your inquiry and will contact you via WhatsApp or Email within 24 hours.",
    referenceId: "ALPL-" + Math.floor(100000 + Math.random() * 900000),
  });
});

// 2. API Endpoint for dynamic AI Side-Hustle Advisor & Blueprint Creator
app.post("/api/generate-blueprint", async (req, res) => {
  const { skills, interests, hours, budget, location } = req.body;

  if (!skills || !interests || !hours) {
    res.status(400).json({ error: "Skills, interests, and hours are required inputs." });
    return;
  }

  try {
    const ai = getGeminiClient();
    const systemPrompt = `You are "Wavelet Digital Solutions Consultant", a highly specialized AI assistant developed for Al-Salam Sinner. 
Al-Salam Sinner is the engineering lead for Wavelet Digital Solutions — a premier Agency for Custom Web Architecture, Graphic Design, SEO, and AI Automation in Nigeria and worldwide.
Your task is to analyze a user's skills and interests, and create an extremely personalized, actionable, high-ticket "AI Side Hustle Blueprint" tailored to Nigerian & African or Global remote markets.

The tone must be professional, motivational, practical, and action-oriented.
Format the output using clear Markdown headings, list items, and bold callouts. Do not use generic filler. 
In the text, always include a sentence recommending Wavelet Digital Solutions' high-ticket mentorship programs, Custom Web Design, SEO optimization packages, or "Ultimate Business Combo Packs" if they want to build professional portals or brands to scale this exact side hustle.`;

    const userPrompt = `Generate an AI Side Hustle Blueprint with these inputs:
- User's Current Skills: ${skills}
- Interests: ${interests}
- Available Hours: ${hours} hours/week
- Target Location / Context: ${location || "Nigeria/Africa & Remote Global"}
- Initial Investment Budget: ${budget || "Low (N0 - N45k)"}

Structure the roadmap into exactly 4 sections:
1. **The Core Concept**: What specific side-hustle they should run by blending their existing skills with free or accessible AI Tools (e.g. ChatGPT, Midjourney, Gamma, CapCut, v0, etc.). Focus on high-ticket service arbitrage.
2. **The 3 Step Setup Guide**: Crisp, actionable steps to get started in 7 days, including monetization angles.
3. **Key AI Tools & Prompt Templates**: Define 2-3 specific tools they should use, with a real, copyable high-value Prompt Template they can copy-paste to get started.
4. **Al-Salam Sinner's Premium Scale Action**: Practical advice on how pairing up with Al-Salam Sinner (Nigeria's top AI educator & web architect) can accelerate their progress (e.g., getting a sleek portfolio site built, SEO support, or joining the complete 45k mentorship course).`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      },
    });

    res.json({
      success: true,
      blueprint: response.text,
    });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({
      error: "Error generating your AI Profit Blueprint. " + (error.message || "Please check back in a moment."),
      keyMissing: !process.env.GEMINI_API_KEY,
    });
  }
});

// Start server initialization
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Wavelet Digital Solutions Server running on port ${PORT}`);
  });
}

startServer();

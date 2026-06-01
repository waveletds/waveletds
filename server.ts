import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { loadDb, saveDb, DbSchema, LeadSubmission, UserProfile, Transaction, PurchasedItem, ServicePackage, ScriptOrWebsite, OTPService, VirtualNumberLease } from "./server-db.js";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Load dynamic DB state on startup
let db: DbSchema = loadDb();

// Synchronize env system variables with DB keys
if (db.apiKeys.GEMINI_API_KEY) {
  process.env.GEMINI_API_KEY = db.apiKeys.GEMINI_API_KEY;
}
if (db.apiKeys.VITE_WHATSAPP_NUMBER) {
  process.env.VITE_WHATSAPP_NUMBER = db.apiKeys.VITE_WHATSAPP_NUMBER;
}

// Initialize Gemini client lazily to avoid crashing if GEMINI_API_KEY is not set
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  db = loadDb(); // refresh DB content
  const apiKey = db.apiKeys.GEMINI_API_KEY || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not defined in settings or Admin dashboard.");
  }
  
  // Reinitialize client if apiKey changes
  if (!aiClient || (aiClient as any).apiKey !== apiKey) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
    // Store the current key for comparison
    (aiClient as any).apiKey = apiKey;
  }
  return aiClient;
}

// ----------------------------------------
// THE MAIN APP & SERVICES APIS
// ----------------------------------------

// Get global config parameters (dynamic prices, packages, and public configurations)
app.get("/api/config", (req, res) => {
  db = loadDb();
  res.json({
    success: true,
    nairaPackages: db.nairaPackages,
    digitalAssets: db.digitalAssets,
    otpApps: db.otpApps,
    virtualNumbers: db.virtualNumbers,
    miscRates: db.miscRates,
    apiKeys: {
      VITE_WHATSAPP_NUMBER: db.apiKeys.VITE_WHATSAPP_NUMBER || "+2348012345678"
    }
  });
});

// Update client profiles or wallet parameters directly on the server
app.get("/api/users", (req, res) => {
  db = loadDb();
  res.json({ success: true, users: db.users });
});

// Fetch/sync a specific user's state by email
app.get("/api/users/:email", (req, res) => {
  db = loadDb();
  const { email } = req.params;
  const user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (user) {
    res.json({ success: true, user });
  } else {
    res.status(404).json({ error: "User not found." });
  }
});

// Create/Sync user data from Client Console
app.post("/api/users/sync", (req, res) => {
  db = loadDb();
  const { email, name, phone, walletBalance, inventory, transactions } = req.body;
  if (!email) {
    res.status(400).json({ error: "User email is required for sync." });
    return;
  }

  let user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!user) {
    user = {
      id: "usr-" + Date.now() + "-" + Math.floor(Math.random() * 1000),
      name: name || "Wavelet Client",
      email: email.toLowerCase(),
      phone: phone || "",
      walletBalance: typeof walletBalance === "number" ? walletBalance : 45000,
      createdAt: new Date().toISOString(),
      inventory: inventory || [],
      transactions: transactions || []
    };
    db.users.push(user);
  } else {
    // Merge stats gracefully
    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (typeof walletBalance === "number") user.walletBalance = walletBalance;
    if (inventory) user.inventory = inventory;
    if (transactions) user.transactions = transactions;
  }

  saveDb(db);
  res.json({ success: true, user });
});

// 1. API Endpoint for Lead/Inquiry Capture
app.post("/api/submit-lead", (req, res) => {
  db = loadDb();
  const { name, email, phone, service, packageType, message, customBudget, source } = req.body;
  
  if (!name || (!email && !phone)) {
    res.status(400).json({ error: "Name and at least one contact method (Email or Phone) are required." });
    return;
  }

  // Generate Reference ID
  const referenceId = "ALPL-" + Math.floor(100000 + Math.random() * 900000);

  // Save lead details on backend JSON server
  const newLead: LeadSubmission = {
    id: referenceId,
    timestamp: new Date().toISOString(),
    name,
    email: email || "",
    phone: phone || "",
    service: service || "Custom Package Inquiry",
    packageType: packageType || "General",
    customBudget: customBudget || "N/A",
    message: message || "",
    source: source || "Interactive Service Finder",
    status: "new"
  };

  db.leads.unshift(newLead);

  // If sync mail exists, tie a lead notification or user registry
  if (email) {
    const matchedUser = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!matchedUser) {
      db.users.push({
        id: "usr-" + Date.now(),
        name,
        email: email.toLowerCase(),
        phone: phone || "",
        walletBalance: 45000, // Starter credit
        createdAt: new Date().toISOString(),
        inventory: [],
        transactions: []
      });
    }
  }

  saveDb(db);

  console.log(`[LEAD RECEIVED FROM ${source || "Contact Form"}]:`, newLead);

  res.json({
    success: true,
    message: "Thank you! Al-Salam Sinner has received your inquiry and will contact you via WhatsApp or Email within 24 hours.",
    referenceId,
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
      error: "Error generating your AI Profit Blueprint. " + (error.message || "Please check back in a moment or confirm that the API keys are defined in the Admin panel."),
      keyMissing: !process.env.GEMINI_API_KEY,
    });
  }
});


// ----------------------------------------
// ADMIN DASHBOARD CONTROLLERS
// ----------------------------------------

// Simple admin logging validation
app.post("/api/admin/login", (req, res) => {
  const { password } = req.body;
  if (password === "admin123" || password === "salamadmin77") {
    res.json({ success: true, token: "session_token_sinner_9981" });
  } else {
    res.status(401).json({ success: false, error: "Incorrect administrative credentials." });
  }
});

// Fetch all workspace information for Administration Panel
app.get("/api/admin/data", (req, res) => {
  db = loadDb();
  res.json({
    success: true,
    leads: db.leads,
    users: db.users,
    services: {
      nairaPackages: db.nairaPackages,
      digitalAssets: db.digitalAssets,
      otpApps: db.otpApps,
      virtualNumbers: db.virtualNumbers,
      miscRates: db.miscRates,
    },
    apiKeys: db.apiKeys
  });
});

// Update standard services lists and price levels
app.post("/api/admin/update-service", (req, res) => {
  db = loadDb();
  const { type, payload } = req.body; // type: 'naira' | 'digital' | 'otp' | 'virtual' | 'calcRates'

  if (type === "naira") {
    // Update or Insert a Naira package (SERVICES_DATA)
    const pkg: ServicePackage = payload;
    const idx = db.nairaPackages.findIndex(p => p.id === pkg.id);
    if (idx !== -1) {
      db.nairaPackages[idx] = { ...db.nairaPackages[idx], ...pkg };
    } else {
      db.nairaPackages.push(pkg);
    }
  } else if (type === "digital") {
    // Update or Insert a digital asset
    const asset: ScriptOrWebsite = payload;
    const idx = db.digitalAssets.findIndex(a => a.id === asset.id);
    if (idx !== -1) {
      db.digitalAssets[idx] = { ...db.digitalAssets[idx], ...asset };
    } else {
      db.digitalAssets.push(asset);
    }
  } else if (type === "otp") {
    // Update or Insert OTP App parameters
    const appItem: OTPService = payload;
    const idx = db.otpApps.findIndex(o => o.id === appItem.id);
    if (idx !== -1) {
      db.otpApps[idx] = { ...db.otpApps[idx], ...appItem };
    } else {
      db.otpApps.push(appItem);
    }
  } else if (type === "virtual") {
    // Update or Insert lease numbers prefix details
    const number: VirtualNumberLease = payload;
    const idx = db.virtualNumbers.findIndex(n => n.id === number.id);
    if (idx !== -1) {
      db.virtualNumbers[idx] = { ...db.virtualNumbers[idx], ...number };
    } else {
      db.virtualNumbers.push(number);
    }
  } else if (type === "calcRates") {
    // Update special supplementary rates
    db.miscRates = { ...db.miscRates, ...payload };
  } else {
    res.status(400).json({ error: "Invalid service category type requested." });
    return;
  }

  saveDb(db);
  res.json({ success: true, message: "Services database successfully updated!" });
});

// Create/Update administrative system API Keys
app.post("/api/admin/update-keys", (req, res) => {
  db = loadDb();
  const { GEMINI_API_KEY, VITE_WHATSAPP_NUMBER, PAYSTACK_SECRET_KEY, BULK_SMS_API_KEY } = req.body;

  if (GEMINI_API_KEY !== undefined) {
    db.apiKeys.GEMINI_API_KEY = GEMINI_API_KEY;
    process.env.GEMINI_API_KEY = GEMINI_API_KEY;
  }
  if (VITE_WHATSAPP_NUMBER !== undefined) {
    db.apiKeys.VITE_WHATSAPP_NUMBER = VITE_WHATSAPP_NUMBER;
    process.env.VITE_WHATSAPP_NUMBER = VITE_WHATSAPP_NUMBER;
  }
  if (PAYSTACK_SECRET_KEY !== undefined) {
    db.apiKeys.PAYSTACK_SECRET_KEY = PAYSTACK_SECRET_KEY;
  }
  if (BULK_SMS_API_KEY !== undefined) {
    db.apiKeys.BULK_SMS_API_KEY = BULK_SMS_API_KEY;
  }

  saveDb(db);
  res.json({ success: true, message: "API Credentials and Environments saved perfectly!" });
});

// Update or adjust active User wallets and transactions data
app.post("/api/admin/update-user", (req, res) => {
  db = loadDb();
  const { userId, walletBalance, name, phone, email, deleteUser } = req.body;

  const idx = db.users.findIndex(u => u.id === userId);
  if (idx === -1) {
    res.status(404).json({ error: "Client profile not found inside registry." });
    return;
  }

  if (deleteUser) {
    db.users.splice(idx, 1);
    saveDb(db);
    res.json({ success: true, message: "User deleted successfully." });
    return;
  }

  if (walletBalance !== undefined) {
    db.users[idx].walletBalance = parseFloat(walletBalance);
  }
  if (name !== undefined) {
    db.users[idx].name = name;
  }
  if (phone !== undefined) {
    db.users[idx].phone = phone;
  }
  if (email !== undefined) {
    db.users[idx].email = email.toLowerCase();
  }

  saveDb(db);
  res.json({ success: true, message: "Client ledger modified successfully!", user: db.users[idx] });
});

// Remove, archive or wipe lead inquiries history
app.post("/api/admin/delete-lead", (req, res) => {
  db = loadDb();
  const { leadId, statusUpdate } = req.body;

  const idx = db.leads.findIndex(l => l.id === leadId);
  if (idx === -1) {
    res.status(404).json({ error: "Lead submission file not found." });
    return;
  }

  if (statusUpdate) {
    db.leads[idx].status = statusUpdate;
    res.json({ success: true, message: `Lead marked as ${statusUpdate}.` });
  } else {
    db.leads.splice(idx, 1);
    res.json({ success: true, message: "Lead submission successfully cleared." });
  }

  saveDb(db);
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

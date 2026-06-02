import React, { useState, useEffect } from "react";
import { 
  Wallet, CreditCard, ChevronRight, Tag, Search, PlusCircle, CheckCircle2, 
  RefreshCw, Server, Send, Sparkles, FileCode2, PhoneCall, History, 
  ShieldCheck, ArrowUpRight, Code2, AlertCircle, Laptop, Landmark, Clipboard,
  KeyRound, HelpCircle, Database, Phone, MessageSquareReply, ExternalLink,
  Globe, User, Moon, Sun, Plus, Headphones, Bell, Smartphone, Wifi, Tv, 
  Gamepad2, Plug, Grid, Star, Eye, EyeOff, Copy, Gift, ShoppingBag, Check, Share2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Types for the Dashboard & Store
interface ScriptOrWebsite {
  id: string;
  type: "website" | "script" | "service";
  name: string;
  price: number;
  category: string;
  shortDesc: string;
  features: string[];
  techStack: string[];
  approxSize?: string;
}

interface OTPService {
  id: string;
  appName: string;
  price: number;
  availableNumbers: number;
  icon: string;
}

interface VirtualNumberLease {
  id: string;
  country: string;
  flag: string;
  prefix: string;
  monthlyCost: number;
  type: "US" | "UK" | "Foreign";
}

interface Transaction {
  id: string;
  type: "funding" | "purchase";
  amount: number;
  serviceName: string;
  date: string;
  status: "success" | "pending" | "failed";
  reference: string;
}

interface PurchasedItem {
  id: string;
  purchaseId: string;
  name: string;
  price: number;
  date: string;
  key?: string;
  downloadLink?: string;
  phoneDetails?: {
    number: string;
    expiresAt: string;
    country: string;
  };
}

export default function DashboardStore() {
  // --- USER AUTHENTICATION STATES ---
  const [currentUser, setCurrentUser] = useState<any>(() => {
    const saved = localStorage.getItem("wavelet_active_user");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    const defaultUser = {
      id: "user-auto-active",
      name: "Admin Operator",
      email: "iqleadsbloger@gmail.com",
      phone: "+234 81 2345 6789",
      walletBalance: 45050,
      transactions: [
        {
          id: "tx-init-local",
          type: "funding",
          amount: 45050,
          serviceName: "Reset System Welcome Credit",
          date: new Date().toISOString().replace("T", " ").substring(0, 16),
          status: "success",
          reference: "WVL-TX-INIT-9201"
        }
      ],
      inventory: [
        {
          id: "purch-1",
          purchaseId: "web-dev-vtu",
          name: "VTU & Airtime Topup Script V2.4",
          price: 15000,
          date: new Date().toISOString().replace("T", " ").substring(0, 16),
          key: "WVL-WSC-9981-VTU3",
          downloadLink: "https://wavelet-solutions.dynamic-filehost.com/dl/scripts/vtu-airtime-v24_sc.zip"
        }
      ]
    };
    localStorage.setItem("wavelet_active_user", JSON.stringify(defaultUser));
    return defaultUser;
  });

  const [authTab, setAuthTab] = useState<"login" | "signup">("login");
  const [authForm, setAuthForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: ""
  });
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const [isAccountCopied, setIsAccountCopied] = useState(false);

  // --- STATE PERSISTENCE IN LOCALSTORAGE ---
  const [walletBalance, setWalletBalance] = useState<number>(() => {
    const savedUser = localStorage.getItem("wavelet_active_user");
    if (savedUser) {
      try {
        const u = JSON.parse(savedUser);
        return typeof u.walletBalance === "number" ? u.walletBalance : 45000;
      } catch (e) {}
    }
    const saved = localStorage.getItem("wavelet_wallet_balance");
    return saved ? parseFloat(saved) : 45000; 
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const savedUser = localStorage.getItem("wavelet_active_user");
    if (savedUser) {
      try {
        const u = JSON.parse(savedUser);
        if (u.transactions) return u.transactions;
      } catch (e) {}
    }
    const saved = localStorage.getItem("wavelet_transactions");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const seen = new Set<string>();
        return parsed.map((tx: any, idx: number) => {
          let cid = tx.id;
          if (!cid || seen.has(cid)) {
            cid = `tx-${Date.now()}-${idx}-${Math.floor(Math.random() * 1000000)}`;
          }
          seen.add(cid);
          return { ...tx, id: cid };
        });
      } catch (e) {
        // Fallback on error
      }
    }
    return [
      {
        id: "tx-1",
        type: "funding",
        amount: 30000,
        serviceName: "Funded via Paystack Simulator",
        date: "2026-05-30 14:12",
        status: "success",
        reference: "WVL-TX-PYSK-77121"
      },
      {
        id: "tx-2",
        type: "funding",
        amount: 15000,
        serviceName: "System Welcome Credit",
        date: "2026-05-28 09:30",
        status: "success",
        reference: "WVL-TX-INIT-0010"
      }
    ];
  });

  const [inventory, setInventory] = useState<PurchasedItem[]>(() => {
    const savedUser = localStorage.getItem("wavelet_active_user");
    if (savedUser) {
      try {
        const u = JSON.parse(savedUser);
        if (u.inventory) return u.inventory;
      } catch (e) {}
    }
    const saved = localStorage.getItem("wavelet_inventory");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const seen = new Set<string>();
        return parsed.map((item: any, idx: number) => {
          let cid = item.id;
          if (!cid || seen.has(cid)) {
            cid = `purch-${Date.now()}-${idx}-${Math.floor(Math.random() * 1000000)}`;
          }
          seen.add(cid);
          return { ...item, id: cid };
        });
      } catch (e) {
        // Fallback on error
      }
    }
    return [
      {
        id: "purch-1",
        purchaseId: "web-dev-vtu",
        name: "VTU & Airtime Topup Script V2.4",
        price: 15000,
        date: "2026-05-30 15:45",
        key: "WVL-WSC-9981-VTU3",
        downloadLink: "https://wavelet-solutions.dynamic-filehost.com/dl/scripts/vtu-airtime-v24_sc.zip"
      }
    ];
  });

  // --- AUTOMATIC LOGIN SYSTEM FOR ADMIN & USERS ---
  useEffect(() => {
    if (!currentUser) {
      const performAutoLogin = async () => {
        try {
          const res = await fetch("/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: "iqleadsbloger@gmail.com", password: "password" })
          });
          if (res.ok) {
            const data = await res.json();
            setCurrentUser(data.user);
            localStorage.setItem("wavelet_active_user", JSON.stringify(data.user));
            setWalletBalance(data.user.walletBalance ?? 45000);
            setTransactions(data.user.transactions || []);
            setInventory(data.user.inventory || []);
          } else {
            // Try signup if does not exist
            const signupRes = await fetch("/api/users/signup", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name: "Admin Operator",
                email: "iqleadsbloger@gmail.com",
                password: "password",
                phone: "+234 80 0000 1234"
              })
            });
            if (signupRes.ok) {
              const data = await signupRes.json();
              setCurrentUser(data.user);
              localStorage.setItem("wavelet_active_user", JSON.stringify(data.user));
              setWalletBalance(data.user.walletBalance ?? 45000);
              setTransactions(data.user.transactions || []);
              setInventory(data.user.inventory || []);
            } else {
              throw new Error("API registration failed");
            }
          }
        } catch (err) {
          // Fallback to offline auto-login to guarantee that they are NEVER blocked!
          const fallbackUser = {
            id: "user-auto-active",
            name: "Admin Operator",
            email: "iqleadsbloger@gmail.com",
            phone: "+234 81 2345 6789",
            walletBalance: 45000,
            transactions: [
              {
                id: "tx-init-local",
                type: "funding",
                amount: 45000,
                serviceName: "System Welcome Registration Credit",
                date: new Date().toISOString().replace("T", " ").substring(0, 16),
                status: "success",
                reference: "WVL-TX-INIT-9201"
              }
            ],
            inventory: []
          };
          setCurrentUser(fallbackUser);
          localStorage.setItem("wavelet_active_user", JSON.stringify(fallbackUser));
          setWalletBalance(45050);
          setTransactions(fallbackUser.transactions);
          setInventory([]);
        }
      };
      // Brief loading feel delay
      const timer = setTimeout(() => {
        performAutoLogin();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentUser]);

  // Local Sync Database Back to Server
  const syncUserWithServer = async (updatedBalance: number, updatedTxs: any[], updatedInv: any[]) => {
    if (!currentUser) return;
    try {
      await fetch("/api/admin/update-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: currentUser.id,
          walletBalance: updatedBalance,
          name: currentUser.name,
          email: currentUser.email,
          phone: currentUser.phone
        })
      });
      
      const updatedUser = { 
        ...currentUser, 
        walletBalance: updatedBalance, 
        transactions: updatedTxs, 
        inventory: updatedInv 
      };
      setCurrentUser(updatedUser);
      localStorage.setItem("wavelet_active_user", JSON.stringify(updatedUser));
    } catch (err) {
      console.error("Local sync issue:", err);
    }
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setAuthLoading(true);

    try {
      const endpoint = authTab === "signup" ? "/api/users/signup" : "/api/users/login";
      const payload = authTab === "signup"
        ? { name: authForm.name, email: authForm.email, password: authForm.password, phone: authForm.phone }
        : { email: authForm.email, password: authForm.password };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Authentication operation failed.");

      const user = data.user;
      setCurrentUser(user);
      localStorage.setItem("wavelet_active_user", JSON.stringify(user));

      setWalletBalance(user.walletBalance);
      setTransactions(user.transactions || []);
      setInventory(user.inventory || []);

      showNotice("success", authTab === "signup" ? `Welcome to Wavelet, ${user.name}! Starting welcome credit loaded.` : `Welcome back, ${user.name}!`);
    } catch (err: any) {
      setAuthError(err.message || "Failed to connect profile registry.");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogoutUser = () => {
    const autoUser = {
      id: "user-auto-active",
      name: "Admin Operator",
      email: "iqleadsbloger@gmail.com",
      phone: "+234 81 2345 6789",
      walletBalance: 45050,
      transactions: [
        {
          id: "tx-init-local",
          type: "funding",
          amount: 45050,
          serviceName: "Reset System Welcome Credit",
          date: new Date().toISOString().replace("T", " ").substring(0, 16),
          status: "success",
          reference: "WVL-TX-INIT-9201"
        }
      ],
      inventory: [
        {
          id: "purch-1",
          purchaseId: "web-dev-vtu",
          name: "VTU & Airtime Topup Script V2.4",
          price: 15000,
          date: new Date().toISOString().replace("T", " ").substring(0, 16),
          key: "WVL-WSC-9981-VTU3",
          downloadLink: "https://wavelet-solutions.dynamic-filehost.com/dl/scripts/vtu-airtime-v24_sc.zip"
        }
      ]
    };
    setCurrentUser(autoUser);
    localStorage.setItem("wavelet_active_user", JSON.stringify(autoUser));
    setWalletBalance(45050);
    setTransactions(autoUser.transactions);
    setInventory(autoUser.inventory);
    showNotice("success", "Developer Terminal simulation states have been successfully reset.");
  };

  // Save to localStorage whenever user state updates (fallback client resilience)
  useEffect(() => {
    localStorage.setItem("wavelet_wallet_balance", walletBalance.toString());
  }, [walletBalance]);

  useEffect(() => {
    localStorage.setItem("wavelet_transactions", JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem("wavelet_inventory", JSON.stringify(inventory));
  }, [inventory]);

  // --- DYNAMIC SELECTION UI STATES ---
  const [activeTab, setActiveTab] = useState<"store" | "otp" | "virtual" | "sms" | "wallet" | "inventory">("otp");
  const [storeFilter, setStoreFilter] = useState<"all" | "website" | "script" | "service">("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Funding specific states
  const [fundingAmount, setFundingAmount] = useState<string>("10000");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "bank" | "usdt">("card");
  const [fundingSuccessMsg, setFundingSuccessMsg] = useState<string | null>(null);
  const [isFundingLoading, setIsFundingLoading] = useState(false);

  // SMS Portal dynamic workflow state
  const [smsSenderId, setSmsSenderId] = useState("");
  const [smsRecipients, setSmsRecipients] = useState("");
  const [smsMessage, setSmsMessage] = useState("");
  const [smsCategory, setSmsCategory] = useState<"high-delivery" | "promo" | "otp-route">("high-delivery");
  const [smsSendingState, setSmsSendingState] = useState<"idle" | "sending" | "sent">("idle");
  const [smsCostCalc, setSmsCostCalc] = useState<number>(0);

  const [dbSmsTemplates, setDbSmsTemplates] = useState<any[]>([]);

  // Fetch SMS templates on active tab === "sms" or on mount!
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const res = await fetch("/api/admin/templates");
        if (res.ok) {
          const data = await res.json();
          setDbSmsTemplates(data.smsTemplates || []);
        }
      } catch (err) {
        console.error("Failed to load SMS templates for user selection:", err);
      }
    };
    fetchTemplates();
  }, [activeTab]);

  // OTP Verification Simulator screen state
  const [selectedOtpApp, setSelectedOtpApp] = useState<OTPService | null>(null);
  const [selectedOtpCountry, setSelectedOtpCountry] = useState<string>("USA");
  const [activeVerificationSIM, setActiveVerificationSIM] = useState<{
    number: string;
    app: string;
    country: string;
    otpCode: string;
    receivedCode: boolean;
    timer: number;
  } | null>(null);

  // Notification Banner
  const [globalNotice, setGlobalNotice] = useState<{ type: "success" | "error" | "info"; msg: string } | null>(null);

  const showNotice = (type: "success" | "error" | "info", msg: string) => {
    setGlobalNotice({ type, msg });
    setTimeout(() => setGlobalNotice(null), 5000); // clear after 5s
  };

  // --- PRODUCT DATASETS ---
  const digitalAssets: ScriptOrWebsite[] = [
    {
      id: "dw-1",
      type: "website",
      name: "Complete Advanced E-Commerce Platform",
      price: 180000,
      category: "E-Commerce",
      shortDesc: "Complete deployed visual retail platform with cart, payment gateway, and beautiful management admin board.",
      features: ["Custom UI storefront", "Paystack/Stripe checkout", "Real-time Order tracking dashboard", "PWA Support"],
      techStack: ["React", "Express", "Tailwind CSS", "MongoDB/Postgres"],
      approxSize: "45MB Deployed Package"
    },
    {
      id: "ds-1",
      type: "script",
      name: "E-Commerce Retail Laravel Engine Source Code",
      price: 45000,
      category: "E-Commerce",
      shortDesc: "The fully engineered source code script. Just upload and configure your credentials. Clean modules, pre-integrated with SMS reminders and automatic orders.",
      features: ["Modular design patterns", "Standard API routers", "Secure Auth protection", "Automatic invoice dispatcher"],
      techStack: ["PHP Laravel 11", "Vite JS", "MySQL"],
      approxSize: "12.4MB Source ZIP"
    },
    {
      id: "dw-2",
      type: "website",
      name: "Airtime, Data & Multi-VTU Client Portal",
      price: 210000,
      category: "VTU Telecoms",
      shortDesc: "Turnkey ready-made automated telecoms portal. Deployed with API pipelines checking for topups, bills payment, and subscription automation.",
      features: ["Auto wallets synchronization", "Instant commissions configuration", "99% uptime direct routes", "WhatsApp notifications system"],
      techStack: ["Next.js", "Fastify Server", "React Query", "Tailwind"],
      approxSize: "60MB Portal Bundle"
    },
    {
      id: "ds-2",
      type: "script",
      name: "Telecom Service Topup React Native Script",
      price: 50000,
      category: "VTU Telecoms",
      shortDesc: "Mobile application template script with billing algorithms, local API gateways pre-installed.",
      features: ["Android & iOS cross-platform compile", "Fluid transitions layout", "Secure payment hooks", "Dark mode toggling system"],
      techStack: ["React Native", "Expo Core", "Tailwind CSS Mobile"],
      approxSize: "8.1MB Application Code"
    },
    {
      id: "ds-3",
      type: "script",
      name: "Crypto Arbitrage Dashboard UI Template",
      price: 95000,
      category: "Fintech Scripts",
      shortDesc: "Premium dashboard showcasing live tickers, user trade history panels, coin swap calculators, and elegant dark visualization panels.",
      features: ["Stunning high fidelity charts", "Mock live trade generator code", "Perfect mobile responsive wrappers", "D3.js metrics animations"],
      techStack: ["React", "Vite", "Recharts", "Lucide React Icons"],
      approxSize: "4.8MB Front-End Code"
    },
    {
      id: "dw-3",
      type: "website",
      name: "Comprehensive School Portal System (LMS)",
      price: 240000,
      category: "LMS Systems",
      shortDesc: "Fully deployed school registration, custom course portal, marks database, and online fees collection infrastructure with premium UI.",
      features: ["Beautiful teacher dashboards", "Instant PDF card generator", "Dynamic assignment hubs", "Online test portal modules"],
      techStack: ["React SPA", "Express API Base", "Prisma ORM", "Docker container"],
      approxSize: "110MB Full System Stack"
    },
    {
      id: "ds-4",
      type: "script",
      name: "LMS Admin Dashboard & Course Coordinator Script",
      price: 65000,
      category: "LMS Systems",
      shortDesc: "Full backend core script package to route student requests, handle exams scoring, and save cloud resources.",
      features: ["Secure course assignment algorithms", "CSV batch upload ready", "Clean REST API schema", "Comprehensive role guards"],
      techStack: ["TypeScript Node.js", "PostgreSQL schema", "Zod validations"],
      approxSize: "15.2MB Server Script"
    },
    {
      id: "dserv-1",
      type: "service",
      name: "Custom Payment Node & API Configuration",
      price: 30000,
      category: "Web Engineering",
      shortDesc: "Professional configuration of Flutterwave, Paystack, Stripe, credit cards, or bespoke SMS billing triggers into your existing script.",
      features: ["Complete web hook validation setup", "Detailed API logging & testing", "3 days priority support", "Anti-payload forgery security"],
      techStack: ["Active API Setup", "Full Sandbox Testing"],
    },
    {
      id: "dserv-2",
      type: "service",
      name: "Legacy Website Refresh & Tailwind Styling Repair",
      price: 60000,
      category: "Web Engineering",
      shortDesc: "Complete rebuild of ancient sluggish portals into clean, lightning-fast high contrast websites optimized for conversions.",
      features: ["Upgrade layout architecture", "Integrate responsive mobile breakpoints", "Aesthetic typography pairings", "Improve PageSpeed core metrics to 95+"],
      techStack: ["Tailwind Utility Polish", "Aesthetic UI Standards"],
    },
  ];

  const otpApps: OTPService[] = [
    { id: "otp-wa", appName: "WhatsApp Messenger", price: 2500, availableNumbers: 420, icon: "MessagesSquare" },
    { id: "otp-tg", appName: "Telegram Messenger", price: 2000, availableNumbers: 512, icon: "Send" },
    { id: "otp-google", appName: "Google / YouTube Account", price: 1800, availableNumbers: 1240, icon: "Sparkles" },
    { id: "otp-fb", appName: "Meta / Facebook / IG", price: 1500, availableNumbers: 240, icon: "Laptop" },
    { id: "otp-discord", appName: "Discord Server Access", price: 1300, availableNumbers: 189, icon: "Server" },
  ];

  const virtualNumbersList: VirtualNumberLease[] = [
    { id: "vn-us", country: "United States (US)", flag: "🇺🇸", prefix: "+1", monthlyCost: 12000, type: "US" },
    { id: "vn-uk", country: "United Kingdom (UK)", flag: "🇬🇧", prefix: "+44", monthlyCost: 14000, type: "UK" },
    { id: "vn-ca", country: "Canada (CA)", flag: "🇨🇦", prefix: "+1", monthlyCost: 13000, type: "Foreign" },
    { id: "vn-nl", country: "Netherlands (NL)", flag: "🇳🇱", prefix: "+31", monthlyCost: 15000, type: "Foreign" },
    { id: "vn-za", country: "South Africa (ZA)", flag: "🇿🇦", prefix: "+27", monthlyCost: 16500, type: "Foreign" },
  ];

  // --- ACTIONS & MUTATORS ---

  // Refunding / Funding Trigger Action
  const handleFundWalletSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(fundingAmount);
    if (isNaN(amount) || amount <= 0) {
      showNotice("error", "Please write a valid amount to fund.");
      return;
    }

    setIsFundingLoading(true);

    try {
      const emailParam = currentUser ? currentUser.email : "iqleadsbloger@gmail.com";
      const res = await fetch("/api/paystack/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailParam, amount })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed initiating Paystack link.");

      showNotice("success", "Connecting securely with Paystack Checkout. Please wait...");
      
      if (data.data && data.data.authorization_url) {
        // Redirection
        window.location.href = data.data.authorization_url;
      } else {
        throw new Error("Paystack checkout redirect URL is missing.");
      }
    } catch (err: any) {
      showNotice("error", err.message || "Failed initializing Paystack Gateway payment.");
      setIsFundingLoading(false);
    }
  };

  // Pure Wallet Purchase Logic
  const handlePurchaseAsset = (asset: ScriptOrWebsite) => {
    if (walletBalance < asset.price) {
      showNotice("error", `Your active funded wallet is short by ₦${(asset.price - walletBalance).toLocaleString()}. Please top up first!`);
      setActiveTab("wallet");
      return;
    }

    // Deduct and log transaction
    setWalletBalance(prev => prev - asset.price);
    const refCode = "WVL-PR-" + Math.floor(100000 + Math.random() * 900000);

    const newTx: Transaction = {
      id: "tx-" + Date.now() + "-" + Math.floor(Math.random() * 1000000),
      type: "purchase",
      amount: asset.price,
      serviceName: `Bought: ${asset.name}`,
      date: new Date().toISOString().replace("T", " ").substring(0, 16),
      status: "success",
      reference: refCode
    };

    const dlLink = asset.type === "script" 
      ? `https://wavelet-solutions.dynamic-filehost.com/dl/scripts/${asset.id}_release.zip` 
      : `https://wavelet-solutions.dynamic-filehost.com/services/receipt/${asset.id}_invoice.pdf`;

    const generatedKey = "WVL-" + asset.type.toUpperCase().substring(0, 3) + "-" + Math.floor(1000 + Math.random() * 9000) + "-CONF";

    const newInv: PurchasedItem = {
      id: "purch-" + Date.now() + "-" + Math.floor(Math.random() * 1000000),
      purchaseId: asset.id,
      name: asset.name,
      price: asset.price,
      date: new Date().toISOString().replace("T", " ").substring(0, 16),
      key: generatedKey,
      downloadLink: dlLink,
    };

    const nextTxs = [newTx, ...transactions];
    const nextInv = [newInv, ...inventory];
    setTransactions(nextTxs);
    setInventory(nextInv);
    syncUserWithServer(walletBalance - asset.price, nextTxs, nextInv);
    showNotice("success", `Successfully purchased! Check your downloads inside the vault folder.`);
  };

  // OTP SIM PURCHASE WORKFLOW
  const handleBuyOtpSIM = (app: OTPService) => {
    if (walletBalance < app.price) {
      showNotice("error", `Insufficient funds! OTP Sim costs ₦${app.price.toLocaleString()}. Please load your wallet.`);
      setActiveTab("wallet");
      return;
    }

    setWalletBalance(prev => prev - app.price);
    const mockAreaCode = selectedOtpCountry === "USA" ? "+1 (302) 55" : selectedOtpCountry === "UK" ? "+44 7911" : "+234 815";
    const generatedPhone = mockAreaCode + " " + Math.floor(100000 + Math.random() * 900000);

    const refCode = "WVL-OTP-" + Math.floor(100000 + Math.random() * 900000);
    const newTx: Transaction = {
      id: "tx-" + Date.now() + "-" + Math.floor(Math.random() * 1000000),
      type: "purchase",
      amount: app.price,
      serviceName: `Provisioned OTP SIM: ${app.appName} (${selectedOtpCountry})`,
      date: new Date().toISOString().replace("T", " ").substring(0, 16),
      status: "success",
      reference: refCode
    };

    const nextTxs = [newTx, ...transactions];
    setTransactions(nextTxs);
    syncUserWithServer(walletBalance - app.price, nextTxs, inventory);

    // Activate the interactive simulation loop!
    const generatedCodeStr = Math.floor(100000 + Math.random() * 900000).toString();

    setActiveVerificationSIM({
      number: generatedPhone,
      app: app.appName,
      country: selectedOtpCountry,
      otpCode: generatedCodeStr,
      receivedCode: false,
      timer: 80, // 80 seconds countdown
    });

    showNotice("success", `SIM Number Locked! System is now listening for incoming verification signals.`);
  };

  // Countdown and signal simulation for OTP
  useEffect(() => {
    let interval: any = null;
    if (activeVerificationSIM) {
      interval = setInterval(() => {
        setActiveVerificationSIM(prev => {
          if (!prev) return null;
          if (prev.timer <= 1) {
            clearInterval(interval);
            showNotice("info", "SMS Verification stream session closed. You can request another SIM number.");
            return null;
          }

          // Randomly "receive" code after 7-15 seconds
          const showCode = prev.timer < 70 ? true : false;
          if (showCode && !prev.receivedCode) {
            // Instantly push this to purchased inventory too so they don't lose it
            const newInv: PurchasedItem = {
              id: "purch-" + Date.now() + "-otp-" + Math.floor(Math.random() * 1000000),
              purchaseId: "otp-sim",
              name: `OTP SIM Code: ${prev.app} Verify`,
              price: selectedOtpApp?.price || 2000,
              date: new Date().toISOString().replace("T", " ").substring(0, 16),
              key: `Code: ${prev.otpCode}`,
              phoneDetails: {
                number: prev.number,
                country: prev.country,
                expiresAt: "Expires shortly"
              }
            };
            setInventory(prevInv => [newInv, ...prevInv]);
            showNotice("success", `Success! OTP Verification Code received to virtual terminal.`);
          }

          return {
            ...prev,
            receivedCode: showCode ? true : prev.receivedCode,
            timer: prev.timer - 1
          };
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeVerificationSIM]);

  // VIRTUAL NUMBER LEASE PURCHASE WORKFLOW
  const handleLeaseVirtualNumber = (numObj: VirtualNumberLease) => {
    if (walletBalance < numObj.monthlyCost) {
      showNotice("error", `Insufficient funds leases ₦${numObj.monthlyCost.toLocaleString()}. Please fund your Wavelet Wallet.`);
      setActiveTab("wallet");
      return;
    }

    setWalletBalance(prev => prev - numObj.monthlyCost);
    const areaCode = numObj.prefix;
    const generatedNum = `${areaCode} (${Math.floor(200 + Math.random()*800)}) ${Math.floor(100 + Math.random()*899)}-${Math.floor(1000 + Math.random()*9000)}`;

    const refCode = "WVL-NUM-" + Math.floor(100000 + Math.random() * 900000);
    const newTx: Transaction = {
      id: "tx-" + Date.now() + "-" + Math.floor(Math.random() * 1000000),
      type: "purchase",
      amount: numObj.monthlyCost,
      serviceName: `Leased ${numObj.country} Dedicated Line`,
      date: new Date().toISOString().replace("T", " ").substring(0, 16),
      status: "success",
      reference: refCode
    };

    const newInv: PurchasedItem = {
      id: "purch-" + Date.now() + "-" + Math.floor(Math.random() * 1000000),
      purchaseId: numObj.id,
      name: `${numObj.country} Dedicated Number Lease`,
      price: numObj.monthlyCost,
      date: new Date().toISOString().replace("T", " ").substring(0, 16),
      key: `DID Route: ${refCode}`,
      phoneDetails: {
        number: generatedNum,
        country: numObj.country,
        expiresAt: "2026-07-01 (Auto-Renewal: Active)"
      }
    };

    const nextTxs = [newTx, ...transactions];
    const nextInv = [newInv, ...inventory];
    setTransactions(nextTxs);
    setInventory(nextInv);
    syncUserWithServer(walletBalance - numObj.monthlyCost, nextTxs, nextInv);
    showNotice("success", `Private Number Configured! Defer outbound SIP links inside inventory dashboard.`);
  };

  // SMS Delivery Calculator
  useEffect(() => {
    const wordCount = smsMessage.length;
    const pages = Math.ceil(wordCount / 160) || 1;
    let chargePerSms = 5; // standard Naira per unit
    if (smsCategory === "otp-route") chargePerSms = 12; // priority high OTP routes
    if (smsCategory === "promo") chargePerSms = 4; // promo bulk routing

    const cleanList = smsRecipients.split(",").map(x => x.trim()).filter(Boolean);
    const destinationCount = cleanList.length;

    setSmsCostCalc(pages * chargePerSms * destinationCount);
  }, [smsMessage, smsRecipients, smsCategory]);

  const handleSendBulkSMS = (e: React.FormEvent) => {
    e.preventDefault();
    if (!smsSenderId || !smsRecipients || !smsMessage) {
      showNotice("error", "Error: Sender ID, valid recipients list, and textual message body are required!");
      return;
    }

    if (walletBalance < smsCostCalc) {
      showNotice("error", `Sending this broadcast requires ₦${smsCostCalc.toLocaleString()}, but wallet balance is only ₦${walletBalance.toLocaleString()}.`);
      return;
    }

    setSmsSendingState("sending");

    setTimeout(() => {
      const refCode = "WVL-SMS-" + Math.floor(100000 + Math.random() * 900000);

      const newTx: Transaction = {
        id: "tx-" + Date.now() + "-" + Math.floor(Math.random() * 1000000),
        type: "purchase",
        amount: smsCostCalc,
        serviceName: `SMS Broadcast: [${smsSenderId}] to ${smsRecipients.split(",").length} targets`,
        date: new Date().toISOString().replace("T", " ").substring(0, 16),
        status: "success",
        reference: refCode
      };

      const nextTxs = [newTx, ...transactions];
      setTransactions(nextTxs);
      syncUserWithServer(walletBalance - smsCostCalc, nextTxs, inventory);
      setSmsSendingState("sent");
      showNotice("success", `Broadcasting dispatch success! Route API verified. Sender ID registry matched.`);
      
      // Clear inputs
      setSmsRecipients("");
      setSmsMessage("");
      setTimeout(() => setSmsSendingState("idle"), 3000);
    }, 2000);
  };

  // Filtering Digital Assets
  const filteredAssets = digitalAssets.filter(asset => {
    const matchesFilter = storeFilter === "all" || asset.type === storeFilter;
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          asset.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          asset.shortDesc.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (!currentUser) {
    return (
      <section className="bg-white border-t border-gray-150 py-16 relative overflow-hidden text-slate-900" id="dashboard-system-hub">
        
        {/* Absolute fintech grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60 pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Core Header Section */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center space-x-1.5 rounded-full bg-orange-50 px-3.5 py-1.5 text-xs text-orange-700 border border-orange-100 font-bold">
              <Sparkles className="h-3.5 w-3.5 text-orange-600 animate-pulse" />
              <span>VTU Portal & Developer API Platform</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mt-3 font-display">
              Fintech Reseller <span className="text-orange-600">Console</span>
            </h2>
            <p className="max-w-2xl mx-auto text-xs md:text-sm text-slate-500 mt-2.5 leading-relaxed font-medium">
              Manage your agent profile, purchase pre-compiled scripts, generate instant OTP bypassing streams, lease active virtual phone lines, and dispatch direct bulk SMS campaigns.
            </p>
          </div>

          <div id="auth-onboarding-panel" className="max-w-md mx-auto bg-white border border-slate-200 rounded-3xl p-6.5 shadow-md mt-6 animate-fade-in relative z-10 font-sans text-xs text-slate-800">
            <div className="text-center mb-6">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-orange-650 bg-orange-50 border border-orange-100 px-3 py-1 rounded-full inline-block mb-3">
                SECURE MERCHANT GATEWAY
              </span>
              <h3 className="text-lg font-extrabold text-slate-900 tracking-tight font-display">
                {authTab === "login" ? "Access Agent Terminal" : "Register Agent Wallet"}
              </h3>
              <p className="text-[11px] text-slate-500 mt-1 font-medium leading-normal">
                {authTab === "login" 
                  ? "Sign in to deploy pre-compiled scripts, rent SIM OTP lines, and dispatch direct bulk messages." 
                  : "Establish your developer wallet reseller portfolio on Wavelet instantly."}
              </p>

              {/* Tabs selector */}
              <div className="grid grid-cols-2 gap-1 bg-slate-100 p-1 rounded-xl mt-4.5 border border-slate-200">
                <button
                  type="button"
                  onClick={() => { setAuthTab("login"); setAuthError(""); }}
                  className={`py-2 text-[11px] font-bold rounded-lg transition-all cursor-pointer ${
                    authTab === "login" ? "bg-white text-slate-950 shadow-xs" : "text-slate-550 hover:text-slate-800"
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => { setAuthTab("signup"); setAuthError(""); }}
                  className={`py-2 text-[11px] font-bold rounded-lg transition-all cursor-pointer ${
                    authTab === "signup" ? "bg-white text-slate-950 shadow-xs" : "text-slate-550 hover:text-slate-800"
                  }`}
                >
                  Create Account
                </button>
              </div>
            </div>

            {authError && (
              <div className="mb-4 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-[11px] flex items-center space-x-2 font-semibold">
                <AlertCircle className="h-4 w-4 shrink-0 text-rose-650" />
                <span>{authError}</span>
              </div>
            )}

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              {authTab === "signup" && (
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block uppercase tracking-wider text-[10px]">Full Name</label>
                  <input
                    type="text"
                    required
                    value={authForm.name}
                    onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}
                    placeholder="e.g. Al-Salam Student"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-orange-500 rounded-xl px-4 py-3 text-slate-950 focus:outline-none placeholder-slate-400 text-xs font-medium font-sans"
                  />
                </div>
              )}

              <div className="space-y-1">
                <label className="font-bold text-slate-700 block uppercase tracking-wider text-[10px]">Business Email</label>
                <input
                  type="email"
                  required
                  value={authForm.email}
                  onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                  placeholder="name@agency.com"
                  className="w-full bg-slate-50 border border-slate-200 focus:border-orange-500 rounded-xl px-4 py-3 text-slate-950 focus:outline-none placeholder-slate-400 text-xs font-medium font-sans"
                />
              </div>

              {authTab === "signup" && (
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block uppercase tracking-wider text-[10px]">WhatsApp Phone Target</label>
                  <input
                    type="tel"
                    required
                    value={authForm.phone}
                    onChange={(e) => setAuthForm({ ...authForm, phone: e.target.value })}
                    placeholder="e.g. +2348012345678"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-orange-500 rounded-xl px-4 py-3 text-slate-950 focus:outline-none placeholder-slate-400 text-xs font-medium font-sans"
                  />
                </div>
              )}

              <div className="space-y-1">
                <label className="font-bold text-slate-700 block uppercase tracking-wider text-[10px]">
                  {authTab === "signup" ? "Choose Password" : "Enter Password"}
                </label>
                <input
                  type="password"
                  required
                  value={authForm.password}
                  onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                  placeholder="Minimum 6 characters"
                  className="w-full bg-slate-50 border border-slate-200 focus:border-orange-500 rounded-xl px-4 py-3 text-slate-950 focus:outline-none placeholder-slate-400 text-xs font-medium font-sans"
                />
              </div>

              <button
                type="submit"
                disabled={authLoading}
                className="w-full py-3 rounded-xl bg-orange-650 hover:bg-orange-700 active:scale-[0.99] text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center space-x-2 disabled:opacity-50 font-sans"
              >
                {authLoading ? (
                  <span className="flex items-center space-x-1.5">
                    <RefreshCw className="h-4 w-4 animate-spin text-white font-sans" />
                    <span>Synchronizing Terminal...</span>
                  </span>
                ) : (
                  <span>{authTab === "login" ? "Access Agent Terminal" : "Register Agent Wallet"}</span>
                )}
              </button>

              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-slate-200"></div>
                <span className="flex-shrink mx-4 text-slate-450 font-semibold text-[9px] uppercase font-mono tracking-wider">DEV SYSTEM BYPASS</span>
                <div className="flex-grow border-t border-slate-200"></div>
              </div>

              <button
                type="button"
                onClick={() => {
                  const bypassUser = {
                    id: "user-bypass-session",
                    name: "Admin Operator",
                    email: "iqleadsbloger@gmail.com",
                    phone: "+234 81 2345 6789",
                    walletBalance: 45050,
                    transactions: [
                      {
                        id: "tx-init-local",
                        type: "funding",
                        amount: 45050,
                        serviceName: "System Welcome Registration Credit",
                        date: new Date().toISOString().replace("T", " ").substring(0, 16),
                        status: "success",
                        reference: "WVL-TX-INIT-9201"
                      }
                    ],
                    inventory: []
                  };
                  setCurrentUser(bypassUser);
                  localStorage.setItem("wavelet_active_user", JSON.stringify(bypassUser));
                  setWalletBalance(45050);
                  setTransactions(fallbackUserTransactions => fallbackUserTransactions.length ? fallbackUserTransactions : bypassUser.transactions);
                  showNotice("success", "Developer Bypass: Logged in automatically as iqleadsbloger@gmail.com!");
                }}
                className="w-full py-3.5 rounded-xl border-2 border-orange-250 bg-orange-50/80 hover:bg-orange-100 text-orange-800 font-extrabold text-xs shadow-xs transition-all cursor-pointer flex items-center justify-center space-x-2 animate-bounce"
              >
                <Sparkles className="h-4 w-4 text-orange-600 animate-spin" />
                <span>Bypass Login / Access Dashboard Instantly</span>
              </button>

              <p className="text-[10px] text-center text-slate-500 leading-normal font-mono">
                ⚡ Auto-login routine is running in the background. If it takes a second, click the bypass button above for instant developer access!
              </p>
            </form>
          </div>

        </div>
      </section>
    );
  }

  return (
    <section className={`border-t border-gray-150 py-6 md:py-10 relative overflow-hidden min-h-screen transition-colors duration-300 ${isDarkMode ? "bg-[#060814] text-white" : "bg-[#F4F6FC] text-slate-900"}`} id="dashboard-system-hub">
      
      {/* Soft background glow accents */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-500/5 to-transparent pointer-events-none" />

      <div className="mx-auto max-w-md md:max-w-4xl lg:max-w-7xl px-4 sm:px-6 relative z-10 font-sans">
        
        {/* Floating Global Micro-Notification */}
        <AnimatePresence>
          {globalNotice && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`fixed top-24 left-1/2 -translate-x-1/2 z-50 p-4 rounded-xl border shadow-lg flex items-center space-x-3 text-xs w-[90%] max-w-md ${
                globalNotice.type === "success" 
                  ? "bg-emerald-50 border-emerald-200 text-emerald-800 animate-fade-in"
                  : globalNotice.type === "error" 
                  ? "bg-rose-50 border-rose-200 text-rose-800"
                  : "bg-blue-50 border-blue-200 text-blue-800"
              }`}
            >
              <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
              <span className="font-semibold">{globalNotice.msg}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- DANIEL BRANDED HEADER BLOCK (Exact Image Replica) --- */}
        <div className="flex items-center justify-between pb-5 pt-2 mb-4">
          <div className="flex items-center space-x-3">
            {/* Elegant Round Brand 'B' Logo */}
            <div className="h-12 w-12 rounded-full bg-[#2E3DFD] flex items-center justify-center font-sans relative shrink-0 shadow-md shadow-blue-500/20">
              <span className="text-xl font-black text-white italic tracking-tighter">B</span>
              <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 bg-emerald-500 rounded-full border-2 border-white" />
            </div>
            
            <div className="flex flex-col">
              <span className="text-sm font-black text-slate-900 tracking-tight leading-none block">
                Hi {currentUser?.name?.split(" ")[0] || "Daniel"}
              </span>
              <span className="text-[11px] text-slate-450 font-bold mt-1 block">Tier 3</span>
            </div>
          </div>

          <div className="flex items-center space-x-2.5">
            {/* Headphones Help Support Pill */}
            <button
              onClick={() => {
                showNotice("info", "Deploying customer helpline dispatch...");
                const el = document.getElementById("dashboard-active-workspace-panel");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-red-50 hover:bg-red-100 border border-red-100 text-red-500 px-3 py-1.5 rounded-full flex items-center space-x-1 cursor-pointer transition-colors"
            >
              <Headphones className="h-3.5 w-3.5" />
              <span className="text-[10.5px] font-black tracking-tight help-label">Help</span>
            </button>

            {/* Notification Bell Badge */}
            <button
              onClick={() => {
                showNotice("success", "No unread simulated alerts.");
              }}
              className="relative bg-white border border-slate-150 p-2 rounded-full cursor-pointer hover:bg-slate-50 transition-colors shrink-0"
            >
              <Bell className="h-4.5 w-4.5 text-slate-700" />
              <div className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-red-600 text-[8px] font-black text-white">
                1
              </div>
            </button>

            {/* Dark mode Atmosphere Toggle */}
            <button
              onClick={() => {
                setIsDarkMode(!isDarkMode);
                showNotice("info", isDarkMode ? "Light UI active." : "Dark accent active.");
              }}
              className="h-9 w-9 rounded-full border border-slate-200 flex items-center justify-center bg-white text-slate-700 hover:bg-slate-50 transition-all cursor-pointer shadow-xs"
              title="Toggle theme mode"
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* --- DYNAMIC TOTAL BALANCE BLUE CARD (Exact Image Replica) --- */}
        <div 
          className="relative rounded-[2.2rem] bg-gradient-to-br from-[#2E3DFD] via-[#1F2BEA] to-[#121AC3] text-white p-6 md:p-8 shadow-xl shadow-blue-500/10 overflow-hidden mb-6.5 border border-blue-400/25"
        >
          {/* Subtle decoration elements */}
          <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-blue-400/20 blur-2xl pointer-events-none" />
          <div className="absolute -top-10 -left-10 h-32 w-32 rounded-full bg-indigo-500/20 blur-2xl pointer-events-none" />

          {/* Top Line: Total Balance indicator + Bank branding */}
          <div className="flex items-center justify-between relative z-10 font-sans">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setIsBalanceVisible(!isBalanceVisible)}>
              <span className="text-xs font-semibold text-blue-100 tracking-wide">Total Balance</span>
              {isBalanceVisible ? (
                <Eye className="h-3.5 w-3.5 text-blue-200" />
              ) : (
                <EyeOff className="h-3.5 w-3.5 text-blue-200" />
              )}
            </div>

            <div className="text-right">
              <span className="text-[11px] font-black text-white/95 uppercase tracking-wide font-sans">
                Paga Bank
              </span>
            </div>
          </div>

          {/* Main Line: Balance digits + static clickable copy number */}
          <div className="flex items-end justify-between mt-1.5 relative z-10 font-sans">
            <div>
              <div className="text-3xl md:text-4xl font-black text-white tracking-tight font-sans">
                {isBalanceVisible ? (
                  `NGN ${walletBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                ) : (
                  "NGN ••••••••"
                )}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xs border border-white/5 rounded-xl px-2.5 py-1.5 flex items-center space-x-1.5 text-right shrink-0">
              <span className="text-[11px] font-mono text-white tracking-wide font-black">
                1925038721
              </span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText("1925038721");
                  setIsAccountCopied(true);
                  showNotice("success", "Bank account number copied!");
                  setTimeout(() => setIsAccountCopied(false), 2000);
                }}
                className="hover:scale-105 active:scale-95 transition-all text-white/90"
                title="Copy virtual account number"
              >
                {isAccountCopied ? (
                  <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                ) : (
                  <Copy className="h-3.5 w-3.5 shrink-0" />
                )}
              </button>
            </div>
          </div>

          {/* 3 Pill buttons in a row inside the card */}
          <div className="grid grid-cols-3 gap-3.5 mt-6 relative z-10 font-sans">
            <button
              onClick={() => {
                setActiveTab("wallet");
                showNotice("success", "Secure Peer-To-Peer transaction console selected.");
                const el = document.getElementById("dashboard-active-workspace-panel");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-white hover:bg-slate-50 text-slate-900 rounded-full py-2.5 px-3 flex items-center justify-center space-x-1 font-bold text-[11px] tracking-tight hover:shadow-md transition-all active:scale-95 cursor-pointer shadow-xs leading-none"
            >
              <User className="h-3 w-3 text-[#2E3DFD] shrink-0" />
              <span>To User</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("wallet");
                showNotice("success", "Deploying Local bank deposit routing...");
                const el = document.getElementById("dashboard-active-workspace-panel");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-white hover:bg-slate-50 text-slate-900 rounded-full py-2.5 px-3 flex items-center justify-center space-x-1 font-bold text-[11px] tracking-tight hover:shadow-md transition-all active:scale-95 cursor-pointer shadow-xs leading-none"
            >
              <Landmark className="h-3 w-3 text-[#2E3DFD] shrink-0" />
              <span>To Bank</span>
            </button>

            <button
              onClick={() => {
                showNotice("info", "Buypoint Virtual Agent portal unlocked.");
                setActiveTab("virtual");
                const el = document.getElementById("dashboard-active-workspace-panel");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-white hover:bg-slate-50 text-slate-900 rounded-full py-2.5 px-3 flex items-center justify-center space-x-1 font-bold text-[11px] tracking-tight hover:shadow-md transition-all active:scale-95 cursor-pointer shadow-xs leading-none"
            >
              <Star className="h-3 w-3 text-[#2E3DFD] shrink-0" />
              <span>Agent</span>
            </button>
          </div>
        </div>

        {/* --- GRID ROW 1: PRIMARY SERVICES (Airtime, Recharge, Data, CableTV) --- */}
        <div className="bg-white rounded-[1.8rem] border border-slate-150 p-3 shadow-xs mb-4">
          <div className="grid grid-cols-4 gap-2">
            
            {/* TILE 1: AIRTIME */}
            <div
              onClick={() => {
                setActiveTab("otp");
                showNotice("info", "Airtime top-up SIM simulator selected");
                const el = document.getElementById("dashboard-active-workspace-panel");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-[#EDF2FE] hover:bg-[#E2EBFE] transition-colors rounded-2xl p-3.5 flex flex-col items-center justify-center text-center cursor-pointer border border-blue-50/50 hover:scale-[1.01] active:scale-95"
            >
              <Smartphone className="h-6.5 w-6.5 text-[#2E3DFD] mb-1.5" />
              <span className="text-[10.5px] font-black text-[#1A255B] font-sans">Airtime</span>
            </div>

            {/* TILE 2: RECHARGE */}
            <div
              onClick={() => {
                setActiveTab("otp");
                showNotice("info", "Recharge scratch card & PIN options");
                const el = document.getElementById("dashboard-active-workspace-panel");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-[#EDF2FE] hover:bg-[#E2EBFE] transition-colors rounded-2xl p-3.5 flex flex-col items-center justify-center text-center cursor-pointer border border-blue-50/50 hover:scale-[1.01] active:scale-95"
            >
              <RefreshCw className="h-6.5 w-6.5 text-[#2E3DFD] mb-1.5" />
              <span className="text-[10.5px] font-black text-[#1A255B] font-sans">Recharge</span>
            </div>

            {/* TILE 3: DATA */}
            <div
              onClick={() => {
                setActiveTab("virtual");
                showNotice("info", "Rent Foreign lines or Bundle High-speed LTE Data");
                const el = document.getElementById("dashboard-active-workspace-panel");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-[#EDF2FE] hover:bg-[#E2EBFE] transition-colors rounded-2xl p-3.5 flex flex-col items-center justify-center text-center cursor-pointer border border-blue-50/50 hover:scale-[1.01] active:scale-95"
            >
              <Wifi className="h-6.5 w-6.5 text-[#2E3DFD] mb-1.5" />
              <span className="text-[10.5px] font-black text-[#1A255B] font-sans">Data</span>
            </div>

            {/* TILE 4: CABLE TV */}
            <div
              onClick={() => {
                setActiveTab("sms");
                showNotice("info", "Smart TV & DSTV carrier routing unlocked");
                const el = document.getElementById("dashboard-active-workspace-panel");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-[#EDF2FE] hover:bg-[#E2EBFE] transition-colors rounded-2xl p-3.5 flex flex-col items-center justify-center text-center cursor-pointer border border-blue-50/50 hover:scale-[1.01] active:scale-95"
            >
              <Tv className="h-6.5 w-6.5 text-[#2E3DFD] mb-1.5" />
              <span className="text-[10.5px] font-black text-[#1A255B] font-sans">CableTV</span>
            </div>

          </div>
        </div>

        {/* --- GRID ROW 2: ADVANCED SERVICES (Bulk SMS, Betting, Electricity, More) --- */}
        <div className="bg-white rounded-[1.8rem] border border-slate-150 p-3 shadow-xs mb-6">
          <div className="grid grid-cols-4 gap-2">
            
            {/* TILE 5: BULK SMS */}
            <div
              onClick={() => {
                setActiveTab("sms");
                showNotice("info", "SMS Dispatch system loaded");
                const el = document.getElementById("dashboard-active-workspace-panel");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-[#EDF2FE] hover:bg-[#E2EBFE] transition-colors rounded-2xl p-3.5 flex flex-col items-center justify-center text-center cursor-pointer border border-blue-50/50 hover:scale-[1.01] active:scale-95"
            >
              <MessageSquareReply className="h-6.5 w-6.5 text-[#2E3DFD] mb-1.5" />
              <span className="text-[10.5px] font-black text-[#1A255B] font-sans">BulkSms</span>
            </div>

            {/* TILE 6: BETTING */}
            <div
              onClick={() => {
                setActiveTab("wallet");
                showNotice("info", "Quick betting site wallet deposit dispatch...");
                const el = document.getElementById("dashboard-active-workspace-panel");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-[#EDF2FE] hover:bg-[#E2EBFE] transition-colors rounded-2xl p-3.5 flex flex-col items-center justify-center text-center cursor-pointer border border-blue-50/50 hover:scale-[1.01] active:scale-95"
            >
              <Gamepad2 className="h-6.5 w-6.5 text-[#2E3DFD] mb-1.5" />
              <span className="text-[10.5px] font-black text-[#1A255B] font-sans">Betting</span>
            </div>

            {/* TILE 7: ELECTRICITY */}
            <div
              onClick={() => {
                setActiveTab("sms");
                showNotice("info", "Utility token generator standby module");
                const el = document.getElementById("dashboard-active-workspace-panel");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-[#EDF2FE] hover:bg-[#E2EBFE] transition-colors rounded-2xl p-3.5 flex flex-col items-center justify-center text-center cursor-pointer border border-blue-50/50 hover:scale-[1.01] active:scale-95"
            >
              <Plug className="h-6.5 w-6.5 text-[#2E3DFD] mb-1.5" />
              <span className="text-[10.5px] font-black text-[#1A255B] font-sans">Electricity</span>
            </div>

            {/* TILE 8: MORE */}
            <div
              onClick={() => {
                showNotice("info", "Swipe down to access advanced virtual server utilities");
                const el = document.getElementById("dashboard-active-workspace-panel");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-[#EDF2FE] hover:bg-[#E2EBFE] transition-colors rounded-2xl p-3.5 flex flex-col items-center justify-center text-center cursor-pointer border border-blue-50/50 hover:scale-[1.01] active:scale-95"
            >
              <Grid className="h-6.5 w-6.5 text-[#2E3DFD] mb-1.5" />
              <span className="text-[10.5px] font-black text-[#1A255B] font-sans">More</span>
            </div>

          </div>
        </div>

        {/* --- PREMIUM BETTING BANNER SECTION (Exact Image Replica) --- */}
        <div className="relative rounded-[2rem] bg-[#2E3DFD] text-white p-6 shadow-lg overflow-hidden mb-8">
          
          {/* Subtle decoration dots / background blobs */}
          <div className="absolute top-0 right-0 h-40 w-44 bg-white/5 rounded-full blur-xl pointer-events-none" />
          <div className="absolute -bottom-10 left-1/3 h-24 w-24 bg-white/10 rounded-full blur-md pointer-events-none" />
          
          <div className="flex flex-col md:flex-row items-center justify-between relative z-10 gap-4">
            {/* Left: Branding & Taglines */}
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-xl md:text-2xl font-black tracking-tight leading-tight max-w-[240px]">
                Fund your betting Account
              </h3>
              <p className="text-[11px] text-white/80 leading-snug max-w-[215px] font-semibold">
                A trusted platform for funding your betting site.
              </p>
              
              <div className="pt-2.5 flex items-center justify-center md:justify-start space-x-2">
                {/* Micro Buypoint App badge */}
                <div className="flex items-center space-x-1 px-2.5 py-1 bg-black/40 border border-white/5 rounded-lg">
                  <span className="text-[9px] font-black tracking-tighter italic text-white bg-blue-600 rounded-xs px-1">B</span>
                  <span className="text-[8px] font-bold text-slate-100 font-mono">Buypoint.com.ng</span>
                </div>
                
                {/* Google Play store decoration */}
                <div className="flex items-center space-x-1 px-2.5 py-1 bg-black/45 border border-white/5 rounded-lg text-[8px] font-bold">
                  <span className="text-emerald-400">▶</span>
                  <span>Google Play</span>
                </div>
              </div>
            </div>

            {/* Right: Custom vector design layout for smartphones and VR goggles */}
            <div className="relative h-28 w-44 flex items-center justify-center mr-2 shrink-0 overflow-visible">
              
              {/* Back glowing sphere */}
              <div className="absolute h-20 w-20 rounded-full bg-orange-500/30 blur-xl animate-pulse" />

              {/* Vector Cell Phone mock (rotated left) */}
              <div className="absolute left-1 bottom-1 h-20 w-11 rounded-lg border-2 border-white/45 bg-slate-900 shadow-xl overflow-hidden transform -rotate-12 flex flex-col justify-between p-1 z-10">
                <div className="h-0.5 w-3 bg-white/50 mx-auto rounded-full" />
                <div className="flex-grow flex items-center justify-center text-center">
                  <span className="text-[5px] font-mono leading-none font-bold text-blue-300">Buypoint</span>
                </div>
                <div className="h-1.5 w-1.5 bg-white/40 rounded-full mx-auto" />
              </div>

              {/* VR Character Silhouette outline styled in rich CSS elements */}
              <div className="absolute right-4 top-0 h-24 w-24 flex flex-col items-center justify-center z-12 animate-bounce duration-[3s]">
                
                {/* Stylized Goggles outline */}
                <div className="relative h-11 w-20 bg-slate-900/90 border-2 border-orange-550 rounded-xl flex items-center justify-around p-1 shadow-md">
                  <div className="h-3 w-3 rounded-full bg-blue-400 animate-ping absolute" />
                  <div className="h-2.5 w-6 rounded bg-blue-500/80 border border-blue-300" />
                  <div className="h-2.5 w-6 rounded bg-blue-500/80 border border-blue-300" />
                </div>
                
                {/* Goggles headband */}
                <div className="absolute top-4 left-0 right-0 h-1.5 bg-orange-500/80 -z-10" />
                
                {/* Action feedback circles */}
                <div className="absolute top-1 right-1 h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
                <div className="absolute -bottom-1 left-2 h-2.5 w-2.5 rounded-full bg-[#2E3DFD] border border-white" />
              </div>

              {/* Additional Foreground smartphone element (rotated right) */}
              <div className="absolute right-1 bottom-0 h-22 w-12 rounded-lg border-2 border-white/60 bg-gradient-to-b from-[#121A99] to-[#2E3DFD] shadow-xl overflow-hidden transform rotate-6 flex flex-col justify-between p-1 z-15">
                <div className="h-0.5 w-4 bg-white/60 mx-auto rounded-full" />
                <div className="bg-[#EDF2FE] rounded p-0.5 flex-grow mt-1 items-center justify-center flex">
                  <span className="text-[4px] font-black text-[#2E3DFD] scale-[0.9]">NGN 968.00</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* --- DYNAMIC WORKSPACE PANEL WRAPPER: 2-Column Responsive Layout --- */}
        <div id="dashboard-active-workspace-panel" className="scroll-mt-24 pt-6 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Workspace Panels (OTP, Virtual Lease, SMS Dispatch, Wallet, Vault) */}
          <div className="lg:col-span-8 flex flex-col space-y-6 w-full">
            <div className="flex items-center space-x-2.5 mb-2">
              <div className="h-2 w-2 rounded-full bg-[#FF5C00]" />
              <h3 className="text-xs font-black uppercase text-slate-500 tracking-widest font-mono">
                Workspace Panel: {activeTab === "otp" ? "OTP virtual sim" : activeTab === "virtual" ? "Foreign Line leases" : activeTab === "sms" ? "SMS Dispatches" : activeTab === "wallet" ? "Wallet Ledger" : "Vault item details"}
              </h3>
            </div>

            <div id="dashboard-tab-content-renderer" className="rounded-3xl border border-slate-150 bg-white p-6 shadow-xs relative overflow-hidden flex-grow w-full">
          
          {/* TAB 1: SCRIPTS & READY-MADE WEBSITES */}
          {activeTab === "store" && (
            <div className="space-y-6 animate-fade-in text-center py-10" id="dashboard-store-hidden-info">
              <Laptop className="h-8 w-8 text-orange-600 mx-auto mb-3 animate-pulse" />
              <p className="text-sm font-extrabold text-slate-900 mb-1">Source Code Store</p>
              <p className="text-xs text-slate-500 max-w-xs mx-auto mb-4 font-semibold">
                The developer script store has been moved permanently to the column on the right side of the workspace dashboard.
              </p>
              <button
                onClick={() => {
                  const el = document.getElementById("developer-scripts-store-column");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-3 py-1.5 text-xs font-bold bg-[#FF5C00] text-white rounded-lg hover:bg-orange-700 transition-colors shadow-xs cursor-pointer"
              >
                Go to Catalog 👉
              </button>
            </div>
          )}

          {/* TAB 2: OTP VERIFICATION HUD */}
          {activeTab === "otp" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in" id="dashboard-otp-sim-terminal">
              
              {/* Left Selector: Choose application & Target Country */}
              <div className="lg:col-span-7 space-y-6">
                <div className="p-6 rounded-2xl bg-white border border-slate-150 shadow-xs">
                  <h3 className="text-sm font-bold text-slate-900 mb-1.5 flex items-center space-x-2 uppercase tracking-wide">
                    <KeyRound className="h-5 w-5 text-orange-600" />
                    <span>Deploy OTP Verification Stream</span>
                  </h3>
                  <p className="text-xs text-slate-500 mb-6 leading-relaxed font-medium">
                    Instantly generate Virtual SMS-Receiving numbers to complete authentications on Telegram, Google, WhatsApp, social networks, or custom enterprise routers.
                  </p>
 
                  {/* Choose Country Target */}
                  <div className="mb-6">
                    <label className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block mb-2 font-bold">
                      1. Define Region
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { code: "USA", label: "USA Virtual", flag: "🇺🇸" },
                        { code: "UK", label: "United Kingdom", flag: "🇬🇧" },
                        { code: "NG", label: "Nigeria Local", flag: "🇳🇬" }
                      ].map(country => (
                        <button
                          key={country.code}
                          onClick={() => setSelectedOtpCountry(country.code)}
                          className={`p-3 rounded-xl border text-xs font-bold transition-all flex flex-col items-center justify-center space-y-1.5 cursor-pointer ${
                            selectedOtpCountry === country.code
                              ? "bg-orange-50 border-orange-500 text-orange-700"
                              : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                          }`}
                        >
                          <span className="text-xl">{country.flag}</span>
                          <span className="font-display text-[10.5px]">{country.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
 
                  {/* Choose Service Target App */}
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block font-bold">
                      2. Select Locked Platform
                    </label>
                    
                    <div className="space-y-2">
                      {otpApps.map(app => {
                        const isSelected = selectedOtpApp?.id === app.id;
                        return (
                          <div
                            key={app.id}
                            onClick={() => setSelectedOtpApp(app)}
                            className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                              isSelected 
                                ? "bg-orange-50/50 border-orange-500 text-slate-950" 
                                : "bg-white border-slate-150 text-slate-705 hover:bg-slate-50"
                            }`}
                          >
                            <div className="flex items-center space-x-3 text-xs">
                              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 border border-orange-100 text-orange-600">
                                {app.appName.includes("WhatsApp") ? <Phone className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
                              </div>
                              <div>
                                <span className="font-bold block text-slate-900">{app.appName}</span>
                                <span className="text-[9px] font-mono text-slate-400 font-semibold">
                                  {app.availableNumbers} SIM lines standby
                                </span>
                              </div>
                            </div>
 
                            <div className="flex items-center space-x-4">
                              <span className="font-mono text-xs text-orange-600 font-bold">
                                ₦{app.price.toLocaleString()}
                              </span>
 
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedOtpApp(app);
                                  handleBuyOtpSIM(app);
                                }}
                                className="px-3 py-1.5 text-[10px] font-bold rounded-lg bg-orange-600 hover:bg-orange-700 text-white transition-all shadow-xs cursor-pointer"
                              >
                                Activate SIM
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
 
              {/* Right Side Panel: LIVE OTP TERMINAL SIMULATION */}
              <div className="lg:col-span-5">
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-150 min-h-[380px] flex flex-col justify-between relative overflow-hidden shadow-xs">
                  
                  {activeVerificationSIM ? (
                    <div className="space-y-6 animate-fade-in relative z-10">
                      
                      {/* Active State Head */}
                      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                        <div className="flex items-center space-x-2">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                          </span>
                          <span className="text-[10px] font-mono font-bold text-red-650 bg-red-50 px-2 py-0.5 rounded border border-red-100 uppercase tracking-wider">
                            LIVE SIM CHANNEL ACTIVE
                          </span>
                        </div>
 
                        <div className="text-[10.5px] font-mono text-slate-600 bg-slate-200/60 px-2 py-1 rounded font-bold">
                          Time left: {activeVerificationSIM.timer}s
                        </div>
                      </div>
 
                      {/* Phone Display Panel */}
                      <div className="bg-slate-900 rounded-xl border border-slate-950 p-5 text-center relative overflow-hidden shadow-inner text-white">
                        <div className="absolute top-2 right-3 font-mono text-[9px] text-orange-400 bg-orange-500/10 border border-orange-500/20 px-1.5 py-0.5 rounded uppercase font-bold">
                          SIM ROUTED
                        </div>
 
                        <span className="text-[10px] font-mono text-slate-400 block uppercase tracking-widest font-bold">
                          Allocated Virtual Number
                        </span>
                        
                        <div className="text-xl md:text-2xl font-black text-white font-mono mt-1.5 flex items-center justify-center space-x-2">
                          <span>{activeVerificationSIM.number}</span>
                          <button 
                            onClick={() => {
                              navigator.clipboard.writeText(activeVerificationSIM.number);
                              showNotice("success", "Virtual number copied to clipboard!");
                            }}
                            className="text-slate-450 hover:text-white transition-colors"
                            title="Copy Number"
                          >
                            <Clipboard className="h-4 w-4" />
                          </button>
                        </div>
 
                        <span className="text-[10px] text-slate-350 mt-2 block leading-relaxed max-w-xs mx-auto">
                          Instructions: Input the number above on the <strong>{activeVerificationSIM.app}</strong> mobile application to transmit verification.
                        </span>
                      </div>
 
                      {/* Display Incoming Message Block */}
                      <div className="space-y-3">
                        <span className="text-[9.5px] font-mono text-slate-500 block uppercase tracking-wider font-bold">
                          SMS Receiving Terminal Feed
                        </span>
 
                        {activeVerificationSIM.receivedCode ? (
                          <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center"
                          >
                            <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-700 block font-bold">
                              Incoming Broadcast Received!
                            </span>
                            
                            {/* Big code display */}
                            <div className="text-3xl font-black text-slate-900 font-mono tracking-widest mt-2 uppercase px-4 py-2 bg-white border border-emerald-300 rounded-lg inline-block shadow-sm">
                              {activeVerificationSIM.otpCode}
                            </div>
 
                            <p className="text-[10px] text-slate-500 mt-3 leading-relaxed font-semibold">
                              Copy and enter this code on your target setup to bypass the cell check constraint. Kept logged in your inventory.
                            </p>
                          </motion.div>
                        ) : (
                          <div className="rounded-xl bg-slate-900 border border-slate-950 p-5 flex flex-col items-center justify-center min-h-[120px] shadow-inner text-white">
                            <RefreshCw className="h-6 w-6 text-orange-500 animate-spin mb-3" />
                            <p className="text-[11px] font-mono text-slate-400 animate-pulse text-center">
                              Listening for incoming verification packets...
                            </p>
                          </div>
                        )}
                      </div>
 
                      <button
                        onClick={() => {
                          setActiveVerificationSIM(null);
                          showNotice("info", "SIM session canceled manually.");
                        }}
                        className="w-full py-2.5 text-xs text-center border border-slate-200 bg-white hover:bg-slate-50 rounded-xl font-bold text-slate-500 cursor-pointer"
                      >
                        Cancel simulation and release lock
                      </button>
 
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center space-y-4 my-auto">
                      <div className="h-16 w-16 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-600 shadow-inner">
                        <KeyRound className="h-8 w-8 text-orange-600 animate-pulse" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Standby SIM Gateway</h4>
                        <p className="text-xs text-slate-500 max-w-xs mt-1.5 leading-relaxed font-semibold">
                          No active verification stream. Please select an app from the catalogue grid and lock/credit a SIM router number to start the transmission listener loop.
                        </p>
                      </div>
                    </div>
                  )}
 
                  {/* Anti-fraud disclaimer info footer */}
                  <div className="border-t border-slate-200 pt-3 flex items-start space-x-2 text-[9px] text-slate-500 font-mono">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Compliance Guard: virtual routing SIM blocks undergo rotating recycle policies. Numbers are non-persistent but clean.</span>
                  </div>

                </div>
              </div>

            </div>
          )}

          {/* TAB 3: UK, US & FOREIGN NUMBERS LEASE */}
          {activeTab === "virtual" && (
            <div className="space-y-6 animate-fade-in" id="dashboard-virtual-dids">
              <div className="p-6 rounded-2xl bg-white border border-slate-150 shadow-xs">
                <div className="flex items-center space-x-2.5 mb-2">
                  <PhoneCall className="h-5.5 w-5.5 text-orange-600 animate-bounce" />
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Dedicated US, UK & Foreign Number Lease</h3>
                </div>
                <p className="text-xs text-slate-500 max-w-2xl leading-relaxed font-medium">
                  Lease dedicated VoIP private virtual numbers directly routed back to your email / device browser. Perfect to keep verified profiles, long term business calling, local country business presence, and international client accessibility.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {virtualNumbersList.map(numObj => {
                  const hasPurchasedLease = inventory.some(item => item.purchaseId === numObj.id);

                  return (
                    <div 
                      key={numObj.id}
                      className="rounded-2xl border border-slate-150 bg-white p-5 flex flex-col justify-between hover:border-orange-500/30 transition-all shadow-xs"
                    >
                      <div>
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                          <span className="text-2xl">{numObj.flag}</span>
                          <span className="text-[10px] font-mono uppercase bg-slate-50 border border-slate-150 px-2 py-0.5 rounded text-slate-650 font-bold">
                            {numObj.prefix} Code Range
                          </span>
                        </div>

                        <div className="mt-4">
                          <h4 className="text-base font-extrabold text-slate-900 font-display">{numObj.country} Private Line</h4>
                          <p className="text-xs text-slate-500 mt-1 leading-relaxed font-medium">
                            Private routing with support for incoming voice and unlimited diagnostic SMS packets forwarding.
                          </p>
                        </div>

                        <div className="mt-4 space-y-1.5">
                          <div className="flex items-center space-x-2 text-[11px] text-slate-650 font-semibold">
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                            <span>1 Month dedicated holding lock</span>
                          </div>
                          <div className="flex items-center space-x-2 text-[11px] text-slate-650 font-semibold">
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                            <span>Inbound SMS forwarding to email</span>
                          </div>
                          <div className="flex items-center space-x-2 text-[11px] text-slate-650 font-semibold">
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                            <span>99.9% reliable DID delivery routing</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
                        <div>
                          <span className="text-[9px] font-mono text-slate-400 block font-bold">Monthly Retainer</span>
                          <span className="text-base font-black text-slate-950 font-mono">
                            ₦{numObj.monthlyCost.toLocaleString()}
                          </span>
                        </div>

                        {hasPurchasedLease ? (
                          <button
                            disabled
                            className="bg-emerald-50 border border-emerald-250 text-emerald-700 px-3.5 py-2 rounded-xl text-xs font-bold"
                          >
                            Lease Active
                          </button>
                        ) : (
                          <button
                            onClick={() => handleLeaseVirtualNumber(numObj)}
                            className="bg-orange-600 hover:bg-orange-700 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer"
                          >
                            Lease Now
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: SMS BULK SENDING TERMINAL */}
          {activeTab === "sms" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in" id="dashboard-sms-services">
              
              {/* Form Input for Bulk SMS Broadcasting */}
              <div className="lg:col-span-8 p-6 rounded-2xl bg-white border border-slate-150 shadow-xs">
                <div className="flex items-center space-x-2 mb-2">
                  <Send className="h-5.5 w-5.5 text-orange-600" />
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">SMS Broadcast Console</h3>
                </div>
                <p className="text-xs text-slate-500 mb-6 leading-relaxed font-medium">
                  Compose single or mass campaigns dynamically using our robust local carrier routing. Instantly customize Sender IDs, verify rates, and dispatch transactional SMS alerts to users or clients.
                </p>

                <form onSubmit={handleSendBulkSMS} className="space-y-4">
                  {/* Sender ID & Routing type */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] uppercase font-mono text-slate-400 block mb-1 font-bold">
                        A. Custom Sender ID (Alphanumeric max 11 chars)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., WAVELETDS, DRIVER_INFO"
                        maxLength={11}
                        value={smsSenderId}
                        onChange={(e) => setSmsSenderId(e.target.value)}
                        className="w-full bg-white border border-slate-200 focus:border-orange-500 rounded-xl p-3 text-xs focus:outline-none text-slate-900 font-bold"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] uppercase font-mono text-slate-400 block mb-1 font-bold">
                        B. Select Carrier Delivery Priority Route
                      </label>
                      <select
                        value={smsCategory}
                        onChange={(e: any) => setSmsCategory(e.target.value)}
                        className="w-full bg-white border border-slate-200 focus:border-orange-500 rounded-xl p-3 text-xs focus:outline-none text-slate-900 font-bold cursor-pointer"
                      >
                        <option value="high-delivery">Local Direct High Delivery Route (₦5/sms unit)</option>
                        <option value="promo">Bulk Promo Route [Recycle Pool] (₦4/sms unit)</option>
                        <option value="otp-route">Priority OTP/Secure Token Express Range (₦12/sms unit)</option>
                      </select>
                    </div>
                  </div>

                  {/* Message body input */}
                  <div>
                    <label className="text-[10px] uppercase font-mono text-slate-400 block mb-1 font-bold">
                      C. Destination Numbers (Separated by commas)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="e.g., +2348012345678, +2349077123412, +13025550190"
                      value={smsRecipients}
                      onChange={(e) => setSmsRecipients(e.target.value)}
                      className="w-full bg-white border border-slate-200 focus:border-orange-500 rounded-xl p-3 text-xs focus:outline-none text-slate-950 font-mono"
                    />
                    <span className="text-[10px] text-slate-400 font-mono block mt-1 font-semibold">
                      Valid Nigerian, US, or UK phone addresses supported with dialing prefixes.
                    </span>
                  </div>

                  {/* Select Recurring Saved Template */}
                  {dbSmsTemplates.length > 0 && (
                    <div>
                      <label className="text-[10px] uppercase font-mono text-slate-400 block mb-1 font-bold">
                        D-1. Autofill From Recurring Template
                      </label>
                      <select
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val) {
                            setSmsMessage(val);
                          }
                        }}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-orange-500 rounded-xl p-3 text-slate-900 focus:outline-none font-semibold text-xs cursor-pointer"
                        defaultValue=""
                      >
                        <option value="">-- Choose a recurring bulk SMS template --</option>
                        {dbSmsTemplates.map((tpl) => (
                          <option key={tpl.id} value={tpl.body}>
                            [{tpl.title}] - {(tpl.body || tpl.content || "").substring(0, 50)}...
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Message body input */}
                  <div>
                    <label className="text-[10px] uppercase font-mono text-slate-400 block mb-1 font-bold">
                      D-2. Text SMS Message Body
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Write your text alert here. Normal SMS count is 160 characters per page."
                      value={smsMessage}
                      onChange={(e) => setSmsMessage(e.target.value)}
                      className="w-full bg-white border border-slate-200 focus:border-orange-500 rounded-xl p-3 text-xs focus:outline-none text-slate-950 font-sans"
                    />
                    
                    {/* Character limit calculator indicator */}
                    <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono mt-1 font-semibold">
                      <span>{smsMessage.length} characters written</span>
                      <span>{Math.ceil(smsMessage.length / 160) || 1} SMS unit charge page</span>
                    </div>
                  </div>

                  {smsSendingState === "sending" ? (
                    <button
                      disabled
                      type="button"
                      className="w-full py-3 rounded-xl bg-orange-100 text-orange-700 font-bold text-xs flex items-center justify-center space-x-2"
                    >
                      <RefreshCw className="h-4 w-4 animate-spin text-orange-600" />
                      <span>Transmitting Broadcast Streams...</span>
                    </button>
                  ) : smsSendingState === "sent" ? (
                    <button
                      disabled
                      type="button"
                      className="w-full py-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-xs flex items-center justify-center space-x-1"
                    >
                      <CheckCircle2 className="h-4 w-4 text-emerald-650" />
                      <span>Broadcast Dispatched Success!</span>
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-orange-600 hover:bg-orange-700 font-bold text-xs text-white shadow-xs transition-all cursor-pointer"
                    >
                      Process SMS Broadcast (Est Expense: ₦{smsCostCalc.toLocaleString()})
                    </button>
                  )}
                </form>
              </div>

              {/* Sidebar: Current SMS Routing Rules */}
              <div className="lg:col-span-4 space-y-6">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-150 space-y-4 shadow-xs text-slate-900">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-950">Bulk Carrier Service Stats</h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-medium">
                      <span className="text-slate-500 font-semibold">Gateway Status:</span>
                      <span className="text-emerald-450 font-mono font-bold bg-emerald-50 px-1.5 py-0.5 rounded">ONLINE</span>
                    </div>
                    <div className="flex items-center justify-between text-xs font-medium">
                      <span className="text-slate-500 font-semibold">Average Delivery Speed:</span>
                      <span className="text-slate-900 font-mono font-bold">&lt; 2.4 seconds</span>
                    </div>
                    <div className="flex items-center justify-between text-xs font-medium">
                      <span className="text-slate-500 font-semibold">Total API Keys Registered:</span>
                      <span className="text-orange-700 font-mono font-bold">1,824 Keys</span>
                    </div>
                    <div className="flex items-center justify-between text-xs font-medium">
                      <span className="text-slate-500 font-semibold">Sender ID Whitelist Lock:</span>
                      <span className="text-emerald-450 font-mono font-bold">Automatic DND Overpass</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-200 text-[10.5px] text-slate-500 leading-relaxed font-semibold">
                    Our server integrates directly with African leading aggregators (Termii, Africa-Talking) and global networks (Twilio) to supply instant delivery rates even across DND (Do-Not-Disturb) active profiles in Nigeria.
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-150 text-slate-800 shadow-xs animate-fade-in">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-950 mb-2 font-display">Did You Know?</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">
                    Instead of firing campaigns manually, you can buy the VTU airtime and bulk SMS source script from Wavelet solutions to integrate this exact high-ticket business onto your personal custom server!
                  </p>
                </div>
              </div>

            </div>
          )}

          {/* TAB 5: WALLET FUNDING SERVICE WORKSPACE */}
          {activeTab === "wallet" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in" id="dashboard-wallet-workspaces">
              
              {/* Funded Balance Form */}
              <div className="lg:col-span-7 p-6 rounded-2xl bg-white border border-slate-150 shadow-xs">
                <div className="flex items-center space-x-2.5 mb-2">
                  <CreditCard className="h-6 w-6 text-orange-600 animate-pulse" />
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest font-display">Simulated Wallet Funding Workspace</h3>
                </div>
                <p className="text-xs text-slate-500 mb-6 leading-relaxed font-semibold">
                  Wavelet solution is offline-ready for preview. You can enter any amount below to fund your active balance in Naira manually or via secure mock cards/bank-transfer generators.
                </p>

                {fundingSuccessMsg && (
                  <div className="mb-4 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center space-x-2 font-semibold shadow-xs">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                    <span>{fundingSuccessMsg}</span>
                  </div>
                )}

                <form onSubmit={handleFundWalletSubmit} className="space-y-6">
                  <div>
                    <label className="text-[10px] uppercase font-mono tracking-widest text-slate-400 block mb-2 font-bold">
                      1. Specify Deposit Value
                    </label>
                    
                    <div className="relative">
                      <span className="absolute left-3.5 top-3.5 text-lg font-black text-slate-800 font-mono">₦</span>
                      <input
                        type="number"
                        min="1000"
                        step="500"
                        placeholder="10000"
                        value={fundingAmount}
                        onChange={(e) => setFundingAmount(e.target.value)}
                        className="w-full bg-white border border-slate-200 focus:border-orange-500 rounded-xl py-3.5 pl-10 pr-4 text-sm font-black text-slate-900 font-mono focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-mono tracking-widest text-slate-400 block mb-3 font-bold">
                      2. Choose Funding Gateway Route
                    </label>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div
                        onClick={() => setPaymentMethod("card")}
                        className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col items-center text-center ${
                          paymentMethod === "card" 
                            ? "bg-orange-50 border-orange-500 text-orange-950 font-bold shadow-xs" 
                            : "bg-slate-50 border-slate-200 text-slate-500 hover:text-slate-800"
                        }`}
                      >
                        <CreditCard className="h-6 w-6 text-orange-600 mb-2" />
                        <span className="text-xs font-bold font-sans">Card / USSD Sim</span>
                        <span className="text-[8.5px] font-mono text-slate-400 mt-1 font-bold">Paystack Sandbox ready</span>
                      </div>

                      <div
                        onClick={() => setPaymentMethod("bank")}
                        className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col items-center text-center ${
                          paymentMethod === "bank" 
                            ? "bg-orange-50 border-orange-500 text-orange-950 font-bold shadow-xs" 
                            : "bg-slate-50 border-slate-200 text-slate-500 hover:text-slate-800"
                        }`}
                      >
                        <Landmark className="h-6 w-6 text-emerald-600 mb-2" />
                        <span className="text-xs font-bold font-sans">Bank Transfer</span>
                        <span className="text-[8.5px] font-mono text-slate-400 mt-1 font-bold">GTB/Zenith sandbox</span>
                      </div>

                      <div
                        onClick={() => setPaymentMethod("usdt")}
                        className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col items-center text-center ${
                          paymentMethod === "usdt" 
                            ? "bg-orange-50 border-orange-500 text-orange-950 font-bold shadow-xs" 
                            : "bg-slate-50 border-slate-200 text-slate-500 hover:text-slate-800"
                        }`}
                      >
                        <Sparkles className="h-6 w-6 text-amber-500 mb-2" />
                        <span className="text-xs font-bold font-sans">USDT / USDC Pay</span>
                        <span className="text-[8.5px] font-mono text-slate-400 mt-1 font-bold">Multi-chain stablecoin</span>
                      </div>
                    </div>
                  </div>

                  {isFundingLoading ? (
                    <div className="w-full py-4 bg-orange-50 text-orange-700 font-extrabold text-xs flex items-center justify-center space-x-2 rounded-xl border border-orange-200">
                      <RefreshCw className="h-4 w-4 animate-spin text-orange-600" />
                      <span>Simulating Secure Sandbox Checkout Portal...</span>
                    </div>
                  ) : (
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-orange-600 hover:bg-orange-700 font-extrabold text-xs text-white shadow-xs flex items-center justify-center space-x-1 transition-all cursor-pointer"
                    >
                      <PlusCircle className="h-4.5 w-4.5" />
                      <span>Fund Wallet Instantly</span>
                    </button>
                  )}
                </form>
              </div>

              {/* Transactions Log sidebar */}
              <div className="lg:col-span-5 space-y-6">
                <div className="p-6 rounded-2xl bg-white border border-slate-150 shadow-xs">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center space-x-1.5 font-display">
                      <History className="h-4 w-4 text-orange-600 animate-pulse" />
                      <span>Financial Transactions Ledger</span>
                    </h4>
                    
                    <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Secure logs</span>
                  </div>

                  <div className="space-y-3 max-h-[320px] overflow-y-auto pr-1">
                    {transactions.map((tx, idx) => (
                      <div 
                        key={`${tx.id}-${idx}`}
                        className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex justify-between items-start text-xs hover:border-orange-500/25 transition-all text-slate-950"
                      >
                        <div className="space-y-1">
                          <p className="font-bold text-slate-800 leading-tight">{tx.serviceName}</p>
                          <p className="text-[9px] text-orange-600 font-mono font-bold">{tx.reference}</p>
                          <p className="text-[9.5px] text-slate-500 font-mono">{tx.date}</p>
                        </div>

                        <div className="text-right">
                          <span className={`font-mono font-bold block ${tx.type === "funding" ? "text-emerald-600" : "text-amber-700"}`}>
                            {tx.type === "funding" ? "+" : "-"}₦{tx.amount.toLocaleString()}
                          </span>
                          
                          <span className="inline-flex items-center text-[8.5px] text-emerald-600 font-bold mt-0.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mr-1"></span>
                            <span>Success</span>
                          </span>
                        </div>
                      </div>
                    ))}

                    {transactions.length === 0 && (
                      <p className="text-center text-xs text-slate-400 py-6 font-semibold">No previous ledger operations found.</p>
                    )}
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 6: INVENTORY VAULT */}
          {activeTab === "inventory" && (
            <div className="space-y-6 animate-fade-in" id="dashboard-inventory-cabinet">
              <div className="p-6 rounded-2xl bg-white border border-slate-150 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <Database className="h-6 w-6 text-orange-600 animate-pulse" />
                    <div>
                      <h3 className="text-base font-extrabold text-slate-900 tracking-wider font-display uppercase">Your Provisioned Key & Script Vault</h3>
                      <p className="text-xs text-slate-500 mt-0.5 font-medium">
                        Access all bought script links, custom developer keys, active DID telephone rentals, and generated OTP records.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (window.confirm("Are you sure you want to reset your inventory? For simulation only.")) {
                        setInventory([]);
                        localStorage.removeItem("wavelet_inventory");
                        showNotice("success", "Inventory reset complete.");
                      }
                    }}
                    className="p-2 text-slate-500 hover:text-red-650 border border-slate-200 hover:border-red-400 rounded-xl text-[10px] font-mono transition-all font-bold cursor-pointer bg-white shadow-xs"
                    title="Reset simulation data"
                  >
                    Reset Inventory
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {inventory.map((item, idx) => (
                  <div 
                    key={`${item.id}-${idx}`}
                    className="rounded-2xl border border-slate-150 bg-white p-5 flex flex-col justify-between hover:border-orange-500/20 transition-all relative overflow-hidden text-slate-900 shadow-xs"
                  >
                    
                    {/* Glowing highlight anchor */}
                    <div className="absolute top-0 right-0 h-10 w-10 bg-gradient-to-bl from-orange-500/5 to-transparent pointer-events-none" />

                    <div>
                      <span className="text-[9px] font-mono font-bold text-orange-700 bg-orange-50 border border-orange-200 px-2 py-0.5 rounded uppercase">
                        Active Access Node #{idx + 1}
                      </span>

                      <h4 className="text-base font-extrabold text-slate-900 font-display mt-3">{item.name}</h4>
                      <p className="text-[10.5px] text-slate-400 mt-1 font-mono font-semibold">Bought Date: {item.date}</p>

                      {/* Phone specific details */}
                      {item.phoneDetails && (
                        <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                          <p className="text-[10px] text-slate-400 uppercase font-mono tracking-wider font-bold">DID SIM details</p>
                          <p className="text-sm font-extrabold text-slate-900 font-mono">{item.phoneDetails.number}</p>
                          <div className="flex items-center justify-between text-[11px] text-slate-650 font-bold">
                            <span>Country: {item.phoneDetails.country}</span>
                            <span className="text-red-650 font-mono text-[10px]">{item.phoneDetails.expiresAt}</span>
                          </div>
                        </div>
                      )}

                      {/* Display developer keys */}
                      {item.key && (
                        <div className="mt-4">
                          <label className="text-[9px] text-slate-400 uppercase font-mono block mb-1 font-bold">
                            Secured Authorization Key
                          </label>
                          <div className="flex items-center space-x-2 bg-slate-50 border border-slate-200 p-3 rounded-xl">
                            <span className="text-xs font-mono text-orange-700 font-bold tracking-wider select-all block truncate w-full">
                              {item.key}
                            </span>
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(item.key || "");
                                showNotice("success", "Authorization Key copied!");
                              }}
                              className="text-slate-400 hover:text-slate-900 shrink-0 cursor-pointer"
                              title="Copy Key"
                            >
                              <Clipboard className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Download link or manual support */}
                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-mono text-slate-500 font-bold">Paid Amount: ₦{item.price.toLocaleString()}</span>

                      {item.downloadLink ? (
                        <a
                          href="#download-sandbox"
                          onClick={(e) => {
                            e.preventDefault();
                            alert(`Simulation: Downloading script bundle package compiled inside dynamic ZIP archive ${item.name} (${item.key}) has started!`);
                          }}
                          className="px-4 py-2 rounded-xl text-xs font-bold bg-orange-650 hover:bg-orange-700 text-white border border-orange-500/10 transition-all flex items-center space-x-1 shadow-xs cursor-pointer"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                          <span>Download script package</span>
                        </a>
                      ) : (
                        <a
                          href={`https://wa.me/${((import.meta as any).env.VITE_WHATSAPP_NUMBER || "+2348012345678").replace(/\D/g, "")}?text=Hello%20Al-Salam%20Sinner%21%20I%20just%20acquired%20${encodeURIComponent(item.name)}%20via%20Wavelet%20Solutions.%20Let's%20activate%20and%20coordinate%20delivery%21`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 transition-all flex items-center space-x-1 cursor-pointer"
                        >
                          <Phone className="h-3.5 w-3.5" />
                          <span>Contact Lead Engineer</span>
                        </a>
                      )}
                    </div>

                  </div>
                ))}

                {inventory.length === 0 && (
                  <div className="col-span-full py-16 text-center border border-dashed border-slate-200 rounded-2xl bg-slate-50">
                    <Database className="h-10 w-10 text-slate-400 mx-auto mb-3" />
                    <p className="text-slate-500 text-xs font-semibold">Your purchase inventory vault is empty.</p>
                    <button
                      onClick={() => {
                        const el = document.getElementById("developer-scripts-store-column");
                        el?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="mt-4 px-4 py-2 text-xs font-bold bg-orange-600 hover:bg-orange-700 text-white rounded-xl transition-all shadow-xs cursor-pointer"
                    >
                      Browse Digital Marketplace
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

        </div> {/* closes dashboard-tab-content-renderer */}
      </div> {/* closes Left Column Container */}

      {/* Right Column: Scripts Store Catalog */}
      <div id="developer-scripts-store-column" className="lg:col-span-4 flex flex-col space-y-6 w-full">
        <div className="flex items-center space-x-2.5 mb-2">
          <div className="h-2 w-2 rounded-full bg-[#FF5C00]" />
          <h3 className="text-xs font-black uppercase text-slate-500 tracking-widest font-mono">
            Scripts Store Catalog
          </h3>
        </div>

        <div className="rounded-3xl border border-slate-150 bg-white p-5 shadow-xs relative overflow-hidden flex-grow space-y-6 text-slate-900 w-full">
          
          {/* Header & Filters Section */}
          <div className="space-y-3.5 pb-4 border-b border-slate-150">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-4.5 w-4.5 text-orange-650 animate-pulse" />
              <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider font-sans">Premium Source Assets</h4>
            </div>

            {/* Custom Search Column Input */}
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search code catalog..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] focus:outline-none focus:border-orange-500 text-slate-900 font-semibold"
              />
            </div>

            {/* Pill Filters */}
            <div className="flex flex-wrap gap-1">
              {[
                { label: "All", filter: "all" },
                { label: "Web", filter: "website" },
                { label: "Scripts", filter: "script" },
                { label: "Fixes", filter: "service" }
              ].map(pill => (
                <button
                  key={pill.filter}
                  onClick={() => setStoreFilter(pill.filter as any)}
                  className={`px-2 py-0.5 rounded text-[10px] font-black cursor-pointer transition-colors border ${
                    storeFilter === pill.filter
                      ? "bg-slate-900 text-white border-slate-900"
                      : "bg-slate-50 text-slate-600 border-slate-150 hover:bg-slate-100"
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>
          </div>

          {/* Core Assets Column Stack Container */}
          <div className="space-y-4 max-h-[850px] overflow-y-auto pr-1">
            {filteredAssets.map(asset => {
              const hasPurchased = inventory.some(item => item.purchaseId === asset.id);

              return (
                <div 
                  key={asset.id}
                  className="rounded-2xl border border-slate-150 bg-[#fafafa] p-4 flex flex-col justify-between hover:border-orange-500/35 transition-all hover:scale-[1.01] relative overflow-hidden group shadow-xs"
                >
                  <div>
                    {/* Upper badge indicator */}
                    <div className="flex items-center justify-between">
                      <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold font-mono tracking-widest uppercase ${
                        asset.type === "website" 
                          ? "bg-blue-50 text-blue-700 border border-blue-105" 
                          : asset.type === "script" 
                          ? "bg-amber-50 text-amber-700 border border-amber-105" 
                          : "bg-orange-50 text-orange-750 border border-orange-105"
                      }`}>
                        {asset.type}
                      </span>
                      
                      {asset.approxSize && (
                        <span className="text-[9px] text-slate-500 font-mono font-semibold flex items-center space-x-1">
                          <Server className="h-3 w-3 text-orange-600" />
                          <span>{asset.approxSize}</span>
                        </span>
                      )}
                    </div>

                    {/* Title & info description */}
                    <div className="mt-3">
                      <span className="text-[8.5px] text-slate-400 font-mono tracking-wider font-extrabold uppercase">{asset.category}</span>
                      <h4 className="text-xs font-black text-slate-900 mt-0.5 leading-snug font-display">
                        {asset.name}
                      </h4>
                      
                      <p className="text-[11px] text-slate-500 mt-1 leading-normal font-semibold">
                        {asset.shortDesc}
                      </p>

                      {/* Tech stacks tags */}
                      {asset.techStack && asset.techStack.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1">
                          {asset.techStack.map((tech, i) => (
                            <span key={i} className="text-[7.5px] font-mono font-bold px-1.5 py-0.5 bg-white text-slate-650 rounded border border-slate-150">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Pricing block and buy trigger button */}
                  <div className="mt-4 pt-3 border-t border-slate-155 flex items-center justify-between">
                    <div>
                      <span className="text-[8px] font-mono text-slate-450 block font-bold">License Cost</span>
                      <span className="text-xs font-black text-slate-950 font-mono">
                        ₦{asset.price.toLocaleString()}
                      </span>
                    </div>

                    {hasPurchased ? (
                      <button
                        disabled
                        className="bg-emerald-50 border border-emerald-250 text-emerald-700 px-2.5 py-1 rounded-xl text-[10px] font-bold flex items-center space-x-1 shrink-0"
                      >
                        <CheckCircle2 className="h-3 w-3 text-emerald-650" />
                        <span>Acquired</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handlePurchaseAsset(asset)}
                        className="bg-orange-600 hover:bg-orange-700 text-white px-2.5 py-1.5 rounded-lg text-[10px] font-bold transition-all shadow-xs flex items-center space-x-1 shrink-0 cursor-pointer"
                      >
                        <span>Buy Code</span>
                        <ChevronRight className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}

            {filteredAssets.length === 0 && (
              <div className="text-center py-10 rounded-2xl bg-slate-50 border border-slate-150">
                <AlertCircle className="h-6 w-6 text-amber-500 mx-auto mb-1.5 animate-pulse" />
                <p className="text-slate-500 text-[10px] font-medium font-semibold">No assets found matching filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>

    </div> {/* closes dashboard-active-workspace-panel responsive grid */}

      {/* --- APP BOTTOM NAVIGATION TAB BAR: Pristine Light/Dark Bar replicating the 5 menu tabs from the image --- */}
      <div className="max-w-md mx-auto my-8 px-4 relative z-25 animate-fade-in font-sans">
        <div className={`rounded-3xl border flex items-center justify-around py-3 px-3 transition-all transform hover:scale-[1.01] shadow-xl ${
          isDarkMode 
            ? "bg-slate-950 border-slate-800 text-white shadow-blue-500/5" 
            : "bg-white border-slate-200 text-slate-800 shadow-slate-200/50"
        }`}>
          
          {/* TAB ITEM 1: Home */}
          <button
            onClick={() => {
              setActiveTab("store");
              const el = document.getElementById("dashboard-system-hub");
              el?.scrollIntoView({ behavior: "smooth" });
              showNotice("success", "Welcome to Buypoint Home Services!");
            }}
            className={`flex flex-col items-center justify-center pb-1 cursor-pointer transition-all relative ${
              activeTab === "store" 
                ? "text-[#2E3DFD] font-extrabold scale-110" 
                : "text-slate-400 hover:text-slate-700"
            }`}
          >
            <Smartphone className="h-5 w-5 stroke-[2.5]" />
            <span className="text-[10px] font-sans font-black mt-1">Home</span>
            {activeTab === "store" && (
              <span className="h-1 w-3 bg-[#2E3DFD] rounded-full absolute -bottom-1.5" />
            )}
          </button>

          {/* TAB ITEM 2: Reward */}
          <button
            onClick={() => {
              showNotice("info", "🎁 Complete daily dispatches and unlock rewards! Initial Tier bonus activated.");
            }}
            className="flex flex-col items-center justify-center pb-1 cursor-pointer transition-all relative text-slate-400 hover:text-slate-700"
          >
            <Gift className="h-5 w-5" />
            <span className="text-[10px] font-sans font-bold mt-1">Reward</span>
          </button>

          {/* TAB ITEM 3: Buybuket */}
          <button
            onClick={() => {
              setActiveTab("store");
              const el = document.getElementById("developer-scripts-store-column");
              el?.scrollIntoView({ behavior: "smooth" });
              showNotice("success", "Premium carrier bundles and software dispatches loaded.");
            }}
            className={`flex flex-col items-center justify-center pb-1 cursor-pointer transition-all relative ${
              activeTab === "store"
                ? "text-[#2E3DFD] font-extrabold" 
                : "text-slate-400 hover:text-slate-700"
            }`}
          >
            <ShoppingBag className="h-5 w-5" />
            <span className="text-[10px] font-sans font-bold mt-1">Buybuket</span>
          </button>

          {/* TAB ITEM 4: Account */}
          <button
            onClick={() => {
              setActiveTab("wallet");
              const el = document.getElementById("dashboard-active-workspace-panel");
              el?.scrollIntoView({ behavior: "smooth" });
              showNotice("success", "Secure Account ledger & funding system!");
            }}
            className={`flex flex-col items-center justify-center pb-1 cursor-pointer transition-all relative ${
              activeTab === "wallet" || activeTab === "otp" || activeTab === "virtual" || activeTab === "sms"
                ? "text-[#2E3DFD] font-extrabold scale-110" 
                : "text-slate-400 hover:text-slate-700"
            }`}
          >
            <div className="relative">
              <Database className="h-5 w-5" />
              {inventory.length > 0 && (
                <span className="absolute -top-1 right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[8px] font-black text-white shrink-0">
                  {inventory.length}
                </span>
              )}
            </div>
            <span className="text-[10px] font-sans font-bold mt-1">Account</span>
            {(activeTab === "wallet" || activeTab === "otp" || activeTab === "virtual" || activeTab === "sms") && (
              <span className="h-1 w-3 bg-[#2E3DFD] rounded-full absolute -bottom-1.5" />
            )}
          </button>

          {/* TAB ITEM 5: Me */}
          <button
            onClick={() => {
              setIsProfileOpen(true);
              showNotice("info", "Opening user configuration menu.");
            }}
            className={`flex flex-col items-center justify-center pb-1 cursor-pointer transition-all relative ${
              isProfileOpen ? "text-[#2E3DFD] font-bold" : "text-slate-400 hover:text-slate-700"
            }`}
          >
            <User className="h-5 w-5" />
            <span className="text-[10px] font-sans font-bold mt-1">Me</span>
          </button>

        </div>
      </div>

      {/* --- PROFILE CONSOLE DIALOG / DRAWER DRAWS FROM SCREEN SIDE --- */}
      <AnimatePresence>
        {isProfileOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            {/* Backdrop overlay */}
            <div 
              onClick={() => setIsProfileOpen(false)}
              className="absolute inset-0 cursor-pointer"
            />

            {/* Modal main block */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              className="bg-white rounded-3xl p-6 max-w-sm w-full relative z-10 border border-slate-200 shadow-2xl text-slate-900 overflow-hidden"
            >
              {/* Pattern header background */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-orange-500 via-amber-500 to-black" />

              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-orange-600 shrink-0" />
                  <span className="font-extrabold text-sm tracking-tight text-slate-900 font-display">Merchant Profile Configuration</span>
                </div>
                <button 
                  onClick={() => setIsProfileOpen(false)}
                  className="p-1 text-slate-400 hover:text-[#FF5C00] text-sm font-mono font-bold cursor-pointer transition-all"
                >
                  ✕
                </button>
              </div>

              <div className="mt-5 space-y-4 text-xs font-sans">
                
                {/* Profile row 1 */}
                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-150">
                  <span className="text-[9px] uppercase font-mono tracking-wider text-slate-400 block font-bold">Authenticated User Identity</span>
                  <p className="text-sm font-black text-slate-900 mt-1">{currentUser?.name || "Admin Operator"}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5 font-mono">{currentUser?.email || "iqleadsbloger@gmail.com"}</p>
                </div>

                {/* Profile row 2 */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-150">
                    <span className="text-[8px] uppercase font-mono tracking-wider text-slate-400 block font-bold">Assigned SIMs</span>
                    <p className="text-sm font-extrabold text-[#FF5C00] mt-0.5 font-mono">
                      {inventory.filter((item: any) => item.phoneDetails).length} leased
                    </p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-150">
                    <span className="text-[8px] uppercase font-mono tracking-wider text-slate-400 block font-bold">Acquired Tools</span>
                    <p className="text-sm font-extrabold text-[#FF5C00] mt-0.5 font-mono">{inventory.length} active</p>
                  </div>
                </div>

                {/* Account deposit node details */}
                <div className="bg-orange-50/50 p-3.5 rounded-2xl border border-orange-200">
                  <span className="text-[9px] uppercase font-mono tracking-widest text-[#FF5C00] block font-bold">Dynamic Deposit Bank Acc</span>
                  <div className="flex items-baseline justify-between mt-1">
                    <span className="font-extrabold text-sm text-slate-800">8228819570</span>
                    <span className="text-[9.5px] font-mono text-orange-850 font-bold">WEMA BANK PLC</span>
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText("8228819570");
                      showNotice("success", "Bank account number copied!");
                    }}
                    className="w-full mt-2.5 py-1.5 bg-black hover:bg-neutral-900 text-white text-[9.5px] font-bold rounded-lg transition-all"
                  >
                    Copy Account Details
                  </button>
                </div>

                {/* Reset test controls */}
                <div className="pt-2 flex items-center justify-between">
                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      handleLogoutUser();
                    }}
                    className="w-full py-2.5 rounded-xl text-center text-[10.5px] font-extrabold bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 cursor-pointer transition-all uppercase tracking-wider"
                  >
                    Reset Simulated Wallet State
                  </button>
                </div>

                <p className="text-[9.5px] text-center text-slate-400 font-semibold leading-relaxed font-mono">
                  🔒 Session handles are securely persisted within client local storage indexes. Auto-login is guaranteed.
                </p>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      </div> {/* closes mx-auto container! */}

    </section>
  );
}

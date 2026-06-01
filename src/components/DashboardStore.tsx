import React, { useState, useEffect } from "react";
import { 
  Wallet, CreditCard, ChevronRight, Tag, Search, PlusCircle, CheckCircle2, 
  RefreshCw, Server, Send, Sparkles, FileCode2, PhoneCall, History, 
  ShieldCheck, ArrowUpRight, Code2, AlertCircle, Laptop, Landmark, Clipboard,
  KeyRound, HelpCircle, Database, Phone, MessageSquareReply, ExternalLink
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
  // --- STATE PERSISTENCE IN LOCALSTORAGE ---
  const [walletBalance, setWalletBalance] = useState<number>(() => {
    const saved = localStorage.getItem("wavelet_wallet_balance");
    return saved ? parseFloat(saved) : 45000; // Start with a generous initial credit for easy testing
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
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

  // Save to localStorage whenever user state updates
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
  const [activeTab, setActiveTab] = useState<"store" | "otp" | "virtual" | "sms" | "wallet" | "inventory">("store");
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
  const handleFundWalletSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(fundingAmount);
    if (isNaN(amount) || amount <= 0) {
      showNotice("error", "Please write a valid amount to fund.");
      return;
    }

    setIsFundingLoading(true);

    // Simulate Paystack or USDT processing delay
    setTimeout(() => {
      const refCode = "WVL-" + Math.floor(100000 + Math.random() * 900000);
      const paymentLabel = paymentMethod === "card" 
        ? "Card Simulation Paystack" 
        : paymentMethod === "bank" 
        ? "Transfer Simulation" 
        : "USD Stablecoin Transfer";

      setWalletBalance(prev => prev + amount);

      const newTx: Transaction = {
        id: "tx-" + Date.now() + "-" + Math.floor(Math.random() * 1000000),
        type: "funding",
        amount: amount,
        serviceName: `Funded via ${paymentLabel}`,
        date: new Date().toISOString().replace("T", " ").substring(0, 16),
        status: "success",
        reference: refCode
      };

      setTransactions(prev => [newTx, ...prev]);
      setIsFundingLoading(false);
      setFundingSuccessMsg(`Wallet successfully loaded with ₦${amount.toLocaleString()} via simulated secure pipeline!`);
      showNotice("success", `Excellent! Deposited ₦${amount.toLocaleString()} into your active wallet.`);
      setFundingAmount("10000");
    }, 1800);
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

    setTransactions(prev => [newTx, ...prev]);
    setInventory(prev => [newInv, ...prev]);
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

    setTransactions(prev => [newTx, ...prev]);

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

    setTransactions(prev => [newTx, ...prev]);
    setInventory(prev => [newInv, ...prev]);
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
      setWalletBalance(prev => prev - smsCostCalc);
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

      setTransactions(prev => [newTx, ...prev]);
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

  return (
    <section className="bg-zinc-50 border-t border-gray-200 py-24 relative overflow-hidden text-slate-950" id="dashboard-system-hub">
      
      {/* Absolute design aesthetic background gradients */}
      <div className="background-glow hidden md:block w-[400px] h-[400px] bg-orange-100/10 top-20 left-10" />
      <div className="background-glow hidden md:block w-[500px] h-[500px] bg-orange-100/5 bottom-10 right-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Core Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-1.5 rounded-full bg-orange-50 px-3.5 py-1.5 text-xs text-orange-700 border border-orange-200 font-bold">
            <Sparkles className="h-3.5 w-3.5 text-orange-500 animate-pulse" />
            <span>Digital Solution Marketplace & Client Console</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-950 mt-3 font-display">
            SaaS Dashboard & Services <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">Hub</span>
          </h2>
          <p className="max-w-2xl mx-auto text-xs md:text-sm text-slate-550 mt-3 leading-relaxed">
            Fund your digital wallet instantly to purchase scripts, deploy ready-made portals, generate fast OTP SIM routes, lease private foreign lines, and orchestrate direct mass SMS campaigns.
          </p>
        </div>

        {/* Floating Global Micro-Notification */}
        <AnimatePresence>
          {globalNotice && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`fixed top-24 left-1/2 -translate-x-1/2 z-50 p-4 rounded-xl border shadow-xl flex items-center space-x-3 text-xs w-[90%] max-w-md ${
                globalNotice.type === "success" 
                  ? "bg-emerald-950/90 border-emerald-500/30 text-emerald-300"
                  : globalNotice.type === "error" 
                  ? "bg-rose-950/90 border-rose-500/30 text-rose-300"
                  : "bg-indigo-950/90 border-indigo-500/30 text-indigo-300"
              }`}
            >
              <ShieldCheck className="h-5 w-5 shrink-0" />
              <span>{globalNotice.msg}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* TOP STATUS ROW: Real-time Interactive Wallet Widget */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8 rounded-2xl bg-[#0e0e16]/80 border border-purple-950/30 p-6 shadow-2xl backdrop-blur-sm relative overflow-hidden" id="dashboard-status-control-panel">
          
          {/* Main User Balance Area */}
          <div className="lg:col-span-4 flex items-center justify-between lg:border-r lg:border-purple-950/40 lg:pr-6">
            <div className="flex items-center space-x-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-900/30">
                <Wallet className="h-6 w-6" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-gray-400 block">Personal Funded Balance</span>
                <span className="text-2xl md:text-3xl font-black text-amber-300 font-mono mt-0.5 block">
                  ₦{walletBalance.toLocaleString()}
                </span>
              </div>
            </div>
            
            <button
              onClick={() => setActiveTab("wallet")}
              className="lg:hidden p-2 rounded-lg bg-purple-950/60 text-purple-300 border border-purple-800/30 text-xs flex items-center space-x-1"
            >
              <PlusCircle className="h-3.5 w-3.5" />
              <span>Fund</span>
            </button>
          </div>

          {/* Quick Hub Navigation Controls */}
          <div className="lg:col-span-8 flex flex-wrap gap-2 items-center justify-start md:justify-end">
            <button
              onClick={() => { setActiveTab("store"); setFundingSuccessMsg(null); }}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === "store" 
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-950/40" 
                  : "bg-purple-950/20 text-gray-400 hover:text-white border border-purple-950/40"
              }`}
            >
              <Code2 className="h-4 w-4" />
              <span>Scripts & Custom Web</span>
            </button>

            <button
              onClick={() => { setActiveTab("otp"); setFundingSuccessMsg(null); }}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === "otp" 
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-950/40" 
                  : "bg-purple-950/20 text-gray-400 hover:text-white border border-purple-950/40"
              }`}
            >
              <KeyRound className="h-4 w-4" />
              <span>OTP Verifications</span>
            </button>

            <button
              onClick={() => { setActiveTab("virtual"); setFundingSuccessMsg(null); }}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === "virtual" 
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-950/40" 
                  : "bg-purple-950/20 text-gray-400 hover:text-white border border-purple-950/40"
              }`}
            >
              <PhoneCall className="h-4 w-4" />
              <span>Foreign Numbers</span>
            </button>

            <button
              onClick={() => { setActiveTab("sms"); setFundingSuccessMsg(null); }}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === "sms" 
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-950/40" 
                  : "bg-purple-950/20 text-gray-400 hover:text-white border border-purple-950/40"
              }`}
            >
              <Send className="h-4 w-4" />
              <span>SMS Portals</span>
            </button>

            <button
              onClick={() => { setActiveTab("wallet"); setFundingSuccessMsg(null); }}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === "wallet" 
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-950/40" 
                  : "bg-purple-950/20 text-gray-300 hover:text-white border border-purple-800/30"
              }`}
            >
              <PlusCircle className="h-4 w-4" />
              <span>Wallet Funding</span>
            </button>

            <button
              onClick={() => { setActiveTab("inventory"); setFundingSuccessMsg(null); }}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all relative flex items-center space-x-1.5 ${
                activeTab === "inventory" 
                  ? "bg-amber-500 text-black shadow-lg" 
                  : "bg-purple-900/30 text-amber-300 hover:text-white border border-amber-400/20"
              }`}
            >
              <Database className="h-4 w-4" />
              <span>Inventory Vault</span>
              {inventory.length > 0 && (
                <span className="absolute -top-1.5 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-black text-white">
                  {inventory.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* MAIN BODY LAYOUT */}
        <div id="dashboard-tab-content-renderer">
          
          {/* TAB 1: SCRIPTS & READY-MADE WEBSITES */}
          {activeTab === "store" && (
            <div className="space-y-6 animate-fade-in" id="dashboard-store-view text">
              
              {/* Filter controls */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-2 border-b border-purple-950/30">
                <div className="flex items-center space-x-2">
                  <Laptop className="h-4.5 w-4.5 text-purple-400" />
                  <h3 className="text-base font-bold text-white">Scripts, Core Portals & Code Architecture</h3>
                </div>

                <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                  {/* Search bar */}
                  <div className="relative w-full md:w-48 shrink-0">
                    <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-gray-500" />
                    <input
                      type="text"
                      placeholder="Search asset catalog..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-[#0c0c14] border border-purple-950/50 text-xs focus:outline-none focus:border-purple-600 text-white"
                    />
                  </div>

                  <button
                    onClick={() => setStoreFilter("all")}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-bold ${storeFilter === "all" ? "bg-purple-600/20 text-purple-300 border border-purple-500/30" : "text-gray-400 bg-[#09090f]"}`}
                  >
                    All Items
                  </button>
                  <button
                    onClick={() => setStoreFilter("website")}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-bold ${storeFilter === "website" ? "bg-purple-600/20 text-purple-300 border border-purple-500/30" : "text-gray-400 bg-[#09090f]"}`}
                  >
                    Websites Deployed
                  </button>
                  <button
                    onClick={() => setStoreFilter("script")}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-bold ${storeFilter === "script" ? "bg-purple-600/20 text-purple-300 border border-purple-500/30" : "text-gray-400 bg-[#09090f]"}`}
                  >
                    Laravel / React Scripts
                  </button>
                  <button
                    onClick={() => setStoreFilter("service")}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-bold ${storeFilter === "service" ? "bg-purple-600/20 text-purple-300 border border-purple-500/30" : "text-gray-400 bg-[#09090f]"}`}
                  >
                    Expert Fix Services
                  </button>
                </div>
              </div>

              {/* Grid of Store Assets */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAssets.map(asset => {
                  const hasPurchased = inventory.some(item => item.purchaseId === asset.id);

                  return (
                    <div 
                      key={asset.id}
                      className="rounded-2xl border border-purple-950/40 bg-[#0d0d16]/90 p-5 flex flex-col justify-between hover:border-purple-600/30 transition-all hover:scale-[1.01] relative overflow-hidden"
                    >
                      {/* Badge category */}
                      <div className="flex items-center justify-between">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold font-mono tracking-widest uppercase ${
                          asset.type === "website" 
                            ? "bg-indigo-950 text-indigo-300 border border-indigo-800/20"
                            : asset.type === "script"
                            ? "bg-amber-950 text-amber-300 border border-amber-800/20"
                            : "bg-purple-950 text-purple-300 border border-purple-800/20"
                        }`}>
                          {asset.type}
                        </span>
                        
                        {asset.approxSize && (
                          <span className="text-[10px] text-gray-500 font-mono flex items-center space-x-1">
                            <Server className="h-3 w-3 text-purple-500" />
                            <span>{asset.approxSize}</span>
                          </span>
                        )}
                      </div>

                      <div className="mt-4">
                        <p className="text-[10px] text-gray-500 font-mono tracking-wider">{asset.category}</p>
                        <h4 className="text-base font-extrabold text-white mt-1 leading-snug lg:line-clamp-2 min-h-[44px]">
                          {asset.name}
                        </h4>
                        
                        <p className="text-xs text-gray-400 mt-2 line-clamp-3 leading-relaxed min-h-[54px]">
                          {asset.shortDesc}
                        </p>

                        {/* Core Features bullets */}
                        <div className="mt-4 space-y-1.5">
                          {asset.features.slice(0, 3).map((feat, i) => (
                            <div key={i} className="flex items-start space-x-1.5 text-[11px] text-gray-300">
                              <CheckCircle2 className="h-3 w-3 text-purple-400 shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>

                        {/* Tech Stacks */}
                        {asset.techStack && asset.techStack.length > 0 && (
                          <div className="mt-4 flex flex-wrap gap-1">
                            {asset.techStack.map((tech, i) => (
                              <span key={i} className="text-[9px] font-mono px-1.5 py-0.5 bg-[#08080c] text-purple-300 rounded border border-purple-950/40">
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Pricing & Checkout interaction */}
                      <div className="mt-6 pt-4 border-t border-purple-950/50 flex items-center justify-between">
                        <div>
                          <span className="text-[9.5px] font-mono text-gray-500 block">Single License Cost</span>
                          <span className="text-lg font-black text-amber-300 font-mono">
                            ₦{asset.price.toLocaleString()}
                          </span>
                        </div>

                        {hasPurchased ? (
                          <button
                            disabled
                            className="bg-emerald-950 border border-emerald-500/20 text-emerald-300 px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-1"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            <span>Purchased</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => handlePurchaseAsset(asset)}
                            className="bg-purple-600 hover:bg-purple-500 text-white px-4.5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md shadow-purple-950/50 flex items-center space-x-1"
                          >
                            <span>Buy with Wallet</span>
                            <ChevronRight className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}

                {filteredAssets.length === 0 && (
                  <div className="col-span-full text-center py-12 rounded-2xl bg-[#08080c] border border-purple-950/20">
                    <AlertCircle className="h-8 w-8 text-amber-500 mx-auto mb-3" />
                    <p className="text-gray-400 text-xs">No assets match your filter or term search.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: OTP VERIFICATION HUD */}
          {activeTab === "otp" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in" id="dashboard-otp-sim-terminal">
              
              {/* Left Selector: Choose application & Target Country */}
              <div className="lg:col-span-7 space-y-6">
                <div className="p-6 rounded-2xl bg-[#0d0d16]/90 border border-purple-950/30">
                  <h3 className="text-base font-bold text-white mb-1.5 flex items-center space-x-2">
                    <KeyRound className="h-5 w-5 text-purple-400" />
                    <span>Deploy OTP Verification Stream</span>
                  </h3>
                  <p className="text-xs text-gray-400 mb-6 leading-relaxed">
                    Instantly generate Virtual SMS-Receiving numbers to complete authentications on Telegram, Google, WhatsApp, social networks, or custom enterprise routers.
                  </p>

                  {/* Choose Country Target */}
                  <div className="mb-6">
                    <label className="text-[10px] uppercase font-mono tracking-wider text-gray-400 block mb-2">
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
                          className={`p-3 rounded-xl border text-xs font-bold transition-all flex flex-col items-center justify-center space-y-1.5 ${
                            selectedOtpCountry === country.code
                              ? "bg-purple-600/10 border-purple-500 text-white"
                              : "bg-[#090910] border-purple-950/45 text-gray-400 hover:text-white"
                          }`}
                        >
                          <span className="text-xl">{country.flag}</span>
                          <span>{country.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Choose Service Target App */}
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase font-mono tracking-wider text-gray-400 block">
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
                                ? "bg-purple-600/10 border-purple-500 text-white" 
                                : "bg-[#08080c] border-purple-950/40 text-gray-300 hover:border-purple-600/25"
                            }`}
                          >
                            <div className="flex items-center space-x-3 text-xs">
                              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-950/60 border border-purple-800/20 text-purple-300">
                                {app.appName.includes("WhatsApp") ? <Phone className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
                              </div>
                              <div>
                                <span className="font-bold block">{app.appName}</span>
                                <span className="text-[9px] font-mono text-gray-500">
                                  {app.availableNumbers} SIM lines standby
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center space-x-4">
                              <span className="font-mono text-xs text-amber-300 font-bold">
                                ₦{app.price.toLocaleString()}
                              </span>

                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedOtpApp(app);
                                  handleBuyOtpSIM(app);
                                }}
                                className="px-3 py-1.5 text-[10px] font-bold rounded-lg bg-purple-600 hover:bg-purple-500 text-white transition-all shadow"
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
                <div className="p-6 rounded-2xl bg-[#0b0b13] border border-purple-950/30 min-h-[380px] flex flex-col justify-between relative overflow-hidden">
                  
                  {activeVerificationSIM ? (
                    <div className="space-y-6 animate-fade-in relative z-10">
                      
                      {/* Active State Head */}
                      <div className="flex items-center justify-between border-b border-purple-950/60 pb-4">
                        <div className="flex items-center space-x-2">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                          </span>
                          <span className="text-xs font-mono font-bold text-red-400 uppercase tracking-widest">
                            LIVE SIM CHANNEL ACTIVE
                          </span>
                        </div>

                        <div className="text-xs font-mono text-gray-400 bg-purple-950/40 px-2 py-1 rounded">
                          Time left: {activeVerificationSIM.timer}s
                        </div>
                      </div>

                      {/* Phone Display Panel */}
                      <div className="bg-[#07070d] rounded-xl border border-purple-950/60 p-5 text-center relative overflow-hidden">
                        <div className="absolute top-2 right-3 font-mono text-[9px] text-[#a855f7] bg-[#a855f7]/5 border border-[#a855f7]/10 px-1.5 py-0.5 rounded">
                          SIM ROUTED
                        </div>

                        <span className="text-xs font-mono text-gray-500 block uppercase tracking-widest">
                          Allocated Virtual Number
                        </span>
                        
                        <div className="text-xl md:text-2xl font-black text-white font-mono mt-1.5 flex items-center justify-center space-x-2">
                          <span>{activeVerificationSIM.number}</span>
                          <button 
                            onClick={() => {
                              navigator.clipboard.writeText(activeVerificationSIM.number);
                              showNotice("success", "Virtual number copied to clipboard!");
                            }}
                            className="text-gray-500 hover:text-white transition-colors"
                            title="Copy Number"
                          >
                            <Clipboard className="h-4 w-4" />
                          </button>
                        </div>

                        <span className="text-[10px] text-gray-400 mt-2 block leading-relaxed max-w-xs mx-auto">
                          Instructions: Input the number above on the <strong>{activeVerificationSIM.app}</strong> mobile application to transmit verification.
                        </span>
                      </div>

                      {/* Display Incoming Message Block */}
                      <div className="space-y-3">
                        <span className="text-[9.5px] font-mono text-gray-400 block uppercase tracking-wider">
                          SMS Receiving Terminal Feed
                        </span>

                        {activeVerificationSIM.receivedCode ? (
                          <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-emerald-950/30 border border-emerald-500/30 rounded-xl p-4 text-center"
                          >
                            <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 block">
                              Incoming Broadcast Received!
                            </span>
                            
                            {/* Big code display */}
                            <div className="text-3xl font-black text-amber-300 font-mono tracking-widest mt-2 uppercase px-4 py-2 bg-[#07070b] border border-emerald-500/10 rounded-lg inline-block">
                              {activeVerificationSIM.otpCode}
                            </div>

                            <p className="text-[10px] text-gray-400 mt-3 leading-relaxed">
                              Copy and enter this code on your target setup to bypass the cell check constraint. Kept logged in your inventory.
                            </p>
                          </motion.div>
                        ) : (
                          <div className="rounded-xl bg-[#07070c] border border-purple-950/40 p-5 flex flex-col items-center justify-center min-h-[120px]">
                            <RefreshCw className="h-6 w-6 text-purple-500 animate-spin mb-3" />
                            <p className="text-[11px] font-mono text-gray-400 animate-pulse text-center">
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
                        className="w-full py-2.5 text-xs text-center border border-purple-950 hover:bg-white/5 rounded-xl font-bold text-gray-400"
                      >
                        Cancel simulation and release lock
                      </button>

                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center space-y-4 my-auto">
                      <div className="h-16 w-16 rounded-full bg-purple-950/40 border border-purple-800/20 flex items-center justify-center text-purple-300 shadow-inner">
                        <KeyRound className="h-8 w-8 text-purple-400 animate-pulse" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">Standby Gateway</h4>
                        <p className="text-xs text-gray-400 max-w-xs mt-1.5 leading-relaxed">
                          No active verification stream. Please select an app from the catalogue grid and lock/credit a SIM router number to start the transmission listener loop.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Anti-fraud disclaimer info footer */}
                  <div className="border-t border-purple-950/60 pt-3 flex items-start space-x-2 text-[9px] text-gray-500 font-mono">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Compliance Guard: virtual routing SIM blocks undergo rotating recycle policies. Numbers are non-persistent but clean.</span>
                  </div>

                </div>
              </div>

            </div>
          )}

          {/* TAB 3: UK, US & FOREIGN NUMBERS LEASE */}
          {activeTab === "virtual" && (
            <div className="space-y-6 animate-fade-in" id="dashboard-virtual-dids">
              <div className="p-6 rounded-2xl bg-[#0d0d16]/90 border border-purple-950/30">
                <div className="flex items-center space-x-2.5 mb-2">
                  <PhoneCall className="h-5.5 w-5.5 text-purple-400 animate-bounce" />
                  <h3 className="text-lg font-bold text-white">Dedicated US, UK & Foreign Number Lease</h3>
                </div>
                <p className="text-xs text-gray-400 max-w-2xl leading-relaxed">
                  Lease dedicated VoIP private virtual numbers directly routed back to your email / device browser. Perfect to keep verified profiles, long term business calling, local country business presence, and international client accessibility.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {virtualNumbersList.map(numObj => {
                  const hasPurchasedLease = inventory.some(item => item.purchaseId === numObj.id);

                  return (
                    <div 
                      key={numObj.id}
                      className="rounded-xl border border-purple-950 bg-[#0d0d16] p-5 flex flex-col justify-between hover:border-purple-600/30 transition-all"
                    >
                      <div>
                        <div className="flex items-center justify-between border-b border-purple-950/40 pb-3">
                          <span className="text-2xl">{numObj.flag}</span>
                          <span className="text-[10px] font-mono uppercase bg-purple-950 px-2 py-0.5 rounded text-purple-300">
                            {numObj.prefix} Code Range
                          </span>
                        </div>

                        <div className="mt-4">
                          <h4 className="text-base font-bold text-white">{numObj.country} Private Line</h4>
                          <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                            Private routing with support for incoming voice and unlimited diagnostic SMS packets forwarding.
                          </p>
                        </div>

                        <div className="mt-4 space-y-1.5">
                          <div className="flex items-center space-x-2 text-[11px] text-gray-300">
                            <CheckCircle2 className="h-3.5 w-3.5 text-purple-400" />
                            <span>1 Month dedicated holding lock</span>
                          </div>
                          <div className="flex items-center space-x-2 text-[11px] text-gray-300">
                            <CheckCircle2 className="h-3.5 w-3.5 text-purple-400" />
                            <span>Inbound SMS forwarding to email</span>
                          </div>
                          <div className="flex items-center space-x-2 text-[11px] text-gray-300">
                            <CheckCircle2 className="h-3.5 w-3.5 text-purple-400" />
                            <span>99.9% reliable DID delivery routing</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-8 pt-4 border-t border-purple-950/60 flex items-center justify-between">
                        <div>
                          <span className="text-[9px] font-mono text-gray-500 block">Monthly Retainer</span>
                          <span className="text-base font-black text-amber-300 font-mono">
                            ₦{numObj.monthlyCost.toLocaleString()}
                          </span>
                        </div>

                        {hasPurchasedLease ? (
                          <button
                            disabled
                            className="bg-emerald-950 border border-emerald-500/20 text-emerald-300 px-3.5 py-2 rounded-xl text-xs font-bold"
                          >
                            Lease Active
                          </button>
                        ) : (
                          <button
                            onClick={() => handleLeaseVirtualNumber(numObj)}
                            className="bg-purple-600 hover:bg-purple-500 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all"
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
              <div className="lg:col-span-8 p-6 rounded-2xl bg-[#0e0e16]/90 border border-purple-950/30">
                <div className="flex items-center space-x-2 mb-2">
                  <Send className="h-5.5 w-5.5 text-purple-400" />
                  <h3 className="text-lg font-bold text-white">SMS Broadcast Console</h3>
                </div>
                <p className="text-xs text-gray-400 mb-6 leading-relaxed">
                  Compose single or mass campaigns dynamically using our robust local carrier routing. Instantly customize Sender IDs, verify rates, and dispatch transactional SMS alerts to users or clients.
                </p>

                <form onSubmit={handleSendBulkSMS} className="space-y-4">
                  {/* Sender ID & Routing type */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] uppercase font-mono text-gray-400 block mb-1">
                        A. Custom Sender ID (Alphanumeric max 11 chars)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., WAVELETDS, DRIVER_INFO"
                        maxLength={11}
                        value={smsSenderId}
                        onChange={(e) => setSmsSenderId(e.target.value)}
                        className="w-full bg-[#07070d] border border-purple-950 focus:border-purple-600 rounded-xl p-3 text-xs focus:outline-none text-white font-bold"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] uppercase font-mono text-gray-400 block mb-1">
                        B. Select Carrier Delivery Priority Route
                      </label>
                      <select
                        value={smsCategory}
                        onChange={(e: any) => setSmsCategory(e.target.value)}
                        className="w-full bg-[#07070d] border border-purple-950 focus:border-purple-600 rounded-xl p-3 text-xs focus:outline-none text-white font-bold"
                      >
                        <option value="high-delivery">Local Direct High Delivery Route (₦5/sms unit)</option>
                        <option value="promo">Bulk Promo Route [Recycle Pool] (₦4/sms unit)</option>
                        <option value="otp-route">Priority OTP/Secure Token Express Range (₦12/sms unit)</option>
                      </select>
                    </div>
                  </div>

                  {/* Recipients List input area */}
                  <div>
                    <label className="text-[10px] uppercase font-mono text-gray-400 block mb-1">
                      C. Destination Numbers (Separated by commas)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="e.g., +2348012345678, +2349077123412, +13025550190"
                      value={smsRecipients}
                      onChange={(e) => setSmsRecipients(e.target.value)}
                      className="w-full bg-[#07070d] border border-purple-950 focus:border-purple-600 rounded-xl p-3 text-xs focus:outline-none text-white font-mono"
                    />
                    <span className="text-[10px] text-gray-500 font-mono block mt-1">
                      Valid Nigerian, US, or UK phone addresses supported with dialing prefixes.
                    </span>
                  </div>

                  {/* Message body input */}
                  <div>
                    <label className="text-[10px] uppercase font-mono text-gray-400 block mb-1">
                      D. Text SMS Message Body
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Write your text alert here. Normal SMS count is 160 characters per page."
                      value={smsMessage}
                      onChange={(e) => setSmsMessage(e.target.value)}
                      className="w-full bg-[#07070d] border border-purple-950 focus:border-purple-600 rounded-xl p-3 text-xs focus:outline-none text-white font-sans"
                    />
                    
                    {/* Character limit calculator indicator */}
                    <div className="flex justify-between items-center text-[10px] text-gray-500 font-mono mt-1">
                      <span>{smsMessage.length} characters written</span>
                      <span>{Math.ceil(smsMessage.length / 160) || 1} SMS unit charge page</span>
                    </div>
                  </div>

                  {smsSendingState === "sending" ? (
                    <button
                      disabled
                      type="button"
                      className="w-full py-3 rounded-xl bg-purple-950 text-purple-300 font-bold text-xs flex items-center justify-center space-x-2"
                    >
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      <span>Transmitting Broadcast Streams...</span>
                    </button>
                  ) : smsSendingState === "sent" ? (
                    <button
                      disabled
                      type="button"
                      className="w-full py-3 rounded-xl bg-emerald-950 border border-emerald-500/20 text-emerald-300 font-bold text-xs flex items-center justify-center space-x-1"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Broadcast Dispatched Success!</span>
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 font-bold text-xs text-white shadow-lg transition-all"
                    >
                      Process SMS Broadcast (Est Expense: ₦{smsCostCalc.toLocaleString()})
                    </button>
                  )}
                </form>
              </div>

              {/* Sidebar: Current SMS Routing Rules */}
              <div className="lg:col-span-4 space-y-6">
                <div className="p-5 rounded-2xl bg-[#0b0b13] border border-purple-950/40 space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white">Bulk Carrier Service Stats</h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">Gateway Status:</span>
                      <span className="text-emerald-400 font-mono">ONLINE</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">Average Delivery Speed:</span>
                      <span className="text-white font-mono">&lt; 2.4 seconds</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">Total API Keys Registered:</span>
                      <span className="text-amber-400 font-mono">1,824 Keys</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">Sender ID Whitelist Lock:</span>
                      <span className="text-emerald-400 font-mono">Automatic DND Overpass</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-purple-950 text-[10.5px] text-gray-400 leading-relaxed">
                    Our server integrates directly with African leading aggregators (Termii, Africa-Talking) and global networks (Twilio) to supply instant delivery rates even across DND (Do-Not-Disturb) active profiles in Nigeria.
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#09090f] border border-purple-950/50">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-2">Did You Know?</h4>
                  <p className="text-[11px] text-gray-500 leading-relaxed">
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
              <div className="lg:col-span-7 p-6 rounded-2xl bg-[#0d0d16]/90 border border-purple-950/30">
                <div className="flex items-center space-x-2.5 mb-2">
                  <CreditCard className="h-6 w-6 text-purple-400" />
                  <h3 className="text-lg font-bold text-white font-display">Simulated Wallet Funding Workspace</h3>
                </div>
                <p className="text-xs text-gray-400 mb-6 leading-relaxed">
                  Wavelet solution is offline-ready for preview. You can enter any amount below to fund your active balance in Naira manually or via secure mock cards/bank-transfer generators.
                </p>

                {fundingSuccessMsg && (
                  <div className="mb-4 p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs flex items-center space-x-2">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                    <span>{fundingSuccessMsg}</span>
                  </div>
                )}

                <form onSubmit={handleFundWalletSubmit} className="space-y-6">
                  <div>
                    <label className="text-[10px] uppercase font-mono tracking-widest text-gray-400 block mb-2">
                      1. Specify Deposit Value
                    </label>
                    
                    <div className="relative">
                      <span className="absolute left-3.5 top-3 text-lg font-black text-amber-300 font-mono">₦</span>
                      <input
                        type="number"
                        min="1000"
                        step="500"
                        placeholder="10000"
                        value={fundingAmount}
                        onChange={(e) => setFundingAmount(e.target.value)}
                        className="w-full bg-[#07070c] border border-purple-950 focus:border-purple-600 rounded-xl py-3.5 pl-10 pr-4 text-sm font-black text-white font-mono focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-mono tracking-widest text-gray-400 block mb-3">
                      2. Choose Funding Gateway Route
                    </label>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div
                        onClick={() => setPaymentMethod("card")}
                        className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col items-center text-center ${
                          paymentMethod === "card" 
                            ? "bg-purple-600/10 border-purple-500 text-white" 
                            : "bg-[#09090f] border-purple-950/40 text-gray-400 hover:text-gray-200"
                        }`}
                      >
                        <CreditCard className="h-6 w-6 text-purple-400 mb-2" />
                        <span className="text-xs font-bold font-sans">Card / USSD Sim</span>
                        <span className="text-[8.5px] font-mono text-gray-500 mt-1">Paystack Sandbox ready</span>
                      </div>

                      <div
                        onClick={() => setPaymentMethod("bank")}
                        className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col items-center text-center ${
                          paymentMethod === "bank" 
                            ? "bg-purple-600/10 border-purple-500 text-white" 
                            : "bg-[#09090f] border-purple-950/40 text-gray-400 hover:text-gray-200"
                        }`}
                      >
                        <Landmark className="h-6 w-6 text-indigo-400 mb-2" />
                        <span className="text-xs font-bold font-sans">Bank Transfer</span>
                        <span className="text-[8.5px] font-mono text-gray-500 mt-1">GTB/Zenith sandbox</span>
                      </div>

                      <div
                        onClick={() => setPaymentMethod("usdt")}
                        className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col items-center text-center ${
                          paymentMethod === "usdt" 
                            ? "bg-purple-600/10 border-purple-500 text-white" 
                            : "bg-[#09090f] border-purple-950/40 text-gray-400 hover:text-gray-200"
                        }`}
                      >
                        <Sparkles className="h-6 w-6 text-amber-400 mb-2" />
                        <span className="text-xs font-bold font-sans">USDT / USDC Pay</span>
                        <span className="text-[8.5px] font-mono text-gray-500 mt-1">Multi-chain stablecoin</span>
                      </div>
                    </div>
                  </div>

                  {isFundingLoading ? (
                    <div className="w-full py-4 bg-purple-950 text-purple-300 font-bold text-xs flex items-center justify-center space-x-2 rounded-xl border border-purple-800/10">
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      <span>Simulating Secure Sandbox Checkout Portal...</span>
                    </div>
                  ) : (
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 font-extrabold text-xs text-white shadow-xl flex items-center justify-center space-x-1"
                    >
                      <PlusCircle className="h-4.5 w-4.5" />
                      <span>Fund Wallet Instantly</span>
                    </button>
                  )}
                </form>
              </div>

              {/* Transactions Log sidebar */}
              <div className="lg:col-span-5 space-y-6">
                <div className="p-6 rounded-2xl bg-[#0b0b13] border border-purple-950/40">
                  <div className="flex items-center justify-between border-b border-purple-950 pb-3 mb-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center space-x-1.5">
                      <History className="h-4 w-4 text-purple-400" />
                      <span>Financial Transactions Ledger</span>
                    </h4>
                    
                    <span className="text-[9px] font-mono text-gray-500 uppercase">Secure logs</span>
                  </div>

                  <div className="space-y-3 max-h-[290px] overflow-y-auto pr-1">
                    {transactions.map((tx, idx) => (
                      <div 
                        key={`${tx.id}-${idx}`}
                        className="p-3.5 rounded-xl bg-slate-50 border border-gray-150 flex justify-between items-start text-xs hover:border-orange-500/25 transition-all text-slate-950"
                      >
                        <div className="space-y-1">
                          <p className="font-bold text-white leading-tight">{tx.serviceName}</p>
                          <p className="text-[9px] text-[#a855f7] font-mono">{tx.reference}</p>
                          <p className="text-[9.5px] text-gray-500 font-mono">{tx.date}</p>
                        </div>

                        <div className="text-right">
                          <span className={`font-mono font-bold block ${tx.type === "funding" ? "text-emerald-400" : "text-amber-400"}`}>
                            {tx.type === "funding" ? "+" : "-"}₦{tx.amount.toLocaleString()}
                          </span>
                          
                          <span className="inline-flex items-center text-[8.5px] text-emerald-400 font-bold mt-0.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 mr-1"></span>
                            <span>Success</span>
                          </span>
                        </div>
                      </div>
                    ))}

                    {transactions.length === 0 && (
                      <p className="text-center text-xs text-gray-500 py-6">No previous ledger operations found.</p>
                    )}
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 6: INVENTORY VAULT */}
          {activeTab === "inventory" && (
            <div className="space-y-6 animate-fade-in" id="dashboard-inventory-cabinet">
              <div className="p-6 rounded-2xl bg-[#0d0d16]/90 border border-purple-950/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <Database className="h-6 w-6 text-amber-400 animate-pulse" />
                    <div>
                      <h3 className="text-lg font-bold text-white">Your Provisioned Key & Script Vault</h3>
                      <p className="text-xs text-gray-400 mt-0.5">
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
                    className="p-2 text-gray-500 hover:text-red-400 border border-purple-950 hover:border-red-500/25 rounded-xl text-[10px] font-mono transition-all"
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
                    className="rounded-2xl border border-gray-150 bg-white p-5 flex flex-col justify-between hover:border-orange-500/20 transition-all relative overflow-hidden text-slate-900"
                  >
                    
                    {/* Glowing highlight anchor */}
                    <div className="absolute top-0 right-0 h-10 w-10 bg-gradient-to-bl from-purple-500/10 to-transparent pointer-events-none" />

                    <div>
                      <span className="text-[9px] font-mono text-amber-300 bg-amber-500/5 border border-amber-400/20 px-2 py-0.5 rounded uppercase">
                        Active Access Node #{idx + 1}
                      </span>

                      <h4 className="text-base font-bold text-white mt-3">{item.name}</h4>
                      <p className="text-[10.5px] text-gray-500 mt-1 font-mono">Bought Date: {item.date}</p>

                      {/* Phone specific details */}
                      {item.phoneDetails && (
                        <div className="mt-4 p-3 rounded-xl bg-[#07070c] border border-purple-950/50 space-y-1.5">
                          <p className="text-[10px] text-gray-500 uppercase font-mono tracking-wider">DID SIM details</p>
                          <p className="text-sm font-bold text-white font-mono">{item.phoneDetails.number}</p>
                          <div className="flex items-center justify-between text-[11px] text-gray-400">
                            <span>Country: {item.phoneDetails.country}</span>
                            <span className="text-red-400 font-mono text-[10px]">{item.phoneDetails.expiresAt}</span>
                          </div>
                        </div>
                      )}

                      {/* Display developer keys */}
                      {item.key && (
                        <div className="mt-4">
                          <label className="text-[9px] text-gray-500 uppercase font-mono block mb-1">
                            Secured Authorization Key
                          </label>
                          <div className="flex items-center space-x-2 bg-[#07070c] border border-purple-950/80 p-3 rounded-xl">
                            <span className="text-xs font-mono text-purple-300 font-bold tracking-wider select-all block truncate w-full">
                              {item.key}
                            </span>
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(item.key || "");
                                showNotice("success", "Authorization Key copied!");
                              }}
                              className="text-gray-500 hover:text-white shrink-0"
                              title="Copy Key"
                            >
                              <Clipboard className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Download link or manual support */}
                    <div className="mt-6 pt-4 border-t border-purple-950/60 flex items-center justify-between">
                      <span className="text-xs font-mono text-gray-400">Paid Amount: ₦{item.price.toLocaleString()}</span>

                      {item.downloadLink ? (
                        <a
                          href="#download-sandbox"
                          onClick={(e) => {
                            e.preventDefault();
                            alert(`Simulation: Downloading script bundle package compiled inside dynamic ZIP archive ${item.name} (${item.key}) has started!`);
                          }}
                          className="px-4 py-2 rounded-xl text-xs font-bold bg-[#1e1b4b] hover:bg-[#2e1d65] text-purple-200 border border-purple-500/25 transition-all flex items-center space-x-1"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                          <span>Download script package</span>
                        </a>
                      ) : (
                        <a
                          href={`https://wa.me/${((import.meta as any).env.VITE_WHATSAPP_NUMBER || "+2348012345678").replace(/\D/g, "")}?text=Hello%20Al-Salam%20Sinner%21%20I%20just%20acquired%20${encodeURIComponent(item.name)}%20via%20Wavelet%20Solutions.%20Let's%20activate%20and%20coordinate%20delivery%21`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-950 hover:bg-emerald-900 border border-emerald-500/25 text-emerald-300 transition-all flex items-center space-x-1"
                        >
                          <Phone className="h-3.5 w-3.5" />
                          <span>Contact Lead Engineer</span>
                        </a>
                      )}
                    </div>

                  </div>
                ))}

                {inventory.length === 0 && (
                  <div className="col-span-full py-16 text-center border border-dashed border-purple-950/60 rounded-2xl bg-[#09090f]">
                    <Database className="h-10 w-10 text-gray-600 mx-auto mb-3" />
                    <p className="text-gray-400 text-xs">Your purchase inventory vault is empty.</p>
                    <button
                      onClick={() => setActiveTab("store")}
                      className="mt-4 px-4 py-2 text-xs font-bold bg-purple-600 text-white rounded-xl transition-all"
                    >
                      Browse Digital Marketplace
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}

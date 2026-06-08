import React, { useState, useEffect } from "react";
import { 
  Plus, ArrowUpRight, ArrowDownLeft, Wallet, Smartphone, Database, Key, 
  Tv, Plug, Copy, Check, Eye, EyeOff, TrendingUp, History, User, Phone, 
  Share2, ShoppingBag, Laptop, CreditCard, Sparkles, Lock, RefreshCw, 
  Search, Sliders, Info, Server, Layers, BarChart3, AppWindow, Flame, CheckCircle, Gift, ShieldAlert
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// --- TYPES FOR USER SIMULATIONS ---
interface Transaction {
  id: string;
  type: "deposit" | "purchase" | "withdrawal" | "card_funding";
  amount: number;
  label: string;
  date: string;
  status: "success" | "pending" | "failed";
}

interface LeasedNumber {
  id: string;
  country: string;
  phone: string;
  service: string;
  status: "active" | "expired";
  price: number;
  otpLogs: { id: string; sender: string; code: string; text: string; time: string }[];
}

interface SmmOrder {
  id: string;
  platform: string;
  serviceType: string;
  targetLink: string;
  quantity: number;
  cost: number;
  status: "processing" | "completed";
  date: string;
}

interface SocialAccount {
  id: string;
  platform: "tiktok" | "instagram" | "facebook" | "twitter";
  username: string;
  followers: string;
  price: number;
  description: string;
  isPurchased: boolean;
  credentials?: { user: string; pass: string; email: string };
}

interface VirtualCard {
  id: string;
  holder: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
  type: "visa" | "mastercard";
  balance: number; // in USD
}

export default function DashboardStore() {
  // --- STATE PERSISTENCE IN LOCALSTORAGE ---
  const [walletBalance, setWalletBalance] = useState<number>(() => {
    const saved = localStorage.getItem("buypoint_wallet_balance");
    return saved ? parseFloat(saved) : 968.00;
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem("buypoint_transactions");
    return saved ? JSON.parse(saved) : [
      { id: "TX-101", type: "deposit", amount: 5000, label: "Cash Funding • Providus Bank", date: "2026-06-07 18:42", status: "success" },
      { id: "TX-102", type: "purchase", amount: 1500, label: "USA OTP SIM Lease • Google Hub", date: "2026-06-07 19:15", status: "success" },
      { id: "TX-103", type: "purchase", amount: 2500, label: "Airtel 5GB VTU Bundle", date: "2026-06-08 10:20", status: "success" }
    ];
  });

  const [leasedNumbers, setLeasedNumbers] = useState<LeasedNumber[]>(() => {
    const saved = localStorage.getItem("buypoint_leased_numbers");
    return saved ? JSON.parse(saved) : [];
  });

  const [smmOrders, setSmmOrders] = useState<SmmOrder[]>(() => {
    const saved = localStorage.getItem("buypoint_smm_orders");
    return saved ? JSON.parse(saved) : [];
  });

  const [virtualCard, setVirtualCard] = useState<VirtualCard | null>(() => {
    const saved = localStorage.getItem("buypoint_virtual_card");
    return saved ? JSON.parse(saved) : null;
  });

  // Save states immediately when modified
  useEffect(() => {
    localStorage.setItem("buypoint_wallet_balance", walletBalance.toString());
  }, [walletBalance]);

  useEffect(() => {
    localStorage.setItem("buypoint_transactions", JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem("buypoint_leased_numbers", JSON.stringify(leasedNumbers));
  }, [leasedNumbers]);

  useEffect(() => {
    localStorage.setItem("buypoint_smm_orders", JSON.stringify(smmOrders));
  }, [smmOrders]);

  useEffect(() => {
    localStorage.setItem("buypoint_virtual_card", JSON.stringify(virtualCard));
  }, [virtualCard]);

  // --- INTERACTIVE & INTERACTION STATE ---
  const [activeSegment, setActiveSegment] = useState<"services" | "numbers" | "smm" | "vtu" | "card" | "websites">("services");
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const [isCopied, setIsCopied] = useState(false);
  const [notice, setNotice] = useState<{ type: "success" | "error" | "info"; msg: string } | null>(null);

  // Modal forms
  const [showFundModal, setShowFundModal] = useState(false);
  const [fundAmount, setFundAmount] = useState("");
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawBank, setWithdrawBank] = useState("");
  const [withdrawAccount, setWithdrawAccount] = useState("");

  // Buy Number specific state
  const [numCountry, setNumCountry] = useState("USA");
  const [numService, setNumService] = useState("WhatsApp");
  const [isGeneratingNumber, setIsGeneratingNumber] = useState(false);

  // SMM Form state
  const [socialPlatform, setSocialPlatform] = useState("instagram");
  const [smmServiceType, setSmmServiceType] = useState("High Retention Followers");
  const [smmTargetLink, setSmmTargetLink] = useState("");
  const [smmQty, setSmmQty] = useState("500");

  // Aged Account state
  const [socialAccounts, setSocialAccounts] = useState<SocialAccount[]>([
    { id: "ACC-1", platform: "tiktok", username: "@naija_trends_funny", followers: "12.4K", price: 18000, description: "Aged 1 Year, Clean audit history, perfect for creator rewards.", isPurchased: false },
    { id: "ACC-2", platform: "instagram", username: "@abuja_properties_hub", followers: "8.1K", price: 21500, description: "Organic business audience, highly targeted Lagos/Abuja niche.", isPurchased: false },
    { id: "ACC-3", platform: "twitter", username: "@web3_expert_ng", followers: "3.5K", price: 12000, description: "Tech-focused aged account, instant verified eligibility.", isPurchased: false }
  ]);

  // VTU Form State
  const [vtuType, setVtuType] = useState<"airtime" | "data" | "cable" | "electricity">("airtime");
  const [telcoOperator, setTelcoOperator] = useState("MTN");
  const [vtuPhone, setVtuPhone] = useState("");
  const [vtuAmount, setVtuAmount] = useState("");
  const [vtuDataPlan, setVtuDataPlan] = useState("1.5GB / 30 Days (₦1,200)");
  const [utilityMeter, setUtilityMeter] = useState("");

  // Virtual Card registration state
  const [cardHolder, setCardHolder] = useState("Daniel Inegbedion");
  const [cardBrand, setCardBrand] = useState<"visa" | "mastercard">("visa");
  const [isCreatingCard, setIsCreatingCard] = useState(false);
  const [cardTopupAmount, setCardTopupAmount] = useState("");

  // Pre-built websites catalog
  const premiumWebsites = [
    { id: "WEB-A", name: "Modern Fintech Presentation UI", price: 85000, type: "React Web App", speed: "100/100", img: "https://images.unsplash.com/photo-1542744173-8e0853c0374a?auto=format&fit=crop&w=400&q=80" },
    { id: "WEB-B", name: "Naija Courier Logistics Admin", price: 120000, type: "Full Stack Laravel", speed: "96/100", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80" },
    { id: "WEB-C", name: "Organic GMB Dental Booking System", price: 75000, type: "Micro SaaS Template", speed: "98/100", img: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=400&q=80" }
  ];

  // Helper notice dispatch
  const showNotice = (type: "success" | "error" | "info", msg: string) => {
    setNotice({ type, msg });
    setTimeout(() => setNotice(null), 4000);
  };

  // --- TRANS ACTION SYSTEMS ---
  const handleDepositSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(fundAmount);
    if (!amount || amount <= 0) {
      showNotice("error", "Please provide a valid funding amount.");
      return;
    }

    setWalletBalance(prev => prev + amount);
    const newTx: Transaction = {
      id: `TX-${Math.floor(1000 + Math.random() * 9000)}`,
      type: "deposit",
      amount,
      label: `E-Wallet TopUp • Ref ${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toISOString().slice(0, 16).replace("T", " "),
      status: "success"
    };

    setTransactions(prev => [newTx, ...prev]);
    setFundAmount("");
    setShowFundModal(false);
    showNotice("success", `₦${amount.toLocaleString()} loaded into your wallet instantly.`);
  };

  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(withdrawAmount);
    if (!amount || amount <= 0) {
      showNotice("error", "Provide a valid withdrawal amount.");
      return;
    }
    if (amount > walletBalance) {
      showNotice("error", "Insufficient liquid wallet balance.");
      return;
    }

    setWalletBalance(prev => prev - amount);
    const newTx: Transaction = {
      id: `TX-${Math.floor(1000 + Math.random() * 9000)}`,
      type: "withdrawal",
      amount,
      label: `Withdrawal to ${withdrawBank} (${withdrawAccount.slice(-4)})`,
      date: new Date().toISOString().slice(0, 16).replace("T", " "),
      status: "success"
    };

    setTransactions(prev => [newTx, ...prev]);
    setWithdrawAmount("");
    setWithdrawBank("");
    setWithdrawAccount("");
    setShowWithdrawModal(false);
    showNotice("success", `₦${amount.toLocaleString()} settlement order dispatched.`);
  };

  // --- SIM LEASING SYSTEM (BUY NUMBER) ---
  const handleRentNumber = (e: React.FormEvent) => {
    e.preventDefault();
    const price = numCountry === "USA" ? 1800 : numCountry === "UK" ? 2200 : 3500;
    
    if (walletBalance < price) {
      showNotice("error", `Low balance. You need ₦${price.toLocaleString()} to rent a ${numCountry} number.`);
      return;
    }

    setIsGeneratingNumber(true);
    setTimeout(() => {
      setWalletBalance(prev => prev - price);
      
      const newPhone = `+${numCountry === "USA" ? "1 (201)" : numCountry === "UK" ? "44 7911" : "1 (613)"} ${Math.floor(100000 + Math.random() * 900000)}`;
      const newNum: LeasedNumber = {
        id: `SIM-${Math.floor(1000 + Math.random() * 9000)}`,
        country: numCountry,
        phone: newPhone,
        service: numService,
        status: "active",
        price,
        otpLogs: []
      };

      setLeasedNumbers(prev => [newNum, ...prev]);
      
      const newTx: Transaction = {
        id: `TX-${Math.floor(1000 + Math.random() * 9000)}`,
        type: "purchase",
        amount: price,
        label: `SIM Rent: ${numCountry} (${numService})`,
        date: new Date().toISOString().slice(0, 16).replace("T", " "),
        status: "success"
      };

      setTransactions(prev => [newTx, ...prev]);
      setIsGeneratingNumber(false);
      showNotice("success", `${numCountry} line activated successfully: ${newPhone}`);
    }, 1500);
  };

  // --- TRIGGER LOGICAL OTP CODES GENERATION ---
  const triggerOtpRequest = (numId: string) => {
    const freshOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const senders = ["GoogleSecure", "WhatsApp_SMS", "Telegram_Cloud", "Instagram_Auth", "TikTokVerify"];
    const randomSender = senders[Math.floor(Math.random() * senders.length)];
    
    showNotice("info", "Contacting telecom SIM pool gateway, please standby...");

    setTimeout(() => {
      setLeasedNumbers(prev => prev.map(num => {
        if (num.id === numId) {
          const newLog = {
            id: `OTP-${Math.floor(100000 + Math.random() * 900000)}`,
            sender: randomSender,
            code: freshOtp,
            text: `Use verification code ${freshOtp} to authorized secure signup session of your ${num.service} profile setup. Do not share key credentials.`,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          return {
            ...num,
            otpLogs: [newLog, ...num.otpLogs]
          };
        }
        return num;
      }));
      showNotice("success", `New verification text code received! Check logs.`);
    }, 2000);
  };

  // --- SMM ORDERS & ACCOUNTS BOT ---
  const handleSmmSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!smmTargetLink) {
      showNotice("error", "Please input target profile/post URL.");
      return;
    }
    const qty = parseInt(smmQty) || 500;
    // Calculate cost based implicitly on type
    const multiplier = smmServiceType.includes("Premium") ? 4.5 : 2.2;
    const cost = Math.floor(qty * multiplier);

    if (walletBalance < cost) {
      showNotice("error", `Order rejects. Cost is ₦${cost.toLocaleString()} but your balance is low.`);
      return;
    }

    setWalletBalance(prev => prev - cost);
    const orderRef = `SMM-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder: SmmOrder = {
      id: orderRef,
      platform: socialPlatform,
      serviceType: smmServiceType,
      targetLink: smmTargetLink,
      quantity: qty,
      cost,
      status: "processing",
      date: new Date().toISOString().slice(0, 16).replace("T", " ")
    };

    setSmmOrders(prev => [newOrder, ...prev]);

    const newTx: Transaction = {
      id: `TX-${Math.floor(1000 + Math.random() * 9000)}`,
      type: "purchase",
      amount: cost,
      label: `SMM Boost: ${socialPlatform} (${qty} ${smmServiceType})`,
      date: new Date().toISOString().slice(0, 16).replace("T", " "),
      status: "success"
    };

    setTransactions(prev => [newTx, ...prev]);
    setSmmTargetLink("");
    showNotice("success", `SMM panel pipeline launched under ID ${orderRef}. Tracking active.`);
  };

  // Buy AGED Account
  const handleBuyAgedAccount = (accId: string) => {
    const acc = socialAccounts.find(item => item.id === accId);
    if (!acc) return;

    if (walletBalance < acc.price) {
      showNotice("error", `Required cost ₦${acc.price} exceeds available wallet assets.`);
      return;
    }

    setWalletBalance(prev => prev - acc.price);
    
    // Allocate dynamic unique password credentials
    const pass = `pass_${Math.random().toString(36).slice(2, 8)}`;
    const mail = `${acc.username.replace("@", "")}_recovery@buypoint.com.ng`;

    setSocialAccounts(prev => prev.map(item => {
      if (item.id === accId) {
        return {
          ...item,
          isPurchased: true,
          credentials: { user: acc.username, pass, email: mail }
        };
      }
      return item;
    }));

    const newTx: Transaction = {
      id: `TX-${Math.floor(1000 + Math.random() * 9000)}`,
      type: "purchase",
      amount: acc.price,
      label: `Bought Social Account: ${acc.platform} (${acc.username})`,
      date: new Date().toISOString().slice(0, 16).replace("T", " "),
      status: "success"
    };

    setTransactions(prev => [newTx, ...prev]);
    showNotice("success", `Handover package created. Check Secure credentials below.`);
  };

  // --- DOLLAR VIRTUAL CARD FLOWS ---
  const handleCreateVirtualCard = (e: React.FormEvent) => {
    e.preventDefault();
    const cardFee = 3500; // ₦3,500 issue fee
    if (walletBalance < cardFee) {
      showNotice("error", "Card provisioning requires standard ₦3,500 issuing configuration setup.");
      return;
    }

    setIsCreatingCard(true);
    setTimeout(() => {
      setWalletBalance(prev => prev - cardFee);
      
      const newCard: VirtualCard = {
        id: `CARD-${Math.floor(1000 + Math.random() * 9000)}`,
        holder: cardHolder.toUpperCase() || "DANIEL INEGBEDION",
        cardNumber: `${Math.floor(4000 + Math.random() * 999)} ${Math.floor(1000 + Math.random() * 8999)} ${Math.floor(1000 + Math.random() * 8999)} ${Math.floor(1000 + Math.random() * 8999)}`,
        expiry: "11/30",
        cvv: Math.floor(100 + Math.random() * 899).toString(),
        type: cardBrand,
        balance: 10.00 // standard startup dollar balance promo
      };

      setVirtualCard(newCard);

      const newTx: Transaction = {
        id: `TX-${Math.floor(1000 + Math.random() * 9000)}`,
        type: "purchase",
        amount: cardFee,
        label: `Dollar virtual ${cardBrand.toUpperCase()} Issuance Fee`,
        date: new Date().toISOString().slice(0, 16).replace("T", " "),
        status: "success"
      };

      setTransactions(prev => [newTx, ...prev]);
      setIsCreatingCard(false);
      showNotice("success", `Dollar Visa virtual card generated! Standard promo $10.00 credited.`);
    }, 1500);
  };

  const handleFundVirtualCard = (e: React.FormEvent) => {
    e.preventDefault();
    const amountUsd = parseFloat(cardTopupAmount);
    if (!amountUsd || amountUsd <= 0) {
      showNotice("error", "Provide valid dollar amount conversion.");
      return;
    }

    const conversionRate = 1550; // ₦1,550 per USD
    const costNaira = Math.floor(amountUsd * conversionRate);

    if (walletBalance < costNaira) {
      showNotice("error", `Naira conversion cost ₦${costNaira.toLocaleString()} exceeds balance.`);
      return;
    }

    setWalletBalance(prev => prev - costNaira);
    setVirtualCard(prev => {
      if (!prev) return null;
      return { ...prev, balance: prev.balance + amountUsd };
    });

    const newTx: Transaction = {
      id: `TX-${Math.floor(1000 + Math.random() * 9000)}`,
      type: "card_funding",
      amount: costNaira,
      label: `Fund Dollar Card: +$${amountUsd}`,
      date: new Date().toISOString().slice(0, 16).replace("T", " "),
      status: "success"
    };

    setTransactions(prev => [newTx, ...prev]);
    setCardTopupAmount("");
    showNotice("success", `Card successfully credited with $${amountUsd} (+₦${costNaira.toLocaleString()})`);
  };

  // --- VTU DISPATCH ENGINES ---
  const handleVtuSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vtuPhone || vtuPhone.length < 9) {
      showNotice("error", "Input legal subscriber telephone line.");
      return;
    }

    let cost = 0;
    let desc = "";

    if (vtuType === "airtime") {
      cost = parseFloat(vtuAmount);
      if (!cost || cost <= 0) {
        showNotice("error", "State valid Airtime top-up value.");
        return;
      }
      desc = `${telcoOperator} Airtime dispatch: ₦${cost} • ${vtuPhone}`;
    } else if (vtuType === "data") {
      // Decode data pricing
      cost = vtuDataPlan.includes("₦1,200") ? 1200 : vtuDataPlan.includes("₦1,800") ? 1800 : 3500;
      desc = `${telcoOperator} Data: ${vtuDataPlan.split(" (")[0]} • ${vtuPhone}`;
    } else if (vtuType === "cable") {
      cost = 4500;
      desc = `Dstv Cable SmartCard Settle: ${vtuPhone}`;
    } else {
      cost = 5000;
      if (!utilityMeter) {
        showNotice("error", "Please write local prepaid meter ID.");
        return;
      }
      desc = `EKEDC Utility Power Token 50kW • Meter ${utilityMeter}`;
    }

    if (walletBalance < cost) {
      showNotice("error", `Naira VTU value ₦${cost} exceeds available resources.`);
      return;
    }

    setWalletBalance(prev => prev - cost);
    
    const newTx: Transaction = {
      id: `TX-${Math.floor(1000 + Math.random() * 9000)}`,
      type: "purchase",
      amount: cost,
      label: desc,
      date: new Date().toISOString().slice(0, 16).replace("T", " "),
      status: "success"
    };

    setTransactions(prev => [newTx, ...prev]);
    setVtuPhone("");
    setVtuAmount("");
    setUtilityMeter("");
    showNotice("success", `VTU Pipeline processed: ${desc}`);
  };

  // Buy Website order simulation
  const handleBuyWebsiteOrder = (webName: string, price: number) => {
    if (walletBalance < price) {
      showNotice("error", `Prebuilt Website setup requires ₦${price.toLocaleString()}.`);
      return;
    }

    setWalletBalance(prev => prev - price);
    const newTx: Transaction = {
      id: `TX-${Math.floor(1000 + Math.random() * 9000)}`,
      type: "purchase",
      amount: price,
      label: `Purchased Website Package: ${webName}`,
      date: new Date().toISOString().slice(0, 16).replace("T", " "),
      status: "success"
    };

    setTransactions(prev => [newTx, ...prev]);
    showNotice("success", `Template order allocated! Our developers are notified to customize your domain.`);
  };

  return (
    <section className="bg-[#FAFBFD] min-h-screen text-slate-900 pb-24 md:pb-12" id="fintech-dashboard-panel">
      {/* Visual global notifications */}
      <AnimatePresence>
        {notice && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 p-4 rounded-xl border shadow-xl flex items-center space-x-3 text-xs w-[90%] max-w-md ${
              notice.type === "success" 
                ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                : notice.type === "error" 
                ? "bg-rose-50 border-rose-200 text-rose-800"
                : "bg-blue-50 border-blue-200 text-blue-800"
            }`}
          >
            <div className={`h-2.5 w-2.5 rounded-full shrink-0 ${notice.type === "success" ? "bg-emerald-500" : notice.type === "error" ? "bg-rose-500" : "bg-blue-500"}`} />
            <span className="font-bold flex-grow">{notice.msg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Welcome Row */}
      <div className="bg-gradient-to-b from-blue-550 via-[#2E3DFD] to-[#121AC3] text-white pt-8 pb-16 px-4 rounded-b-[2.5rem] shadow-lg shadow-blue-900/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3">
            <div className="h-12 w-12 rounded-2xl bg-white flex items-center justify-center font-black italic shadow-md">
              <span className="text-[#2E3DFD] text-2xl">B</span>
            </div>
            <div>
              <p className="text-white/70 text-xs tracking-wider uppercase font-bold font-mono">Welcome Back to Buypoint</p>
              <h2 className="text-2xl font-black tracking-tight flex items-center gap-1.5 leading-none">
                <span>Hi, Daniel</span>
                <span className="text-[11px] bg-white/20 px-2.5 py-1 rounded-full uppercase font-mono tracking-widest font-bold">Tier 3</span>
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-full uppercase tracking-wider animate-pulse inline-flex items-center space-x-1">
              <span className="h-1.5 w-1.5 bg-white rounded-full" />
              <span>FinHub Terminal Active</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid View */}
      <div className="max-w-6xl mx-auto px-4 -mt-10 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: Main Account, Wallet Control cards (Cols 1-4) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Replica Blue Premium Card */}
          <div className="bg-gradient-to-br from-[#2E3DFD] via-[#1F2BEA] to-[#121AC3] text-white rounded-[2.2rem] p-6 shadow-xl relative overflow-hidden border border-blue-400/25">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-blue-300/10 rounded-full blur-xl pointer-events-none" />

            <div className="flex items-center justify-between font-sans">
              <div 
                className="flex items-center space-x-1.5 cursor-pointer hover:bg-white/10 px-2 py-0.5 rounded-lg transition-colors"
                onClick={() => setIsBalanceVisible(!isBalanceVisible)}
              >
                <span className="text-xs font-semibold text-blue-100 tracking-wide uppercase">TOTAL WALLET BALANCE</span>
                {isBalanceVisible ? <Eye className="h-3.5 w-3.5 text-blue-200" /> : <EyeOff className="h-3.5 w-3.5 text-blue-200" />}
              </div>
              <span className="text-xs uppercase font-sans font-black text-white/95 tracking-wide">Paga Bank</span>
            </div>

            <div className="mt-3">
              <h3 className="text-3xl font-black font-sans tracking-tight">
                {isBalanceVisible ? `₦${walletBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "₦ ••••••••"}
              </h3>
            </div>

            <div className="mt-4 pt-4 border-t border-white/15 flex items-center justify-between text-xs">
              <div>
                <span className="text-[10px] text-blue-200 block uppercase font-bold tracking-wider leading-none">Virtual Account</span>
                <span className="font-mono text-sm font-bold tracking-wider mt-1 block">1925038721</span>
              </div>
              
              <button
                onClick={() => {
                  navigator.clipboard.writeText("1925038721");
                  setIsCopied(true);
                  showNotice("success", "Fintech Payment Account Reference copied!");
                  setTimeout(() => setIsCopied(false), 2000);
                }}
                className="p-2 bg-white/10 hover:bg-white/25 rounded-xl transition-all cursor-pointer text-white/90"
                title="Copy virtual reference account number"
              >
                {isCopied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>

            {/* Micro Quick actions inside card */}
            <div className="grid grid-cols-2 gap-3.5 mt-5 font-sans">
              <button
                onClick={() => setShowFundModal(true)}
                className="bg-white text-[#2E3DFD] font-bold rounded-2xl py-2.5 px-3 flex items-center justify-center space-x-1 hover:bg-blue-50 active:scale-95 transition-all text-[11px] leading-none cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Deposit Money</span>
              </button>

              <button
                onClick={() => setShowWithdrawModal(true)}
                className="bg-blue-650 text-white font-bold rounded-2xl py-2.5 px-3 flex items-center justify-center space-x-1 hover:bg-blue-750 active:scale-95 transition-all text-[11px] leading-none cursor-pointer border border-blue-400/30"
              >
                <ArrowUpRight className="h-3.5 w-3.5 text-blue-200" />
                <span>Withdraw Cash</span>
              </button>
            </div>
          </div>

          {/* Quick Segment Selector Sidebar (Tablet/Desk) */}
          <div className="bg-white rounded-3xl p-4 border border-slate-150 shadow-xs space-y-1.5 font-sans">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest block px-3.5 mb-2">SERVICE DIRECTORIES</span>
            
            <button
              onClick={() => setActiveSegment("services")}
              className={`w-full text-left px-3.5 py-3 rounded-2xl flex items-center justify-between text-xs font-black transition-all cursor-pointer ${
                activeSegment === "services" ? "bg-blue-50 text-[#2E3DFD]" : "text-slate-650 hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <Layers className="h-4.5 w-4.5" />
                <span>Dashboard Overview</span>
              </div>
              <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-mono font-bold">Fast</span>
            </button>

            <button
              onClick={() => setActiveSegment("numbers")}
              className={`w-full text-left px-3.5 py-3 rounded-2xl flex items-center justify-between text-xs font-black transition-all cursor-pointer ${
                activeSegment === "numbers" ? "bg-blue-50 text-[#2E3DFD]" : "text-slate-650 hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <Phone className="h-4.5 w-4.5" />
                <span>Buy SIM Numbers & OTP</span>
              </div>
              {leasedNumbers.length > 0 && (
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold font-mono">{leasedNumbers.length}</span>
              )}
            </button>

            <button
              onClick={() => setActiveSegment("card")}
              className={`w-full text-left px-3.5 py-3 rounded-2xl flex items-center justify-between text-xs font-black transition-all cursor-pointer ${
                activeSegment === "card" ? "bg-blue-50 text-[#2E3DFD]" : "text-slate-650 hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <CreditCard className="h-4.5 w-4.5" />
                <span>Dollar Virtual Card</span>
              </div>
              <span className="text-[10px] bg-indigo-100 text-[#2E3DFD] px-2 py-0.5 rounded font-mono font-bold">USD</span>
            </button>

            <button
              onClick={() => setActiveSegment("vtu")}
              className={`w-full text-left px-3.5 py-3 rounded-2xl flex items-center justify-between text-xs font-black transition-all cursor-pointer ${
                activeSegment === "vtu" ? "bg-blue-50 text-[#2E3DFD]" : "text-slate-650 hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <Smartphone className="h-4.5 w-4.5" />
                <span>VTU Telecom Bundles</span>
              </div>
              <span className="text-[9px] text-[#2E3DFD] uppercase font-black tracking-widest font-mono">ALL NET</span>
            </button>

            <button
              onClick={() => setActiveSegment("smm")}
              className={`w-full text-left px-3.5 py-3 rounded-2xl flex items-center justify-between text-xs font-black transition-all cursor-pointer ${
                activeSegment === "smm" ? "bg-blue-50 text-[#2E3DFD]" : "text-slate-650 hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <Share2 className="h-4.5 w-4.5" />
                <span>Boost SMM Panel & Accounts</span>
              </div>
              <span className="text-[9px] hover:text-[#2E3DFD] text-slate-400 font-bold uppercase tracking-wider font-mono">GROWTH</span>
            </button>

            <button
              onClick={() => setActiveSegment("websites")}
              className={`w-full text-left px-3.5 py-3 rounded-2xl flex items-center justify-between text-xs font-black transition-all cursor-pointer ${
                activeSegment === "websites" ? "bg-blue-50 text-[#2E3DFD]" : "text-slate-650 hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <Laptop className="h-4.5 w-4.5" />
                <span>Premade Website Mall</span>
              </div>
              <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-bold">99% Ready</span>
            </button>
          </div>

          {/* Quick Metrics */}
          <div className="bg-gradient-to-r from-emerald-500/5 to-teal-500/5 rounded-3xl p-5 border border-emerald-500/10 text-slate-800 font-sans space-y-4">
            <h4 className="text-xs font-extrabold text-emerald-800 uppercase tracking-widest">Active System Pipeline</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-[10px] text-slate-450 block uppercase font-bold">API Gateways</span>
                <span className="text-lg font-black text-slate-900 block mt-0.5">MTN, Airtel, Wema</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-450 block uppercase font-bold">SIM Pools</span>
                <span className="text-lg font-black text-slate-900 block mt-0.5">14,240 Online</span>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Interactive Segment Viewports (Cols 5-12) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* DYNAMIC SEGMENT: OVERVIEW / SERVICES HUB */}
          {activeSegment === "services" && (
            <div className="space-y-6 animate-fade-in" id="services-grid-hub">
              
              {/* Quick interactive shortcuts layout */}
              <div className="bg-[#EDF2FE] border border-blue-105 rounded-[1.8rem] p-5">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-xs font-black text-blue-900 tracking-widest uppercase">Fintech Hub Integrations</h4>
                  <span className="text-[10px] font-mono font-bold text-blue-600 uppercase tracking-wider">Nigeria Direct Channels</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div 
                    onClick={() => setActiveSegment("numbers")}
                    className="bg-white p-3.5 rounded-2xl flex flex-col items-center justify-center cursor-pointer border hover:border-blue-400 hover:scale-[1.02] shadow-xs transition-all active:scale-95"
                  >
                    <Smartphone className="h-6.5 w-6.5 text-[#2E3DFD] mb-1" />
                    <span className="text-[11px] font-black tracking-tight text-[#1A255B]">Buy Numbers</span>
                  </div>
                  <div 
                    onClick={() => setActiveSegment("vtu")}
                    className="bg-white p-3.5 rounded-2xl flex flex-col items-center justify-center cursor-pointer border hover:border-blue-400 hover:scale-[1.02] shadow-xs transition-all active:scale-95"
                  >
                    <RefreshCw className="h-6.5 w-6.5 text-[#2E3DFD] mb-1" />
                    <span className="text-[11px] font-black tracking-tight text-[#1A255B]">VTU Services</span>
                  </div>
                  <div 
                    onClick={() => setActiveSegment("card")}
                    className="bg-white p-3.5 rounded-2xl flex flex-col items-center justify-center cursor-pointer border hover:border-blue-400 hover:scale-[1.02] shadow-xs transition-all active:scale-95"
                  >
                    <CreditCard className="h-6.5 w-6.5 text-[#2E3DFD] mb-1" />
                    <span className="text-[11px] font-black tracking-tight text-[#1A255B]">USD Card</span>
                  </div>
                  <div 
                    onClick={() => setActiveSegment("smm")}
                    className="bg-white p-3.5 rounded-2xl flex flex-col items-center justify-center cursor-pointer border hover:border-blue-400 hover:scale-[1.02] shadow-xs transition-all active:scale-95"
                  >
                    <Share2 className="h-6.5 w-6.5 text-[#2E3DFD] mb-1" />
                    <span className="text-[11px] font-black tracking-tight text-[#1A255B]">Boost SMM</span>
                  </div>
                </div>
              </div>

              {/* Promotional Display Banner replicating VR goggles elements */}
              <div className="bg-[#2E3DFD] rounded-[2rem] text-white p-6 shadow-md overflow-hidden relative">
                <div className="absolute top-0 right-0 w-36 h-36 bg-white/5 rounded-full blur-xl pointer-events-none" />
                <div className="flex flex-col md:flex-row items-center justify-between gap-5 relative z-10">
                  <div className="space-y-2 text-center md:text-left">
                    <h3 className="text-xl font-black max-w-[280px] tracking-tight leading-tight">Fund your betting or shopping Account</h3>
                    <p className="text-[11px] font-medium text-white/85 max-w-[250px]">Instant deposit and funding of major local and global entertainment platforms.</p>
                    <div className="pt-2 flex items-center justify-center md:justify-start gap-2 text-[10px] font-bold">
                      <span className="bg-black/30 border border-white/10 p-1.5 rounded-lg flex items-center gap-1.5">
                        <span className="text-[9px] italic text-white bg-blue-600 px-1 rounded">B</span>
                        <span>Buypoint.com.ng</span>
                      </span>
                      <span className="bg-black/30 border border-white/10 p-1.5 rounded-lg flex items-center gap-1 text-emerald-400">
                        <span>▶</span>
                        <span>Google Play</span>
                      </span>
                    </div>
                  </div>

                  <div className="relative w-44 h-24 flex items-center justify-center shrink-0">
                    <div className="absolute w-20 h-20 rounded-full bg-orange-500/20 blur-xl animate-pulse" />
                    <div className="absolute left-2 text-[5px] font-mono font-bold tracking-widest text-[#2E3DFD] h-18 w-10 bg-slate-950 border border-white/50 rounded-lg transform -rotate-12 flex flex-col justify-between p-1 shadow-md">
                      <div className="h-0.5 w-3 bg-white/45 rounded mx-auto" />
                      <div className="grow flex items-center justify-center text-center leading-none text-[6px]">BUY</div>
                      <div className="h-1 w-1 bg-white/30 rounded-full mx-auto" />
                    </div>

                    {/* Fun silhouette VR simulator helmet */}
                    <div className="grow absolute right-2 h-20 w-24 border border-indigo-400 rounded-xl bg-[#222EBF] shadow-lg flex flex-col justify-around p-2 text-center select-none transform rotate-3 scale-95">
                      <div className="h-2 w-full flex justify-around gap-1">
                        <span className="h-2 w-6 bg-blue-300 rounded-sm" />
                        <span className="h-2 w-6 bg-blue-300 rounded-sm" />
                      </div>
                      <span className="text-[9px] font-extrabold uppercase tracking-wide">VR Goggles Terminal</span>
                      <span className="text-[8px] font-mono text-white/70">Reflect virtual simulator active</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* TRANSACTIONS SECTION */}
              <div className="bg-white rounded-3xl p-6 border border-slate-150 shadow-xs">
                <div className="flex justify-between items-center mb-5 font-sans">
                  <div className="flex items-center space-x-2">
                    <History className="h-4.5 w-4.5 text-[#2E3DFD]" />
                    <h3 className="text-sm font-black text-slate-900 uppercase">Interactive Ledger Logs</h3>
                  </div>
                  <span className="text-[10px] bg-slate-100 text-slate-800 font-bold px-2.5 py-1 rounded font-mono">Live Sync</span>
                </div>

                <div className="max-h-[300px] overflow-y-auto space-y-3.5 pr-1.5 scrollbar-thin">
                  {transactions.length === 0 ? (
                    <div className="text-center py-8 text-xs text-slate-400">No transactions recorded yet in this layout state.</div>
                  ) : (
                    transactions.map((tx) => (
                      <div key={tx.id} className="flex justify-between items-center p-3.5 bg-slate-50 border border-slate-100 rounded-2xl relative overflow-hidden text-xs">
                        {/* Soft visual type indicator bar on the left */}
                        <div className={`absolute top-0 bottom-0 left-0 w-1 ${tx.type === 'deposit' ? 'bg-emerald-500' : tx.type === 'withdrawal' ? 'bg-amber-500' : 'bg-blue-600'}`} />
                        
                        <div className="flex items-center space-x-3 pl-1">
                          <div className={`p-2 rounded-xl flex items-center justify-center shrink-0 ${tx.type === 'deposit' ? 'bg-emerald-50/80 text-emerald-600' : tx.type === 'withdrawal' ? 'bg-amber-50/80 text-amber-600' : 'bg-blue-50/80 text-blue-600'}`}>
                            {tx.type === 'deposit' ? <ArrowDownLeft className="h-4.5 w-4.5" /> : tx.type === 'withdrawal' ? <ArrowUpRight className="h-4.5 w-4.5" /> : <CreditCard className="h-4.5 w-4.5" />}
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 block leading-tight">{tx.label}</span>
                            <span className="text-[10px] text-slate-400 block mt-0.5">{tx.date} • {tx.id}</span>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className={`font-mono font-bold block ${tx.type === 'deposit' ? 'text-emerald-600' : 'text-slate-850'}`}>
                            {tx.type === 'deposit' ? `+₦${tx.amount.toLocaleString()}` : `-₦${tx.amount.toLocaleString()}`}
                          </span>
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-extrabold bg-blue-50 text-blue-700 mt-1 uppercase tracking-wider">
                            Verified
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

            </div>
          )}

          {/* DYNAMIC SEGMENT: NUMBERS & OTP BYPASS */}
          {activeSegment === "numbers" && (
            <div className="space-y-6 animate-fade-in" id="numbers-gateway-panel">
              <div className="bg-white rounded-3xl p-6 border border-slate-150 shadow-xs">
                <div className="flex items-center space-x-2.5 mb-2.5 border-b border-slate-100 pb-3">
                  <Phone className="h-5 w-5 text-[#2E3DFD]" />
                  <div>
                    <h3 className="text-sm font-black text-slate-900 uppercase">Lease Global Virtual Lines & Receive OTP</h3>
                    <p className="text-[11px] text-slate-450 mt-0.5">Rent fresh, private foreign-sim verification pipelines with fully simulated text displays.</p>
                  </div>
                </div>

                <form onSubmit={handleRentNumber} className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 p-4.5 rounded-2xl relative border border-slate-100">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-slate-500 block">Target SIM Host Country</label>
                    <select
                      value={numCountry}
                      onChange={(e) => setNumCountry(e.target.value)}
                      className="w-full text-xs rounded-xl border border-slate-200 bg-white p-3 text-slate-800 font-bold focus:border-blue-500 focus:outline-none"
                    >
                      <option value="USA">USA Pool (₦1,800/month)</option>
                      <option value="UK">United Kingdom (₦2,200/month)</option>
                      <option value="Canada">Canada Gate (₦3,500/month)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-slate-500 block">Intended Services</label>
                    <select
                      value={numService}
                      onChange={(e) => setNumService(e.target.value)}
                      className="w-full text-xs rounded-xl border border-slate-200 bg-white p-3 text-slate-800 font-bold focus:border-blue-500 focus:outline-none"
                    >
                      <option value="WhatsApp">WhatsApp OTP Bypasser</option>
                      <option value="Telegram">Telegram Carrier Auth</option>
                      <option value="Google Hub">Google My Business Verify</option>
                      <option value="Facebook">Meta/Facebook Account</option>
                      <option value="TikTok">TikTok Creator Hub</option>
                    </select>
                  </div>

                  <div className="flex items-end">
                    <button
                      type="submit"
                      disabled={isGeneratingNumber}
                      className="w-full bg-[#2E3DFD] hover:bg-blue-700 text-white font-bold rounded-xl py-3 text-xs shadow-md shadow-blue-500/10 cursor-pointer hover:scale-[1.01] transition-all disabled:opacity-50"
                    >
                      {isGeneratingNumber ? "Contacting Pool SIM..." : "Lease Instantly"}
                    </button>
                  </div>
                </form>
              </div>

              {/* Sub-block: Active Numbers Display & Logs */}
              <div className="bg-white rounded-3xl p-6 border border-slate-150 shadow-xs space-y-4">
                <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-widest border-l-2 border-[#2E3DFD] pl-2 leading-none">Your Private Active Leases</h4>
                
                {leasedNumbers.length === 0 ? (
                  <div className="text-center py-10 bg-slate-50/50 rounded-2xl border border-dashed border-slate-205 text-xs text-slate-500 space-y-2">
                    <Info className="h-8 w-8 text-[#2E3DFD]/30 mx-auto" />
                    <p className="font-bold">No leased active DIDs found.</p>
                    <p className="text-[11px] text-slate-400">Lease a line above to simulate target OTP text deliveries live!</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {leasedNumbers.map((num) => (
                      <div key={num.id} className="bg-slate-50 border border-slate-150 rounded-2xl p-4 flex flex-col justify-between">
                        
                        <div>
                          <div className="flex justify-between items-center bg-slate-200/50 p-2 rounded-xl mb-3">
                            <span className="text-[11px] font-black text-[#1A255B]">{num.country} • {num.service}</span>
                            <span className="text-[9px] bg-emerald-100 text-emerald-800 font-mono font-bold px-2 py-0.5 rounded uppercase">ACTIVE</span>
                          </div>
                          
                          <div className="flex justify-between items-center mb-4">
                            <span className="font-mono text-sm font-black text-slate-800 select-all">{num.phone}</span>
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(num.phone);
                                showNotice("success", "Active phone lease copied to clipboard.");
                              }}
                              className="text-slate-400 hover:text-slate-700 p-1 bg-white border rounded"
                              title="Copy Line"
                            >
                              <Copy className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>

                        <div className="space-y-2 text-xs">
                          <button
                            onClick={() => triggerOtpRequest(num.id)}
                            className="w-full bg-white border border-slate-200 text-[#2E3DFD] hover:bg-slate-50 hover:border-[#2E3DFD] font-extrabold py-2 rounded-lg text-[11px] transition-all flex items-center justify-center space-x-1"
                          >
                            <Key className="h-3 w-3" />
                            <span>Request New Code Log</span>
                          </button>

                          {/* Render Dynamic logs */}
                          <div className="mt-3.5 pt-3.5 border-t border-slate-150 space-y-2">
                            <span className="text-[9px] uppercase tracking-wider text-slate-450 font-bold block mb-1">Carrier Logs</span>
                            {num.otpLogs.length === 0 ? (
                              <span className="text-[11px] text-slate-400 italic block">Awaiting SMS code triggers from server...</span>
                            ) : (
                              <div className="space-y-1.5 max-h-[140px] overflow-y-auto">
                                {num.otpLogs.map(log => (
                                  <div key={log.id} className="bg-white border rounded-xl p-2.5 relative">
                                    <div className="flex justify-between text-[10px] font-bold text-slate-900 border-b pb-1 mb-1">
                                      <span className="text-blue-700 font-mono">{log.sender}</span>
                                      <span className="text-slate-400 font-mono">{log.time}</span>
                                    </div>
                                    <span className="text-[11px] text-slate-700 block leading-tight">{log.text}</span>
                                    <div className="mt-1 flex items-center space-x-2">
                                      <span className="text-xs font-black font-sans text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                                        CODE: {log.code}
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                        </div>

                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* DYNAMIC SEGMENT: SMM BOOSTS & ORGANIC ACCOUNTS */}
          {activeSegment === "smm" && (
            <div className="space-y-6 animate-fade-in" id="smm-boosting-hub">
              
              {/* Form panel */}
              <div className="bg-white rounded-3xl p-6 border border-slate-150 shadow-xs">
                <div className="flex items-center space-x-2.5 mb-2.5 border-b border-slate-105 pb-3">
                  <Share2 className="h-5 w-5 text-[#2E3DFD]" />
                  <div>
                    <h3 className="text-sm font-black text-slate-900 uppercase">SMM Growth Panel Dispatch Center</h3>
                    <p className="text-[11px] text-slate-450 mt-0.5 font-bold">Inject artificial traffic, active likes, shares, and automated real-looking metrics instantly.</p>
                  </div>
                </div>

                <form onSubmit={handleSmmSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-slate-500 block">Social Media Platform</label>
                      <select
                        value={socialPlatform}
                        onChange={(e) => {
                          setSocialPlatform(e.target.value);
                          if (e.target.value === "instagram") setSmmServiceType("High Retention Followers");
                          else if (e.target.value === "tiktok") setSmmServiceType("TikTok Viral Shares");
                          else if (e.target.value === "facebook") setSmmServiceType("Facebook Page Likes");
                          else setSmmServiceType("Twitter Retweets");
                        }}
                        className="w-full text-xs rounded-xl border border-slate-200 bg-white p-3 text-slate-800 font-bold focus:outline-none"
                      >
                        <option value="instagram">Instagram Panel</option>
                        <option value="tiktok">TikTok Network</option>
                        <option value="facebook">Facebook Group</option>
                        <option value="twitter">Twitter / X Hub</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-slate-500 block">Service Specifications</label>
                      <select
                        value={smmServiceType}
                        onChange={(e) => setSmmServiceType(e.target.value)}
                        className="w-full text-xs rounded-xl border border-slate-200 bg-white p-3 text-slate-800 font-bold focus:outline-none"
                      >
                        {socialPlatform === "instagram" && (
                          <>
                            <option value="High Retention Followers">High Retention Followers (₦2.2/qty)</option>
                            <option value="Premium Active Likes">Premium Active Likes (₦1.8/qty)</option>
                            <option value="Instant Power Views">Instant Power Views (₦1.1/qty)</option>
                          </>
                        )}
                        {socialPlatform === "tiktok" && (
                          <>
                            <option value="TikTok Viral Shares">TikTok Viral Shares (₦2.5/qty)</option>
                            <option value="Organic Profile Followers">Organic Profile Followers (₦3.1/qty)</option>
                          </>
                        )}
                        {socialPlatform === "facebook" && (
                          <>
                            <option value="Facebook Page Likes">Facebook Page Likes (₦2.2/qty)</option>
                            <option value="Group Member Boost">Group Member Boost (₦2.8/qty)</option>
                          </>
                        )}
                        {socialPlatform === "twitter" && (
                          <>
                            <option value="Twitter Retweets">Twitter Retweets (₦3.2/qty)</option>
                            <option value="Aged Profile Followers">Aged Profile Followers (₦4.5/qty)</option>
                          </>
                        )}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-slate-500 block">Dispatch Quantity</label>
                      <input
                        type="number"
                        value={smmQty}
                        onChange={(e) => setSmmQty(e.target.value)}
                        placeholder="e.g. 500"
                        className="w-full text-xs rounded-xl border border-slate-200 bg-white p-3 text-slate-850 font-bold focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-slate-500 block">Profile Target Endpoint Hyperlink (URL)</label>
                    <input
                      type="url"
                      value={smmTargetLink}
                      onChange={(e) => setSmmTargetLink(e.target.value)}
                      placeholder="e.g. https://instagram.com/your_handle"
                      className="w-full text-xs rounded-xl border border-slate-200 bg-white p-3 text-slate-855 focus:outline-none"
                    />
                  </div>

                  <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                    <div className="text-xs">
                      <span className="text-slate-400">Calculated order price: </span>
                      <strong className="text-[#2E3DFD] font-mono">
                        ₦{Math.floor((parseInt(smmQty) || 500) * (smmServiceType.includes("Premium") || smmServiceType.includes("Aged") ? 4.5 : 2.2)).toLocaleString()}
                      </strong>
                    </div>

                    <button
                      type="submit"
                      className="bg-[#2E3DFD] hover:bg-blue-750 text-white font-extrabold px-6 py-3 rounded-xl text-xs cursor-pointer shadow-md transition-all active:scale-95"
                    >
                      Process Order Instant
                    </button>
                  </div>
                </form>
              </div>

              {/* SMM Aged Accounts Shop */}
              <div className="bg-white rounded-3xl p-6 border border-slate-150 shadow-xs space-y-4">
                <div className="border-b pb-3 mb-1">
                  <h4 className="text-xs font-black text-slate-900 uppercase">Aged & Pre-Verified Social Accounts Catalog</h4>
                  <p className="text-[11px] text-slate-450 mt-0.5 leading-tight">Instant handover files with high authority scores to bypass shadowbans and limitations.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {socialAccounts.map((acc) => (
                    <div key={acc.id} className="border border-slate-150 rounded-2xl p-4 bg-slate-50/50 flex flex-col justify-between text-xs relative overflow-hidden">
                      {acc.isPurchased && (
                        <div className="absolute top-2 right-2 bg-emerald-100 text-emerald-800 text-[8px] font-black uppercase px-2 py-0.5 rounded">
                          PURCHASED
                        </div>
                      )}

                      <div className="space-y-2">
                        <div className="flex items-center space-x-1.5 font-bold mb-1">
                          <span className="text-[#2E3DFD] shrink-0 font-black italic">B</span>
                          <span className="text-slate-900 uppercase tracking-tight">{acc.platform} • {acc.followers}</span>
                        </div>
                        <p className="font-semibold text-[13px] text-slate-905 mt-1 block">{acc.username}</p>
                        <p className="text-[10px] text-slate-500 leading-snug">{acc.description}</p>
                      </div>

                      <div className="pt-4 border-t mt-4">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-[10px] text-slate-400 font-bold block">Asset Price</span>
                          <span className="font-mono text-sm font-black text-slate-900">₦{acc.price.toLocaleString()}</span>
                        </div>

                        {!acc.isPurchased ? (
                          <button
                            onClick={() => handleBuyAgedAccount(acc.id)}
                            className="w-full bg-[#2E3DFD] text-white py-2 rounded-lg font-bold hover:bg-blue-700 cursor-pointer active:scale-95 transition-all text-[11px]"
                          >
                            Acquire Credentials
                          </button>
                        ) : (
                          <div className="bg-emerald-50 border border-emerald-100 p-2.5 rounded-xl space-y-1 text-[10px] font-mono">
                            <div className="flex justify-between">
                              <span className="text-slate-400">User:</span>
                              <span className="font-bold text-slate-900">{acc.credentials?.user}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-400">Pass:</span>
                              <span className="font-bold text-slate-900 select-all">{acc.credentials?.pass}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-400">Recovery:</span>
                              <span className="font-bold text-slate-900 leading-none truncate max-w-[110px]">{acc.credentials?.email}</span>
                            </div>
                          </div>
                        )}
                      </div>

                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* DYNAMIC SEGMENT: DOLLAR VIRTUAL DEBIT CARDS */}
          {activeSegment === "card" && (
            <div className="space-y-6 animate-fade-in" id="fintech-dollar-cards">
              
              {!virtualCard ? (
                /* Card registration block */
                <div className="bg-white rounded-3xl p-6 border border-slate-150 shadow-xs">
                  <div className="flex items-center space-x-2.5 mb-2.5 border-b border-slate-105 pb-3">
                    <CreditCard className="h-5 w-5 text-[#2E3DFD]" />
                    <div>
                      <h3 className="text-sm font-black text-slate-900 uppercase">Apply for Virtual USD Dollar Cards</h3>
                      <p className="text-[11px] text-slate-450 mt-0.5">Fund with Naira, convert inside system instantly, and checkout globally on Mastercard & Visa networks.</p>
                    </div>
                  </div>

                  <form onSubmit={handleCreateVirtualCard} className="space-y-4 max-w-md">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-slate-500 block">Personalised Card Holder Label</label>
                      <input
                        type="text"
                        required
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value)}
                        placeholder="DANIEL INEGBEDION"
                        className="w-full text-xs rounded-xl border border-slate-200 bg-white p-3 text-slate-800 font-bold focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-slate-500 block">Card Scheme brand</label>
                      <div className="grid grid-cols-2 gap-3 font-sans">
                        <button
                          type="button"
                          onClick={() => setCardBrand("visa")}
                          className={`py-3.5 rounded-xl border text-xs font-black transition-all cursor-pointer ${
                            cardBrand === "visa" ? "border-[#2E3DFD] bg-blue-50 text-[#2E3DFD]" : "border-slate-200 bg-white text-slate-650"
                          }`}
                        >
                          Visa Digital USD
                        </button>
                        <button
                          type="button"
                          onClick={() => setCardBrand("mastercard")}
                          className={`py-3.5 rounded-xl border text-xs font-black transition-all cursor-pointer ${
                            cardBrand === "mastercard" ? "border-[#2E3DFD] bg-blue-50 text-[#2E3DFD]" : "border-slate-200 bg-white text-slate-650"
                          }`}
                        >
                          Mastercard Prepaid
                        </button>
                      </div>
                    </div>

                    <div className="pt-4 border-t flex justify-between items-center text-xs">
                      <div>
                        <span className="text-slate-400">Startup issuing config fee: </span>
                        <strong className="text-[#2E3DFD] block font-mono font-black text-sm mt-0.5">₦3,500 Once-off</strong>
                      </div>

                      <button
                        type="submit"
                        disabled={isCreatingCard}
                        className="bg-[#2E3DFD] text-white hover:bg-blue-750 font-bold px-6 py-3 rounded-xl cursor-pointer shadow-md transition-all active:scale-95 text-xs inline-flex items-center space-x-1.5"
                      >
                        {isCreatingCard ? <span>Issuing Card...</span> : <span>Generate Prepaid Visa Card</span>}
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                /* Card interactive playground */
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 font-sans">
                  
                  {/* Visually stunning debit card mock */}
                  <div className="md:col-span-7 bg-white rounded-3xl p-6 border border-slate-150 shadow-xs space-y-4 flex flex-col justify-between">
                    
                    <div>
                      <h4 className="text-xs font-black text-slate-900 uppercase">My Credit Card Interface</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5 leading-none"> प्री-ऑथराइज्ड Active simulation card details.</p>
                    </div>

                    <div className="relative h-44 rounded-2xl bg-gradient-to-tr from-slate-900 via-purple-950 to-[#2E3DFD] p-5 text-white flex flex-col justify-between shadow-lg relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-28 h-28 bg-white/5 rounded-full blur-xl pointer-events-none" />
                      
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-black tracking-widest text-[#2E3DFD] italic bg-white px-2 py-0.5 rounded">PREPAID</span>
                        <span className="text-sm font-extrabold uppercase font-mono tracking-wider">{virtualCard.type}</span>
                      </div>

                      <div>
                        {/* Dynamic copy logic card numbers */}
                        <span className="block font-mono text-lg font-bold tracking-widest select-all mb-2">{virtualCard.cardNumber}</span>
                        <div className="flex justify-between text-[11px] text-white/70 font-mono">
                          <div>
                            <span className="text-[8px] text-slate-400 uppercase font-sans leading-none block">Card Holder</span>
                            <span className="font-sans font-bold text-white uppercase mt-0.5 block">{virtualCard.holder}</span>
                          </div>
                          <div>
                            <span className="text-[8px] text-slate-400 uppercase font-sans leading-none block">Expiry</span>
                            <span className="font-bold text-white mt-0.5 block">{virtualCard.expiry}</span>
                          </div>
                          <div>
                            <span className="text-[8px] text-slate-400 uppercase font-sans leading-none block">CVV</span>
                            <span className="font-bold text-white mt-0.5 block">{virtualCard.cvv}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs bg-slate-50 p-3 rounded-2xl relative border border-slate-100">
                      <div>
                        <span className="text-[10px] text-slate-450 block uppercase font-bold">Standard USD Rate</span>
                        <span className="text-sm font-black text-slate-900 block mt-0.5 font-mono">1 USD = ₦1,550</span>
                      </div>
                      <button
                        onClick={() => {
                          setVirtualCard(null);
                          showNotice("info", "Virtual card configuration state reset successfully.");
                        }}
                        className="text-red-500 font-extrabold cursor-pointer"
                      >
                        Reset Virtual Card
                      </button>
                    </div>

                  </div>

                  {/* Card funding / details panel */}
                  <div className="md:col-span-5 bg-white rounded-3xl p-6 border border-slate-150 shadow-xs space-y-4 flex flex-col justify-between">
                    
                    <div>
                      <span className="text-[10px] text-slate-450 block uppercase font-bold tracking-widest">AVALABLE DOLLAR ASSETS</span>
                      <h4 className="text-2xl font-black font-mono text-slate-950 mt-1">
                        ${virtualCard.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </h4>
                    </div>

                    <form onSubmit={handleFundVirtualCard} className="space-y-4 pt-4 border-t border-slate-100">
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-slate-500 block">Top Up US Dollar Balance</label>
                        <div className="relative">
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-slate-400">$</span>
                          <input
                            type="number"
                            required
                            value={cardTopupAmount}
                            onChange={(e) => setCardTopupAmount(e.target.value)}
                            placeholder="e.g. 20"
                            className="w-full text-xs rounded-xl border border-slate-200 bg-white pl-8 pr-3 py-3 text-slate-800 font-bold focus:outline-none"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-[#2E3DFD] hover:bg-blue-700 text-white font-bold py-3 text-xs rounded-xl shadow-md cursor-pointer transition-all active:scale-95 text-center leading-none"
                      >
                        Verify & Fund Card Balance (+₦{(parseFloat(cardTopupAmount) * 1550 || 0).toLocaleString()})
                      </button>
                    </form>

                  </div>

                </div>
              )}

            </div>
          )}

          {/* DYNAMIC SEGMENT: VTU TELECOM SERVICES */}
          {activeSegment === "vtu" && (
            <div className="space-y-6 animate-fade-in" id="vtu-carrier-terminal">
              <div className="bg-white rounded-3xl p-6 border border-slate-150 shadow-xs">
                
                <div className="flex items-center justify-between mb-4 pb-3 border-b">
                  <div className="flex items-center space-x-2.5">
                    <Smartphone className="h-5 w-5 text-[#2E3DFD]" />
                    <h3 className="text-sm font-black text-slate-900 uppercase">VTU & Bill Settlements</h3>
                  </div>
                  
                  <div className="flex gap-1">
                    <button
                      onClick={() => setVtuType("airtime")}
                      className={`px-3 py-1.5 rounded-xl text-[10px] font-black tracking-tight ${vtuType === 'airtime' ? 'bg-[#2E3DFD] text-white shadow-xs' : 'bg-slate-100 text-slate-650 hover:bg-slate-200'} transition-all`}
                    >
                      Airtime Swap
                    </button>
                    <button
                      onClick={() => setVtuType("data")}
                      className={`px-3 py-1.5 rounded-xl text-[10px] font-black tracking-tight ${vtuType === 'data' ? 'bg-[#2E3DFD] text-white shadow-xs' : 'bg-slate-100 text-slate-650 hover:bg-slate-200'} transition-all`}
                    >
                      Mobile Data
                    </button>
                    <button
                      onClick={() => setVtuType("cable")}
                      className={`px-3 py-1.5 rounded-xl text-[10px] font-black tracking-tight ${vtuType === 'cable' ? 'bg-[#2E3DFD] text-white shadow-xs' : 'bg-slate-100 text-slate-650 hover:bg-slate-200'} transition-all`}
                    >
                      Smart TV
                    </button>
                    <button
                      onClick={() => setVtuType("electricity")}
                      className={`px-3 py-1.5 rounded-xl text-[10px] font-black tracking-tight ${vtuType === 'electricity' ? 'bg-[#2E3DFD] text-white shadow-xs' : 'bg-slate-100 text-slate-650 hover:bg-slate-200'} transition-all`}
                    >
                      Utility Bill
                    </button>
                  </div>
                </div>

                <form onSubmit={handleVtuSubmit} className="space-y-4 max-w-md">
                  
                  {/* Show carrier logo only for airtime/data */}
                  {(vtuType === "airtime" || vtuType === "data") && (
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-slate-400 block font-sans">Telecom operator network</label>
                      <div className="grid grid-cols-4 gap-2 text-center font-sans">
                        {["MTN", "Airtel", "Glo", "9mobile"].map((operator) => (
                          <button
                            key={operator}
                            type="button"
                            onClick={() => setTelcoOperator(operator)}
                            className={`py-2 rounded-xl border text-[11px] font-black transition-all cursor-pointer ${
                              telcoOperator === operator ? "border-[#2E3DFD] bg-blue-50 text-[#2E3DFD]" : "border-slate-200 bg-white text-slate-600"
                            }`}
                          >
                            {operator}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-slate-450 block font-sans">
                        {vtuType === "cable" ? "Cable Smartcard (DSTV/GOTV) ID" : vtuType === "electricity" ? "Utility prepaid Meter Line" : "Naija Subscriber Phone Line"}
                      </label>
                      <input
                        type="text"
                        required
                        value={vtuPhone}
                        onChange={(e) => setVtuPhone(e.target.value)}
                        placeholder={vtuType === "cable" ? "e.g. 1025038741" : vtuType === "electricity" ? "04125586634" : "e.g. 08031234567"}
                        className="w-full text-xs rounded-xl border border-slate-200 bg-white p-3 text-slate-800 font-bold focus:outline-none focus:border-[#2E3DFD]"
                      />
                    </div>

                    <div className="space-y-1">
                      {vtuType === "airtime" && (
                        <>
                          <label className="text-[10px] uppercase font-bold text-slate-450 block">Recharge Value (Naira)</label>
                          <input
                            type="number"
                            required
                            value={vtuAmount}
                            onChange={(e) => setVtuAmount(e.target.value)}
                            placeholder="e.g. 1000"
                            className="w-full text-xs rounded-xl border border-slate-200 bg-white p-3 text-slate-800 font-bold focus:outline-none focus:border-[#2E3DFD]"
                          />
                        </>
                      )}

                      {vtuType === "data" && (
                        <>
                          <label className="text-[10px] uppercase font-bold text-slate-450 block">Data Volume Bundle plan</label>
                          <select
                            value={vtuDataPlan}
                            onChange={(e) => setVtuDataPlan(e.target.value)}
                            className="w-full text-xs rounded-xl border border-slate-200 bg-white p-3 text-slate-800 font-bold focus:outline-none focus:border-[#2E3DFD]"
                          >
                            <option value="1.5GB / 30 Days (₦1,200)">MTN SME 1.5GB / 30 Days (₦1,200)</option>
                            <option value="3GB / 30 Days (₦1,800)">Airtel Giga 3GB / 30 Days (₦1,800)</option>
                            <option value="10GB / 30 Days (₦3,500)">Glo CG 10GB / 30 Days (₦3,500)</option>
                          </select>
                        </>
                      )}

                      {vtuType === "cable" && (
                        <>
                          <label className="text-[10px] uppercase font-bold text-slate-450 block">Cable Plan</label>
                          <select className="w-full text-xs rounded-xl border border-slate-200 bg-[#FAFBFD] p-3 text-slate-500 font-semibold focus:outline-none cursor-not-allowed" disabled>
                            <option>DSTV Jolly Compact (₦4,500/Month)</option>
                          </select>
                        </>
                      )}

                      {vtuType === "electricity" && (
                        <>
                          <label className="text-[10px] uppercase font-bold text-slate-450 block">Utilities power operator</label>
                          <select 
                            value={utilityMeter}
                            onChange={(e) => setUtilityMeter(e.target.value)}
                            className="w-full text-xs rounded-xl border border-slate-200 bg-white p-3 text-slate-800 font-bold focus:outline-none focus:border-[#2E3DFD]"
                          >
                            <option value="EKEDC">EKEDC Ikeja (₦5,000 / 32kW)</option>
                            <option value="AEDC">AEDC Abuja Power (₦5,000 / 30kW)</option>
                          </select>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="pt-3 border-t">
                    <button
                      type="submit"
                      className="bg-[#2E3DFD] hover:bg-blue-750 text-white font-extrabold w-full py-3.5 rounded-xl cursor-pointer shadow-md transition-all active:scale-95 text-xs text-center leading-none"
                    >
                      Discharge Instant VTU Bundle
                    </button>
                  </div>
                </form>

              </div>
            </div>
          )}

          {/* DYNAMIC SEGMENT: WEBSITE WEBSHOP MALL */}
          {activeSegment === "websites" && (
            <div className="space-y-6 animate-fade-in" id="websites-mall">
              <div className="bg-white rounded-3xl p-6 border border-slate-150 shadow-xs">
                
                <div className="border-b pb-3 mb-5 flex items-center space-x-2">
                  <Laptop className="h-5 w-5 text-[#2E3DFD]" />
                  <div>
                    <h3 className="text-sm font-black text-slate-900 uppercase">Ready-Made Landing Page & Web Apps Depot</h3>
                    <p className="text-[11px] text-slate-450">Deploy top-tier presentation portfolios customized with lead captures instantly.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {premiumWebsites.map((web) => (
                    <div key={web.id} className="border border-slate-150 rounded-2xl bg-slate-50/20 overflow-hidden flex flex-col justify-between">
                      <img 
                        referrerPolicy="no-referrer"
                        src={web.img} alt={web.name} className="h-32 w-full object-cover border-b" />
                      
                      <div className="p-4 space-y-2">
                        <span className="text-[9px] bg-indigo-50 text-blue-700 font-bold px-2 py-0.5 rounded font-mono uppercase">{web.type}</span>
                        <h4 className="font-bold text-xs text-slate-900 leading-snug">{web.name}</h4>
                        
                        <div className="flex items-center space-x-2 text-[10px] text-slate-450 mt-1">
                          <span className="text-emerald-600 font-sans font-extrabold">▶ Google Lighthouse Speed: {web.speed}</span>
                        </div>
                      </div>

                      <div className="p-4 pt-0 border-t border-slate-100 flex items-center justify-between mt-3 text-xs">
                        <div>
                          <span className="text-[9px] text-slate-400 font-bold block leading-none">Setup Payout</span>
                          <span className="font-mono font-black text-slate-900 mt-1 block">₦{web.price.toLocaleString()}</span>
                        </div>

                        <button
                          onClick={() => handleBuyWebsiteOrder(web.name, web.price)}
                          className="bg-[#2E3DFD] text-white px-3 py-1.5 rounded-lg font-bold hover:bg-blue-700"
                        >
                          Acquire Setup
                        </button>
                      </div>

                    </div>
                  ))}
                </div>

              </div>
            </div>
          )}

        </div>

      </div>

      {/* --- APP OVERLAY DIALOGS & SLATE POPUPS --- */}

      {/* 1. Deposit Fund dialog */}
      <AnimatePresence>
        {showFundModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4" onClick={() => setShowFundModal(false)}>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="max-w-md w-full bg-white rounded-3xl p-6 border shadow-2xl relative text-left"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="border-b pb-3.5 mb-4 flex justify-between items-center">
                <h3 className="text-sm font-black text-slate-900 uppercase">Load Liquid E-wallet Cash</h3>
                <button onClick={() => setShowFundModal(false)} className="text-slate-400 hover:text-slate-700 font-extrabold">✕</button>
              </div>

              <form onSubmit={handleDepositSubmit} className="space-y-4 font-sans">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-slate-500 block">Payout Value amount (Naira)</label>
                  <input
                    type="number"
                    required
                    value={fundAmount}
                    onChange={(e) => setFundAmount(e.target.value)}
                    placeholder="e.g. 5000"
                    className="w-full text-xs rounded-xl border border-slate-200 bg-[#FAFBFD] p-3 text-slate-800 font-bold focus:outline-none"
                  />
                </div>

                <div className="p-3 bg-blue-50 border border-blue-100 rounded-2xl text-[10px] text-slate-500 leading-snug">
                  <span className="font-bold text-blue-900 block mb-1">PROVIPUS BANK INSTANT ESCROW GATEWAY:</span>
                  Transfer specified cash manually to <strong className="text-blue-900 select-all">1925038721</strong> on any local mobile bank app. Click verify button to trigger system auto-credit.
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-[#2E3DFD] text-white font-extrabold py-3.5 rounded-xl cursor-pointer text-xs"
                  >
                    Authorize manual deposit simulation
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. Withdraw cash dialog */}
      <AnimatePresence>
        {showWithdrawModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4" onClick={() => setShowWithdrawModal(false)}>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="max-w-md w-full bg-white rounded-3xl p-6 border shadow-2xl relative text-left font-sans"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="border-b pb-3.5 mb-4 flex justify-between items-center">
                <h3 className="text-sm font-black text-slate-900 uppercase font-sans">Discharge Cash Settlement (Naira)</h3>
                <button onClick={() => setShowWithdrawModal(false)} className="text-slate-400 hover:text-slate-700 font-extrabold">✕</button>
              </div>

              <form onSubmit={handleWithdrawSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-slate-500 block">Bank Name</label>
                    <select
                      value={withdrawBank}
                      onChange={(e) => setWithdrawBank(e.target.value)}
                      className="w-full text-xs rounded-xl border border-slate-205 p-3 text-slate-750 font-bold focus:outline-none"
                    >
                      <option value="">Choose bank...</option>
                      <option value="Access Bank">Access Bank Plc</option>
                      <option value="GTBank">Guaranty Trust Bank</option>
                      <option value="UBA">United Bank For Africa</option>
                      <option value="Wema Bank">Wema Bank</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-slate-500 block">Account Number</label>
                    <input
                      type="text"
                      required
                      value={withdrawAccount}
                      onChange={(e) => setWithdrawAccount(e.target.value)}
                      placeholder="e.g. 1022354896"
                      className="w-full text-xs rounded-xl border border-slate-205 p-3 text-slate-800 font-bold focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-slate-500 block">Withdrawal Value (₦)</label>
                  <input
                    type="number"
                    required
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    placeholder="e.g. 4000"
                    className="w-full text-xs rounded-xl border border-slate-205 p-3 text-slate-800 font-bold focus:outline-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-[#2E3DFD] text-white font-extrabold py-3 text-xs rounded-xl cursor-pointer"
                  >
                    Confirm Payout Dispatch
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Bottom Toolbar for Mobile Accommodations (exact replication of 5 menu tabs with light design) */}
      <div className="fixed bottom-0 left-0 right-0 z-45 w-full bg-white/95 border-t border-slate-200 backdrop-blur-md px-2 py-2 md:hidden">
        <div className="flex items-center justify-around text-center max-w-md mx-auto">
          
          <button
            onClick={() => {
              setActiveSegment("services");
              showNotice("info", "Displaying Finance Ledger summaries & statistics.");
            }}
            className={`flex-1 flex flex-col items-center justify-center py-1 cursor-pointer transition-all ${
              activeSegment === "services" ? "text-[#2E3DFD] font-black" : "text-slate-400"
            }`}
          >
            <Wallet className="h-5 w-5 stroke-[2.2]" />
            <span className="text-[9.5px] font-bold mt-1 tracking-tight">Home</span>
          </button>

          <button
            onClick={() => {
              setActiveSegment("numbers");
              showNotice("info", "Opening SIM lease & OTP Bypass terminal.");
            }}
            className={`flex-1 flex flex-col items-center justify-center py-1 cursor-pointer transition-all ${
              activeSegment === "numbers" ? "text-[#2E3DFD] font-black" : "text-slate-400"
            }`}
          >
            <Smartphone className="h-5 w-5 stroke-[2.2]" />
            <span className="text-[9.5px] font-bold mt-1 tracking-tight">SIM-OTP</span>
          </button>

          <button
            onClick={() => {
              setActiveSegment("card");
              showNotice("info", "Interactive Dollar Prepaid Cards triggered.");
            }}
            className={`flex-1 flex flex-col items-center justify-center py-1 cursor-pointer transition-all ${
              activeSegment === "card" ? "text-[#2E3DFD] font-black" : "text-slate-400"
            }`}
          >
            <CreditCard className="h-5 w-5 stroke-[2.2]" />
            <span className="text-[9.5px] font-bold mt-1 tracking-tight">USD Card</span>
          </button>

          <button
            onClick={() => {
              setActiveSegment("vtu");
              showNotice("info", "Carrier services store loaded.");
            }}
            className={`flex-1 flex flex-col items-center justify-center py-1 cursor-pointer transition-all ${
              activeSegment === "vtu" ? "text-[#2E3DFD] font-black" : "text-slate-400"
            }`}
          >
            <RefreshCw className="h-5 w-5 stroke-[2.2]" />
            <span className="text-[9.5px] font-bold mt-1 tracking-tight">VTU Bill</span>
          </button>

          <button
            onClick={() => {
              setActiveSegment("smm");
              showNotice("info", "SMM Panel traffic growth dispatch portal.");
            }}
            className={`flex-1 flex flex-col items-center justify-center py-1 cursor-pointer transition-all ${
              activeSegment === "smm" ? "text-[#2E3DFD] font-black" : "text-slate-400"
            }`}
          >
            <Share2 className="h-5 w-5 stroke-[2.2]" />
            <span className="text-[9.5px] font-bold mt-1 tracking-tight">SMM Sells</span>
          </button>

        </div>
      </div>

    </section>
  );
}

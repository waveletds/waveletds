import React, { useState, useEffect } from "react";
import { 
  Lock, Shield, Eye, EyeOff, CheckCircle2, AlertCircle, Database, 
  Settings, Users, DollarSign, ListTodo, KeyRound, Save, Plus, Trash2, 
  RefreshCw, TrendingUp, Mail, Phone, Clock, FileText, Check, Landmark, X 
} from "lucide-react";

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");
  const [activeTab, setActiveTab] = useState<"leads" | "services" | "users" | "keys">("leads");
  
  // Dynamic API Loaded State
  const [leads, setLeads] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [services, setServices] = useState<{
    nairaPackages: any[];
    digitalAssets: any[];
    otpApps: any[];
    virtualNumbers: any[];
    miscRates: { fastTrackPrice: number; monthlySupportPrice: number };
  }>({
    nairaPackages: [],
    digitalAssets: [],
    otpApps: [],
    virtualNumbers: [],
    miscRates: { fastTrackPrice: 50050, monthlySupportPrice: 30050 }
  });
  const [apiKeys, setApiKeys] = useState({
    GEMINI_API_KEY: "",
    VITE_WHATSAPP_NUMBER: "",
    PAYSTACK_SECRET_KEY: "",
    BULK_SMS_API_KEY: ""
  });

  const [isLoading, setIsLoading] = useState(false);
  const [notice, setNotice] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  // Edit Service Workspace
  const [editingService, setEditingService] = useState<{
    tabType: "naira" | "digital" | "otp" | "virtual" | "calcRates";
    id: string;
    item: any;
  } | null>(null);

  // Edit User Workspace
  const [editingUser, setEditingUser] = useState<any | null>(null);
  const [userBalanceInput, setUserBalanceInput] = useState("");

  const showSystemNotice = (type: "success" | "error", msg: string) => {
    setNotice({ type, msg });
    setTimeout(() => setNotice(null), 4000);
  };

  // Check if admin is already logged in for this browser session
  useEffect(() => {
    const savedToken = localStorage.getItem("wavelet_admin_token");
    if (savedToken && savedToken === "session_token_sinner_9981") {
      setIsAuthenticated(true);
      fetchAdminData();
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setAuthError("Password is required.");
      return;
    }

    try {
      setIsLoading(true);
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      });
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Login validation failed.");
      }

      localStorage.setItem("wavelet_admin_token", data.token);
      setIsAuthenticated(true);
      setAuthError("");
      fetchAdminData();
    } catch (err: any) {
      setAuthError(err.message || "Invalid credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("wavelet_admin_token");
    setIsAuthenticated(false);
    setPassword("");
  };

  const fetchAdminData = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/admin/data");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load database state.");

      setLeads(data.leads || []);
      setUsers(data.users || []);
      if (data.services) {
        setServices(data.services);
      }
      if (data.apiKeys) {
        setApiKeys(data.apiKeys);
      }
    } catch (err: any) {
      showSystemNotice("error", err.message || "Data fetching failed.");
    } finally {
      setIsLoading(false);
    }
  };

  // Update lead status
  const handleLeadStatusChange = async (leadId: string, status: "new" | "contacted" | "archived") => {
    try {
      const res = await fetch("/api/admin/delete-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId, statusUpdate: status })
      });
      if (res.ok) {
        setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status } : l));
        showSystemNotice("success", `Lead updated to status: ${status}`);
      }
    } catch (err: any) {
      showSystemNotice("error", "Failed to update lead.");
    }
  };

  // Delete lead
  const handleDeleteLead = async (leadId: string) => {
    if (!confirm("Are you sure you want to delete this lead? This action is irreversible.")) return;
    try {
      const res = await fetch("/api/admin/delete-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId })
      });
      if (res.ok) {
        setLeads(prev => prev.filter(l => l.id !== leadId));
        showSystemNotice("success", "Lead inquiry permanently cleared.");
      }
    } catch (err: any) {
      showSystemNotice("error", "Failed to delete lead.");
    }
  };

  // Save Service updates
  const handleSaveServiceEdit = async () => {
    if (!editingService) return;
    try {
      setIsLoading(true);
      const res = await fetch("/api/admin/update-service", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: editingService.tabType,
          payload: editingService.item
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save operation failed.");

      showSystemNotice("success", "Service database updated perfectly!");
      setEditingService(null);
      fetchAdminData();
    } catch (err: any) {
      showSystemNotice("error", err.message || "Failed to save service changes.");
    } finally {
      setIsLoading(false);
    }
  };

  // Save special miscellaneous calculator prices
  const handleSaveMiscRates = async (key: "fastTrackPrice" | "monthlySupportPrice", val: number) => {
    try {
      const payload = { [key]: val };
      const res = await fetch("/api/admin/update-service", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "calcRates", payload })
      });
      if (res.ok) {
        setServices(prev => ({
          ...prev,
          miscRates: { ...prev.miscRates, ...payload }
        }));
        showSystemNotice("success", "Master timeline rate modified!");
      }
    } catch (err: any) {
      showSystemNotice("error", "Failed to save calculator rates.");
    }
  };

  // Save individual key changes
  const handleSaveKeys = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await fetch("/api/admin/update-keys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(apiKeys)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Authentication keys update failed.");

      showSystemNotice("success", "Global credentials and WhatsApp triggers locked successfully!");
      fetchAdminData();
    } catch (err: any) {
      showSystemNotice("error", err.message || "Failed to save keys.");
    } finally {
      setIsLoading(false);
    }
  };

  // Update User state
  const handleSaveUserEdit = async () => {
    if (!editingUser) return;
    try {
      setIsLoading(true);
      const parsedBalance = parseFloat(userBalanceInput);
      const res = await fetch("/api/admin/update-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: editingUser.id,
          walletBalance: isNaN(parsedBalance) ? undefined : parsedBalance,
          name: editingUser.name,
          email: editingUser.email,
          phone: editingUser.phone
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "User update operation failed.");

      showSystemNotice("success", "User state synchronized on backend!");
      setEditingUser(null);
      fetchAdminData();
    } catch (err: any) {
      showSystemNotice("error", err.message || "Failed to sync user ledger.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user profile? It removes all their ledger logs.")) return;
    try {
      setIsLoading(true);
      const res = await fetch("/api/admin/update-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, deleteUser: true })
      });
      if (res.ok) {
        showSystemNotice("success", "User deleted successfully.");
        fetchAdminData();
      }
    } catch (err: any) {
      showSystemNotice("error", "Error removing user.");
    } finally {
      setIsLoading(false);
    }
  };


  // Login Panel Structure
  if (!isAuthenticated) {
    return (
      <section className="bg-slate-50 min-h-screen py-24 px-4 flex items-center justify-center font-sans text-slate-900" id="admin-login-layout">
        <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-md relative overflow-hidden">
          <div className="absolute top-0 right-0 h-20 w-20 bg-orange-100/30 rounded-full blur-xl pointer-events-none"></div>
          
          <div className="text-center mb-8">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 border border-orange-200 text-orange-600 mb-4 shadow-sm">
              <Shield className="h-7 w-7" />
            </div>
            <h2 className="text-2xl font-black tracking-tight text-slate-900">Wavelet Secure Gate</h2>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              Administrative Control Hub for Al-Salam Sinner. Expose service lists, modify Naira/SIM rates, audit clients and secure API pipelines.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest block font-sans">
                Enter Master Password *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="e.g., admin123"
                  className="w-full rounded-xl border border-gray-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 placeholder-slate-400 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-200"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 focus:outline-none"
                >
                  {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                </button>
              </div>
            </div>

            {authError && (
              <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-xs text-red-650 flex items-center space-x-2">
                <AlertCircle className="h-4 w-4 shrink-0 text-red-500" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center space-x-2 rounded-xl bg-orange-600 py-3.5 text-xs font-bold text-white shadow-md shadow-orange-100 hover:bg-orange-700 transition-all cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4" />
                  <span>Unseal Console</span>
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-[10px] text-slate-400 font-mono">
            SECURE SYSTEM • STABLE REVERSE PROXY
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-slate-50 min-h-screen py-16 font-sans text-slate-900" id="admin-management-hub">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Summary banner */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 pb-6 border-b border-gray-200 gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 rounded-full bg-orange-50 px-3.5 py-1.5 text-xs text-orange-700 font-bold border border-orange-200/50">
              <Shield className="h-3.5 w-3.5" />
              <span>Wavelet Web-Architect Admin Space</span>
            </div>
            <h1 className="text-3xl font-black text-slate-900 mt-2 tracking-tight">System Configuration Central</h1>
            <p className="text-xs text-slate-500 mt-1">
              Dynamic pricing syncing, simulated wallets ledger, lead pipelines, and service catalogs.
            </p>
          </div>

          <div className="flex items-center space-x-3 w-full md:w-auto">
            <button
              onClick={fetchAdminData}
              disabled={isLoading}
              className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-sm cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? "animate-spin" : ""}`} />
              <span>Sync DB</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-slate-900 text-xs font-bold text-white hover:bg-slate-950 shadow-sm cursor-pointer"
            >
              <Lock className="h-3.5 w-3.5" />
              <span>Seal Panel</span>
            </button>
          </div>
        </div>

        {/* Global Action Notices */}
        {notice && (
          <div className={`mb-6 p-4 rounded-xl border flex items-center space-x-2.5 text-xs font-bold shadow-sm ${
            notice.type === "success" ? "bg-emerald-50 border-emerald-200 text-emerald-800" : "bg-red-50 border-red-200 text-red-800"
          }`}>
            {notice.type === "success" ? <CheckCircle2 className="h-5 w-5 text-emerald-600 animate-bounce" /> : <AlertCircle className="h-5 w-5 text-red-500" />}
            <span>{notice.msg}</span>
          </div>
        )}

        {/* Dynamic Metric Blocks - Bento Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          
          <div className="rounded-2xl border border-gray-200 bg-white p-5 flex items-center justify-between shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 h-16 w-16 bg-orange-100/10 rounded-full blur-lg pointer-events-none"></div>
            <div>
              <p className="text-[11px] uppercase tracking-widest text-slate-400 font-bold">Inbound Leads</p>
              <h3 className="text-3xl font-black text-slate-900 mt-1">{leads.length}</h3>
              <p className="text-[10px] text-emerald-600 font-bold mt-1.5 flex items-center space-x-0.5">
                <TrendingUp className="h-3 w-3" />
                <span>Active Funnels</span>
              </p>
            </div>
            <div className="bg-orange-50 border border-orange-100 p-3 rounded-xl text-orange-600">
              <ListTodo className="h-6 w-6" />
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 flex items-center justify-between shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 h-16 w-16 bg-blue-100/10 rounded-full blur-lg pointer-events-none"></div>
            <div>
              <p className="text-[11px] uppercase tracking-widest text-slate-400 font-bold">Registered Users</p>
              <h3 className="text-3xl font-black text-slate-900 mt-1">{users.length}</h3>
              <p className="text-[10px] text-slate-500 font-semibold mt-1.5">Simulated Client Wallets</p>
            </div>
            <div className="bg-blue-50 border border-blue-100 p-3 rounded-xl text-blue-600">
              <Users className="h-6 w-6" />
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 flex items-center justify-between shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 h-16 w-16 bg-emerald-100/10 rounded-full blur-lg pointer-events-none"></div>
            <div>
              <p className="text-[11px] uppercase tracking-widest text-slate-400 font-bold">Total Services</p>
              <h3 className="text-3xl font-black text-slate-900 mt-1">
                {(services.nairaPackages?.length || 0) + (services.digitalAssets?.length || 0)}
              </h3>
              <p className="text-[10px] text-slate-500 font-semibold mt-1.5">
                Synced Store Solutions
              </p>
            </div>
            <div className="bg-emerald-50 border border-emerald-100 p-3 rounded-xl text-emerald-600">
              <Database className="h-6 w-6" />
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 flex items-center justify-between shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 h-16 w-16 bg-purple-100/10 rounded-full blur-lg pointer-events-none"></div>
            <div>
              <p className="text-[11px] uppercase tracking-widest text-slate-400 font-bold">Active API Key</p>
              <h3 className="text-xs font-mono font-bold text-slate-900 mt-2 bg-slate-100 px-2 py-1.5 rounded border border-gray-200 truncate max-w-[150px]">
                {apiKeys.GEMINI_API_KEY ? "🔑 Set (Active)" : "❌ Key Missing"}
              </h3>
              <p className="text-[9px] text-slate-500 mt-1 truncate">
                WhatsApp: {apiKeys.VITE_WHATSAPP_NUMBER || "Not Decided"}
              </p>
            </div>
            <div className="bg-purple-50 border border-purple-100 p-3 rounded-xl text-purple-600">
              <KeyRound className="h-6 w-6" />
            </div>
          </div>

        </div>

        {/* Admin Navigation Hub Segment */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Tab buttons sidebar - 3 cols */}
          <div className="lg:col-span-3 space-y-2.5">
            <div className="text-slate-450 text-[10px] font-bold uppercase tracking-widest pl-2 mb-2">Workspace Categories</div>
            
            <button
              onClick={() => setActiveTab("leads")}
              className={`w-full flex items-center justify-between px-4 py-3 text-xs font-bold rounded-xl transition-all ${
                activeTab === "leads" 
                  ? "bg-orange-600 text-white shadow-md shadow-orange-100" 
                  : "bg-white border border-gray-200 text-slate-600 hover:text-slate-900 hover:bg-white/80"
              }`}
            >
              <span className="flex items-center space-x-2">
                <ListTodo className="h-4.5 w-4.5" />
                <span>Leads & Inquiries</span>
              </span>
              <span className={`h-5 px-1.5 rounded-full font-sans text-[10px] flex items-center justify-center font-black ${activeTab === "leads" ? "bg-white text-orange-600" : "bg-slate-100 text-slate-600"}`}>
                {leads.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("services")}
              className={`w-full flex items-center justify-between px-4 py-3 text-xs font-bold rounded-xl transition-all ${
                activeTab === "services" 
                  ? "bg-orange-600 text-white shadow-md shadow-orange-100" 
                  : "bg-white border border-gray-200 text-slate-600 hover:text-slate-900 hover:bg-white/80"
              }`}
            >
              <span className="flex items-center space-x-2">
                <Database className="h-4.5 w-4.5" />
                <span>Price & Services Catalog</span>
              </span>
            </button>

            <button
              onClick={() => setActiveTab("users")}
              className={`w-full flex items-center justify-between px-4 py-3 text-xs font-bold rounded-xl transition-all ${
                activeTab === "users" 
                  ? "bg-orange-600 text-white shadow-md shadow-orange-100" 
                  : "bg-white border border-gray-200 text-slate-600 hover:text-slate-900 hover:bg-white/80"
              }`}
            >
              <span className="flex items-center space-x-2">
                <Users className="h-4.5 w-4.5" />
                <span>Client Wallets Ledger</span>
              </span>
              <span className={`h-5 px-1.5 rounded-full font-sans text-[10px] flex items-center justify-center font-black ${activeTab === "users" ? "bg-white text-orange-600" : "bg-slate-100 text-slate-600"}`}>
                {users.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("keys")}
              className={`w-full flex items-center justify-between px-4 py-3 text-xs font-bold rounded-xl transition-all ${
                activeTab === "keys" 
                  ? "bg-orange-600 text-white shadow-md shadow-orange-100" 
                  : "bg-white border border-gray-200 text-slate-600 hover:text-slate-900 hover:bg-white/80"
              }`}
            >
              <span className="flex items-center space-x-2">
                <Settings className="h-4.5 w-4.5" />
                <span>API Credentials Setup</span>
              </span>
            </button>
          </div>

          {/* Subview Container - 9 cols */}
          <div className="lg:col-span-9">
            
            {/* SUB-TAB 1: LEADS PIPELINE PANEL */}
            {activeTab === "leads" && (
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between pb-4 border-b border-gray-150 mb-6">
                  <h3 className="text-base font-bold text-slate-900">Lead Capture Pipeline</h3>
                  <span className="text-[10px] font-mono text-slate-450 font-bold bg-slate-100 border border-gray-200 px-2 py-0.5 rounded">
                    PERSISTED DATABASE LOGS
                  </span>
                </div>

                {leads.length === 0 ? (
                  <div className="text-center py-12 italic text-sm text-slate-400">
                    No leads received yet. Submit any booking form to stream logs here live.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {leads.map((lead: any) => (
                      <div 
                        key={lead.id} 
                        className={`rounded-xl border p-4.5 relative overflow-hidden transition-all text-xs ${
                          lead.status === "contacted" 
                            ? "border-emerald-100 bg-emerald-50/10" 
                            : lead.status === "archived" 
                            ? "border-gray-150 bg-slate-50/40 opacity-70" 
                            : "border-gray-200 bg-slate-50"
                        }`}
                      >
                        {/* Status Label Overlay */}
                        <div className="absolute top-4 right-4 flex items-center space-x-2">
                          <span className={`rounded-full px-2 py-0.5 text-[8.5px] font-black uppercase tracking-wider ${
                            lead.status === "contacted"
                              ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                              : lead.status === "archived"
                              ? "bg-slate-200 text-slate-600"
                              : "bg-orange-100 text-orange-850 border border-orange-200 animate-pulse"
                          }`}>
                            {lead.status || "new"}
                          </span>
                        </div>

                        {/* Heading attributes */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-sm font-black text-slate-900">{lead.name}</h4>
                            <p className="text-[11px] text-slate-450 font-mono mt-1 flex items-center gap-1">
                              <Clock className="h-3 w-3 inline text-slate-400" />
                              <span>Ref: {lead.id} • {new Date(lead.timestamp).toLocaleDateString()} {new Date(lead.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                            </p>
                          </div>

                          <div className="space-y-1 text-slate-700 md:text-right md:pr-16">
                            <p className="font-bold text-slate-900 leading-tight">Service: {lead.service}</p>
                            <p className="text-[10px] text-slate-500">Tier: {lead.packageType} • Budget: <strong className="text-slate-900">{lead.customBudget}</strong></p>
                          </div>
                        </div>

                        {/* Contacts Box */}
                        <div className="mt-3 py-2 border-t border-b border-gray-200/50 flex flex-wrap gap-x-6 gap-y-1.5 text-slate-650 font-medium">
                          {lead.email && (
                            <span className="flex items-center gap-1.5">
                              <Mail className="h-3.5 w-3.5 text-slate-400" />
                              <span>Email: <a href={`mailto:${lead.email}`} className="text-orange-600 underline font-semibold">{lead.email}</a></span>
                            </span>
                          )}
                          {lead.phone && (
                            <span className="flex items-center gap-1.5">
                              <Phone className="h-3.5 w-3.5 text-slate-400" />
                              <span>WhatsApp: <a href={`https://wa.me/${lead.phone.replace(/\D/g, "")}`} target="_blank" rel="noreferrer" className="text-emerald-600 underline font-semibold font-mono">{lead.phone}</a></span>
                            </span>
                          )}
                          {lead.source && (
                            <span className="flex items-center gap-1.5">
                              <FileText className="h-3.5 w-3.5 text-slate-400" />
                              <span>Channel Source: <span className="text-slate-905 italic">{lead.source}</span></span>
                            </span>
                          )}
                        </div>

                        {/* Description Brief */}
                        {lead.message && (
                          <div className="mt-3 bg-white border border-gray-150 rounded-lg p-3 text-slate-800 leading-relaxed italic">
                            "{lead.message}"
                          </div>
                        )}

                        {/* Pipeline control Buttons */}
                        <div className="mt-3.5 flex items-center justify-end space-x-2 pt-2 border-t border-gray-200/40">
                          {lead.status !== "contacted" && (
                            <button
                              onClick={() => handleLeadStatusChange(lead.id, "contacted")}
                              className="px-2.5 py-1.5 rounded-lg border border-emerald-200 bg-emerald-50 text-[10px] font-bold text-emerald-800 hover:bg-emerald-100 flex items-center space-x-1 cursor-pointer"
                            >
                              <Check className="h-3 w-3" />
                              <span>Mark Met/Contacted</span>
                            </button>
                          )}
                          {lead.status !== "archived" && (
                            <button
                              onClick={() => handleLeadStatusChange(lead.id, "archived")}
                              className="px-2.5 py-1.5 rounded-lg border border-gray-200 bg-white text-[10px] font-bold text-slate-600 hover:bg-slate-55 flex items-center space-x-1 cursor-pointer"
                            >
                              <span>Archive</span>
                            </button>
                          )}
                          
                          <button
                            onClick={() => handleDeleteLead(lead.id)}
                            className="px-2.5 py-1.5 rounded-lg border border-red-100 bg-red-50 text-[10px] font-bold text-red-600 hover:bg-red-100 flex items-center space-x-1 cursor-pointer"
                          >
                            <Trash2 className="h-3 w-3" />
                            <span>Delete File</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* SUB-TAB 2: CONFIG RATES & SERVICES CATALOG */}
            {activeTab === "services" && (
              <div className="space-y-6">
                
                {/* 2.1 Master Rate modifiers for Service Calculator */}
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                  <h3 className="text-base font-bold text-slate-900 border-b border-gray-150 pb-3 mb-4 flex items-center gap-1.5">
                    <DollarSign className="h-5 w-5 text-orange-600" />
                    <span>Supplementary Budget Timeline Surcharges (Naira)</span>
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                    <div className="space-y-1.5 bg-slate-50 border border-gray-150 p-4 rounded-xl">
                      <label className="font-bold text-slate-700 block">Fast-Track Timeline Price (3-day target)</label>
                      <div className="flex gap-2.5 mt-1">
                        <input
                          type="number"
                          id="misc-fasttrack-input"
                          defaultValue={services.miscRates.fastTrackPrice}
                          onBlur={(e) => handleSaveMiscRates("fastTrackPrice", parseInt(e.target.value) || 0)}
                          className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-slate-950 font-bold focus:outline-none focus:border-orange-500 font-mono"
                        />
                        <button className="px-3 rounded-lg bg-slate-900 text-white font-bold hover:bg-slate-950 text-[10px] shrink-0">
                          Set Price
                        </button>
                      </div>
                      <p className="text-[10px] text-slate-450 italic mt-1.5">Currently configured as additional timeline urgency offset.</p>
                    </div>

                    <div className="space-y-1.5 bg-slate-50 border border-gray-150 p-4 rounded-xl">
                      <label className="font-bold text-slate-700 block">Quality Site Care Retention (Monthly Security Support)</label>
                      <div className="flex gap-2.5 mt-1">
                        <input
                          type="number"
                          id="misc-support-input"
                          defaultValue={services.miscRates.monthlySupportPrice}
                          onBlur={(e) => handleSaveMiscRates("monthlySupportPrice", parseInt(e.target.value) || 0)}
                          className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-slate-950 font-bold focus:outline-none focus:border-orange-500 font-mono"
                        />
                        <button className="px-3 rounded-lg bg-slate-900 text-white font-bold hover:bg-slate-950 text-[10px] shrink-0">
                          Set Price
                        </button>
                      </div>
                      <p className="text-[10px] text-slate-455 italic mt-1.5">Currently configured as additional recurring support insurance.</p>
                    </div>
                  </div>
                </div>

                {/* 2.2 Dynamic Services Catalogue (Editable lists of standard packages and digital store assets) */}
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                  
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-3 border-b border-gray-150 mb-6 gap-3">
                    <div>
                      <h3 className="text-base font-bold text-slate-900">Custom Solution Catalog Inventory</h3>
                      <p className="text-[11px] text-slate-500 mt-0.5">Edit prices and attributes for Naira packages and digital scripts.</p>
                    </div>
                    {/* Trigger creation of new elements */}
                    <button
                      onClick={() => setEditingService({
                        tabType: "digital",
                        id: "digital-" + Date.now(),
                        item: { id: "ds-" + Date.now(), type: "script", name: "New Script Name", price: 10000, category: "Fintech", shortDesc: "Write descriptions...", features: ["Module"], techStack: ["React"], approxSize: "5MB" }
                      })}
                      className="px-3 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-700 text-white text-[10px] font-bold flex items-center space-x-1 cursor-pointer"
                    >
                      <Plus className="h-3 w-3" />
                      <span>Add Digital Script</span>
                    </button>
                  </div>

                  {/* Naira services packages */}
                  <div className="space-y-4 mb-8">
                    <h4 className="text-xs font-black text-orange-600 uppercase tracking-widest bg-orange-50 border border-orange-100 px-3 py-1.5 rounded">
                      Standard Naira Services (Calculator Sync)
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {services.nairaPackages.map((pkg: any) => (
                        <div key={pkg.id} className="p-4 rounded-xl border border-gray-200 bg-slate-50 flex flex-col justify-between hover:border-gray-300 transition-colors text-xs">
                          <div>
                            <div className="flex justify-between items-start gap-1">
                              <span className="text-[9px] font-mono font-black text-slate-400 uppercase tracking-wider">{pkg.category}</span>
                              <span className="font-mono text-[11px] font-black text-orange-600 bg-orange-50 border border-orange-100 px-2 py-0.5 rounded">{pkg.priceLabel || `₦${pkg.priceValue.toLocaleString()}`}</span>
                            </div>
                            <h5 className="font-bold text-slate-900 mt-1">{pkg.name}</h5>
                            <p className="text-[10px] text-slate-500 mt-1 lines-2 min-h-[30px] leading-tight">{pkg.shortDesc}</p>
                          </div>

                          <div className="mt-4 pt-3.5 border-t border-gray-200/50 flex items-center justify-end">
                            <button
                              onClick={() => setEditingService({ tabType: "naira", id: pkg.id, item: { ...pkg } })}
                              className="px-2.5 py-1 rounded-md border border-gray-300 bg-white text-[10px] font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
                            >
                              Edit Price & Info
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Digital Store assets */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-black text-orange-600 uppercase tracking-widest bg-orange-50 border border-orange-100 px-3 py-1.5 rounded">
                      Digital Solution Assets (Store Store Sync)
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {services.digitalAssets.map((asset: any) => (
                        <div key={asset.id} className="p-4 rounded-xl border border-gray-200 bg-slate-50 flex flex-col justify-between hover:border-gray-300 transition-colors text-xs">
                          <div>
                            <div className="flex justify-between items-start gap-1">
                              <span className="text-[9px] font-mono font-black text-blue-500 uppercase tracking-wider bg-blue-50/50 px-1.5 py-0.5 rounded border border-blue-100/40">{asset.type} • {asset.category}</span>
                              <span className="font-mono text-[11px] font-black text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded">₦{asset.price.toLocaleString()}</span>
                            </div>
                            <h5 className="font-bold text-slate-900 mt-1">{asset.name}</h5>
                            <p className="text-[10px] text-slate-500 mt-1 lines-2 min-h-[30px] leading-tight">{asset.shortDesc}</p>
                          </div>

                          <div className="mt-4 pt-3.5 border-t border-gray-200/50 flex items-center justify-between">
                            <span className="text-[9px] font-mono text-slate-400">{asset.approxSize || "Service Delivery"}</span>
                            <button
                              onClick={() => setEditingService({ tabType: "digital", id: asset.id, item: { ...asset } })}
                              className="px-2.5 py-1 rounded-md border border-gray-300 bg-white text-[10px] font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
                            >
                              Edit Price & Info
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* OTP App Rates lists */}
                  <div className="space-y-4 className mt-8">
                    <h4 className="text-xs font-black text-orange-600 uppercase tracking-widest bg-orange-50 border border-orange-100 px-3 py-1.5 rounded">
                      OTP SIM Activation Channels (Dynamic App Rates)
                    </h4>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {services.otpApps.map((appItem: any) => (
                        <div key={appItem.id} className="p-3.5 rounded-xl border border-gray-200 bg-slate-50 text-xs">
                          <p className="font-bold text-slate-900 truncate">{appItem.appName}</p>
                          <p className="text-[10px] font-mono mt-1 text-slate-500">Vol: {appItem.availableNumbers} SIMs</p>
                          
                          <div className="flex items-center justify-between mt-3.5 pt-2 border-t border-gray-200/50">
                            <span className="font-mono text-[10.5px] font-bold text-orange-600">₦{appItem.price.toLocaleString()}</span>
                            <button
                              onClick={() => setEditingService({ tabType: "otp", id: appItem.id, item: { ...appItem } })}
                              className="text-[9.5px] font-bold text-blue-600 underline hover:text-blue-700"
                            >
                              Edit
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Virtual numbers list */}
                  <div className="space-y-4 mt-8">
                    <h4 className="text-xs font-black text-orange-600 uppercase tracking-widest bg-orange-50 border border-orange-100 px-3 py-1.5 rounded">
                      Lease Virtual Private Numbers (Monthly Rates)
                    </h4>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {services.virtualNumbers.map((num: any) => (
                        <div key={num.id} className="p-3.5 rounded-xl border border-gray-200 bg-slate-50 text-xs">
                          <p className="font-bold text-slate-900 flex items-center space-x-1.5">
                            <span>{num.flag}</span>
                            <span className="truncate">{num.country}</span>
                          </p>
                          <p className="text-[10px] font-mono mt-1 text-slate-500">Route prefix: {num.prefix}</p>
                          
                          <div className="flex items-center justify-between mt-3.5 pt-2 border-t border-gray-200/50">
                            <span className="font-mono text-[10.5px] font-bold text-orange-600">₦{num.monthlyCost.toLocaleString()}/m</span>
                            <button
                              onClick={() => setEditingService({ tabType: "virtual", id: num.id, item: { ...num } })}
                              className="text-[9.5px] font-bold text-blue-600 underline hover:text-blue-700"
                            >
                              Edit
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>
            )}

            {/* SUB-TAB 3: CLIENT LEDGERS & WALLETS RECORD */}
            {activeTab === "users" && (
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between pb-4 border-b border-gray-150 mb-6">
                  <h3 className="text-base font-bold text-slate-900">Wallet Ledgers & User Registries</h3>
                  <span className="text-[10px] font-mono text-slate-450 font-bold bg-slate-100 border border-gray-200 px-2 py-0.5 rounded">
                    REAL-TIME SYNC
                  </span>
                </div>

                {users.length === 0 ? (
                  <div className="text-center py-12 italic text-sm text-slate-400">
                    No active users recorded inside system ledger database.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {users.map((user: any) => (
                      <div key={user.id} className="rounded-xl border border-gray-200 bg-slate-50 p-4.5 text-xs relative overflow-hidden">
                        
                        {/* Upper Details */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div>
                            <h4 className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                              <span>{user.name}</span>
                              <span className="font-normal font-mono text-[9px] text-slate-400 bg-slate-150 px-1 rounded">ID: {user.id}</span>
                            </h4>
                            <p className="text-[10.5px] text-slate-500 mt-1">
                              Email: <strong className="text-slate-700">{user.email}</strong> • Phone: <strong className="text-slate-700">{user.phone || "Not Set"}</strong>
                            </p>
                          </div>

                          <div className="bg-white border border-gray-200 p-3 rounded-xl flex items-center justify-between min-w-[180px] shadow-xs">
                            <div>
                              <p className="text-[10px] uppercase font-bold text-slate-400 font-mono">Available Balance</p>
                              <p className="text-base font-black text-orange-600 font-mono mt-0.5">₦{user.walletBalance.toLocaleString()}</p>
                            </div>
                            <button
                              onClick={() => {
                                setEditingUser(user);
                                setUserBalanceInput(user.walletBalance.toString());
                              }}
                              className="px-2 py-1 rounded border border-orange-200 bg-orange-50 text-orange-700 font-bold hover:bg-orange-100 text-[10px] cursor-pointer"
                            >
                              Fund / Adjust
                            </button>
                          </div>
                        </div>

                        {/* User purchased inventory assets lists */}
                        <div className="mt-4 pt-3.5 border-t border-gray-200/50">
                          <p className="text-[10px] font-black uppercase text-slate-450 tracking-widest">Inventory Vault Assets ({user.inventory?.length || 0})</p>
                          {(!user.inventory || user.inventory.length === 0) ? (
                            <p className="text-[10.5px] italic text-slate-400 mt-1">No products bought yet.</p>
                          ) : (
                            <div className="mt-2 flex flex-wrap gap-2">
                              {user.inventory.map((inv: any, i: number) => (
                                <span key={i} className="rounded-lg bg-white border border-gray-200 px-2. py-1.5 text-[10px] text-slate-700 font-medium flex items-center gap-1">
                                  <span>📦 {inv.name}</span>
                                  <strong className="text-slate-450 font-mono text-[9px]">({inv.key || "Code"})</strong>
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Delete account */}
                        <div className="mt-4 pt-3 border-t border-gray-200/30 flex justify-end">
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="bg-red-50 hover:bg-red-100 text-red-650 px-2.5 py-1 text-[9.5px] rounded border border-red-100 hover:border-red-200 font-bold transition-all cursor-pointer flex items-center space-x-1"
                          >
                            <Trash2 className="h-3 w-3" />
                            <span>Delete Profile Logs</span>
                          </button>
                        </div>

                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* SUB-TAB 4: SYSTEM API KEY UPDATER */}
            {activeTab === "keys" && (
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between pb-4 border-b border-gray-150 mb-6">
                  <h3 className="text-base font-bold text-slate-900">System Integration Credentials</h3>
                  <span className="text-[10px] font-mono text-slate-450 font-bold bg-slate-100 border border-gray-200 px-2 py-0.5 rounded">
                    ENCRYPTED SECURE TUNNEL
                  </span>
                </div>

                <form onSubmit={handleSaveKeys} className="space-y-5 text-xs">
                  
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700 uppercase tracking-wider block">
                      Google Gemini AI Key (GEMINI_API_KEY)
                    </label>
                    <input
                      type="password"
                      value={apiKeys.GEMINI_API_KEY}
                      onChange={(e) => setApiKeys({ ...apiKeys, GEMINI_API_KEY: e.target.value })}
                      placeholder="AIzaSy..."
                      className="w-full rounded-xl border border-gray-200 bg-slate-50 px-4 py-3 text-slate-950 font-mono focus:border-orange-500 focus:outline-none"
                    />
                    <p className="text-[10px] text-slate-450 leading-normal italic mt-1">
                      Enables the interactive Side-Hustle Automation Advisor, utilizing high-speed gemini-3.5-flash models server-side.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700 uppercase tracking-wider block">
                      Primary WhatsApp Phone Target (VITE_WHATSAPP_NUMBER)
                    </label>
                    <input
                      type="text"
                      value={apiKeys.VITE_WHATSAPP_NUMBER}
                      onChange={(e) => setApiKeys({ ...apiKeys, VITE_WHATSAPP_NUMBER: e.target.value })}
                      placeholder="e.g., +2348012345678"
                      className="w-full rounded-xl border border-gray-200 bg-slate-50 px-4 py-3 text-slate-950 font-mono focus:border-orange-500 focus:outline-none"
                    />
                    <p className="text-[10px] text-slate-450 leading-normal italic mt-1">
                      Direct WhatsApp link redirects throughout the page will sync immediately to this number.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-700 uppercase tracking-wider block">
                        Paystack Secret Key (PAYSTACK_SECRET_KEY)
                      </label>
                      <input
                        type="password"
                        value={apiKeys.PAYSTACK_SECRET_KEY}
                        onChange={(e) => setApiKeys({ ...apiKeys, PAYSTACK_SECRET_KEY: e.target.value })}
                        placeholder="sk_test_..."
                        className="w-full rounded-xl border border-gray-200 bg-slate-50 px-3.5 py-3 text-slate-950 font-mono focus:border-orange-500 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-700 uppercase tracking-wider block">
                        Bulk SMS Gateway API Token (BULK_SMS_API_KEY)
                      </label>
                      <input
                        type="password"
                        value={apiKeys.BULK_SMS_API_KEY}
                        onChange={(e) => setApiKeys({ ...apiKeys, BULK_SMS_API_KEY: e.target.value })}
                        placeholder="sms_prod_..."
                        className="w-full rounded-xl border border-gray-200 bg-slate-50 px-3.5 py-3 text-slate-950 font-mono focus:border-orange-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200 flex justify-end">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="flex items-center space-x-1.5 px-4.5 py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-md shadow-orange-100 cursor-pointer disabled:opacity-50"
                    >
                      <Save className="h-4 w-4" />
                      <span>Lock and Save Credentials</span>
                    </button>
                  </div>

                </form>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* --- MODULARS OVERLAY DIALOGS --- */}

      {/* 1. Modal for Editing Services */}
      {editingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" id="service-edit-overlay">
          <div className="w-full max-w-lg rounded-2xl bg-white border border-gray-200 p-6.5 max-h-[90vh] overflow-y-auto text-xs font-sans relative">
            <h3 className="text-base font-bold text-slate-900 border-b border-gray-150 pb-3 mb-4">
              Edit Service Profile: <span className="text-orange-600 font-mono">{editingService.id}</span>
            </h3>

            <form onSubmit={(e) => { e.preventDefault(); handleSaveServiceEdit(); }} className="space-y-4 text-slate-700">
              
              <div className="space-y-1">
                <label className="font-bold">Service/Product Name *</label>
                <input
                  type="text"
                  required
                  value={editingService.item.name || ""}
                  onChange={(e) => setEditingService({
                    ...editingService,
                    item: { ...editingService.item, name: e.target.value }
                  })}
                  className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-slate-950 font-semibold focus:border-orange-500 focus:outline-none bg-slate-50"
                />
              </div>

              {editingService.tabType !== "otp" && editingService.tabType !== "virtual" ? (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold">Naira Base Price Value *</label>
                      <input
                        type="number"
                        required
                        value={editingService.item.priceValue !== undefined ? editingService.item.priceValue : editingService.item.price || 0}
                        onChange={(e) => {
                          const val = parseInt(e.target.value) || 0;
                          setEditingService({
                            ...editingService,
                            item: { 
                              ...editingService.item, 
                              priceValue: val, 
                              price: val,
                              priceLabel: `₦${val.toLocaleString()}`
                            }
                          });
                        }}
                        className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-slate-950 font-mono focus:border-orange-500 focus:outline-none bg-slate-50"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold">Price Label Display *</label>
                      <input
                        type="text"
                        required
                        value={editingService.item.priceLabel || ""}
                        onChange={(e) => setEditingService({
                          ...editingService,
                          item: { ...editingService.item, priceLabel: e.target.value }
                        })}
                        placeholder="₦45,000"
                        className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-slate-950 focus:border-orange-500 focus:outline-none bg-slate-50"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold">Short Description Display *</label>
                    <textarea
                      required
                      value={editingService.item.shortDesc || ""}
                      onChange={(e) => setEditingService({
                        ...editingService,
                        item: { ...editingService.item, shortDesc: e.target.value }
                      })}
                      rows={2.5}
                      className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-slate-950 focus:border-orange-500 focus:outline-none bg-slate-50 resize-none"
                    />
                  </div>
                </>
              ) : editingService.tabType === "otp" ? (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold">Price (₦) *</label>
                    <input
                      type="number"
                      required
                      value={editingService.item.price || 0}
                      onChange={(e) => setEditingService({
                        ...editingService,
                        item: { ...editingService.item, price: parseInt(e.target.value) || 0 }
                      })}
                      className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-slate-950 font-mono focus:border-orange-500 focus:outline-none bg-slate-50"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold">Available Simulated SIMs Volume *</label>
                    <input
                      type="number"
                      required
                      value={editingService.item.availableNumbers || 0}
                      onChange={(e) => setEditingService({
                        ...editingService,
                        item: { ...editingService.item, availableNumbers: parseInt(e.target.value) || 0 }
                      })}
                      className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-slate-950 font-mono focus:border-orange-500 focus:outline-none bg-slate-50"
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold">Monthly Cost (₦) *</label>
                    <input
                      type="number"
                      required
                      value={editingService.item.monthlyCost || 0}
                      onChange={(e) => setEditingService({
                        ...editingService,
                        item: { ...editingService.item, monthlyCost: parseInt(e.target.value) || 0 }
                      })}
                      className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-slate-950 font-mono focus:border-orange-500 focus:outline-none bg-slate-50"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold">Prefix *</label>
                    <input
                      type="text"
                      required
                      value={editingService.item.prefix || ""}
                      onChange={(e) => setEditingService({
                        ...editingService,
                        item: { ...editingService.item, prefix: e.target.value }
                      })}
                      className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-slate-950 font-mono focus:border-orange-500 focus:outline-none bg-slate-50"
                    />
                  </div>
                </div>
              )}

              {/* Action operations buttons */}
              <div className="pt-4 border-t border-gray-150 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
                  className="px-4 py-2 rounded-xl border border-gray-200 bg-white hover:bg-slate-50 text-slate-650 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold cursor-pointer disabled:opacity-50"
                >
                  Save Sync Details
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* 2. Modal for Editing Users Wallets */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" id="user-edit-overlay">
          <div className="w-full max-w-md rounded-2xl bg-white border border-gray-200 p-6.5 text-xs font-sans relative">
            <h3 className="text-base font-bold text-slate-900 border-b border-gray-150 pb-3 mb-4 flex items-center gap-1.5">
              <Landmark className="h-5 w-5 text-orange-600" />
              <span>Modify Wallet balance Ledger</span>
            </h3>

            <div className="space-y-4">
              <div className="space-y-1 text-slate-700">
                <p>Client Profile: <strong>{editingUser.name}</strong></p>
                <p>Target Account: <span className="font-mono">{editingUser.email}</span></p>
              </div>

              <div className="space-y-1.5 bg-slate-50 border border-gray-200 p-4.5 rounded-xl">
                <label className="font-bold text-slate-700 block text-[10.5px] uppercase tracking-wider">Configure Wallet Balance (Naira) *</label>
                <input
                  type="number"
                  required
                  value={userBalanceInput}
                  onChange={(e) => setUserBalanceInput(e.target.value)}
                  placeholder="e.g., 45000"
                  className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-slate-950 font-bold focus:border-orange-500 focus:outline-none font-mono text-base mt-1.5"
                />
                
                <div className="flex flex-wrap gap-1.5 mt-3">
                  <button
                    onClick={() => setUserBalanceInput((prev) => (parseFloat(prev || "0") + 5000).toString())}
                    className="px-2 py-1 rounded bg-slate-200 hover:bg-slate-300 text-slate-750 text-[10px] font-bold"
                  >
                    +₦5k
                  </button>
                  <button
                    onClick={() => setUserBalanceInput((prev) => (parseFloat(prev || "0") + 15000).toString())}
                    className="px-2 py-1 rounded bg-slate-200 hover:bg-slate-300 text-slate-750 text-[10px] font-bold"
                  >
                    +₦15k
                  </button>
                  <button
                    onClick={() => setUserBalanceInput((prev) => (parseFloat(prev || "0") + 50000).toString())}
                    className="px-2 py-1 rounded bg-slate-200 hover:bg-slate-300 text-slate-750 text-[10px] font-bold"
                  >
                    +₦50k
                  </button>
                  <button
                    onClick={() => setUserBalanceInput((prev) => Math.max(0, parseFloat(prev || "0") - 10000).toString())}
                    className="px-2 py-1 rounded bg-red-105 hover:bg-red-200 text-red-700 text-[10px] font-bold"
                  >
                    -₦10k
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-150 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2 rounded-xl border border-gray-200 bg-white hover:bg-slate-50 text-slate-650 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveUserEdit}
                  disabled={isLoading}
                  className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold cursor-pointer disabled:opacity-50"
                >
                  Commit Balance
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </section>
  );
}

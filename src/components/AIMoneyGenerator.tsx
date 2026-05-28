import React, { useState } from "react";
import { Sparkles, HelpCircle, FileText, Share2, Clipboard, ChevronRight, RefreshCw, AlertTriangle } from "lucide-react";
import { motion } from "motion/react";

export default function AIMoneyGenerator() {
  const [skills, setSkills] = useState<string>("");
  const [interests, setInterests] = useState<string>("");
  const [hours, setHours] = useState<string>("10");
  const [location, setLocation] = useState<string>("Nigeria/African local market & Remote Global");
  const [budget, setBudget] = useState<string>("Low (₦0 - ₦45k)");
  
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [blueprint, setBlueprint] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!skills || !interests) {
      setErrorMsg("Please list at least some basic skills or raw interests to give the AI proper context.");
      return;
    }

    setIsGenerating(true);
    setErrorMsg(null);
    setBlueprint(null);

    try {
      const response = await fetch("/api/generate-blueprint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          skills,
          interests,
          hours,
          location,
          budget,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to contact AI generator service.");
      }

      setBlueprint(data.blueprint);
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong during generated blueprint stream. Ensure your GEMINI_API_KEY is configured in Settings.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyClipboard = () => {
    if (!blueprint) return;
    navigator.clipboard.writeText(blueprint);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Helper parser to format Markdown headers, lists, and bold text into beautifully-styled React children
  const renderFormattedBlueprint = (mdRaw: string) => {
    const lines = mdRaw.split("\n");
    return lines.map((line, idx) => {
      const trimmed = line.trim();
      
      // Empty lines
      if (!trimmed) {
        return <div key={idx} className="h-4"></div>;
      }

      // Main Big Headers (e.g. ## )
      if (trimmed.startsWith("###")) {
        return (
          <h4 key={idx} className="text-md font-bold text-amber-300 mt-6 mb-3 flex items-center">
            <ChevronRight className="h-4 w-4 text-purple-400 shrink-0 mr-1" />
            {trimmed.replace(/^###\s*/, "")}
          </h4>
        );
      }
      if (trimmed.startsWith("##")) {
        return (
          <h3 key={idx} className="text-lg font-bold text-white border-b border-purple-950/60 pb-1.5 mt-7 mb-4">
            {trimmed.replace(/^##\s*/, "")}
          </h3>
        );
      }
      if (trimmed.startsWith("#")) {
        return (
          <h2 key={idx} className="text-xl font-extrabold text-white mt-8 mb-4 border-l-4 border-amber-400 pl-3">
            {trimmed.replace(/^#\s*/, "")}
          </h2>
        );
      }

      // List Elements
      if (trimmed.startsWith("*") || trimmed.startsWith("-")) {
        const textOnly = trimmed.replace(/^[\*\-]\s*/, "");
        return (
          <li key={idx} className="list-none flex items-start space-x-2 text-xs text-gray-300 my-2 pl-4">
            <span className="text-purple-400 mt-0.5 shrink-0">•</span>
            <span>{parseBoldContent(textOnly)}</span>
          </li>
        );
      }

      // Numbered List elements
      if (/^\d+\.\s+/.test(trimmed)) {
        return (
          <div key={idx} className="flex items-start space-x-2.5 text-xs text-gray-300 my-3 pl-2">
            <span className="flex h-5 w-5 items-center justify-center rounded bg-purple-950/60 border border-purple-500/20 text-[10px] font-bold text-purple-300 mt-0.5 shrink-0">
              {trimmed.match(/^\d+/)?.[0]}
            </span>
            <span className="leading-relaxed">{parseBoldContent(trimmed.replace(/^\d+\.\s*/, ""))}</span>
          </div>
        );
      }

      // Default paragraphs
      return (
        <p key={idx} className="text-xs text-gray-300 leading-relaxed my-2.5">
          {parseBoldContent(trimmed)}
        </p>
      );
    });
  };

  // Helper parser to turn **bold text** into strong highlights
  const parseBoldContent = (text: string) => {
    const parts = text.split(/\*\*([^\*]+)\*\*/g);
    return parts.map((part, index) => {
      // odd indices are matches
      return index % 2 === 1 ? (
        <strong key={index} className="text-amber-300 font-bold">{part}</strong>
      ) : (
        part
      );
    });
  };

  return (
    <section id="ai-advisor-tool-page" className="bg-[#07070a] py-16 md:py-24 relative overflow-hidden">
      <div className="pointer-events-none absolute top-10 right-1/4 h-80 w-80 rounded-full bg-purple-600/5 blur-[120px]"></div>
      
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title details */}
        <div className="text-center max-w-3xl mx-auto mb-14" id="ai-advisor-header">
          <span className="inline-flex items-center space-x-1 border border-purple-500/20 bg-purple-950/25 px-3 py-1.5 text-xs font-semibold text-purple-300 rounded-md">
            <Sparkles className="h-4 w-4 text-amber-400 animate-pulse" />
            <span>Interactive AI Lab Tool</span>
          </span>
          <h2 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">
            AI Side-Hustle Advisor &{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 bg-clip-text text-transparent">Blueprint Creator</span>
          </h2>
          <p className="mt-4 text-sm text-gray-400">
            Tell the AI your skills and budget, and Al-Salam Sinner's customized Gemini advisor will instantly design an action-plan specifying exact AI tools and templates to monetize!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Form questionnaire - 5 Cols */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-[#0e0e16]/80 border border-purple-900/15 rounded-2xl p-6.5 shadow-2xl backdrop-blur-md" id="ai-advisor-inputs">
            <div>
              <h3 className="text-md font-bold text-white mb-5 pb-3 border-b border-purple-950 flex items-center space-x-2">
                <FileText className="h-5 w-5 text-purple-400" />
                <span>Profit Blueprint Configurator</span>
              </h3>

              <form onSubmit={handleGenerate} className="space-y-4">
                
                {/* Skills */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-300 uppercase tracking-wide block">Your Current Skills</label>
                  <input
                    type="text"
                    required
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    placeholder="e.g., Typing fast, Photoshop basic, Writing, Teaching..."
                    className="w-full text-xs rounded-xl border border-purple-900/30 bg-[#07070a] px-4 py-3 text-white placeholder-gray-650 focus:border-purple-500 focus:outline-none"
                  />
                  <p className="text-[10px] text-gray-500">List whatever you enjoy or do well, even non-technical things.</p>
                </div>

                {/* Interests */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-300 uppercase tracking-wide block">Fields of Interests</label>
                  <input
                    type="text"
                    required
                    value={interests}
                    onChange={(e) => setInterests(e.target.value)}
                    placeholder="e.g., Real estate, Cooking, E-commerce, Social media..."
                    className="w-full text-xs rounded-xl border border-purple-900/30 bg-[#07070a] px-4 py-3 text-white placeholder-gray-650 focus:border-purple-500 focus:outline-none"
                  />
                </div>

                {/* Grid Inputs */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Hours */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-300 uppercase tracking-wide block">Hours Extra / Week</label>
                    <select
                      value={hours}
                      onChange={(e) => setHours(e.target.value)}
                      className="w-full text-xs rounded-xl border border-purple-900/30 bg-[#07070a] px-3.5 py-3 text-white focus:border-purple-500 focus:outline-none"
                    >
                      <option value="5">Part-Time (5 hrs)</option>
                      <option value="10">Mid-Share (10 hrs)</option>
                      <option value="20">Active Dev (20 hrs)</option>
                      <option value="40">Full Time Pro (40 hrs)</option>
                    </select>
                  </div>

                  {/* Range Zone */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-300 uppercase tracking-wide block">Target Client Location</label>
                    <select
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full text-xs rounded-xl border border-purple-900/30 bg-[#07070a] px-3.5 py-3 text-white focus:border-purple-500 focus:outline-none"
                    >
                      <option value="Nigeria Local (in Naira)">Naija Local (Naira)</option>
                      <option value="African regional businesses">African Local</option>
                      <option value="Global remote freelance (Fiverr/Upwork)">Global (USD / EUR)</option>
                      <option value="Hybrid local & overseas retainers">Hybrid Options</option>
                    </select>
                  </div>
                </div>

                {/* Starting budget */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-300 uppercase tracking-wide block">Initial Setup Budget</label>
                  <div className="grid grid-cols-3 gap-2">
                    {["Free (₦0)", "Low (₦45k)", "Pro (₦350k+)"].map((bVal) => (
                      <button
                        key={bVal}
                        type="button"
                        onClick={() => setBudget(bVal)}
                        className={`text-[10px] font-bold py-2 border rounded-xl text-center transition-all ${
                          budget === bVal ? "bg-purple-950/40 border-purple-500 text-purple-300" : "bg-[#07070a]/70 border-purple-950 text-gray-500"
                        }`}
                      >
                        {bVal}
                      </button>
                    ))}
                  </div>
                </div>

              </form>
            </div>

            <div className="pt-6 border-t border-purple-950/80 mt-6">
              <button
                id="generate-blueprint-btn"
                type="button"
                onClick={handleGenerate}
                disabled={isGenerating || !skills || !interests}
                className="w-full flex items-center justify-center space-x-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-amber-500 py-4 text-xs font-bold text-white shadow-lg shadow-purple-950/25 cursor-pointer disabled:opacity-50 disabled:pointer-events-none hover:scale-[1.01] active:scale-[0.99] transition-all"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin text-amber-300" />
                    <span>Analyzing Arbitrage Opportunities...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4.5 w-4.5 text-amber-300 animate-pulse" />
                    <span>Generate AI side-Hustle Blueprint</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Results Output Canvas - 7 Cols */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl border border-purple-950 bg-[#0e0e15]/40 p-6 min-h-[480px] shadow-inner" id="ai-advisor-output">
            
            {/* Blueprint container content */}
            <div className="flex-grow flex flex-col">
              {blueprint ? (
                <div className="space-y-4" id="blueprint-content-canvas">
                  
                  {/* Action Panel toolbar */}
                  <div className="flex items-center justify-between border-b border-purple-950/60 pb-3 mb-4 text-xs">
                    <span className="flex items-center space-x-1.5 font-bold text-amber-300">
                      <Sparkles className="h-4.5 w-4.5" />
                      <span>CUSTOM BLUEPRINT GENERATED</span>
                    </span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={handleCopyClipboard}
                        className="flex items-center space-x-1 text-gray-400 hover:text-white bg-purple-950/30 px-3 py-1.5 rounded-lg border border-purple-900/30 transition-colors"
                      >
                        <Clipboard className="h-3.5 w-3.5" />
                        <span>{copied ? "Copied!" : "Copy Clean Blueprint"}</span>
                      </button>
                    </div>
                  </div>

                  {/* Formatted body */}
                  <div className="max-h-[500px] overflow-y-auto pr-2 text-xs text-gray-300 scrollbar-thin scrollbar-thumb-purple-900 scrollbar-track-transparent">
                    {renderFormattedBlueprint(blueprint)}
                  </div>

                </div>
              ) : isGenerating ? (
                <div className="flex-grow flex flex-col items-center justify-center py-20 text-center" id="blueprint-generating-loader">
                  <div className="relative flex h-16 w-16 items-center justify-center mb-6">
                    <span className="absolute animate-ping h-full w-full rounded-full bg-purple-500/20"></span>
                    <RefreshCw className="h-8 w-8 text-purple-400 animate-spin" />
                  </div>
                  <h4 className="text-base font-bold text-white">Gemini 3.5 is drafting your business plan</h4>
                  <p className="mt-2 text-xs text-gray-400 max-w-sm px-6">
                    Searching Nigeria's service gap index, identifying tools to optimize setup, and drafting copywriting trigger prompts...
                  </p>
                </div>
              ) : errorMsg ? (
                <div className="flex-grow flex flex-col items-center justify-center py-20 text-center" id="blueprint-error-container">
                  <div className="rounded-full bg-red-500/10 p-4 border border-red-500/25 mb-4">
                    <AlertTriangle className="h-8 w-8 text-red-400" />
                  </div>
                  <h4 className="text-base font-bold text-white">Oops, Generation Halted</h4>
                  <p className="mt-2 text-xs text-gray-400 max-w-sm px-6">
                    {errorMsg}
                  </p>
                  <button
                    onClick={handleGenerate}
                    className="mt-5 text-xs font-bold text-purple-300 border border-purple-500/30 hover:border-purple-400 px-4 py-2 rounded-xl bg-purple-950/20"
                  >
                    Retry Query
                  </button>
                </div>
              ) : (
                <div className="flex-grow flex flex-col items-center justify-center py-20 text-center" id="blueprint-placeholder">
                  <div className="rounded-full bg-purple-950/30 p-5 border border-purple-900/10 mb-5 relative">
                    <Sparkles className="h-8 w-8 text-purple-400" />
                    <span className="absolute -top-1 -right-1 h-3.5 w-3.5 bg-amber-400 rounded-full border border-[#0d0d15] animate-pulse"></span>
                  </div>
                  <h4 className="text-base font-bold text-white">Your Actionable Blueprint is Ready to Load</h4>
                  <p className="mt-1.5 text-xs text-gray-400 max-w-sm px-6 leading-relaxed">
                    Set your skills on the left side, configure your available time, and click "Generate" to receive a personalized money-making plan, complete with copy-paste prompt templates!
                  </p>
                </div>
              )}
            </div>

            {/* Quick footer disclaimer */}
            <div className="mt-6 pt-4 border-t border-purple-950/40 text-[10px] text-gray-500 flex items-center justify-between">
              <span>* High-ticket side-hustles assume consistent deployment of efforts.</span>
              <span>Educator: Al-Salam Sinner</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

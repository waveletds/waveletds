import React, { useState } from "react";
import { BookOpen, Calendar, Eye, Clock, ChevronRight, X, Heart, Shield } from "lucide-react";
import { BLOG_DATA, BlogPost } from "../types";
import { motion, AnimatePresence } from "motion/react";

export default function Blog() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [postLikes, setPostLikes] = useState<Record<string, number>>({});

  const categories = ["all", "AI Money", "SEO Hacks", "Branding", "Web Trends"];

  const filteredPosts = activeCategory === "all"
    ? BLOG_DATA
    : BLOG_DATA.filter((post) => post.category === activeCategory);

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setPostLikes(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  return (
    <section id="blog-page" className="bg-[#07070b]/90 py-16 md:py-24 border-t border-purple-900/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Title details */}
        <div id="blog-header" className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-flex items-center space-x-1.5 rounded-full bg-purple-950/20 border border-purple-500/20 px-3 py-1.5 text-xs font-bold text-purple-300">
            <BookOpen className="h-4 w-4 text-purple-400" />
            <span>SEO CONTENT HUB</span>
          </span>
          <h2 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">
            Al-Salam Sinner's <span className="bg-gradient-to-r from-purple-400 to-amber-300 bg-clip-text text-transparent">Traffic Secrets</span>
          </h2>
          <p className="mt-3.5 text-xs text-gray-400">
            Gain complete access to proven frameworks for generating inbound traffic, automating local maps optimizations, and maximizing your client payouts.
          </p>
        </div>

        {/* Categories filters */}
        <div id="blog-category-filters" className="flex flex-wrap items-center justify-center gap-2 mb-12 border-b border-purple-950/20 pb-5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-xl px-4 py-2.5 text-xs font-bold transition-all ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-purple-600 to-indigo-650 text-white shadow-md shadow-purple-950/15"
                  : "bg-[#0c0c12]/60 text-gray-400 hover:text-white hover:bg-[#12121b]"
              }`}
            >
              {cat === "all" ? "All Secret Posts" : cat}
            </button>
          ))}
        </div>

        {/* Blog Post List Cards Grid */}
        <div id="blog-post-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post, idx) => (
              <motion.div
                key={post.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25, delay: idx * 0.04 }}
                onClick={() => setSelectedPost(post)}
                className="group flex flex-col justify-between rounded-2xl border border-purple-950 bg-[#0d0d15]/80 p-5.5 shadow-xl hover:border-purple-600/30 transition-all duration-300 hover:-y-1 cursor-pointer"
              >
                <div>
                  {/* Article category & date */}
                  <div className="flex items-center justify-between text-[10px] text-gray-500 font-mono">
                    <span className="font-bold text-purple-400 uppercase tracking-wider">{post.category}</span>
                    <span className="flex items-center space-x-1">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{post.date}</span>
                    </span>
                  </div>

                  {/* Headline Title */}
                  <h3 className="mt-3.5 text-base font-extrabold text-white group-hover:text-amber-400 transition-colors leading-snug">
                    {post.title}
                  </h3>

                  {/* Intro Excerpt */}
                  <p className="mt-3 text-xs text-gray-400 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                {/* Footer read time & stats */}
                <div className="mt-6 pt-4 border-t border-purple-950/60 flex items-center justify-between text-[10px] text-gray-500">
                  <span className="flex items-center space-x-1">
                    <Clock className="h-3.5 w-3.5 text-purple-400" />
                    <span>{post.readTime}</span>
                  </span>

                  <div className="flex items-center space-x-3">
                    <span className="flex items-center space-x-1">
                      <Eye className="h-3.5 w-3.5 text-gray-600" />
                      <span>{post.views + (postLikes[post.id] || 0) * 15} views</span>
                    </span>
                    
                    <button
                      onClick={(e) => handleLike(post.id, e)}
                      className="inline-flex items-center space-x-1 text-gray-600 hover:text-red-400 transition-colors"
                    >
                      <Heart className={`h-3.5 w-3.5 ${postLikes[post.id] ? "fill-red-500 text-red-500" : ""}`} />
                      <span>{postLikes[post.id] || 0}</span>
                    </button>
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Detailed Modal expanded slider */}
        <AnimatePresence>
          {selectedPost && (
            <motion.div
              id="blog-modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
              onClick={() => setSelectedPost(null)}
            >
              <motion.div
                id="blog-modal-content"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", damping: 30, stiffness: 350 }}
                onClick={(e) => e.stopPropagation()}
                className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-purple-900/30 bg-[#0a0a0f] p-6.5 sm:p-8 md:p-10 shadow-2xl relative scrollbar-thin scrollbar-thumb-purple-905"
              >
                {/* Close absolute */}
                <button
                  id="close-blog-btn"
                  onClick={() => setSelectedPost(null)}
                  className="absolute top-5 right-5 rounded-lg border border-purple-900/30 bg-purple-950/20 p-2 text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>

                {/* Article Header */}
                <div className="text-xs text-gray-500 font-mono mb-4 flex items-center space-x-3">
                  <span className="text-purple-400 uppercase tracking-widest font-bold">{selectedPost.category}</span>
                  <span>•</span>
                  <span>Published {selectedPost.date}</span>
                  <span>•</span>
                  <span>{selectedPost.readTime}</span>
                </div>

                <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white leading-tight">
                  {selectedPost.title}
                </h2>

                {/* Quick warning */}
                <div className="my-6 rounded-xl bg-purple-950/20 border border-purple-500/10 p-4 flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-amber-400 mt-0.5 shrink-0 animate-pulse" />
                  <div className="text-xs text-gray-300">
                    <p className="font-bold">Original Article from Al-Salam Sinner's Archive</p>
                    <p className="mt-0.5 text-gray-400">These blueprints are tested and deployable inside Nigeria and local African markets. Do not share raw templates without permission.</p>
                  </div>
                </div>

                {/* Formatted Text Content */}
                <div className="text-xs leading-relaxed text-gray-300 space-y-4">
                  {selectedPost.content.split("\n").map((line, lIdx) => {
                    const lineTrim = line.trim();
                    if (!lineTrim) return <div key={lIdx} className="h-1.5"></div>;
                    
                    if (lineTrim.startsWith("####")) {
                      return (
                        <h4 key={lIdx} className="text-xs font-bold text-amber-300 pt-2 mb-1 uppercase">
                          {lineTrim.replace(/^####\s*/, "")}
                        </h4>
                      );
                    }
                    if (lineTrim.startsWith("###")) {
                      return (
                        <h3 key={lIdx} className="text-sm font-bold text-white border-b border-purple-950/60 pb-1 mt-6 mb-3">
                          {lineTrim.replace(/^###\s*/, "")}
                        </h3>
                      );
                    }
                    if (lineTrim.startsWith("*") || lineTrim.startsWith("-")) {
                      return (
                        <li key={lIdx} className="list-none flex items-start space-x-2.5 my-1.5 pl-3.5">
                          <span className="text-purple-400 shrink-0">•</span>
                          <span>{lineTrim.replace(/^[\*\-]\s*/, "")}</span>
                        </li>
                      );
                    }
                    
                    // Bold substrings
                    const parts = lineTrim.split(/\*\*([^\*]+)\*\*/g);
                    return (
                      <p key={lIdx} className="my-2 text-gray-300 leading-relaxed font-normal">
                        {parts.map((p, idx) => {
                          return idx % 2 === 1 ? (
                            <strong key={idx} className="text-amber-300 font-bold">{p}</strong>
                          ) : (
                            p
                          );
                        })}
                      </p>
                    );
                  })}
                </div>

                {/* Modal footer callout to book */}
                <div className="mt-10 pt-6 border-t border-purple-950/60 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-gray-400">
                    <span>Interested in ranking your business map or learning AI?</span>
                  </div>
                  <button
                    id="blog-book-btn"
                    onClick={() => {
                      setSelectedPost(null);
                      const el = document.getElementById("service-calculator-section");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-5 py-3 text-xs font-bold text-white shadow-md hover:brightness-110"
                  >
                    <span>Rent This Package / Book GMB</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}

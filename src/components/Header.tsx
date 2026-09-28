import React from 'react';
import { Award, FileText, Search, ShieldCheck, UserCheck, PhoneCall, HelpCircle } from 'lucide-react';
import { UNIVERSITY_INFO } from '../data/mockData';

interface HeaderProps {
  activeTab: 'request' | 'track' | 'preview' | 'verify' | 'registrar';
  setActiveTab: (tab: 'request' | 'track' | 'preview' | 'verify' | 'registrar') => void;
  pendingRegistrarCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  pendingRegistrarCount
}) => {
  return (
    <header className="bg-slate-900 text-slate-100 border-b border-slate-800 shadow-md">
      {/* Top utility banner */}
      <div className="bg-slate-950 border-b border-slate-800/80 px-4 py-1.5 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-amber-400/90 font-medium">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              UEN e-Transcript Portal (24/7 Automated Clearance)
            </span>
            <span className="hidden md:inline text-slate-500">|</span>
            <span className="hidden md:inline text-slate-400">National Universities Commission (NUC) Accredited • Remita Enabled</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#help" onClick={(e) => { e.preventDefault(); alert("University Registrar Desk: " + UNIVERSITY_INFO.phone + " | Email: " + UNIVERSITY_INFO.email); }} className="hover:text-amber-300 transition-colors flex items-center gap-1">
              <PhoneCall className="w-3 h-3" />
              <span>Records Desk: {UNIVERSITY_INFO.phone}</span>
            </a>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400 font-mono">Academic Session 2025/2026</span>
          </div>
        </div>
      </div>

      {/* Main University Header */}
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Logo & University identity */}
          <div className="flex items-center gap-3.5">
            <div className="relative flex-shrink-0 w-13 h-13 rounded-lg bg-gradient-to-br from-amber-600 via-amber-700 to-slate-900 p-0.5 shadow-lg border border-amber-500/40">
              <div className="w-full h-full rounded-[7px] bg-slate-900 flex flex-col items-center justify-center text-amber-400">
                <Award className="w-7 h-7 text-amber-400" />
                <span className="text-[9px] font-bold tracking-widest font-display-crest text-amber-300">UEN</span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-display-crest">
                  {UNIVERSITY_INFO.name}
                </h1>
                <span className="hidden sm:inline-block text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Est. {UNIVERSITY_INFO.established}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 flex items-center gap-1.5 font-medium">
                <span>{UNIVERSITY_INFO.department}</span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-400 italic font-serif-academic">"{UNIVERSITY_INFO.motto}"</span>
              </p>
            </div>
          </div>

          {/* Quick status badge */}
          <div className="hidden lg:flex items-center gap-3 text-right">
            <div className="px-3.5 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/80 text-xs">
              <div className="text-slate-400">Official Electronic Delivery</div>
              <div className="text-amber-400 font-semibold flex items-center gap-1 justify-end">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Cryptographically Sealed (PDF)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="mt-5 flex items-center gap-1 sm:gap-2 overflow-x-auto border-t border-slate-800 pt-3 pb-1 no-scrollbar">
          <button
            id="tab-request-btn"
            onClick={() => setActiveTab('request')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-md text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === 'request'
                ? 'bg-amber-600 text-white shadow-sm font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Request Transcript</span>
          </button>

          <button
            id="tab-track-btn"
            onClick={() => setActiveTab('track')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-md text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === 'track'
                ? 'bg-amber-600 text-white shadow-sm font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>Track Application</span>
          </button>

          <button
            id="tab-preview-btn"
            onClick={() => setActiveTab('preview')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-md text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === 'preview'
                ? 'bg-amber-600 text-white shadow-sm font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Official Transcript Viewer</span>
          </button>

          <button
            id="tab-verify-btn"
            onClick={() => setActiveTab('verify')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-md text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === 'verify'
                ? 'bg-amber-600 text-white shadow-sm font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Verify Credential</span>
          </button>

          <button
            id="tab-registrar-btn"
            onClick={() => setActiveTab('registrar')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-md text-xs sm:text-sm font-medium transition-all whitespace-nowrap ml-auto ${
              activeTab === 'registrar'
                ? 'bg-slate-100 text-slate-900 shadow-sm font-bold'
                : 'text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60'
            }`}
          >
            <UserCheck className="w-4 h-4 text-amber-400" />
            <span>Registrar Desk</span>
            {pendingRegistrarCount > 0 && (
              <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] bg-amber-500 text-slate-950 font-bold">
                {pendingRegistrarCount}
              </span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
};

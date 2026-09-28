/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { RequestTranscriptForm } from './components/RequestTranscriptForm';
import { TrackApplication } from './components/TrackApplication';
import { TranscriptDocument } from './components/TranscriptDocument';
import { VerifyTranscript } from './components/VerifyTranscript';
import { RegistrarDesk } from './components/RegistrarDesk';
import { PrintReceiptModal } from './components/PrintReceiptModal';
import { TranscriptRequest, RequestStatus } from './types';
import { INITIAL_REQUESTS, UNIVERSITY_INFO } from './data/mockData';
import { ShieldCheck, CheckCircle2, Lock, Award, Mail, Phone, ExternalLink } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'request' | 'track' | 'preview' | 'verify' | 'registrar'>('request');
  
  // Local persistence for requests so newly created requests persist during the session
  const [requests, setRequests] = useState<TranscriptRequest[]>(() => {
    try {
      const saved = localStorage.getItem('amu_transcript_requests');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_REQUESTS;
  });

  const [selectedTrackingId, setSelectedTrackingId] = useState<string>('TRX-2026-88102');
  const [selectedStudentId, setSelectedStudentId] = useState<string>('AMU-2020-0914');
  const [verificationCode, setVerificationCode] = useState<string>('AMU-VER-9842-CS-89A');
  const [receiptModalRequest, setReceiptModalRequest] = useState<TranscriptRequest | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('amu_transcript_requests', JSON.stringify(requests));
    } catch (e) {
      console.error(e);
    }
  }, [requests]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Handler when student submits new request
  const handleNewRequest = (newReq: TranscriptRequest) => {
    setRequests((prev) => [newReq, ...prev]);
    setSelectedTrackingId(newReq.id);
    setSelectedStudentId(newReq.studentId);
    showToast(`Application ${newReq.id} received and logged into Registrar queue.`);
  };

  // Handler when Registrar updates status
  const handleUpdateStatus = (
    id: string, 
    newStatus: RequestStatus, 
    notes?: string, 
    holdReason?: string
  ) => {
    setRequests((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          const updated: TranscriptRequest = {
            ...r,
            status: newStatus,
            statusNotes: notes || r.statusNotes,
            holdReason: holdReason !== undefined ? holdReason : r.holdReason,
            dispatchedAt: newStatus === 'dispatched' ? new Date().toLocaleString() : r.dispatchedAt,
            securityHash: newStatus === 'dispatched' && !r.securityHash ? `AMU-VER-${Math.floor(1000 + Math.random() * 9000)}-${r.studentId.slice(-4)}` : r.securityHash
          };
          return updated;
        }
        return r;
      })
    );

    if (newStatus === 'dispatched') {
      showToast(`Request ${id} officially attested, cryptographically sealed, and dispatched.`);
    } else if (newStatus === 'hold') {
      showToast(`Academic/Financial hold placed on ${id}.`);
    } else {
      showToast(`Request ${id} milestone updated to ${newStatus.replace('_', ' ')}.`);
    }
  };

  const pendingRegistrarCount = requests.filter(r => r.status !== 'dispatched').length;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans-ui text-slate-900">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="no-print fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-3 text-xs animate-in fade-in slide-in-from-bottom-3 duration-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        pendingRegistrarCount={pendingRegistrarCount}
      />

      {/* Main View Container */}
      <main className="flex-1 pb-16">
        {activeTab === 'request' && (
          <RequestTranscriptForm
            onSubmitSuccess={handleNewRequest}
            onNavigateToTrack={(id) => {
              setSelectedTrackingId(id);
              setActiveTab('track');
            }}
            onNavigateToPreview={(sId) => {
              setSelectedStudentId(sId);
              setActiveTab('preview');
            }}
          />
        )}

        {activeTab === 'track' && (
          <TrackApplication
            requests={requests}
            selectedTrackingId={selectedTrackingId}
            onViewTranscript={(sId) => {
              setSelectedStudentId(sId);
              setActiveTab('preview');
            }}
            onOpenReceipt={(req) => setReceiptModalRequest(req)}
          />
        )}

        {activeTab === 'preview' && (
          <TranscriptDocument
            selectedStudentId={selectedStudentId}
            onVerifyCode={(code) => {
              setVerificationCode(code);
              setActiveTab('verify');
            }}
          />
        )}

        {activeTab === 'verify' && (
          <VerifyTranscript
            initialCode={verificationCode}
            onViewStudentTranscript={(sId) => {
              setSelectedStudentId(sId);
              setActiveTab('preview');
            }}
          />
        )}

        {activeTab === 'registrar' && (
          <RegistrarDesk
            requests={requests}
            onUpdateRequestStatus={handleUpdateStatus}
            onViewTranscript={(sId) => {
              setSelectedStudentId(sId);
              setActiveTab('preview');
            }}
          />
        )}
      </main>

      {/* Receipt Modal */}
      {receiptModalRequest && (
        <PrintReceiptModal
          request={receiptModalRequest}
          onClose={() => setReceiptModalRequest(null)}
        />
      )}

      {/* Collegiate Academic Footer */}
      <footer className="no-print bg-slate-900 text-slate-400 text-xs border-t border-slate-800 py-10 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-800">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" />
                <span className="font-bold text-white font-display-crest text-sm tracking-wide">
                  {UNIVERSITY_INFO.name}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {UNIVERSITY_INFO.department}. Official electronic and physical credential dissemination system.
              </p>
              <div className="text-[11px] text-amber-400 font-serif-academic italic">
                "{UNIVERSITY_INFO.motto}"
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-white font-bold text-xs uppercase tracking-wider">Office Hours & Location</h4>
              <p className="text-[11px] text-slate-400">
                Monday – Friday: 8:30 AM – 5:00 PM EST<br />
                Academic Records Pavilion, Suite 104<br />
                {UNIVERSITY_INFO.address}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-white font-bold text-xs uppercase tracking-wider">Registrar Inquiries</h4>
              <p className="text-[11px] text-slate-400">
                Direct Line: <strong className="text-slate-300">{UNIVERSITY_INFO.phone}</strong><br />
                Official Email: <strong className="text-slate-300">{UNIVERSITY_INFO.email}</strong><br />
                WES Direct Electronic Dispatch EDI Code: <span className="font-mono text-amber-300">AMU-0914</span>
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-white font-bold text-xs uppercase tracking-wider">Accreditation & Compliance</h4>
              <div className="flex items-center gap-2 text-slate-300 text-[11px]">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>FERPA Compliant Security Infrastructure</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Transcripts issued through this portal bear the cryptographic signature of the University Registrar and are certified authentic for global admissions and employment.
              </p>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
            <div>
              © 2026 {UNIVERSITY_INFO.name}. All Rights Reserved. Student Records & Academic Archives Division.
            </div>
            <div className="flex items-center gap-4">
              <span>Security Hash Verification</span>
              <span>•</span>
              <span>Electronic Seal Protocol</span>
              <span>•</span>
              <span>Privacy & Records Disclosure</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

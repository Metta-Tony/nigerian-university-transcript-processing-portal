import React, { useState } from 'react';
import { 
  Search, CheckCircle2, Clock, AlertTriangle, FileText, Printer, 
  Building, Mail, ShieldAlert, ArrowRight, ExternalLink, RefreshCw, Copy, Check
} from 'lucide-react';
import { TranscriptRequest, RequestStatus } from '../types';

interface TrackApplicationProps {
  requests: TranscriptRequest[];
  selectedTrackingId?: string;
  onViewTranscript: (studentId: string) => void;
  onOpenReceipt: (request: TranscriptRequest) => void;
}

export const TrackApplication: React.FC<TrackApplicationProps> = ({
  requests,
  selectedTrackingId,
  onViewTranscript,
  onOpenReceipt
}) => {
  const [searchInput, setSearchInput] = useState<string>(selectedTrackingId || 'TRX-2026-88102');
  const [activeQuery, setActiveQuery] = useState<string>(selectedTrackingId || 'TRX-2026-88102');
  const [copied, setCopied] = useState<boolean>(false);

  const matchedRequest = requests.find(
    (r) => r.id.toLowerCase() === activeQuery.toLowerCase().trim() ||
           r.studentId.toLowerCase() === activeQuery.toLowerCase().trim()
  ) || requests[0];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveQuery(searchInput);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const statusSteps: { key: RequestStatus; title: string; desc: string }[] = [
    { key: 'submitted', title: '1. Request Received', desc: 'Order logged & identity authenticated' },
    { key: 'archive_retrieval', title: '2. Archive Retrieval', desc: 'Historical semester grade audits' },
    { key: 'clearance_review', title: '3. Clearances Review', desc: 'Bursary and departmental signs' },
    { key: 'ready_to_seal', title: '4. Registrar Seal', desc: 'Digital signature & hash generation' },
    { key: 'dispatched', title: '5. Dispatched', desc: 'Delivered securely to recipient' },
  ];

  const getStepIndex = (status: RequestStatus) => {
    if (status === 'submitted') return 0;
    if (status === 'archive_retrieval') return 1;
    if (status === 'clearance_review') return 2;
    if (status === 'ready_to_seal') return 3;
    if (status === 'dispatched') return 4;
    return 2; // for hold
  };

  const currentStepIdx = matchedRequest ? getStepIndex(matchedRequest.status) : 0;
  const isHold = matchedRequest?.status === 'hold';

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      {/* Search Header */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 sm:p-6 mb-6">
        <h2 className="text-xl font-bold text-slate-900 font-display-crest mb-1">
          Track Transcript Application Status
        </h2>
        <p className="text-xs text-slate-600 mb-4">
          Enter your Tracking Reference ID (e.g., <code className="font-mono bg-slate-100 px-1 py-0.5 rounded text-amber-700">TRX-2026-88102</code>) or Student Matric No (e.g. <code className="font-mono bg-slate-100 px-1 py-0.5 rounded text-amber-700">2019/248910</code>) to view real-time processing milestones.
        </p>

        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              id="track-search-input"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Enter Tracking ID (TRX-...) or Matric No (2019/...)"
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 font-mono"
            />
          </div>
          <button
            type="submit"
            id="track-search-btn"
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <span>Search</span>
          </button>
        </form>

        {/* Quick Sample Selector Chips */}
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-slate-100 text-xs">
          <span className="text-slate-400 font-medium">Test Status Samples:</span>
          {requests.slice(0, 4).map((req) => (
            <button
              key={req.id}
              onClick={() => {
                setSearchInput(req.id);
                setActiveQuery(req.id);
              }}
              className={`px-2.5 py-1 rounded text-[11px] font-mono border transition-colors ${
                matchedRequest?.id === req.id
                  ? 'bg-amber-100 text-amber-900 border-amber-400 font-bold'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {req.id} ({req.status.replace('_', ' ')})
            </button>
          ))}
        </div>
      </div>

      {/* Matched Request Card */}
      {matchedRequest ? (
        <div className="space-y-6">
          {/* Main Status Banner */}
          <div className={`rounded-xl border p-5 sm:p-6 shadow-sm ${
            isHold
              ? 'bg-red-50/80 border-red-200 text-red-950'
              : matchedRequest.status === 'dispatched'
              ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
              : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/80">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Tracking Reference</span>
                  <span className="font-mono font-bold text-base text-slate-900">{matchedRequest.id}</span>
                  <button
                    onClick={() => handleCopy(matchedRequest.id)}
                    className="p-1 hover:bg-slate-200 rounded text-slate-500 transition-colors"
                    title="Copy tracking code"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <div className="text-sm font-semibold text-slate-800 mt-1">
                  {matchedRequest.fullName} • <span className="font-mono text-slate-600">{matchedRequest.studentId}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  isHold
                    ? 'bg-red-600 text-white'
                    : matchedRequest.status === 'dispatched'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-amber-500 text-slate-950'
                }`}>
                  {isHold ? 'Action Required: Institutional Hold' : matchedRequest.status.replace('_', ' ')}
                </span>
                <span className="px-2.5 py-1 rounded bg-slate-100 border border-slate-300 text-slate-700 text-xs font-medium capitalize">
                  {matchedRequest.priority} Priority
                </span>
              </div>
            </div>

            {/* Hold Banner details if applicable */}
            {isHold && (
              <div className="mt-4 p-4 rounded-lg bg-red-100/90 border border-red-300 text-xs">
                <div className="flex items-start gap-2.5">
                  <ShieldAlert className="w-5 h-5 text-red-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-red-900">Transcript Issuance Paused - Academic / Financial Hold</h4>
                    <p className="mt-1 text-red-800 leading-relaxed font-medium">
                      {matchedRequest.holdReason}
                    </p>
                    <div className="mt-2 text-[11px] text-red-700">
                      <strong>Resolution:</strong> Please resolve this pending requirement directly with the Bursar or Department Coordinator. Once cleared, processing will automatically resume within 2 business hours.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 5-Stage Timeline */}
            <div className="mt-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
                Milestone Progress Timeline
              </h4>

              <div className="relative">
                <div className="hidden sm:block absolute top-4 left-4 right-4 h-0.5 bg-slate-200 -z-0"></div>
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                  {statusSteps.map((step, idx) => {
                    const isCompleted = !isHold && idx <= currentStepIdx;
                    const isCurrent = !isHold && idx === currentStepIdx;
                    const isStepHold = isHold && idx === currentStepIdx;

                    return (
                      <div key={step.key} className="flex sm:flex-col items-center sm:items-center text-left sm:text-center gap-3 sm:gap-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold z-10 transition-all ${
                          isStepHold
                            ? 'bg-red-600 text-white ring-4 ring-red-100'
                            : isCompleted
                            ? 'bg-emerald-600 text-white shadow-sm'
                            : isCurrent
                            ? 'bg-amber-500 text-slate-950 ring-4 ring-amber-100 font-extrabold'
                            : 'bg-slate-200 text-slate-500'
                        }`}>
                          {isStepHold ? (
                            <AlertTriangle className="w-4 h-4" />
                          ) : isCompleted ? (
                            <CheckCircle2 className="w-4 h-4" />
                          ) : (
                            idx + 1
                          )}
                        </div>

                        <div>
                          <div className={`text-xs font-semibold ${
                            isStepHold
                              ? 'text-red-700 font-bold'
                              : isCurrent
                              ? 'text-amber-700 font-bold'
                              : isCompleted
                              ? 'text-slate-900'
                              : 'text-slate-400'
                          }`}>
                            {step.title}
                          </div>
                          <p className="text-[11px] text-slate-500 hidden sm:block mt-0.5">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Status notes */}
            {matchedRequest.statusNotes && (
              <div className="mt-5 pt-4 border-t border-slate-200/80 text-xs text-slate-600 flex items-start gap-2">
                <Clock className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-800">Latest Registrar Log:</span>{" "}
                  <span>{matchedRequest.statusNotes}</span>
                  {matchedRequest.processedBy && (
                    <span className="text-slate-400 block mt-0.5 text-[11px]">Handled by: {matchedRequest.processedBy}</span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Detailed Metadata Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Delivery & Destination Specs */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs text-xs space-y-3">
              <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] flex items-center gap-1.5 border-b border-slate-100 pb-2">
                <Building className="w-3.5 h-3.5 text-amber-600" />
                <span>Recipient Destination Details</span>
              </h4>

              <div className="space-y-2 text-slate-600">
                <div className="flex justify-between">
                  <span className="text-slate-400">Target Organization:</span>
                  <span className="font-semibold text-slate-800 text-right">{matchedRequest.recipientName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Recipient Email:</span>
                  <span className="font-mono text-slate-800">{matchedRequest.recipientEmail}</span>
                </div>
                {matchedRequest.evaluationRefNo && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">WES / Eval Ref #:</span>
                    <span className="font-mono font-bold text-amber-700">{matchedRequest.evaluationRefNo}</span>
                  </div>
                )}
                {matchedRequest.recipientAddress && (
                  <div>
                    <span className="text-slate-400 block mb-0.5">Physical Shipping Address:</span>
                    <span className="text-slate-800 bg-slate-50 p-2 rounded block border border-slate-200">
                      {matchedRequest.recipientAddress}
                    </span>
                  </div>
                )}
                {matchedRequest.securityHash && (
                  <div className="pt-2 border-t border-slate-100 flex justify-between items-center">
                    <span className="text-slate-400">Cryptographic Seal Key:</span>
                    <span className="font-mono text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {matchedRequest.securityHash}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Timeline & Actions */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs text-xs space-y-3 flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] flex items-center gap-1.5 border-b border-slate-100 pb-2">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  <span>Processing Milestones & ETA</span>
                </h4>

                <div className="space-y-2 mt-2 text-slate-600">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Order Placed:</span>
                    <span className="font-medium text-slate-800">{matchedRequest.submittedAt}</span>
                  </div>
                  {matchedRequest.remitaRrr && (
                    <div className="flex justify-between">
                      <span className="text-slate-400">Remita RRR Code:</span>
                      <span className="font-mono font-bold text-amber-800">{matchedRequest.remitaRrr}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-slate-400">Expected Senate Dispatch:</span>
                    <span className="font-bold text-slate-900">{matchedRequest.estimatedCompletion}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Total Remita Paid:</span>
                    <span className="font-mono font-bold text-emerald-800">₦{matchedRequest.totalFee.toLocaleString('en-NG')} NGN</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Clearance Document:</span>
                    <span className="font-medium text-slate-700">{matchedRequest.uploadedDocumentName || 'Verified Portal Records'}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
                <button
                  onClick={() => onOpenReceipt(matchedRequest)}
                  className="flex-1 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Printer className="w-3.5 h-3.5 text-slate-600" />
                  <span>Official Receipt</span>
                </button>

                <button
                  onClick={() => onViewTranscript(matchedRequest.studentId)}
                  className="flex-1 px-3 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Official Transcript View</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
          <p className="text-slate-500 text-sm">
            No application matched the reference number <strong className="font-mono text-slate-800">{activeQuery}</strong>.
          </p>
          <button
            onClick={() => setActiveQuery('TRX-2026-88102')}
            className="mt-3 px-4 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-medium"
          >
            Load Sample Record (TRX-2026-88102)
          </button>
        </div>
      )}
    </div>
  );
};

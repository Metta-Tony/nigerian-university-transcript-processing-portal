import React, { useState } from 'react';
import { 
  UserCheck, ShieldCheck, AlertCircle, Clock, CheckCircle2, 
  Search, Filter, Stamp, RefreshCw, FileText, Ban, Check
} from 'lucide-react';
import { TranscriptRequest, RequestStatus } from '../types';
import { UNIVERSITY_INFO } from '../data/mockData';

interface RegistrarDeskProps {
  requests: TranscriptRequest[];
  onUpdateRequestStatus: (
    id: string, 
    newStatus: RequestStatus, 
    notes?: string, 
    holdReason?: string
  ) => void;
  onViewTranscript: (studentId: string) => void;
}

export const RegistrarDesk: React.FC<RegistrarDeskProps> = ({
  requests,
  onUpdateRequestStatus,
  onViewTranscript
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [holdModalReqId, setHoldModalReqId] = useState<string | null>(null);
  const [holdInputReason, setHoldInputReason] = useState<string>('Bursary Hold: Unsettled departmental laboratory surcharge (₦15,000). Please present Remita receipt at Bursary.');

  // Filter requests
  const filteredRequests = requests.filter((r) => {
    const matchesFilter = 
      filterStatus === 'all' || 
      (filterStatus === 'pending' && (r.status === 'submitted' || r.status === 'archive_retrieval' || r.status === 'clearance_review')) ||
      (filterStatus === 'ready_to_seal' && r.status === 'ready_to_seal') ||
      (filterStatus === 'hold' && r.status === 'hold') ||
      (filterStatus === 'dispatched' && r.status === 'dispatched');

    const matchesSearch = 
      r.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.recipientName.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  // Metrics
  const totalCount = requests.length;
  const readyToSealCount = requests.filter(r => r.status === 'ready_to_seal').length;
  const inProgressCount = requests.filter(r => ['submitted', 'archive_retrieval', 'clearance_review'].includes(r.status)).length;
  const holdCount = requests.filter(r => r.status === 'hold').length;
  const dispatchedCount = requests.filter(r => r.status === 'dispatched').length;

  const handleApproveAndSeal = (req: TranscriptRequest) => {
    onUpdateRequestStatus(
      req.id, 
      'dispatched', 
      `Officially attested and sealed with Registrar Cryptographic Key by ${UNIVERSITY_INFO.registrar}. Transmitted via secure institutional protocol.`,
      undefined
    );
  };

  const handleAdvanceStage = (req: TranscriptRequest) => {
    if (req.status === 'submitted') {
      onUpdateRequestStatus(req.id, 'archive_retrieval', 'Records vault accessed. Historical course credits retrieved.');
    } else if (req.status === 'archive_retrieval') {
      onUpdateRequestStatus(req.id, 'clearance_review', 'Archive records confirmed. Departmental and Bursary sign-off in progress.');
    } else if (req.status === 'clearance_review') {
      onUpdateRequestStatus(req.id, 'ready_to_seal', 'All clearances confirmed. Queued for Registrar signature and seal.');
    }
  };

  const handleApplyHold = (id: string) => {
    if (!holdInputReason.trim()) return;
    onUpdateRequestStatus(id, 'hold', 'Application flagged with administrative hold.', holdInputReason);
    setHoldModalReqId(null);
  };

  const handleReleaseHold = (id: string) => {
    onUpdateRequestStatus(id, 'clearance_review', 'Hold successfully resolved with Bursar/Department. Processing resumed.');
  };

  return (
    <div className="max-w-6xl mx-auto py-6 px-4">
      {/* Officer Header */}
      <div className="bg-slate-900 text-white rounded-xl border border-slate-800 p-6 mb-6 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider">
              <UserCheck className="w-4 h-4" />
              <span>Office of the Registrar • Administrative Workbench</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display-crest mt-1">
              Academic Records Processing Queue
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Authorized Evaluator: <strong className="text-slate-200">{UNIVERSITY_INFO.registrar}</strong> (Custodian of Academic Seals)
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs text-slate-300">
              Live Gateway Active
            </span>
          </div>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-6 pt-6 border-t border-slate-800">
          <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700/60">
            <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Total Requests</div>
            <div className="text-xl font-bold font-mono text-white mt-1">{totalCount}</div>
          </div>
          <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700/60">
            <div className="text-[10px] uppercase tracking-wider text-amber-400 font-semibold">In Progress</div>
            <div className="text-xl font-bold font-mono text-amber-300 mt-1">{inProgressCount}</div>
          </div>
          <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700/60">
            <div className="text-[10px] uppercase tracking-wider text-blue-400 font-semibold">Ready to Seal</div>
            <div className="text-xl font-bold font-mono text-blue-300 mt-1">{readyToSealCount}</div>
          </div>
          <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700/60">
            <div className="text-[10px] uppercase tracking-wider text-red-400 font-semibold">Active Holds</div>
            <div className="text-xl font-bold font-mono text-red-400 mt-1">{holdCount}</div>
          </div>
          <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700/60">
            <div className="text-[10px] uppercase tracking-wider text-emerald-400 font-semibold">Dispatched</div>
            <div className="text-xl font-bold font-mono text-emerald-400 mt-1">{dispatchedCount}</div>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              filterStatus === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All ({totalCount})
          </button>
          <button
            onClick={() => setFilterStatus('pending')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              filterStatus === 'pending'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            In Processing ({inProgressCount})
          </button>
          <button
            onClick={() => setFilterStatus('ready_to_seal')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              filterStatus === 'ready_to_seal'
                ? 'bg-amber-600 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Ready to Sign ({readyToSealCount})
          </button>
          <button
            onClick={() => setFilterStatus('hold')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              filterStatus === 'hold'
                ? 'bg-red-600 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Holds ({holdCount})
          </button>
          <button
            onClick={() => setFilterStatus('dispatched')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              filterStatus === 'dispatched'
                ? 'bg-emerald-700 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Dispatched ({dispatchedCount})
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search student, ref or target..."
            className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500"
          />
        </div>
      </div>

      {/* Queue Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-slate-100/80 border-b border-slate-200 text-slate-700">
              <tr>
                <th className="py-3 px-4 text-left font-semibold">Tracking Ref / Submitted</th>
                <th className="py-3 px-4 text-left font-semibold">Student Record</th>
                <th className="py-3 px-4 text-left font-semibold">Transcript Type & Target</th>
                <th className="py-3 px-4 text-center font-semibold">Status</th>
                <th className="py-3 px-4 text-right font-semibold">Registrar Officer Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredRequests.map((req) => {
                const isHold = req.status === 'hold';
                const isDispatched = req.status === 'dispatched';

                return (
                  <tr key={req.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-4">
                      <span className="font-mono font-bold text-slate-900 block">{req.id}</span>
                      <span className="text-[11px] text-slate-500">{req.submittedAt}</span>
                      <span className="inline-block mt-0.5 px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase bg-slate-100 text-slate-700">
                        {req.priority}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <span className="font-semibold text-slate-900 block">{req.fullName}</span>
                      <span className="text-[11px] font-mono text-slate-500">{req.studentId}</span>
                      <span className="text-[11px] text-slate-600 block truncate max-w-[180px]">{req.degree}</span>
                    </td>

                    <td className="py-3 px-4">
                      <span className="font-medium text-slate-900 block capitalize">
                        {req.transcriptType.replace('_', ' ')}
                      </span>
                      <span className="text-[11px] text-slate-600 block truncate max-w-[200px]" title={req.recipientName}>
                        To: {req.recipientName}
                      </span>
                      {req.evaluationRefNo && (
                        <span className="text-[10px] font-mono text-amber-800 bg-amber-50 px-1 py-0.2 rounded">
                          Ref: {req.evaluationRefNo}
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-4 text-center">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                        isHold
                          ? 'bg-red-100 text-red-800 border border-red-200'
                          : isDispatched
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : req.status === 'ready_to_seal'
                          ? 'bg-blue-100 text-blue-800 border border-blue-200'
                          : 'bg-amber-100 text-amber-800 border border-amber-200'
                      }`}>
                        {req.status.replace('_', ' ')}
                      </span>
                      {isHold && req.holdReason && (
                        <span className="block text-[10px] text-red-600 max-w-[140px] truncate mx-auto mt-0.5" title={req.holdReason}>
                          {req.holdReason}
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5 flex-wrap">
                        {/* View Transcript Preview */}
                        <button
                          onClick={() => onViewTranscript(req.studentId)}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[11px] font-medium transition-colors"
                          title="View academic courses & GPA"
                        >
                          Transcript
                        </button>

                        {/* If in early stages, allow advancing */}
                        {['submitted', 'archive_retrieval', 'clearance_review'].includes(req.status) && (
                          <button
                            onClick={() => handleAdvanceStage(req)}
                            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-900 text-white rounded text-[11px] font-semibold transition-colors"
                          >
                            Advance Stage →
                          </button>
                        )}

                        {/* If Ready to Seal or In clearance, allow Sign & Dispatched */}
                        {['clearance_review', 'ready_to_seal'].includes(req.status) && (
                          <button
                            onClick={() => handleApproveAndSeal(req)}
                            className="px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded text-[11px] font-bold flex items-center gap-1 transition-colors shadow-xs"
                          >
                            <Stamp className="w-3 h-3" />
                            <span>Sign & Seal</span>
                          </button>
                        )}

                        {/* Hold Management */}
                        {isHold ? (
                          <button
                            onClick={() => handleReleaseHold(req.id)}
                            className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[11px] font-semibold transition-colors"
                          >
                            Lift Hold
                          </button>
                        ) : !isDispatched && (
                          <button
                            onClick={() => setHoldModalReqId(req.id)}
                            className="px-2 py-1 text-red-700 hover:bg-red-50 rounded text-[11px] font-medium transition-colors"
                            title="Flag an administrative or library hold"
                          >
                            Flag Hold
                          </button>
                        )}

                        {isDispatched && (
                          <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Completed</span>
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredRequests.length === 0 && (
          <div className="p-8 text-center text-slate-500 text-xs">
            No requests matched the current search or filter criteria.
          </div>
        )}
      </div>

      {/* Flag Hold Modal */}
      {holdModalReqId && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 border border-slate-200">
            <div className="flex items-center gap-2 text-red-700 mb-2">
              <Ban className="w-5 h-5" />
              <h3 className="font-bold text-sm">Flag Academic / Financial Hold</h3>
            </div>
            <p className="text-xs text-slate-600 mb-4">
              Specify the reason why transcript issuance is halted for request <strong className="font-mono">{holdModalReqId}</strong>. The student will be prompted to resolve this condition.
            </p>

            <textarea
              rows={3}
              value={holdInputReason}
              onChange={(e) => setHoldInputReason(e.target.value)}
              className="w-full text-xs border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-500 focus:border-red-500 mb-4"
              placeholder="e.g. Library Hold: Unreturned chemistry textbook. Contact main library desk."
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setHoldModalReqId(null)}
                className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => handleApplyHold(holdModalReqId)}
                className="px-4 py-1.5 text-xs bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold"
              >
                Apply Hold
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

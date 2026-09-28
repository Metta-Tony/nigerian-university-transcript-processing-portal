import React, { useState } from 'react';
import { ShieldCheck, Search, CheckCircle2, AlertTriangle, Building, Award, Calendar, FileText } from 'lucide-react';
import { StudentAcademicProfile } from '../types';
import { UNIVERSITY_INFO, INITIAL_STUDENT_PROFILES } from '../data/mockData';

interface VerifyTranscriptProps {
  initialCode?: string;
  onViewStudentTranscript?: (studentId: string) => void;
}

export const VerifyTranscript: React.FC<VerifyTranscriptProps> = ({
  initialCode = 'UEN-NUC-2023-CS-486A',
  onViewStudentTranscript
}) => {
  const [verificationInput, setVerificationInput] = useState<string>(initialCode);
  const [searchedCode, setSearchedCode] = useState<string>(initialCode);
  const [hasSearched, setHasSearched] = useState<boolean>(true);

  // Find student by verificationHash or studentId
  const verifiedStudent: StudentAcademicProfile | undefined = Object.values(INITIAL_STUDENT_PROFILES).find(
    (s) => s.verificationHash.toLowerCase() === searchedCode.toLowerCase().trim() ||
           s.studentId.toLowerCase() === searchedCode.toLowerCase().trim()
  );

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchedCode(verificationInput);
    setHasSearched(true);
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      {/* Verification Header */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sm:p-8 mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-200">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display-crest">
              Official Credential Verification Service
            </h2>
            <p className="text-xs text-slate-600">
              National Universities Commission (NUC) & University of Eastern Nigeria centralized eTranscript registry.
            </p>
          </div>
        </div>

        <form onSubmit={handleVerify} className="mt-6">
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Enter Transcript Verification Ledger Key or Matriculation Number:
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                id="verify-input"
                required
                value={verificationInput}
                onChange={(e) => setVerificationInput(e.target.value)}
                placeholder="e.g. UEN-NUC-2023-CS-486A or 2019/248910"
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 font-mono"
              />
            </div>
            <button
              type="submit"
              id="verify-submit-btn"
              className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Verify Authenticity</span>
            </button>
          </div>
        </form>

        {/* Quick sample codes */}
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-slate-100 text-xs">
          <span className="text-slate-400 font-medium">Verified Senate Ledger Samples:</span>
          <button
            onClick={() => {
              setVerificationInput('UEN-NUC-2023-CS-486A');
              setSearchedCode('UEN-NUC-2023-CS-486A');
              setHasSearched(true);
            }}
            className="px-2.5 py-1 rounded text-[11px] font-mono bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700"
          >
            UEN-NUC-2023-CS-486A (Chidiebube - First Class CS)
          </button>
          <button
            onClick={() => {
              setVerificationInput('UEN-NUC-2022-BNF-438B');
              setSearchedCode('UEN-NUC-2022-BNF-438B');
              setHasSearched(true);
            }}
            className="px-2.5 py-1 rounded text-[11px] font-mono bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700"
          >
            UEN-NUC-2022-BNF-438B (Ngozi - Finance 2:1)
          </button>
          <button
            onClick={() => {
              setVerificationInput('UEN-NUC-2025-BCH-462P');
              setSearchedCode('UEN-NUC-2025-BCH-462P');
              setHasSearched(true);
            }}
            className="px-2.5 py-1 rounded text-[11px] font-mono bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700"
          >
            UEN-NUC-2025-BCH-462P (Somtochukwu - Biochem)
          </button>
        </div>
      </div>

      {/* Verification Result Card */}
      {hasSearched && (
        verifiedStudent ? (
          <div className="bg-white rounded-xl border border-emerald-300 shadow-md overflow-hidden">
            {/* Header Badge */}
            <div className="bg-emerald-600 text-white px-6 py-3.5 flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-200" />
                <span className="font-bold text-sm tracking-wide">
                  OFFICIALLY VERIFIED & AUTHENTIC UNIVERSITY CREDENTIAL
                </span>
              </div>
              <span className="font-mono text-xs text-emerald-100 bg-emerald-700/80 px-2.5 py-0.5 rounded">
                Senate Seal & NUC Approved
              </span>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                <div>
                  <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Student Record</span>
                  <h3 className="text-xl font-bold text-slate-900 mt-0.5">{verifiedStudent.fullName}</h3>
                  <p className="text-xs text-slate-500 font-mono">
                    Matric No: <strong className="text-slate-800">{verifiedStudent.studentId}</strong> • JAMB Reg: <strong className="text-slate-800">{verifiedStudent.jambRegNo || '96102844AJ'}</strong>
                  </p>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Senate Ledger Key</span>
                  <div className="font-mono font-bold text-emerald-800 text-sm">{verifiedStudent.verificationHash}</div>
                  <div className="text-[11px] text-slate-400">Cryptographically Sealed Record</div>
                </div>
              </div>

              {/* Conferred Degree Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
                <div>
                  <span className="text-slate-500 block">Degree & Faculty:</span>
                  <span className="font-bold text-slate-900">{verifiedStudent.degree}</span>
                  <span className="text-slate-500 block text-[11px]">{verifiedStudent.faculty}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Class of Degree:</span>
                  <span className="font-bold text-amber-800 text-xs">{verifiedStudent.academicStanding || 'Conferred'}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Senate Approval Date:</span>
                  <span className="font-medium text-slate-800">{verifiedStudent.graduationDate}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Cumulative GPA (NUC 5.0):</span>
                  <span className="font-mono font-bold text-emerald-800 text-sm">
                    {verifiedStudent.cumulativeGpa.toFixed(2)} / 5.00
                  </span>
                </div>
              </div>

              {/* Attestation Text */}
              <div className="border-l-4 border-emerald-500 bg-emerald-50/50 p-4 rounded-r-lg text-xs text-emerald-950">
                <p className="font-medium leading-relaxed">
                  This electronic transcript validation attests that the academic record for <strong>{verifiedStudent.fullName}</strong> is authentic and corresponds exactly with the official university archives retained by the Office of the University Registrar at {UNIVERSITY_INFO.name}.
                </p>
                <div className="mt-2 text-[11px] text-emerald-800">
                  Certified by: <strong>{verifiedStudent.registrarName}</strong> ({UNIVERSITY_INFO.registrarTitle})
                </div>
              </div>

              {/* Action */}
              {onViewStudentTranscript && (
                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => onViewStudentTranscript(verifiedStudent.studentId)}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <FileText className="w-4 h-4 text-amber-400" />
                    <span>View Complete Certified Transcript</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 sm:p-8 text-center text-red-950">
            <AlertTriangle className="w-10 h-10 text-red-600 mx-auto mb-3" />
            <h3 className="text-base font-bold">Verification Key Not Located</h3>
            <p className="text-xs text-red-700 max-w-md mx-auto mt-1">
              No matching certified academic transcript was located for the hash code <code className="font-mono font-bold">{searchedCode}</code>. Please confirm the ledger key or contact the Registrar's Office at {UNIVERSITY_INFO.email}.
            </p>
          </div>
        )
      )}
    </div>
  );
};

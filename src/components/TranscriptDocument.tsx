import React, { useState } from 'react';
import { 
  Printer, ShieldCheck, Award, CheckCircle2, Building
} from 'lucide-react';
import { StudentAcademicProfile } from '../types';
import { UNIVERSITY_INFO, INITIAL_STUDENT_PROFILES } from '../data/mockData';

interface TranscriptDocumentProps {
  selectedStudentId?: string;
  onVerifyCode?: (code: string) => void;
}

export const TranscriptDocument: React.FC<TranscriptDocumentProps> = ({
  selectedStudentId = '2019/248910',
  onVerifyCode
}) => {
  const [activeStudentId, setActiveStudentId] = useState<string>(selectedStudentId);

  const student: StudentAcademicProfile = 
    INITIAL_STUDENT_PROFILES[activeStudentId] || INITIAL_STUDENT_PROFILES['2019/248910'];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto py-6 px-4">
      {/* Top Toolbar (Hidden during Print) */}
      <div className="no-print bg-white rounded-xl border border-slate-200 shadow-sm p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <label className="text-xs font-semibold text-slate-700">
            Select Student Record:
          </label>
          <select
            value={activeStudentId}
            onChange={(e) => setActiveStudentId(e.target.value)}
            className="text-xs font-medium border border-slate-300 rounded-lg px-3 py-1.5 bg-slate-50 focus:ring-2 focus:ring-amber-500"
          >
            <option value="2019/248910">Chidiebube Emmanuel Okafor (2019/248910 - First Class B.Sc. CS, Anambra)</option>
            <option value="2018/193044">Ngozi Amarachi Eze (2018/193044 - 2:1 B.Sc. Banking & Finance, Enugu)</option>
            <option value="2021/304192">Somtochukwu Kenechukwu Nnamani (2021/304192 - B.Sc. Biochem, Penultimate)</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            id="print-transcript-btn"
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors"
          >
            <Printer className="w-4 h-4 text-amber-400" />
            <span>Print Official Academic Transcript (PDF)</span>
          </button>
        </div>
      </div>

      {/* Official Collegiate Transcript Sheet */}
      <div className="printable-transcript-page bg-white rounded-xl shadow-xl border border-slate-300 p-8 sm:p-12 relative overflow-hidden text-slate-900">
        {/* Subtle Watermark in background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
          <Award className="w-[550px] h-[550px] text-slate-900" />
        </div>

        {/* Security Border Header */}
        <div className="border-b-2 border-slate-900 pb-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl border-2 border-slate-900 flex flex-col items-center justify-center bg-amber-50 text-slate-900 flex-shrink-0">
                <Award className="w-9 h-9 text-amber-700" />
                <span className="text-[9px] font-bold tracking-widest font-display-crest">UEN</span>
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight font-display-crest text-slate-950">
                  {UNIVERSITY_INFO.name}
                </h1>
                <p className="text-xs font-semibold tracking-wider uppercase text-slate-700">
                  {UNIVERSITY_INFO.department}
                </p>
                <p className="text-[11px] text-slate-600 font-serif-academic italic mt-0.5">
                  "{UNIVERSITY_INFO.motto}" • Established {UNIVERSITY_INFO.established}
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {UNIVERSITY_INFO.address} • NUC Accreditation Ref: {UNIVERSITY_INFO.nucCode}
                </p>
              </div>
            </div>

            <div className="text-left sm:text-right border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-200">
              <div className="inline-block px-3 py-1 bg-slate-900 text-amber-400 font-display-crest text-xs font-bold uppercase tracking-widest rounded">
                Official Academic Transcript
              </div>
              <div className="text-[11px] text-slate-600 mt-1.5 font-mono">
                Verification Ledger ID: <span className="font-bold text-slate-900">{student.verificationHash}</span>
              </div>
              <div className="text-[11px] text-slate-500">
                Date Issued: {student.dateIssued}
              </div>
            </div>
          </div>
        </div>

        {/* Student Biographical & Degree Details Box */}
        <div className="bg-slate-50/80 border border-slate-300 rounded-lg p-5 mb-8 text-xs font-sans-ui">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <span className="text-slate-500 block uppercase text-[10px] tracking-wider font-semibold">Student Legal Name</span>
              <span className="font-bold text-slate-900 text-sm">{student.fullName}</span>
            </div>
            <div>
              <span className="text-slate-500 block uppercase text-[10px] tracking-wider font-semibold">Matriculation Number</span>
              <span className="font-mono font-bold text-slate-900 text-sm">{student.studentId}</span>
            </div>
            <div>
              <span className="text-slate-500 block uppercase text-[10px] tracking-wider font-semibold">JAMB Registration No</span>
              <span className="font-mono font-semibold text-slate-800">{student.jambRegNo || '96102844AJ'}</span>
            </div>
            <div>
              <span className="text-slate-500 block uppercase text-[10px] tracking-wider font-semibold">State of Origin</span>
              <span className="font-medium text-slate-800">{student.stateOfOrigin || 'Anambra State'}</span>
            </div>

            <div>
              <span className="text-slate-500 block uppercase text-[10px] tracking-wider font-semibold">Faculty / School</span>
              <span className="font-semibold text-slate-900">{student.faculty}</span>
            </div>
            <div>
              <span className="text-slate-500 block uppercase text-[10px] tracking-wider font-semibold">Degree & Department</span>
              <span className="font-medium text-slate-800">{student.degree} in {student.major}</span>
            </div>
            <div>
              <span className="text-slate-500 block uppercase text-[10px] tracking-wider font-semibold">Degree Status</span>
              <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold uppercase bg-emerald-100 text-emerald-800 border border-emerald-300">
                {student.conferralStatus}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block uppercase text-[10px] tracking-wider font-semibold">Cumulative GPA (NUC 5.0)</span>
              <span className="font-mono font-extrabold text-amber-800 text-sm">
                {student.cumulativeGpa.toFixed(2)} / 5.00
              </span>
            </div>
          </div>

          {student.academicStanding && (
            <div className="mt-3 pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div>
                <span className="text-slate-500 font-semibold">Class of Degree: </span>
                <span className="font-bold text-amber-900 font-serif-academic text-sm">
                  {student.academicStanding}
                </span>
              </div>
              {student.deanHonorList && (
                <div className="text-[11px] text-slate-500">
                  <span className="font-semibold">Dean's Roll of Honour: </span>
                  {student.deanHonorList.join(", ")}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Semester-by-Semester Course Grids */}
        <div className="space-y-6 mb-8 font-sans-ui">
          {student.semesters.map((sem, sIdx) => (
            <div key={sIdx} className="border border-slate-300 rounded-lg overflow-hidden">
              <div className="bg-slate-100/90 px-4 py-2 flex items-center justify-between border-b border-slate-300">
                <span className="font-bold text-xs sm:text-sm text-slate-900 uppercase tracking-wide">
                  {sem.term} ({sem.academicYear})
                </span>
                <div className="flex items-center gap-3 text-xs">
                  <span className="text-slate-600">Units: <strong>{sem.termCredits}</strong></span>
                  <span className="text-slate-600">Semester GPA: <strong className="font-mono font-bold text-slate-900">{sem.termGpa.toFixed(2)} / 5.00</strong></span>
                </div>
              </div>

              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-600 border-b border-slate-200">
                    <th className="py-2 px-3 text-left font-semibold w-24">Course Code</th>
                    <th className="py-2 px-3 text-left font-semibold">Course Title / Description</th>
                    <th className="py-2 px-3 text-center font-semibold w-16">Units</th>
                    <th className="py-2 px-3 text-center font-semibold w-16">Grade</th>
                    <th className="py-2 px-3 text-right font-semibold w-20">Weight Points</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {sem.courses.map((c, cIdx) => (
                    <tr key={cIdx} className="hover:bg-slate-50/50">
                      <td className="py-1.5 px-3 font-mono font-semibold text-slate-800">{c.code}</td>
                      <td className="py-1.5 px-3 text-slate-900">{c.title}</td>
                      <td className="py-1.5 px-3 text-center font-mono text-slate-700">{c.credits}</td>
                      <td className="py-1.5 px-3 text-center font-bold text-slate-900 font-mono">{c.grade}</td>
                      <td className="py-1.5 px-3 text-right font-mono text-slate-700">{c.points.toFixed(1)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>

        {/* Cumulative Summary Totals */}
        <div className="bg-slate-900 text-white rounded-lg p-4 sm:p-5 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans-ui">
          <div>
            <h4 className="text-xs uppercase tracking-wider text-amber-400 font-bold font-display-crest">
              Cumulative Senate Academic Record
            </h4>
            <p className="text-xs text-slate-300 mt-0.5">
              All University Senate Degree Requirements Satisfied • Student in Good Academic Standing
            </p>
          </div>
          <div className="flex items-center gap-6 text-center">
            <div>
              <div className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider">Total Credit Units</div>
              <div className="text-xl font-bold font-mono text-white">{student.totalCreditsEarned}</div>
            </div>
            <div className="h-8 w-px bg-slate-700"></div>
            <div>
              <div className="text-[10px] uppercase text-amber-400 font-semibold tracking-wider">Cumulative GPA (CGPA)</div>
              <div className="text-2xl font-bold font-mono text-amber-300">{student.cumulativeGpa.toFixed(2)} / 5.00</div>
            </div>
          </div>
        </div>

        {/* Grading Scale & Legend Reference (Nigerian 5.0 System) */}
        <div className="border-t border-b border-slate-200 py-3 mb-8 text-[10px] text-slate-500 grid grid-cols-1 sm:grid-cols-4 gap-2 font-sans-ui">
          <div>
            <strong className="text-slate-700 block">NUC Grading System (5.0 Scale):</strong>
            <span>70% – 100% = A (5.0 Points - Excellent)</span><br />
            <span>60% – 69% = B (4.0 Points - Very Good)</span>
          </div>
          <div>
            <strong className="text-slate-700 block">Pass Grades:</strong>
            <span>50% – 59% = C (3.0 Points - Good)</span><br />
            <span>45% – 49% = D (2.0 Points - Fair)</span><br />
            <span>40% – 44% = E (1.0 Point - Pass)</span>
          </div>
          <div>
            <strong className="text-slate-700 block">Degree Classifications:</strong>
            <span>4.50 – 5.00: First Class Honours</span><br />
            <span>3.50 – 4.49: Second Class Upper (2:1)</span><br />
            <span>2.40 – 3.49: Second Class Lower (2:2)</span>
          </div>
          <div>
            <strong className="text-slate-700 block">Security Certification:</strong>
            <span>Issued under the seal of the University Senate. Validated via the national eTranscript registry.</span>
          </div>
        </div>

        {/* Official Attestation, Seal & Signature Block */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4 font-sans-ui">
          {/* Official Stamp & QR Code */}
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full border-2 border-amber-600/80 bg-amber-50/70 p-1 flex flex-col items-center justify-center text-center shadow-xs">
              <Award className="w-6 h-6 text-amber-700" />
              <span className="text-[8px] font-bold uppercase tracking-wider text-amber-900 font-display-crest mt-0.5">
                UEN SENATE
              </span>
              <span className="text-[7px] text-amber-800 font-mono">SEAL OF REGISTRAR</span>
            </div>

            <div className="text-xs">
              <div className="flex items-center gap-1 font-bold text-slate-900">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Certified Official University Transcript</span>
              </div>
              <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                Hash: {student.verificationHash}
              </p>
              {onVerifyCode && (
                <button
                  type="button"
                  onClick={() => onVerifyCode(student.verificationHash)}
                  className="no-print text-[11px] text-amber-700 hover:text-amber-800 font-semibold underline mt-0.5"
                >
                  Verify Authenticity on NUC Portal →
                </button>
              )}
            </div>
          </div>

          {/* Registrar Signature */}
          <div className="text-center sm:text-right">
            <div className="font-serif-academic italic text-lg sm:text-xl font-bold text-slate-900 tracking-wide border-b border-slate-400 pb-1 px-4 inline-block">
              {student.registrarName}
            </div>
            <p className="text-xs font-semibold text-slate-800 mt-1">
              {UNIVERSITY_INFO.registrarTitle}
            </p>
            <p className="text-[11px] text-slate-500">
              Office of the University Registrar • Date of Certification: {student.dateIssued}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

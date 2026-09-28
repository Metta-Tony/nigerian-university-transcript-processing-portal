import React, { useState } from 'react';
import { 
  FileText, CheckCircle2, ArrowRight, ArrowLeft, Upload, 
  Clock, ShieldCheck, Mail, Building2, User, Sparkles, Send, CreditCard
} from 'lucide-react';
import { TranscriptRequest, TranscriptType, ProcessingPriority } from '../types';
import { PRICING_RULES, INITIAL_STUDENT_PROFILES, UNIVERSITY_INFO } from '../data/mockData';

interface RequestTranscriptFormProps {
  onSubmitSuccess: (newRequest: TranscriptRequest) => void;
  onNavigateToTrack: (trackingId: string) => void;
  onNavigateToPreview: (studentId: string) => void;
}

export const RequestTranscriptForm: React.FC<RequestTranscriptFormProps> = ({
  onSubmitSuccess,
  onNavigateToTrack,
  onNavigateToPreview
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [createdRequest, setCreatedRequest] = useState<TranscriptRequest | null>(null);

  // Form State
  const [studentId, setStudentId] = useState<string>('2019/248910');
  const [jambRegNo, setJambRegNo] = useState<string>('96102844AJ');
  const [fullName, setFullName] = useState<string>('Chidiebube Emmanuel Okafor');
  const [dob, setDob] = useState<string>('1999-10-14');
  const [stateOfOrigin, setStateOfOrigin] = useState<string>('Anambra State (Idemili North LGA)');
  const [email, setEmail] = useState<string>('chidiebube.okafor@alumni.uen.edu.ng');
  const [phone, setPhone] = useState<string>('+234 803 555 4392');
  const [faculty, setFaculty] = useState<string>('Faculty of Physical Sciences');
  const [degree, setDegree] = useState<string>('B.Sc. (Honours) Computer Science');
  const [graduationYear, setGraduationYear] = useState<string>('2023');

  const [transcriptType, setTranscriptType] = useState<TranscriptType>('wes_evaluation');
  const [priority, setPriority] = useState<ProcessingPriority>('express');
  const [recipientType, setRecipientType] = useState<'university' | 'employer' | 'evaluation_agency' | 'self'>('evaluation_agency');
  const [recipientName, setRecipientName] = useState<string>('World Education Services (WES) Canada');
  const [recipientEmail, setRecipientEmail] = useState<string>('submit@wes.org');
  const [recipientAddress, setRecipientAddress] = useState<string>('2 Carlton Street, Suite 1400, Toronto, ON M5B 1J3, Canada');
  const [evaluationRefNo, setEvaluationRefNo] = useState<string>('WES-CAN-9912042');
  const [additionalInstructions, setAdditionalInstructions] = useState<string>('Please attach NUC accreditation certificate and official course syllabus transcript addendum.');

  // Step 3 Clearances
  const [uploadedFileName, setUploadedFileName] = useState<string>('UEN_Degree_Certificate_Okafor.pdf');
  const [bursaryClearance, setBursaryClearance] = useState<boolean>(true);
  const [libraryClearance, setLibraryClearance] = useState<boolean>(true);
  const [truthAffirmation, setTruthAffirmation] = useState<boolean>(true);

  // Calculate fees
  const baseFee = PRICING_RULES.types[transcriptType]?.fee || 15000;
  const priorityFee = PRICING_RULES.priorities[priority]?.fee || 0;
  const courierFee = transcriptType === 'official_hardcopy' ? PRICING_RULES.delivery.domesticCourier : 0;
  const totalCalculatedFee = baseFee + priorityFee + courierFee;

  // Auto-fill student helpers
  const handleAutoFill = (id: string) => {
    const profile = INITIAL_STUDENT_PROFILES[id];
    if (!profile) return;
    setStudentId(profile.studentId);
    setJambRegNo(profile.jambRegNo || '');
    setFullName(profile.fullName);
    setStateOfOrigin(profile.stateOfOrigin || 'Enugu State');
    setDob(id === '2019/248910' ? '1999-10-14' : id === '2018/193044' ? '1998-08-29' : '2001-11-03');
    setEmail(id === '2019/248910' ? 'chidiebube.okafor@alumni.uen.edu.ng' : id === '2018/193044' ? 'ngozi.eze@firstbank.ng' : 'somto.nnamani@students.uen.edu.ng');
    setPhone(id === '2019/248910' ? '+234 803 555 4392' : id === '2018/193044' ? '+234 814 555 8819' : '+234 703 555 3104');
    setFaculty(profile.faculty);
    setDegree(profile.degree + ' in ' + profile.major);
    setGraduationYear(profile.graduationDate.includes('2023') ? '2023' : profile.graduationDate.includes('2022') ? '2022' : '2025');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFileName(e.target.files[0].name);
    }
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!truthAffirmation || !bursaryClearance || !libraryClearance) {
      alert("Please confirm all mandatory institutional clearance affirmations before proceeding.");
      return;
    }

    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const trackingId = `TRX-2026-${randomSuffix}`;
    const rrrCode = `${Math.floor(1000 + Math.random()*9000)}-${Math.floor(1000 + Math.random()*9000)}-${Math.floor(1000 + Math.random()*9000)}`;

    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    let etaDays = 5;
    if (priority === 'same_day') etaDays = 0;
    else if (priority === 'express') etaDays = 2;

    const etaDate = new Date();
    etaDate.setDate(etaDate.getDate() + etaDays);
    const formattedEta = `${etaDate.getFullYear()}-${String(etaDate.getMonth() + 1).padStart(2, '0')}-${String(etaDate.getDate()).padStart(2, '0')} 05:00 PM`;

    const newRequest: TranscriptRequest = {
      id: trackingId,
      studentId,
      jambRegNo,
      remitaRrr: rrrCode,
      fullName,
      email,
      phone,
      dob,
      stateOfOrigin,
      faculty,
      degree,
      graduationYear,
      transcriptType,
      priority,
      recipientType,
      recipientName,
      recipientEmail,
      recipientAddress: transcriptType === 'official_hardcopy' ? recipientAddress : undefined,
      evaluationRefNo: evaluationRefNo || undefined,
      additionalInstructions: additionalInstructions || undefined,
      submittedAt: formattedDate,
      estimatedCompletion: formattedEta,
      status: 'submitted',
      statusNotes: 'Order received by the Office of the University Registrar. Queued for digital records retrieval and Remita RRR settlement clearance.',
      totalFee: totalCalculatedFee,
      paymentStatus: 'Paid',
      uploadedDocumentName: uploadedFileName,
      securityHash: `UEN-NUC-${randomSuffix}-${studentId.slice(-4)}`
    };

    setCreatedRequest(newRequest);
    setIsSubmitted(true);
    onSubmitSuccess(newRequest);
  };

  if (isSubmitted && createdRequest) {
    return (
      <div className="max-w-3xl mx-auto py-8 px-4">
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden text-center p-8 sm:p-10">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-300">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
            Application Registered Successfully
          </span>

          <h2 className="text-2xl font-bold text-slate-900 font-display-crest">
            Transcript Application Logged
          </h2>
          <p className="text-sm text-slate-600 max-w-md mx-auto mt-2">
            Your official transcript request has been received, Remita payment confirmed, and routed to the University Registrar's Records Directorate.
          </p>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 my-6 max-w-md mx-auto text-left">
            <div className="flex justify-between items-center pb-3 border-b border-slate-200">
              <span className="text-xs text-slate-500">Tracking Reference ID:</span>
              <span className="font-mono font-bold text-amber-800 text-base">{createdRequest.id}</span>
            </div>
            <div className="flex justify-between items-center py-2 text-xs border-b border-slate-200">
              <span className="text-slate-500">Remita RRR Number:</span>
              <span className="font-mono font-bold text-slate-900">{createdRequest.remitaRrr}</span>
            </div>
            <div className="flex justify-between items-center py-2 text-xs border-b border-slate-200">
              <span className="text-slate-500">Matriculation No:</span>
              <span className="font-mono font-medium text-slate-900">{createdRequest.studentId}</span>
            </div>
            <div className="flex justify-between items-center py-2 text-xs border-b border-slate-200">
              <span className="text-slate-500">Student Name:</span>
              <span className="font-medium text-slate-900">{createdRequest.fullName}</span>
            </div>
            <div className="flex justify-between items-center py-2 text-xs border-b border-slate-200">
              <span className="text-slate-500">Transcript Service:</span>
              <span className="font-medium capitalize text-slate-900">{createdRequest.transcriptType.replace('_', ' ')}</span>
            </div>
            <div className="flex justify-between items-center py-2 text-xs border-b border-slate-200">
              <span className="text-slate-500">Amount Paid (NGN):</span>
              <span className="font-mono font-bold text-emerald-800">₦{createdRequest.totalFee.toLocaleString('en-NG')}</span>
            </div>
            <div className="flex justify-between items-center pt-2 text-xs">
              <span className="text-slate-500">Estimated Senate Approval:</span>
              <span className="font-medium text-emerald-700">{createdRequest.estimatedCompletion}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <button
              id="track-new-request-btn"
              onClick={() => onNavigateToTrack(createdRequest.id)}
              className="w-full sm:w-auto px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-colors"
            >
              <ArrowRight className="w-4 h-4 text-amber-400" />
              <span>Track Application Progress</span>
            </button>

            <button
              id="view-transcript-btn"
              onClick={() => onNavigateToPreview(createdRequest.studentId)}
              className="w-full sm:w-auto px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-colors"
            >
              <FileText className="w-4 h-4" />
              <span>Preview Official Transcript</span>
            </button>
          </div>

          <p className="text-xs text-slate-400 mt-6">
            A confirmation SMS and official Remita e-receipt have been dispatched to <strong className="text-slate-600">{createdRequest.phone}</strong> and <strong className="text-slate-600">{createdRequest.email}</strong>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      {/* Auto-fill Quick Tester Bar */}
      <div className="bg-amber-50/80 border border-amber-200/80 rounded-xl p-3.5 mb-6 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-amber-900 font-medium">
          <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0" />
          <span>Quick Demo Profiles (South-Eastern Alumni):</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => handleAutoFill('2019/248910')}
            className={`px-2.5 py-1 rounded border text-xs font-medium transition-colors ${
              studentId === '2019/248910' 
                ? 'bg-amber-600 text-white border-amber-600' 
                : 'bg-white text-slate-700 border-amber-300 hover:bg-amber-100'
            }`}
          >
            Chidiebube (First Class CS, Anambra)
          </button>
          <button
            type="button"
            onClick={() => handleAutoFill('2018/193044')}
            className={`px-2.5 py-1 rounded border text-xs font-medium transition-colors ${
              studentId === '2018/193044' 
                ? 'bg-amber-600 text-white border-amber-600' 
                : 'bg-white text-slate-700 border-amber-300 hover:bg-amber-100'
            }`}
          >
            Ngozi (2:1 Finance, Enugu)
          </button>
          <button
            type="button"
            onClick={() => handleAutoFill('2021/304192')}
            className={`px-2.5 py-1 rounded border text-xs font-medium transition-colors ${
              studentId === '2021/304192' 
                ? 'bg-amber-600 text-white border-amber-600' 
                : 'bg-white text-slate-700 border-amber-300 hover:bg-amber-100'
            }`}
          >
            Somtochukwu (Biochem, Penultimate)
          </button>
        </div>
      </div>

      {/* Multi-step Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display-crest">
              Official Transcript Application
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              {UNIVERSITY_INFO.name} • {UNIVERSITY_INFO.department}
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded bg-slate-100 text-slate-700 border border-slate-300">
            Step {currentStep} of 3
          </span>
        </div>

        {/* Step Progress indicators */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          <div
            onClick={() => setCurrentStep(1)}
            className={`cursor-pointer p-2.5 rounded-lg border text-left transition-all ${
              currentStep === 1
                ? 'bg-amber-50 border-amber-500 ring-1 ring-amber-500/30'
                : currentStep > 1
                ? 'bg-slate-50 border-slate-300 text-slate-600'
                : 'bg-white border-slate-200 text-slate-400'
            }`}
          >
            <div className="text-[10px] font-bold uppercase tracking-wider text-amber-700">Step 1</div>
            <div className="text-xs sm:text-sm font-semibold text-slate-900 truncate">1. Matric & Student Data</div>
          </div>

          <div
            onClick={() => setCurrentStep(2)}
            className={`cursor-pointer p-2.5 rounded-lg border text-left transition-all ${
              currentStep === 2
                ? 'bg-amber-50 border-amber-500 ring-1 ring-amber-500/30'
                : currentStep > 2
                ? 'bg-slate-50 border-slate-300 text-slate-600'
                : 'bg-white border-slate-200 text-slate-400'
            }`}
          >
            <div className="text-[10px] font-bold uppercase tracking-wider text-amber-700">Step 2</div>
            <div className="text-xs sm:text-sm font-semibold text-slate-900 truncate">2. Delivery & Destination</div>
          </div>

          <div
            onClick={() => setCurrentStep(3)}
            className={`cursor-pointer p-2.5 rounded-lg border text-left transition-all ${
              currentStep === 3
                ? 'bg-amber-50 border-amber-500 ring-1 ring-amber-500/30'
                : 'bg-white border-slate-200 text-slate-400'
            }`}
          >
            <div className="text-[10px] font-bold uppercase tracking-wider text-amber-700">Step 3</div>
            <div className="text-xs sm:text-sm font-semibold text-slate-900 truncate">3. Remita Billing & Clearances</div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmitOrder} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-8">
        {/* STEP 1: Student Information */}
        {currentStep === 1 && (
          <div className="space-y-5">
            <div className="border-b border-slate-200 pb-3">
              <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
                <User className="w-4 h-4 text-amber-600" />
                <span>Student Academic Record Identification</span>
              </h3>
              <p className="text-xs text-slate-500">
                Please enter your academic credentials exactly as stated in your UEN Matriculation register and JAMB Admission Letter.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Matriculation Number *
                </label>
                <input
                  id="student-id-input"
                  type="text"
                  required
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  placeholder="e.g. 2019/248910"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 font-mono"
                />
                <span className="text-[11px] text-slate-400">Found on your course registration forms or degree cert</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  JAMB Registration Number *
                </label>
                <input
                  id="jamb-reg-input"
                  type="text"
                  required
                  value={jambRegNo}
                  onChange={(e) => setJambRegNo(e.target.value)}
                  placeholder="e.g. 96102844AJ"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 font-mono"
                />
                <span className="text-[11px] text-slate-400">Required for NUC National Database reconciliation</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Legal Name (Surname First) *
                </label>
                <input
                  id="full-name-input"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Okafor, Chidiebube Emmanuel"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  State of Origin & L.G.A *
                </label>
                <input
                  id="state-origin-input"
                  type="text"
                  required
                  value={stateOfOrigin}
                  onChange={(e) => setStateOfOrigin(e.target.value)}
                  placeholder="e.g. Anambra State (Idemili North LGA)"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Date of Birth *
                </label>
                <input
                  id="dob-input"
                  type="date"
                  required
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Alumni / Student Email *
                </label>
                <input
                  id="email-input"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@alumni.uen.edu.ng"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nigerian Phone Number (SMS Alerts) *
                </label>
                <input
                  id="phone-input"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+234 803 000 0000"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Faculty / School *
                </label>
                <select
                  id="faculty-select"
                  value={faculty}
                  onChange={(e) => setFaculty(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                >
                  <option value="Faculty of Physical Sciences">Faculty of Physical Sciences</option>
                  <option value="Faculty of Engineering">Faculty of Engineering</option>
                  <option value="Faculty of Business Administration (Enugu Campus)">Faculty of Business Administration (Enugu Campus)</option>
                  <option value="Faculty of Law (Enugu Campus)">Faculty of Law (Enugu Campus)</option>
                  <option value="Faculty of Biological Sciences">Faculty of Biological Sciences</option>
                  <option value="Faculty of Medical Sciences & Dentistry">Faculty of Medical Sciences & Dentistry</option>
                  <option value="Faculty of Agriculture">Faculty of Agriculture</option>
                  <option value="Faculty of Arts & Humanities">Faculty of Arts & Humanities</option>
                  <option value="Faculty of the Social Sciences">Faculty of the Social Sciences</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Degree & Major Department *
                </label>
                <input
                  id="degree-input"
                  type="text"
                  required
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  placeholder="e.g. B.Sc. (Honours) Computer Science"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Year of Graduation / Exit *
                </label>
                <input
                  id="graduation-year-input"
                  type="text"
                  required
                  value={graduationYear}
                  onChange={(e) => setGraduationYear(e.target.value)}
                  placeholder="e.g. 2023"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-200">
              <button
                type="button"
                id="step-1-next-btn"
                onClick={() => setCurrentStep(2)}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors"
              >
                <span>Continue to Delivery & Destination</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Delivery & Destination */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="border-b border-slate-200 pb-3">
              <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-amber-600" />
                <span>Transcript Format, Priority & Recipient Target</span>
              </h3>
              <p className="text-xs text-slate-500">
                Official delivery options recognized by Nigerian tertiary institutions, federal parastatals, embassies, and international credential evaluation boards.
              </p>
            </div>

            {/* Transcript Type Selection Cards */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Select Official Transcript Service *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(PRICING_RULES.types).map(([key, config]) => {
                  const isSelected = transcriptType === key;
                  return (
                    <div
                      key={key}
                      onClick={() => setTranscriptType(key as TranscriptType)}
                      className={`cursor-pointer p-4 rounded-xl border transition-all text-left ${
                        isSelected
                          ? 'border-amber-600 bg-amber-50/50 ring-1 ring-amber-600/30'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-semibold text-xs text-slate-900">{config.name}</span>
                        <span className="font-mono text-xs font-bold text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded">
                          ₦{config.fee.toLocaleString('en-NG')}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">
                        {config.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Processing Priority */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Processing Speed / Turnaround Service *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {Object.entries(PRICING_RULES.priorities).map(([key, config]) => {
                  const isSelected = priority === key;
                  return (
                    <div
                      key={key}
                      onClick={() => setPriority(key as ProcessingPriority)}
                      className={`cursor-pointer p-3 rounded-lg border transition-all ${
                        isSelected
                          ? 'border-amber-600 bg-amber-50/50 ring-1 ring-amber-600/30'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex justify-between items-center text-xs font-semibold text-slate-900">
                        <span>{config.name}</span>
                        <span className="text-amber-800 font-mono">
                          {config.fee === 0 ? 'Included' : `+₦${config.fee.toLocaleString('en-NG')}`}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-500 flex items-center gap-1 mt-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>ETA: {config.eta}</span>
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recipient Details */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Recipient Institution / Destination Details
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Recipient Classification *
                  </label>
                  <select
                    id="recipient-type-select"
                    value={recipientType}
                    onChange={(e) => setRecipientType(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="university">Nigerian / Foreign University (Postgraduate School)</option>
                    <option value="evaluation_agency">Credential Evaluator (WES, ECE, ICAS, IQAS)</option>
                    <option value="employer">Employer / Federal Parastatal / Corporate HR</option>
                    <option value="self">Student Personal Academic File</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Recipient Organization / Official *
                  </label>
                  <input
                    id="recipient-name-input"
                    type="text"
                    required
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="e.g. World Education Services (WES) Canada or UNILAG SPGS"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Official Recipient Email *
                  </label>
                  <input
                    id="recipient-email-input"
                    type="email"
                    required
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    placeholder="admissions@unilag.edu.ng or submit@wes.org"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Application / WES Ref # (if applicable)
                  </label>
                  <input
                    id="evaluation-ref-input"
                    type="text"
                    value={evaluationRefNo}
                    onChange={(e) => setEvaluationRefNo(e.target.value)}
                    placeholder="e.g. WES-CAN-9912042"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white font-mono"
                  />
                </div>
              </div>

              {transcriptType === 'official_hardcopy' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Physical Delivery Address (Courier Waybill in Nigeria or International) *
                  </label>
                  <textarea
                    id="recipient-address-input"
                    required
                    rows={2}
                    value={recipientAddress}
                    onChange={(e) => setRecipientAddress(e.target.value)}
                    placeholder="e.g. Postgraduate Admissions Office, Senate Building, UNILAG Main Campus, Akoka, Yaba, Lagos State"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Special Senate / Registrar Instructions (Optional)
                </label>
                <input
                  id="additional-instructions-input"
                  type="text"
                  value={additionalInstructions}
                  onChange={(e) => setAdditionalInstructions(e.target.value)}
                  placeholder="e.g. Add Class of Degree commendation, seal in stamped confidential registrar envelope"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                />
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="px-4 py-2 border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Student Details</span>
              </button>

              <button
                type="button"
                id="step-2-next-btn"
                onClick={() => setCurrentStep(3)}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors"
              >
                <span>Proceed to Remita Billing & Clearances</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Clearances, Fee Breakdown & Submission */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="border-b border-slate-200 pb-3">
              <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                <span>Statutory Clearances & Remita Central Billing</span>
              </h3>
              <p className="text-xs text-slate-500">
                Confirm institutional clearances and review fee settlement via Remita TSA before placing your request in the official Senate queue.
              </p>
            </div>

            {/* Document Upload Area */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Upload Identification Document (Degree Certificate, Student ID or NYSC Discharge Certificate)
              </label>
              <div className="border-2 border-dashed border-slate-300 hover:border-amber-500 rounded-xl p-5 text-center bg-slate-50 transition-colors">
                <Upload className="w-7 h-7 text-slate-400 mx-auto mb-2" />
                <p className="text-xs text-slate-700 font-medium">
                  {uploadedFileName ? (
                    <span className="text-emerald-700 font-semibold flex items-center justify-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      Uploaded File: {uploadedFileName}
                    </span>
                  ) : (
                    "Drag and drop your file here, or click to browse"
                  )}
                </p>
                <p className="text-[11px] text-slate-400 mt-1">Accepted: PDF, PNG, JPG (Max 15MB)</p>
                <input
                  type="file"
                  id="document-upload-input"
                  onChange={handleFileUpload}
                  className="mt-3 text-xs text-slate-500 file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-slate-900 file:text-white hover:file:bg-slate-800"
                />
              </div>
            </div>

            {/* Clearances Checklist */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 text-xs">
              <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                University Clearances & Affirmations
              </h4>

              <label className="flex items-start gap-2.5 cursor-pointer text-slate-700">
                <input
                  type="checkbox"
                  required
                  checked={bursaryClearance}
                  onChange={(e) => setBursaryClearance(e.target.checked)}
                  className="mt-0.5 rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                />
                <span>
                  <strong>University Bursary Affirmation:</strong> I certify that all school fees, departmental dues, and graduation levies have been fully settled without indebtedness.
                </span>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer text-slate-700">
                <input
                  type="checkbox"
                  required
                  checked={libraryClearance}
                  onChange={(e) => setLibraryClearance(e.target.checked)}
                  className="mt-0.5 rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                />
                <span>
                  <strong>Nnamdi Azikiwe Library Clearance:</strong> I confirm that no overdue library books, borrowed periodicals, or research materials remain unreturned under my matriculation number.
                </span>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer text-slate-700">
                <input
                  type="checkbox"
                  required
                  checked={truthAffirmation}
                  onChange={(e) => setTruthAffirmation(e.target.checked)}
                  className="mt-0.5 rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                />
                <span>
                  <strong>NUC & Records Release Authorization:</strong> I hereby authorize the University Registrar to disclose and transmit my certified academic transcripts to the nominated recipient.
                </span>
              </label>
            </div>

            {/* Fee Breakdown Card */}
            <div className="border border-slate-200 rounded-xl overflow-hidden bg-slate-900 text-white p-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Remita RRR Service Billing</span>
                <span className="text-xs text-amber-400 font-mono flex items-center gap-1">
                  <CreditCard className="w-3.5 h-3.5" />
                  Federal TSA Account
                </span>
              </div>

              <div className="py-3 space-y-2 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>{PRICING_RULES.types[transcriptType]?.name}</span>
                  <span className="font-mono">₦{baseFee.toLocaleString('en-NG')}</span>
                </div>
                {priorityFee > 0 && (
                  <div className="flex justify-between text-slate-300">
                    <span>Senate Priority Clearance ({priority.replace('_', ' ')})</span>
                    <span className="font-mono">+₦{priorityFee.toLocaleString('en-NG')}</span>
                  </div>
                )}
                {courierFee > 0 && (
                  <div className="flex justify-between text-slate-300">
                    <span>Registered Courier Handling & Security Watermark Paper</span>
                    <span className="font-mono">+₦{courierFee.toLocaleString('en-NG')}</span>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-between items-baseline">
                <div>
                  <div className="text-xs text-slate-400">Total Remita Settlement Fee</div>
                  <div className="text-[11px] text-emerald-400">All federal statutory tariffs included</div>
                </div>
                <div className="text-xl font-bold font-mono text-amber-400">
                  ₦{totalCalculatedFee.toLocaleString('en-NG')} NGN
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="px-4 py-2 border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Delivery</span>
              </button>

              <button
                type="submit"
                id="submit-order-btn"
                className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold flex items-center gap-2 shadow-sm transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>Generate Remita RRR & Submit Order</span>
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

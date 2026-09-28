export type TranscriptType = 
  | 'official_electronic' 
  | 'official_hardcopy' 
  | 'unofficial_student' 
  | 'wes_evaluation';

export type ProcessingPriority = 'standard' | 'express' | 'same_day';

export type RequestStatus = 
  | 'submitted' 
  | 'archive_retrieval' 
  | 'clearance_review' 
  | 'ready_to_seal' 
  | 'dispatched' 
  | 'hold';

export interface CourseRecord {
  code: string;
  title: string;
  credits: number;
  grade: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'A+' | 'A-' | 'B+' | 'B-' | 'C+';
  points: number; // credits * grade multiplier
}

export interface SemesterRecord {
  term: string; // e.g., "Fall 2021", "Spring 2022"
  academicYear: string;
  courses: CourseRecord[];
  termGpa: number;
  termCredits: number;
}

export interface StudentAcademicProfile {
  studentId: string; // Matriculation number e.g. "UEN/2019/248910"
  jambRegNo?: string; // e.g. "95810244BF"
  fullName: string;
  dob: string;
  gender: string;
  nationality: string;
  stateOfOrigin?: string; // e.g. "Anambra State", "Enugu State", "Imo State"
  degree: string; // e.g. "Bachelor of Science (Honours)"
  major: string; // e.g. "Computer Science"
  faculty: string; // e.g. "Faculty of Physical Sciences"
  enrollmentTerm: string;
  graduationDate: string;
  conferralStatus: 'Conferred' | 'In Progress' | 'Complete';
  cumulativeGpa: number; // e.g. 4.86 / 5.00
  totalCreditsEarned: number;
  academicStanding: string; // e.g. "First Class Honours" or "Second Class Honours (Upper Division)"
  deanHonorList: string[];
  semesters: SemesterRecord[];
  verificationHash: string;
  registrarName: string;
  dateIssued: string;
}

export interface TranscriptRequest {
  id: string; // Tracking Ref e.g. "TRX-2026-88102"
  studentId: string;
  jambRegNo?: string;
  remitaRrr?: string;
  fullName: string;
  email: string;
  phone: string;
  dob: string;
  stateOfOrigin?: string;
  faculty: string;
  degree: string;
  graduationYear: string;
  transcriptType: TranscriptType;
  priority: ProcessingPriority;
  recipientType: 'university' | 'employer' | 'evaluation_agency' | 'self';
  recipientName: string;
  recipientEmail: string;
  recipientAddress?: string;
  evaluationRefNo?: string; // e.g. WES ref #
  additionalInstructions?: string;
  submittedAt: string;
  estimatedCompletion: string;
  status: RequestStatus;
  statusNotes?: string;
  holdReason?: string;
  totalFee: number;
  paymentStatus: 'Paid' | 'Pending';
  trackingNumber?: string;
  uploadedDocumentName?: string;
  processedBy?: string;
  dispatchedAt?: string;
  securityHash?: string;
}

export interface VerificationResult {
  verified: boolean;
  code: string;
  studentName?: string;
  studentId?: string;
  degree?: string;
  major?: string;
  dateConferred?: string;
  cgpa?: number;
  status?: string;
  dateIssued?: string;
  institution: string;
  message: string;
}

import { StudentAcademicProfile, TranscriptRequest } from '../types';

export const UNIVERSITY_INFO = {
  name: "University of Eastern Nigeria",
  acronym: "UEN",
  motto: "To Restore the Dignity of Man (Iweghachi Nsọpụrụ nke Mmadụ)",
  established: "1960",
  department: "Records and Archives Directorate, Office of the University Registrar",
  address: "Senate Building, Nsukka Main Campus & Enugu Campus, Enugu State, Nigeria",
  phone: "+234 (0) 42 771 911 / +234 803 720 1928",
  email: "transcripts@uen.edu.ng",
  portalUrl: "https://transcripts.uen.edu.ng",
  registrar: "Dr. (Mrs.) Ifeoma Ngozi Okoli, Ph.D., FNIM",
  registrarTitle: "Registrar & Secretary to University Senate",
  bursar: "Chief Chukwuma E. Nwachukwu, FCA",
  bursarTitle: "University Bursar & Head of Treasury",
  nucCode: "NUC/REC/UEN/1960",
};

export const INITIAL_STUDENT_PROFILES: Record<string, StudentAcademicProfile> = {
  "2019/248910": {
    studentId: "2019/248910",
    jambRegNo: "96102844AJ",
    fullName: "Chidiebube Emmanuel Okafor",
    dob: "October 14, 1999",
    gender: "Male",
    nationality: "Nigerian",
    stateOfOrigin: "Anambra State (Idemili North L.G.A)",
    degree: "Bachelor of Science (Honours)",
    major: "Computer Science",
    faculty: "Faculty of Physical Sciences",
    enrollmentTerm: "Harmattan Semester 2019/2020",
    graduationDate: "July 18, 2023",
    conferralStatus: "Conferred",
    cumulativeGpa: 4.86,
    totalCreditsEarned: 142,
    academicStanding: "First Class Honours",
    deanHonorList: [
      "2019/2020 Academic Session",
      "2020/2021 Academic Session",
      "2021/2022 Academic Session",
      "2022/2023 Academic Session"
    ],
    verificationHash: "UEN-NUC-2023-CS-486A",
    registrarName: "Dr. (Mrs.) Ifeoma Ngozi Okoli, Ph.D., FNIM",
    dateIssued: "August 12, 2023",
    semesters: [
      {
        term: "Harmattan Semester (First Year)",
        academicYear: "2019/2020",
        termGpa: 4.88,
        termCredits: 18,
        courses: [
          { code: "COS 101", title: "Introduction to Computer Science & Computing Systems", credits: 3, grade: "A", points: 15.0 },
          { code: "MTH 111", title: "Elementary Mathematics I (Algebra & Trigonometry)", credits: 3, grade: "A", points: 15.0 },
          { code: "PHY 115", title: "General Physics for Physical Sciences I", credits: 2, grade: "A", points: 10.0 },
          { code: "PHY 191", title: "Practical Physics Laboratory I", credits: 1, grade: "A", points: 5.0 },
          { code: "CHM 101", title: "General Physical Chemistry", credits: 3, grade: "B", points: 12.0 },
          { code: "GSP 101", title: "Use of English & Communication Skills I", credits: 2, grade: "A", points: 10.0 },
          { code: "GSP 105", title: "Natural Sciences & Society", credits: 2, grade: "A", points: 10.0 },
          { code: "GSP 111", title: "Igbo Language, Culture & Social Heritage", credits: 2, grade: "A", points: 10.0 },
        ]
      },
      {
        term: "Rain Semester (First Year)",
        academicYear: "2019/2020",
        termGpa: 4.82,
        termCredits: 17,
        courses: [
          { code: "COS 102", title: "Introduction to Problem Solving & Structured Programming", credits: 3, grade: "A", points: 15.0 },
          { code: "MTH 121", title: "Elementary Mathematics II (Calculus & Coordinate Geometry)", credits: 3, grade: "A", points: 15.0 },
          { code: "PHY 124", title: "General Physics II (Electricity, Magnetism & Modern Physics)", credits: 3, grade: "B", points: 12.0 },
          { code: "GSP 102", title: "Use of English & Scientific Writing II", credits: 2, grade: "A", points: 10.0 },
          { code: "GSP 106", title: "Philosophy & Logic in African Thought", credits: 2, grade: "A", points: 10.0 },
          { code: "STA 132", title: "Inference & Applied Statistics for Computing", credits: 2, grade: "A", points: 10.0 },
          { code: "CED 142", title: "Introduction to Entrepreneurship & Innovation", credits: 2, grade: "A", points: 10.0 },
        ]
      },
      {
        term: "Harmattan Semester (Second Year)",
        academicYear: "2020/2021",
        termGpa: 4.90,
        termCredits: 19,
        courses: [
          { code: "COS 201", title: "Computer Programming I (Object-Oriented Java)", credits: 3, grade: "A", points: 15.0 },
          { code: "COS 231", title: "Data Structures & Linear Algorithms", credits: 3, grade: "A", points: 15.0 },
          { code: "COS 211", title: "Digital Computer Logic & Switching Theory", credits: 3, grade: "A", points: 15.0 },
          { code: "MTH 211", title: "Mathematical Methods I (Differential Equations)", credits: 3, grade: "A", points: 15.0 },
          { code: "MTH 221", title: "Linear Algebra & Matrix Transformations", credits: 3, grade: "A", points: 15.0 },
          { code: "GSP 201", title: "The Social Sciences & Contemporary Nigerian Society", credits: 2, grade: "A", points: 10.0 },
          { code: "GSP 207", title: "Humanities & Cultural Dynamics in Eastern Nigeria", credits: 2, grade: "A", points: 10.0 },
        ]
      },
      {
        term: "Rain Semester (Second Year)",
        academicYear: "2020/2021",
        termGpa: 4.85,
        termCredits: 18,
        courses: [
          { code: "COS 202", title: "Computer Programming II (C++ & Systems Programming)", credits: 3, grade: "A", points: 15.0 },
          { code: "COS 242", title: "Computer Architecture & Assembly Language", credits: 3, grade: "A", points: 15.0 },
          { code: "COS 262", title: "Relational Database Management Systems (SQL)", credits: 3, grade: "A", points: 15.0 },
          { code: "COS 252", title: "Discrete Structures & Automata Theory", credits: 3, grade: "A", points: 15.0 },
          { code: "CED 242", title: "Business Creation & Enterprise Development in Nigeria", credits: 2, grade: "B", points: 8.0 },
          { code: "MTH 242", title: "Vector Analysis & Complex Variables", credits: 4, grade: "A", points: 20.0 },
        ]
      },
      {
        term: "Harmattan Semester (Third Year)",
        academicYear: "2021/2022",
        termGpa: 4.88,
        termCredits: 18,
        courses: [
          { code: "COS 311", title: "Operating Systems Principles & Concurrency Control", credits: 3, grade: "A", points: 15.0 },
          { code: "COS 331", title: "Design & Analysis of Advanced Algorithms", credits: 3, grade: "A", points: 15.0 },
          { code: "COS 341", title: "Software Engineering Principles & Lifecycle", credits: 3, grade: "A", points: 15.0 },
          { code: "COS 371", title: "Data Communications & Computer Networking Protocols", credits: 3, grade: "A", points: 15.0 },
          { code: "COS 381", title: "Expert Systems & Knowledge-Based Computing", credits: 3, grade: "A", points: 15.0 },
          { code: "COS 391", title: "Research Methodology in Computer Science", credits: 3, grade: "B", points: 12.0 },
        ]
      },
      {
        term: "Rain Semester (Third Year - SIWES)",
        academicYear: "2021/2022",
        termGpa: 5.00,
        termCredits: 16,
        courses: [
          { code: "COS 300", title: "Students Industrial Work Experience Scheme (SIWES - 6 Months)", credits: 6, grade: "A", points: 30.0 },
          { code: "COS 302", title: "SIWES Technical Report & Institutional Defense", credits: 4, grade: "A", points: 20.0 },
          { code: "COS 304", title: "Industry Supervisor Assessment & Field Logbook", credits: 6, grade: "A", points: 30.0 },
        ]
      },
      {
        term: "Harmattan Semester (Final Year)",
        academicYear: "2022/2023",
        termGpa: 4.80,
        termCredits: 18,
        courses: [
          { code: "COS 411", title: "Distributed Systems & Cloud Computing Architectures", credits: 3, grade: "A", points: 15.0 },
          { code: "COS 421", title: "Compiler Construction & Formal Language Grammars", credits: 3, grade: "B", points: 12.0 },
          { code: "COS 451", title: "Computer Networks Security, Cryptography & Cyber Law", credits: 3, grade: "A", points: 15.0 },
          { code: "COS 471", title: "Big Data Analytics & Financial Technology Systems", credits: 3, grade: "A", points: 15.0 },
          { code: "COS 491", title: "Final Year Degree Project Seminar I", credits: 3, grade: "A", points: 15.0 },
          { code: "COS 481", title: "Human Computer Interaction & UI/UX Design", credits: 3, grade: "A", points: 15.0 },
        ]
      },
      {
        term: "Rain Semester (Final Year)",
        academicYear: "2022/2023",
        termGpa: 4.90,
        termCredits: 18,
        courses: [
          { code: "COS 499", title: "Original Research Project / Capstone Degree Thesis", credits: 6, grade: "A", points: 30.0 },
          { code: "COS 462", title: "Internet Technologies & Enterprise Web Systems", credits: 3, grade: "A", points: 15.0 },
          { code: "COS 482", title: "Mobile Application Development (Android/iOS)", credits: 3, grade: "A", points: 15.0 },
          { code: "COS 442", title: "Management Information Systems & Tech Entrepreneurship", credits: 3, grade: "A", points: 15.0 },
          { code: "COS 432", title: "Computer Graphics & Multimedia Systems", credits: 3, grade: "A", points: 15.0 },
        ]
      }
    ]
  },
  "2018/193044": {
    studentId: "2018/193044",
    jambRegNo: "87201940DE",
    fullName: "Ngozi Amarachi Eze",
    dob: "August 29, 1998",
    gender: "Female",
    nationality: "Nigerian",
    stateOfOrigin: "Enugu State (Nsukka L.G.A)",
    degree: "Bachelor of Science (Honours)",
    major: "Banking and Finance",
    faculty: "Faculty of Business Administration (Enugu Campus)",
    enrollmentTerm: "Harmattan Semester 2018/2019",
    graduationDate: "November 24, 2022",
    conferralStatus: "Conferred",
    cumulativeGpa: 4.38,
    totalCreditsEarned: 138,
    academicStanding: "Second Class Honours (Upper Division - 2:1)",
    deanHonorList: ["2020/2021 Academic Session", "2021/2022 Academic Session"],
    verificationHash: "UEN-NUC-2022-BNF-438B",
    registrarName: "Dr. (Mrs.) Ifeoma Ngozi Okoli, Ph.D., FNIM",
    dateIssued: "December 05, 2022",
    semesters: [
      {
        term: "Harmattan Semester (First Year)",
        academicYear: "2018/2019",
        termGpa: 4.30,
        termCredits: 17,
        courses: [
          { code: "BNF 101", title: "Introduction to Banking & Financial Institutions in Nigeria", credits: 3, grade: "A", points: 15.0 },
          { code: "ACC 101", title: "Principles of Accounting I", credits: 3, grade: "A", points: 15.0 },
          { code: "ECO 101", title: "Principles of Economics I (Microeconomics)", credits: 3, grade: "B", points: 12.0 },
          { code: "BUS 101", title: "Introduction to Business Management & Commerce", credits: 3, grade: "B", points: 12.0 },
          { code: "GSP 101", title: "Use of English & Communication Skills", credits: 2, grade: "A", points: 10.0 },
          { code: "GSP 111", title: "Nigerian Peoples & Culture (Igbo Civilization)", credits: 3, grade: "A", points: 15.0 },
        ]
      },
      {
        term: "Harmattan Semester (Final Year)",
        academicYear: "2021/2022",
        termGpa: 4.45,
        termCredits: 18,
        courses: [
          { code: "BNF 411", title: "Advanced Corporate Finance & Capital Structure", credits: 3, grade: "A", points: 15.0 },
          { code: "BNF 421", title: "International Banking, Forex Markets & Trade Finance", credits: 3, grade: "A", points: 15.0 },
          { code: "BNF 431", title: "Investment Analysis & Nigerian Stock Exchange Portfolio", credits: 3, grade: "A", points: 15.0 },
          { code: "BNF 441", title: "Bank Lending, Credit Risk Management & Recovery", credits: 3, grade: "B", points: 12.0 },
          { code: "BNF 451", title: "Monetary Policy & Central Bank of Nigeria Operations", credits: 3, grade: "A", points: 15.0 },
          { code: "BNF 491", title: "Final Year Research Seminar", credits: 3, grade: "A", points: 15.0 },
        ]
      },
      {
        term: "Rain Semester (Final Year)",
        academicYear: "2021/2022",
        termGpa: 4.50,
        termCredits: 16,
        courses: [
          { code: "BNF 499", title: "Original Research Project / Financial Sector Thesis", credits: 6, grade: "A", points: 30.0 },
          { code: "BNF 412", title: "Public Finance & Fiscal Policy in Developing Economies", credits: 3, grade: "A", points: 15.0 },
          { code: "BNF 422", title: "Microfinance, Cooperative Banking & Financial Inclusion", credits: 3, grade: "A", points: 15.0 },
          { code: "BNF 432", title: "Ethics, Corporate Governance & Financial Crimes Law", credits: 4, grade: "B", points: 16.0 },
        ]
      }
    ]
  },
  "2021/304192": {
    studentId: "2021/304192",
    jambRegNo: "10928401HB",
    fullName: "Somtochukwu Kenechukwu Nnamani",
    dob: "November 03, 2001",
    gender: "Male",
    nationality: "Nigerian",
    stateOfOrigin: "Enugu State (Nkanu West L.G.A)",
    degree: "Bachelor of Science",
    major: "Medical Biochemistry",
    faculty: "Faculty of Biological Sciences",
    enrollmentTerm: "Harmattan Semester 2021/2022",
    graduationDate: "Expected October 2025",
    conferralStatus: "In Progress",
    cumulativeGpa: 4.62,
    totalCreditsEarned: 88,
    academicStanding: "First Class Standing (Penultimate 300 Level)",
    deanHonorList: ["2021/2022 Academic Session", "2022/2023 Academic Session"],
    verificationHash: "UEN-NUC-2025-BCH-462P",
    registrarName: "Dr. (Mrs.) Ifeoma Ngozi Okoli, Ph.D., FNIM",
    dateIssued: "Current Academic Session",
    semesters: [
      {
        term: "Harmattan Semester (First Year)",
        academicYear: "2021/2022",
        termGpa: 4.70,
        termCredits: 18,
        courses: [
          { code: "BCH 101", title: "Introduction to General Biochemistry & Biomolecules", credits: 3, grade: "A", points: 15.0 },
          { code: "CHM 111", title: "General Physical Chemistry with Laboratory", credits: 3, grade: "A", points: 15.0 },
          { code: "BIO 151", title: "General Biology I (Cell Biology & Genetics)", credits: 3, grade: "A", points: 15.0 },
          { code: "PHY 111", title: "General Physics for Life & Medical Sciences", credits: 3, grade: "A", points: 15.0 },
          { code: "MTH 111", title: "Elementary Mathematics I", credits: 3, grade: "B", points: 12.0 },
          { code: "GSP 101", title: "Use of English & Communication Skills", credits: 3, grade: "A", points: 15.0 },
        ]
      },
      {
        term: "Harmattan Semester (Second Year)",
        academicYear: "2022/2023",
        termGpa: 4.60,
        termCredits: 19,
        courses: [
          { code: "BCH 201", title: "General Biochemistry I (Proteins, Enzymes & Coenzymes)", credits: 3, grade: "A", points: 15.0 },
          { code: "BCH 203", title: "Functional Biochemistry Laboratory Methods", credits: 2, grade: "A", points: 10.0 },
          { code: "CHM 221", title: "Organic Chemistry of Biomolecules & Reaction Mechanisms", credits: 3, grade: "A", points: 15.0 },
          { code: "MCB 201", title: "General Microbiology & Pathogen Identification", credits: 3, grade: "A", points: 15.0 },
          { code: "PIO 201", title: "Human Physiology for Medical & Life Sciences", credits: 3, grade: "B", points: 12.0 },
          { code: "ANAT 201", title: "Human Gross & Histological Anatomy", credits: 3, grade: "A", points: 15.0 },
          { code: "GSP 201", title: "Peace & Conflict Resolution Studies in Nigeria", credits: 2, grade: "A", points: 10.0 },
        ]
      }
    ]
  }
};

export const INITIAL_REQUESTS: TranscriptRequest[] = [
  {
    id: "TRX-2026-88102",
    studentId: "2019/248910",
    jambRegNo: "96102844AJ",
    remitaRrr: "3309-8412-9014",
    fullName: "Chidiebube Emmanuel Okafor",
    email: "chidiebube.okafor@alumni.uen.edu.ng",
    phone: "+234 803 555 4392",
    dob: "1999-10-14",
    stateOfOrigin: "Anambra State",
    faculty: "Faculty of Physical Sciences",
    degree: "B.Sc. (Honours) in Computer Science",
    graduationYear: "2023",
    transcriptType: "wes_evaluation",
    priority: "express",
    recipientType: "evaluation_agency",
    recipientName: "World Education Services (WES) Canada - Reference Office",
    recipientEmail: "submit@wes.org",
    evaluationRefNo: "WES-CAN-9912042",
    additionalInstructions: "Please attach certified NUC accreditation letter and Faculty Course Syllabus addendum for Canadian postgraduate evaluation.",
    submittedAt: "2026-09-14 09:30 AM",
    estimatedCompletion: "2026-09-16 04:00 PM",
    status: "dispatched",
    statusNotes: "Official eTranscript verified, cryptographically sealed with University Registrar digital signature, and securely transmitted via WES Direct Electronic Gateway.",
    totalFee: 55000,
    paymentStatus: "Paid",
    trackingNumber: "UEN-WES-DIR-88102",
    uploadedDocumentName: "UEN_Degree_Certificate_Okafor.pdf",
    processedBy: "Dr. (Mrs.) Ifeoma Ngozi Okoli, Registrar",
    dispatchedAt: "2026-09-15 02:15 PM",
    securityHash: "UEN-NUC-2023-CS-486A"
  },
  {
    id: "TRX-2026-77341",
    studentId: "2018/193044",
    jambRegNo: "87201940DE",
    remitaRrr: "1204-7719-4820",
    fullName: "Ngozi Amarachi Eze",
    email: "ngozi.eze@firstbank.ng",
    phone: "+234 814 555 8819",
    dob: "1998-08-29",
    stateOfOrigin: "Enugu State",
    faculty: "Faculty of Business Administration (Enugu Campus)",
    degree: "B.Sc. (Honours) Banking & Finance",
    graduationYear: "2022",
    transcriptType: "official_electronic",
    priority: "standard",
    recipientType: "employer",
    recipientName: "Central Bank of Nigeria (CBN) - HR Talent Acquisition Division",
    recipientEmail: "recruitment@cbn.gov.ng",
    evaluationRefNo: "CBN-HR-GRAD-2026/088",
    additionalInstructions: "Candidate verification for Central Bank of Nigeria Executive Trainee Scheme.",
    submittedAt: "2026-09-16 11:15 AM",
    estimatedCompletion: "2026-09-21 05:00 PM",
    status: "clearance_review",
    statusNotes: "Academic archives validated. Departmental HOD sign-off completed. Undergoing final Bursary Remita RRR clearance.",
    totalFee: 15000,
    paymentStatus: "Paid",
    uploadedDocumentName: "NYSC_Discharge_Certificate_Eze.pdf",
    processedBy: "Senior Assistant Registrar (Records) E. Ugwu"
  },
  {
    id: "TRX-2026-44910",
    studentId: "2021/304192",
    jambRegNo: "10928401HB",
    remitaRrr: "5501-9234-8812",
    fullName: "Somtochukwu Kenechukwu Nnamani",
    email: "somto.nnamani@students.uen.edu.ng",
    phone: "+234 703 555 3104",
    dob: "2001-11-03",
    stateOfOrigin: "Enugu State",
    faculty: "Faculty of Biological Sciences",
    degree: "B.Sc. Medical Biochemistry",
    graduationYear: "2025",
    transcriptType: "official_hardcopy",
    priority: "same_day",
    recipientType: "university",
    recipientName: "University of Lagos (UNILAG) - School of Postgraduate Studies",
    recipientEmail: "spgs@unilag.edu.ng",
    recipientAddress: "Senate Building, UNILAG Main Campus, Akoka, Yaba, Lagos State, Nigeria",
    additionalInstructions: "Enclose in tamper-evident sealed envelope with University Registrar red seal.",
    submittedAt: "2026-09-18 08:45 AM",
    estimatedCompletion: "2026-09-18 05:00 PM",
    status: "ready_to_seal",
    statusNotes: "Course results consolidated from Academic Board records. Awaiting Registrar physical embossment and seal.",
    totalFee: 51500,
    paymentStatus: "Paid",
    uploadedDocumentName: "Student_Identity_Card_Nnamani.pdf",
    processedBy: "Records Officer B. Chukwuemeka"
  },
  {
    id: "TRX-2026-12093",
    studentId: "2017/140291",
    jambRegNo: "78192044KA",
    remitaRrr: "2209-1140-5931",
    fullName: "Emeka Obinna Nwankwo",
    email: "emeka.nwankwo@lawchambers.ng",
    phone: "+234 802 555 7722",
    dob: "1997-04-12",
    stateOfOrigin: "Imo State",
    faculty: "Faculty of Law (Enugu Campus)",
    degree: "Bachelor of Laws (LL.B Honours)",
    graduationYear: "2022",
    transcriptType: "official_hardcopy",
    priority: "standard",
    recipientType: "university",
    recipientName: "Council of Legal Education - Nigerian Law School",
    recipientEmail: "admissions@lawschool.gov.ng",
    recipientAddress: "Nigerian Law School Headquarters, Bwari, P.M.B. 170, Garki, Abuja FCT, Nigeria",
    submittedAt: "2026-09-15 03:20 PM",
    estimatedCompletion: "Pending Hold Clearance",
    status: "hold",
    holdReason: "Nnamdi Azikiwe University Library Hold: Outstanding borrow record for 'Nigerian Commercial Law by Okonkwo' (Accession #LAW-2019-812). Please return book or pay replacement fee at University Library circulation desk.",
    statusNotes: "Transcript preparation paused due to outstanding Faculty of Law library return clearance.",
    totalFee: 31500,
    paymentStatus: "Paid",
    uploadedDocumentName: "Bar_Part_II_Admission_Letter.pdf",
    processedBy: "Registrar Desk - Legal Records Unit"
  }
];

export const PRICING_RULES = {
  types: {
    official_electronic: {
      name: "Official e-Transcript (Electronic / NUC e-Network)",
      fee: 15000,
      desc: "Digitally signed, cryptographically sealed PDF delivered directly to verified institution / employer portal within Nigeria and abroad."
    },
    official_hardcopy: {
      name: "Official Hardcopy (Watermark Paper & Embossed Seal)",
      fee: 25000,
      desc: "Printed on official security anti-tamper watermark paper with physical university crest wax seal, enclosed in sealed envelope."
    },
    wes_evaluation: {
      name: "International Credential Evaluation (WES, ECE, ICAS, IQAS)",
      fee: 45000,
      desc: "Direct electronic API transmission to World Education Services (WES Canada/US), ECE, or ICAS with official evaluation reference number."
    },
    unofficial_student: {
      name: "Student Advisory Copy / Statement of Results",
      fee: 5000,
      desc: "Internal academic advisory record for personal employment applications, scholarship screening, or NYSC mobilization."
    },
  },
  priorities: {
    standard: {
      name: "Standard Senate Processing",
      fee: 0,
      eta: "5 to 7 working days"
    },
    express: {
      name: "Express Priority Queue",
      fee: 10000,
      eta: "48 hours (2 working days)"
    },
    same_day: {
      name: "Same-Day Urgent Senate Clearance",
      fee: 20000,
      eta: "Same working day (by 5:00 PM)"
    },
  },
  delivery: {
    domesticCourier: 6500, // Courier dispatch within Nigeria (Lagos, Abuja, PH, etc.)
    internationalCourier: 35000, // International DHL Express
  }
};

// All website content lives in this file.
// Text that differs per language is written as { en: '...', id: '...' }.
// Dates are [year, month] — month is left out when the CV only gives a year.
//
// To add photos/certificates: put the file in public/images/... and fill in `src` / `image`
// with the path starting from /images, e.g. '/images/gallery/kkn-2025.jpg'.
//
// The downloadable PDF CV (scripts/cv.js) is generated from this file on every build.
// `cv` on an experience, organization or project controls the CV only (the website shows everything):
//   'full'  = title, dates and bullet points    'brief' = one line    false = left out
// Defaults: experience and projects 'full', organizations 'brief'.

export const profile = {
  name: 'Shandi Himawan',
  role: { en: 'Fullstack Developer', id: 'Fullstack Developer' },
  location: { en: 'Indonesia, Central Java', id: 'Purwokerto, Jawa Tengah' },
  photo: '/images/shandi-himawan.png', // files in public/ are served from the site root — no "/public" in the path
  summary: {
    en: 'Full-stack developer with a Bachelor of Informatics Engineering and a strong foundation in programming. Experienced in delivering real-world projects, including a recent pilot project in Europe, where I worked across the stack and adapted to international standards and expectations. I approach problems analytically, breaking down complexity into clean, maintainable solutions. Looking to join a team where I can build scalable, reliable web applications from database to interface.',
    id: 'Full-stack developer lulusan Sarjana Teknik Informatika dengan fondasi pemrograman yang kuat. Berpengalaman menyelesaikan proyek nyata, termasuk pilot project terbaru di Eropa, di mana saya bekerja di seluruh stack dan beradaptasi dengan standar serta ekspektasi internasional. Saya mendekati masalah secara analitis, memecah kompleksitas menjadi solusi yang bersih dan mudah dipelihara (maintainable). Saya ingin bergabung dengan tim yang memungkinkan saya membangun web application yang scalable dan andal, dari database hingga interface.',
  },
  email: 'printshandi@gmail.com',
  linkedin: 'https://www.linkedin.com/in/shandi-himawan-2b9214288',
  github: 'https://github.com/shandirise',
};

export const education = {
  title: { en: 'Bachelor of Informatics Engineering', id: 'Sarjana Teknik Informatika' },
  org: 'Universitas Muhammadiyah Purwokerto',
  start: [2022],
  end: [2026],
  gpa: '3.68',
  points: {
    en: [
      'GPA: 3.68 / 4.00',
      'Coursework: Web Programming, Databases, Computer Networks, Application Programming, and more',
    ],
    id: [
      'IPK: 3.68 / 4.00',
      'Mata kuliah: Pemrograman Web, Basis Data, Jaringan Komputer, Pemrograman Aplikasi, dll.',
    ],
  },
};

export const experience = [
  {
    title: { en: 'Computer Course Tutor', id: 'Tutor Kursus Komputer' },
    cv: 'brief',
    org: 'PSDK UMP',
    place: 'Banyumas',
    start: [2023, 1],
    end: [2023, 11],
    points: {
      en: ['Designed and taught training programs covering operating systems, Microsoft Office applications, and design software such as Canva'],
      id: ['Merancang dan mengajar program pelatihan yang mencakup sistem operasi, aplikasi Microsoft Office, dan perangkat lunak desain seperti Canva'],
    },
  },
  {
    title: { en: 'Polling Committee, 2024 Indonesian General Election', id: 'Panitia Pemilihan Umum Indonesia 2024' },
    cv: 'brief',
    org: { en: 'General Elections Commission (KPU)', id: 'Komisi Pemilihan Umum (KPU)' },
    place: 'Banyumas',
    start: [2024, 1],
    end: [2024, 2],
    points: {
      en: [
        'Stationed at Polling Station (TPS) 2, Tamansari Village, Banyumas',
        'Worked in a 7-person team, making sure ballots went into the correct boxes and organizing ballots once counting began',
      ],
      id: [
        'Bertugas di TPS 2 Desa Tamansari, Banyumas',
        'Bekerja dalam kelompok beranggotakan 7 orang, memastikan surat suara masuk ke kotak yang tepat, serta menyusun surat suara saat penghitungan dimulai',
      ],
    },
  },
  {
    title: { en: 'Polling Committee, 2024 Regional Head Election', id: 'Panitia Pemilihan Kepala Daerah 2024' },
    cv: 'brief',
    org: { en: 'General Elections Commission (KPU)', id: 'Komisi Pemilihan Umum (KPU)' },
    place: 'Banyumas',
    start: [2024, 10],
    end: [2024, 11],
    points: {
      en: [
        'Stationed at Polling Station (TPS) 2, Tamansari Village, Banyumas',
        'Worked in a 7-person team, making sure ballots went into the correct boxes and organizing ballots once counting began',
      ],
      id: [
        'Bertugas di TPS 2 Desa Tamansari, Banyumas',
        'Bekerja dalam kelompok beranggotakan 7 orang, memastikan surat suara masuk ke kotak yang tepat, serta menyusun surat suara saat penghitungan dimulai',
      ],
    },
  },
  {
    title: { en: 'IT Support Intern', id: 'Magang IT Support' },
    org: { en: 'Tamansari Village Government Office', id: 'Kantor Pemerintahan Desa Tamansari' },
    place: 'Banyumas',
    start: [2025, 2],
    end: [2025, 6],
    points: {
      en: [
        'Assisted with administrative work (Excel, Word, etc.), document management, and correspondence for the cooperative',
        'Helped troubleshoot IT issues',
        'Built and managed the village website',
        'Helped promote several village events',
      ],
      id: [
        'Membantu tugas administrasi seperti Excel, Word, dll., manajemen dokumen, dan korespondensi untuk koperasi',
        'Membantu troubleshooting masalah IT',
        'Membuat dan mengelola website untuk desa',
        'Membantu promosi beberapa acara desa',
      ],
    },
  },
  {
    title: { en: 'Secretary', id: 'Sekretaris' },
    cv: 'brief',
    org: 'Koperasi Desa Merah Putih',
    place: 'Banyumas',
    start: [2025, 4],
    end: [2026, 4],
    points: {
      en: ['Assisted with administrative work (Excel, Word, etc.), document management, and correspondence for the cooperative'],
      id: ['Membantu tugas administrasi seperti Excel, Word, dll., manajemen dokumen, dan korespondensi untuk koperasi'],
    },
  },
  {
    title: { en: 'English Extracurricular Teacher', id: 'Pengajar Ekskul Bahasa Inggris' },
    cv: 'brief',
    org: 'SMP Al Irsyad Boarding School',
    place: 'Banyumas',
    start: [2025, 7],
    end: [2026, 9],
    points: {
      en: ['Delivered non-formal lessons to improve students’ English understanding and speaking practice, aiming to raise their achievement in English'],
      id: ['Memberikan pembelajaran non formal untuk meningkatkan pemahaman dan praktik berbicara bahasa Inggris dengan tujuan meningkatkan prestasi siswa dalam bidang bahasa Inggris'],
    },
  },
  {
    title: { en: 'IT Support Intern', id: 'Mahasiswa Magang IT Support' },
    org: { en: 'Bureau of Cooperation & International Affairs, UMP', id: 'Biro Kerjasama dan Urusan Internasional UMP' },
    place: 'Banyumas',
    start: [2025, 10],
    end: [2026, 9],
    points: {
      en: [
        'Supported the office’s IT needs and helped build applications that make daily work easier',
        'Helped troubleshoot technology issues',
        'Social media editor',
        'Served as a buddy for international students',
      ],
      id: [
        'Membantu kebutuhan IT kantor serta mendukung pembuatan aplikasi untuk mempermudah pekerjaan',
        'Membantu troubleshooting masalah teknologi',
        'Editor media sosial',
        'Membantu menjadi buddy bagi mahasiswa internasional',
      ],
    },
  },
  {
    title: { en: 'Fullstack Developer (Pilot Project)', id: 'Fullstack Developer (Pilot Project)' },
    org: 'Fundor.hu',
    place: { en: 'Remote · Hungary', id: 'Remote · Hongaria' },
    start: [2026, 9],
    end: [2026, 10],
    points: {
      en: [
        'One of three developers building Fundor.hu, a grant-matching platform that helps Hungarian SMEs find EU and national funding (Laravel, React, TypeScript)',
        'Containerised the app with a multi-stage Docker build and deployed it to the cloud, including TLS and CSRF handling behind a reverse proxy',
        'Built account features: email verification and password reset with 6-digit codes, bilingual Hungarian/English emails, and multiple company profiles',
        'Built product features: an interactive grant calculator, a loan information page, how-to-apply guides and a consultation box, plus mobile layout fixes and the v2.0 rebrand',
      ],
      id: [
        'Salah satu dari tiga developer yang membangun Fundor.hu, platform pencocokan hibah yang membantu UKM di Hongaria menemukan pendanaan Uni Eropa dan nasional (Laravel, React, TypeScript)',
        'Mengemas aplikasi dengan multi-stage Docker build dan men-deploy-nya ke cloud, termasuk penanganan TLS dan CSRF di balik reverse proxy',
        'Membangun fitur akun: verifikasi email dan reset kata sandi dengan kode 6 digit, email dwibahasa Hongaria/Inggris, serta beberapa profil perusahaan',
        'Membangun fitur produk: kalkulator hibah interaktif, halaman informasi pinjaman, panduan cara mendaftar, dan kotak konsultasi, serta perbaikan tampilan mobile dan rebrand v2.0',
      ],
    },
  },
];

export const organizations = [
  {
    title: { en: 'Public Relations Staff', id: 'Staf Hubungan Masyarakat' },
    org: { en: 'Informatics Engineering Student Association (HMTI) UMP', id: 'Himpunan Mahasiswa Teknik Informatika UMP' },
    start: [2022],
    end: [2023],
    points: {
      en: ['Represented the organization in building external relations, on and off campus, with universities, organizations, and other institutions'],
      id: ['Ditugaskan sebagai perwakilan organisasi untuk membangun hubungan eksternal, baik di dalam maupun di luar kampus, dengan universitas, organisasi, dan institusi lain'],
    },
  },
  {
    title: { en: 'Member', id: 'Anggota' },
    org: { en: 'Software Engineering Study Club UMP', id: 'Klub Studi Rekayasa Perangkat Lunak UMP' },
    start: [2022],
    end: [2023],
    points: {
      en: ['Eager to learn software engineering; active in online and offline study sessions together with lecturers and senior students'],
      id: ['Antusias belajar rekayasa perangkat lunak, aktif dalam kegiatan belajar bersama secara daring maupun luring dengan berkolaborasi bersama dosen dan mahasiswa senior'],
    },
  },
  {
    title: { en: 'Human Resources Development Staff', id: 'Staf Pengembangan Sumber Daya Manusia' },
    org: { en: 'PERMIKOMNAS Regional Board, Region 7 Central Java', id: 'Pengurus Wilayah PERMIKOMNAS Wilayah 7 Jawa Tengah' },
    start: [2023],
    end: [2024],
    points: {
      en: ['Developed programs to strengthen the organization’s academic and non-academic growth, and widened program reach to hold province-level events for all members'],
      id: ['Mengembangkan program untuk meningkatkan pengembangan akademik dan non-akademik organisasi. Mengoptimalkan jangkauan program untuk menyelenggarakan acara tingkat provinsi yang bermanfaat bagi seluruh anggota'],
    },
  },
  {
    title: { en: 'Deputy Head of Public Relations & Publications', id: 'Wakil Hubungan Masyarakat & Publikasi' },
    org: 'Elite English Voice UMP',
    start: [2023],
    end: [2024],
    points: {
      en: ['Supported the division head in managing staff, ran the organization’s social media, built external relations as a representative, and managed partnerships'],
      id: ['Mendukung Kepala Divisi dalam manajemen staf, mengelola media sosial organisasi, membangun hubungan eksternal sebagai perwakilan, dan mengelola kemitraan'],
    },
  },
  {
    title: { en: 'Head of Public Relations', id: 'Kepala Hubungan Masyarakat' },
    org: { en: 'Informatics Engineering Student Association (HMTI) UMP', id: 'Himpunan Mahasiswa Teknik Informatika UMP' },
    start: [2023],
    end: [2024],
    points: {
      en: ['Led the division by managing staff and giving guidance and direction, and represented the organization in external relations with universities, organizations, and institutions'],
      id: ['Memimpin divisi dengan mengelola staf, memberikan bimbingan dan arahan, serta mewakili organisasi dalam membangun hubungan eksternal dengan universitas, organisasi, dan institusi'],
    },
  },
  {
    title: { en: 'Chairperson', id: 'Ketua' },
    cv: 'full',
    org: 'Elite English Voice UMP',
    start: [2024],
    end: [2025],
    points: {
      en: [
        'Led the organization by overseeing all divisions, setting strategic direction, and making sure its goals were met',
        'Represented the organization internally and externally, building collaboration with universities, organizations, and institutions',
        'Coordinated staff management, mentored members’ growth, and upheld the organization’s reputation through effective leadership',
      ],
      id: [
        'Memimpin organisasi dengan mengawasi seluruh divisi, menetapkan arah strategis, dan memastikan tercapainya tujuan organisasi',
        'Mewakili organisasi dalam hubungan internal maupun eksternal, membina kolaborasi dengan universitas, organisasi, dan institusi',
        'Mengawasi dan mengoordinasikan manajemen staf, membimbing perkembangan anggota, dan menjaga reputasi organisasi melalui kepemimpinan yang efektif',
      ],
    },
  },
  {
    title: { en: 'Village Coordinator', id: 'Koordinator Desa' },
    org: { en: 'Community Service Program (KKN) UMP', id: 'KKN Universitas Muhammadiyah Purwokerto' },
    start: [2025],
    points: {
      en: [
        'Coordinated KKN at village level, overseeing program delivery and managing communication between students and the village government',
        'Organized community development activities, including education, social service, and digital literacy training',
      ],
      id: [
        'Bertindak sebagai koordinator KKN tingkat desa, mengawasi pelaksanaan program dan mengelola komunikasi antara mahasiswa dan pemerintah desa',
        'Menyelenggarakan kegiatan pengembangan masyarakat, meliputi pendidikan, pengabdian sosial, dan pelatihan literasi digital',
      ],
    },
  },
  {
    title: { en: 'Student Ambassador', id: 'Duta Mahasiswa' },
    org: 'Prometheus Academy',
    start: [2026],
    points: {
      en: ['Represented Prometheus at campus events such as webinars', 'Organized campus-wide events'],
      id: ['Menjadi perwakilan Prometheus pada acara kampus seperti webinar dan lainnya', 'Menyelenggarakan acara berskala kampus'],
    },
  },
];

// `stack` names must match the skill names below — that is how "Used in" is filled.
// `url` = live site, `repo` = public source code (leave empty for client/proprietary code).
export const projects = [
  {
    name: 'F1 Pedia',
    cv: 'brief',
    type: { en: 'Web Front-End', id: 'Web Front-End' },
    year: 2023,
    stack: ['HTML', 'CSS'],
    url: 'https://shandirise.github.io/f1pedia/',
    repo: 'https://github.com/shandirise/f1pedia',
    image: '',
    points: {
      en: ['Front-end built with plain HTML and CSS, no framework', 'Covers the 2023 Formula 1 season for fans'],
      id: ['Membangun bagian front-end hanya dengan HTML dan CSS tanpa framework', 'Menyediakan informasi tentang F1 2023 untuk para penggemar'],
    },
  },
  {
    name: { en: 'Pharmacy Store Website', id: 'Website Toko Apotek' },
    cv: 'brief',
    type: { en: 'Web Front-End', id: 'Web Front-End' },
    year: 2023,
    stack: ['ASP.NET', 'C#', 'SQL'],
    url: '',
    image: '',
    points: {
      en: ['Built with the ASP.NET framework', 'Online store with a shopping cart, using CRUD operations'],
      id: ['Dibangun dengan framework ASP.NET', 'Website toko dengan fitur keranjang belanja, menggunakan operasi CRUD'],
    },
  },
  {
    name: 'FitZone',
    type: { en: 'React Native App', id: 'Aplikasi React Native' },
    year: 2024,
    stack: ['React Native', 'TypeScript'],
    url: '',
    repo: 'https://github.com/shandirise/project_01',
    image: '',
    points: {
      en: [
        'Mobile workout app built with React Native and TypeScript',
        'Guided screens for warm-up, push-ups, sit-ups, squats and plank, plus a progress screen',
      ],
      id: [
        'Aplikasi olahraga mobile yang dibangun dengan React Native dan TypeScript',
        'Layar panduan untuk pemanasan, push-up, sit-up, squat, dan plank, serta layar progres',
      ],
    },
  },
  {
    name: 'Todo App',
    type: { en: 'Fullstack JavaScript', id: 'Fullstack JavaScript' },
    year: 2025,
    stack: ['Next.js', 'Express', 'JavaScript', 'SQL'],
    url: '',
    repo: 'https://github.com/shandirise/todo-app',
    image: '',
    points: {
      en: [
        'Next.js frontend with Redux Toolkit for state management',
        'REST API built with Express and the Sequelize ORM on MySQL, with database migrations',
      ],
      id: [
        'Frontend Next.js dengan Redux Toolkit untuk manajemen state',
        'REST API dengan Express dan ORM Sequelize di MySQL, lengkap dengan migrasi database',
      ],
    },
  },
  {
    name: 'SI-UMKM',
    type: { en: 'Course project · Next.js', id: 'Tugas kuliah · Next.js' },
    year: 2025,
    stack: ['Next.js', 'TypeScript', 'GraphQL', 'Firebase', 'Tailwind CSS'],
    url: 'https://si-umkm-o3rl.vercel.app',
    repo: '', // add the repo link once the admin login no longer has a hardcoded password
    image: '',
    points: {
      en: [
        'Marketplace and training platform for Indonesian MSMEs (UMKM), built for the Framework-Based Programming course',
        'Product catalogue, cart, checkout, order history, product reviews, and training registration',
        'JWT-protected admin dashboard, REST and GraphQL (Apollo) APIs on Firebase, with user content sanitised against XSS',
      ],
      id: [
        'Platform marketplace dan pelatihan untuk UMKM, dibuat untuk mata kuliah Pemrograman Berbasis Framework',
        'Katalog produk, keranjang, checkout, riwayat pesanan, ulasan produk, dan pendaftaran pelatihan',
        'Dashboard admin yang dilindungi JWT, API REST dan GraphQL (Apollo) di Firebase, dengan konten pengguna yang disanitasi dari XSS',
      ],
    },
  },
  {
    name: { en: 'Tamansari Village Profile', id: 'Web Profil Desa Tamansari' },
    type: { en: 'Native PHP Web App', id: 'Web PHP Native' },
    year: 2025,
    stack: ['PHP'],
    url: '',
    image: '',
    points: {
      en: ['News management and a document archive', 'Shows real village data for transparency to residents'],
      id: ['Berisi manajemen berita dan arsip dokumen', 'Menampilkan data real guna menjadi transparansi ke warga'],
    },
  },
  {
    name: 'Smart IAO',
    type: { en: 'Native PHP App', id: 'Aplikasi PHP Native' },
    year: 2026,
    stack: ['PHP'],
    url: '',
    image: '',
    points: {
      en: [
        'Built with native PHP',
        'Made on request during my internship at the Bureau of Cooperation & International Affairs',
        'An operational system that supports day-to-day office work',
      ],
      id: [
        'Dibangun dengan PHP',
        'Dibuat sesuai permintaan saat magang di Biro Kerjasama dan Urusan Internasional',
        'Sistem operasional penunjang kerja kantor',
      ],
    },
  },
  {
    name: 'Fundor.hu',
    cv: false, // already in Experience on the CV
    type: { en: 'Pilot project · Laravel + React', id: 'Pilot project · Laravel + React' },
    year: 2026,
    stack: ['Laravel', 'PHP', 'React', 'TypeScript', 'Tailwind CSS', 'Docker'],
    url: 'https://fundor.hu',
    repo: '', // proprietary client code: no public code link
    image: '',
    points: {
      en: [
        'Grant-matching platform for Hungarian SMEs: checks a company profile against open EU and national funding calls and ranks the best matches',
        'Built remotely in a team of three. My part: Docker build and cloud deployment, account security (email verification, password reset), the grant calculator, the loans page, and mobile fixes',
        'Bilingual (Hungarian/English) and live at fundor.hu',
      ],
      id: [
        'Platform pencocokan hibah untuk UKM di Hongaria: mencocokkan profil perusahaan dengan program pendanaan Uni Eropa dan nasional yang sedang dibuka, lalu mengurutkan yang paling sesuai',
        'Dikerjakan secara remote dalam tim tiga orang. Bagian saya: Docker build dan deployment ke cloud, keamanan akun (verifikasi email, reset kata sandi), kalkulator hibah, halaman pinjaman, dan perbaikan tampilan mobile',
        'Dwibahasa (Hongaria/Inggris) dan sudah live di fundor.hu',
      ],
    },
  },
];

export const skillGroups = [
  {
    title: { en: 'Programming Languages', id: 'Bahasa Pemrograman' },
    items: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'PHP', 'SQL', 'C#'],
  },
  {
    title: { en: 'Frameworks & Libraries', id: 'Framework & Library' },
    items: ['Laravel', 'React', 'Next.js', 'React Native', 'Express', 'GraphQL', 'Tailwind CSS', 'ASP.NET', 'Bootstrap'],
  },
  {
    title: { en: 'Tools', id: 'Perangkat' },
    items: ['Docker', 'Git', 'Firebase', 'Visual Studio Code', 'Visual Studio', 'Navicat', 'Microsoft Office', 'CorelDraw', 'Canva'],
  },
];

export const softSkills = {
  en: ['Leadership', 'Communication', 'Problem solving', 'Teamwork'],
  id: ['Kepemimpinan', 'Komunikasi', 'Pemecahan masalah', 'Kerja tim'],
};

export const spokenLanguages = {
  en: ['Indonesian — native', 'English — working proficiency'],
  id: ['Bahasa Indonesia — native', 'Bahasa Inggris — kemampuan kerja'],
};

// To add a photo: put it in public/images/gallery/ and add an entry. An empty `src` shows a "coming soon" placeholder.
export const gallery = [
  {
    src: '/images/gallery/pilot-project-meeting-2026.jpg',
    caption: { en: 'Pilot project meeting · Sep 2026', id: 'Rapat pilot project · Sep 2026' },
  },
  {
    src: '/images/gallery/prometheus-academy-ambassador-signing.jpg',
    caption: { en: 'Signing as Prometheus Academy Student Ambassador', id: 'Penandatanganan Duta Mahasiswa Prometheus Academy' },
  },
];

// To add one: copy an entry. `image` is the thumbnail, `url` what opens on click (e.g. the PDF), `points` optional.
// An entry with an empty title shows as a "coming soon" placeholder.
export const certificates = [
  {
    title: { en: 'Certificate of Competence — Programmer', id: 'Sertifikat Kompetensi — Pemrogram' },
    issuer: { en: 'BNSP · LSP Universitas Muhammadiyah Purwokerto', id: 'BNSP · LSP Universitas Muhammadiyah Purwokerto' },
    year: '2026',
    image: '/images/certificates/bnsp-programmer-shandi-himawan.jpg',
    url: '/images/certificates/bnsp-programmer-shandi-himawan.pdf',
    points: {
      en: [
        'Certified competent as a Programmer in Software Development by BNSP (Indonesian Professional Certification Authority), based on the national SKKNI standard',
        '9 competency units: software specifications, coding guidelines and best practices, structured and object-oriented programming, libraries and pre-existing components, database access, code documentation, debugging, and unit testing',
        'Issued 29 April 2026 · valid for 3 years',
      ],
      id: [
        'Dinyatakan kompeten sebagai Pemrogram di bidang Pengembangan Perangkat Lunak oleh BNSP (Badan Nasional Sertifikasi Profesi), berdasarkan standar SKKNI',
        '9 unit kompetensi: spesifikasi program, penulisan kode sesuai guidelines dan best practices, pemrograman terstruktur dan berorientasi objek, library dan komponen pre-existing, akses basis data, dokumentasi kode, debugging, dan pengujian unit program',
        'Diterbitkan 29 April 2026 · berlaku 3 tahun',
      ],
    },
  },
];

// Research. Once the article is out: set `status`, add `url` (DOI or journal page),
// and `pdf` only if the journal allows sharing the full text.
// `project` links the paper to the project with the same name.
export const publications = [
  {
    title:
      'Separation of Concerns in Native PHP Web Applications: A Design Science Evaluation of Security, Testability, and Maintainability',
    authors: ['Shandi Himawan', 'Dimara Kusuma Hakim', 'Feri Wibowo', 'Harjono'],
    affiliation: { en: 'Department of Informatics Engineering, Universitas Muhammadiyah Purwokerto', id: 'Program Studi Teknik Informatika, Universitas Muhammadiyah Purwokerto' },
    venue: 'Jurnal E-Komtek',
    issn: 'p-ISSN 2580-3719 · e-ISSN 2622-3066',
    year: 2026,
    status: { en: 'Forthcoming — expected December 2026', id: 'Segera terbit — perkiraan Desember 2026' },
    note: { en: 'Undergraduate thesis research', id: 'Penelitian skripsi' },
    project: 'Smart IAO',
    url: '',
    pdf: '',
    summary: {
      en: 'Proposes a lightweight convention for native PHP apps without a framework: each feature is split into a UI Page (renders the form, checks access) and an Action Handler (handles POST, validation, and database work, with zero HTML). Evaluated on the leave permit workflow of Smart IAO with code metrics and 15 security and workflow test cases.',
      id: 'Mengusulkan konvensi ringan untuk aplikasi PHP native tanpa framework: setiap fitur dipisah menjadi UI Page (merender formulir, memeriksa akses) dan Action Handler (menangani POST, validasi, dan operasi basis data, tanpa HTML). Dievaluasi pada alur pengajuan izin di Smart IAO dengan metrik kode dan 15 kasus uji keamanan serta alur kerja.',
    },
    findings: [
      { value: '15/15', label: { en: 'black-box test cases passed', id: 'kasus uji black box lulus' } },
      { value: '0', label: { en: 'lines of HTML in the Action Handler', id: 'baris HTML di Action Handler' } },
      { value: '6', label: { en: 'security layers in the handler', id: 'lapisan keamanan di handler' } },
      { value: '3', label: { en: 'OWASP Top 10:2025 risks tested', id: 'risiko OWASP Top 10:2025 diuji' } },
    ],
    abstract: {
      en: 'Many academic web systems built with PHP combine presentation logic, business logic, and database access code within a single file. This article proposes and evaluates a lightweight, framework independent convention for the separation of presentation and logic in the user submission workflow of the Leave Permit Management module in the Smart IAO web application. The UI Page handles form rendering and page access control, while the Action Handler handles POST requests, validation, and database operations. The evaluation uses 15 purposively selected black box test cases and structural indicators based on three researcher defined DSR evaluation criteria. In the audited source snapshot, the UI Page comprises 218 physical lines and the Action Handler comprises 117 physical lines; the Action Handler contains no HTML markup. Extended McCabe analysis gives file level Cyclomatic Complexity values of 4 for the UI Page and 19 for the Action Handler. The higher handler value shows that responsibility separation does not by itself eliminate branching complexity. All 15 test cases passed under the specified scenarios. These findings provide preliminary evidence and are limited to the user submission workflow.',
      id: 'Banyak sistem web akademik yang dibangun dengan PHP menggabungkan logika presentasi, logika bisnis, dan akses basis data dalam satu berkas. Artikel ini mengusulkan dan mengevaluasi konvensi ringan yang tidak bergantung pada framework untuk memisahkan presentasi dan logika pada alur pengajuan pengguna dalam modul Leave Permit Management pada aplikasi web Smart IAO. UI Page menangani perenderan formulir dan pengendalian akses halaman, sedangkan Action Handler menangani permintaan POST, validasi, dan operasi basis data. Evaluasi menggunakan 15 kasus uji black box yang dipilih secara terarah dan indikator struktural berdasarkan tiga kriteria evaluasi DSR yang dirumuskan peneliti. Pada snapshot sumber yang diaudit, UI Page terdiri atas 218 baris fisik dan Action Handler terdiri atas 117 baris fisik; Action Handler tidak mengandung markup HTML. Analisis McCabe yang diperluas menghasilkan Cyclomatic Complexity tingkat berkas sebesar 4 untuk UI Page dan 19 untuk Action Handler. Nilai handler yang lebih tinggi menunjukkan bahwa pemisahan tanggung jawab tidak dengan sendirinya menghilangkan kompleksitas percabangan. Seluruh 15 kasus uji lulus pada skenario yang ditentukan. Temuan ini memberikan bukti awal dan terbatas pada alur pengajuan pengguna.',
    },
    keywords: {
      en: ['PHP', 'Separation of Presentation and Logic', 'Framework Independent Architecture', 'UI Page', 'Action Handler'],
      id: ['PHP', 'Pemisahan Presentasi dan Logika', 'Arsitektur Tanpa Framework', 'UI Page', 'Action Handler'],
    },
  },
];

// Interface text
export const ui = {
  nav: {
    about: { en: 'About', id: 'Tentang' },
    journey: { en: 'Journey', id: 'Perjalanan' },
    projects: { en: 'Projects', id: 'Proyek' },
    research: { en: 'Research', id: 'Riset' },
    skills: { en: 'Code Mastery', id: 'Keahlian' },
    gallery: { en: 'Gallery', id: 'Galeri' },
    certificates: { en: 'Certificates', id: 'Sertifikat' },
    contact: { en: 'Contact', id: 'Kontak' },
  },
  hero: {
    time: { en: 'local time', id: 'waktu setempat' },
    explore: { en: 'Explore my journey', id: 'Jelajahi perjalanan saya' },
    contact: { en: 'Get in touch', id: 'Hubungi saya' },
    scroll: { en: 'Scroll', id: 'Gulir' },
  },
  stats: {
    gpa: { en: 'GPA', id: 'IPK' },
    projects: { en: 'Projects', id: 'Proyek' },
    work: { en: 'Work roles', id: 'Pengalaman kerja' },
    orgs: { en: 'Organizations', id: 'Organisasi' },
  },
  about: {
    title: { en: 'About Me', id: 'Tentang Saya' },
    education: { en: 'Education', id: 'Pendidikan' },
    languages: { en: 'Languages', id: 'Bahasa' },
    location: { en: 'Based in', id: 'Domisili' },
  },
  journey: {
    title: { en: 'My Journey', id: 'Perjalanan Saya' },
    sub: { en: 'Everything in chronological order, from 2022 to today.', id: 'Semua dalam urutan kronologis, dari 2022 hingga sekarang.' },
    all: { en: 'All', id: 'Semua' },
    education: { en: 'Education', id: 'Pendidikan' },
    work: { en: 'Work', id: 'Pekerjaan' },
    org: { en: 'Organization', id: 'Organisasi' },
    project: { en: 'Project', id: 'Proyek' },
    research: { en: 'Research', id: 'Riset' },
  },
  projects: {
    title: { en: 'Projects', id: 'Proyek' },
    sub: { en: 'Things I’ve built along the way.', id: 'Hal-hal yang telah saya bangun.' },
    live: { en: 'Visit site', id: 'Kunjungi situs' },
    research: { en: 'Read the research', id: 'Baca risetnya' },
    code: { en: 'View code', id: 'Lihat kode' },
  },
  research: {
    title: { en: 'Research', id: 'Riset' },
    sub: { en: 'My undergraduate thesis, written as a journal article.', id: 'Skripsi saya, ditulis sebagai artikel jurnal.' },
    abstract: { en: 'Read the abstract', id: 'Baca abstrak' },
    keywords: { en: 'Keywords', id: 'Kata kunci' },
    read: { en: 'Read the paper', id: 'Baca artikel' },
    pdf: { en: 'Download PDF', id: 'Unduh PDF' },
    project: { en: 'Evaluated on', id: 'Dievaluasi pada' },
  },
  skills: {
    title: { en: 'Code Mastery', id: 'Penguasaan Kode' },
    sub: { en: 'The technology I work with, and the projects where I used it.', id: 'Teknologi yang saya gunakan, dan proyek tempat saya memakainya.' },
    usedIn: { en: 'Used in', id: 'Dipakai di' },
    soft: { en: 'Soft skills', id: 'Keahlian non-teknis' },
  },
  gallery: {
    title: { en: 'Gallery', id: 'Galeri' },
    sub: { en: 'Moments from work, organizations, and events.', id: 'Momen dari pekerjaan, organisasi, dan acara.' },
    soon: { en: 'Photo coming soon', id: 'Foto segera hadir' },
  },
  certificates: {
    title: { en: 'Certificates', id: 'Sertifikat' },
    sub: { en: 'Courses and achievements.', id: 'Kursus dan pencapaian.' },
    soon: { en: 'Certificate coming soon', id: 'Sertifikat segera hadir' },
    view: { en: 'View certificate', id: 'Lihat sertifikat' },
  },
  contact: {
    title: { en: 'Let’s work together', id: 'Mari bekerja sama' },
    sub: { en: 'Open to web development roles at technology companies.', id: 'Terbuka untuk posisi pengembang web di perusahaan teknologi.' },
    email: { en: 'Email me', id: 'Kirim email' },
  },
  footer: { en: 'Built with Three.js & Vite.', id: 'Dibuat dengan Three.js & Vite.' },
  top: { en: 'Back to top', id: 'Kembali ke atas' },
  langLabel: { en: 'Ganti ke Bahasa Indonesia', id: 'Switch to English' },
  menu: { en: 'Menu', id: 'Menu' },
  // Download button + section headings of the PDF CV
  cv: {
    download: { en: 'Download CV', id: 'Unduh CV' },
    summary: { en: 'Summary', id: 'Ringkasan' },
    skills: { en: 'Skills', id: 'Keahlian' },
    experience: { en: 'Experience', id: 'Pengalaman Kerja' },
    projects: { en: 'Projects', id: 'Proyek' },
    education: { en: 'Education', id: 'Pendidikan' },
    certifications: { en: 'Certifications', id: 'Sertifikasi' },
    publications: { en: 'Publications', id: 'Publikasi' },
    leadership: { en: 'Leadership & Organizations', id: 'Organisasi & Kepemimpinan' },
    other: { en: 'Additional Experience', id: 'Pengalaman Lainnya' },
    languages: { en: 'Languages', id: 'Bahasa' },
  },
};

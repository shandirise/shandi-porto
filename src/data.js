// All website content lives in this file.
// Text that differs per language is written as { en: '...', id: '...' }.
// Dates are [year, month] — month is left out when the CV only gives a year.
//
// To add photos/certificates: put the file in public/images/... and fill in `src` / `image`
// with the path starting from /images, e.g. '/images/gallery/kkn-2025.jpg'.

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
export const projects = [
  {
    name: 'F1 Pedia',
    type: { en: 'Web Front-End', id: 'Web Front-End' },
    year: 2023,
    stack: ['HTML', 'CSS'],
    url: 'https://shandirise.github.io/f1pedia/',
    image: '',
    points: {
      en: ['Front-end built with plain HTML and CSS, no framework', 'Covers the 2023 Formula 1 season for fans'],
      id: ['Membangun bagian front-end hanya dengan HTML dan CSS tanpa framework', 'Menyediakan informasi tentang F1 2023 untuk para penggemar'],
    },
  },
  {
    name: { en: 'Pharmacy Store Website', id: 'Website Toko Apotek' },
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
    stack: ['React Native', 'JavaScript'],
    url: '',
    image: '',
    points: {
      en: ['Built with React Native', 'An app that helps users work out'],
      id: ['Dibangun dengan React Native', 'Aplikasi untuk membantu pengguna berolahraga'],
    },
  },
  {
    name: { en: 'Tamansari Village Profile', id: 'Web Profil Desa Tamansari' },
    type: { en: 'Laravel Web App', id: 'Web Laravel' },
    year: 2025,
    stack: ['Laravel', 'PHP'],
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
];

export const skillGroups = [
  {
    title: { en: 'Languages', id: 'Bahasa Pemrograman' },
    items: ['HTML', 'CSS', 'JavaScript', 'PHP', 'SQL', 'C#'],
  },
  {
    title: { en: 'Frameworks & Libraries', id: 'Framework & Library' },
    items: ['Laravel', 'ASP.NET', 'React Native', 'Bootstrap'],
  },
  {
    title: { en: 'Tools', id: 'Perangkat' },
    items: ['Visual Studio Code', 'Visual Studio', 'Navicat', 'Microsoft Office', 'CorelDraw', 'Canva'],
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

// Placeholders: fill in `src` and `caption` once you have photos.
export const gallery = [
  { src: '', caption: { en: '', id: '' } },
  { src: '', caption: { en: '', id: '' } },
  { src: '', caption: { en: '', id: '' } },
  { src: '', caption: { en: '', id: '' } },
  { src: '', caption: { en: '', id: '' } },
  { src: '', caption: { en: '', id: '' } },
];

// Placeholders: fill in title / issuer / year / image (and optional url to verify).
export const certificates = [
  { title: '', issuer: '', year: '', image: '', url: '' },
  { title: '', issuer: '', year: '', image: '', url: '' },
  { title: '', issuer: '', year: '', image: '', url: '' },
];

// Interface text
export const ui = {
  nav: {
    about: { en: 'About', id: 'Tentang' },
    journey: { en: 'Journey', id: 'Perjalanan' },
    projects: { en: 'Projects', id: 'Proyek' },
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
  },
  projects: {
    title: { en: 'Projects', id: 'Proyek' },
    sub: { en: 'Things I’ve built along the way.', id: 'Hal-hal yang telah saya bangun.' },
    live: { en: 'Visit site', id: 'Kunjungi situs' },
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
    view: { en: 'Verify', id: 'Verifikasi' },
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
};

const icons = {
  home: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-6v-7h-4v7H4a1 1 0 0 1-1-1z"/>',
  grade: '<path d="M2 8l10-5 10 5-10 5z"/><path d="M6 10v5c3 3 9 3 12 0v-5M22 8v7"/>',
  group: '<path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="10" cy="7" r="4"/><path d="M20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M5 21v-2a7 7 0 0 1 14 0v2"/>',
  chart: '<path d="M4 19v-5M10 19V9M16 19V5M22 19V2"/>',
  clipboard: '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V2h6v2M9 9h6M9 13h6M9 17h3"/>',
  wallet: '<rect x="3" y="5" width="18" height="15" rx="2"/><path d="M3 9h18M15 14h3"/><path d="M6 3h12"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 17h.01M12 17h.01"/>',
  award: '<circle cx="12" cy="8" r="6"/><path d="m8 13-1 9 5-3 5 3-1-9"/>',
  file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h8"/>',
  id: '<rect x="4" y="3" width="16" height="18" rx="2"/><circle cx="12" cy="10" r="3"/><path d="M8 17c1-2 7-2 8 0M8 3V1M16 3V1"/>',
  bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',
  edit: '<path d="m16 4 4 4M4 20l4-.8L19 8a2.8 2.8 0 0 0-4-4L4 15zM13.5 5.5l5 5"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',
  logout: '<path d="M10 17l5-5-5-5M15 12H3"/><path d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  check: '<path d="m5 12 4 4L19 6"/>'
};

const icon = (name, size = 18) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || icons.file}</svg>`;
const app = document.getElementById('app');
const toast = document.getElementById('toast');
const sessionKey = 'student-demo-session';
let currentPage = sessionStorage.getItem(sessionKey) ? 'home' : 'login';
let selectedMethod = 'BRI';
let toastTimer;
const pointSubmissions = [];

const pageTitles = {
  points: 'Daftar Poin',
  grades: 'Nilai Semester',
  finance: 'Kartu Keuangan',
  schedule: 'Lihat Jadwal Kuliah',
  lecturerSchedule: 'Informasi Dosen Mengajar',
  drs: 'DRS / KRS',
  lpkp: 'LPKP Mahasiswa',
  profile: 'Profil Mahasiswa',
  ktm: 'Profil & KTM Digital'
};

const shortcuts = [
  ['Nilai', 'chart', 'grades'], ['LPKP', 'clipboard', 'lpkp'],
  ['Kartu Keuangan', 'wallet', 'finance'], ['Jadwal', 'calendar', 'schedule'],
  ['Poin', 'award', 'points'], ['DRS', 'file', 'drs'],
  ['Jadwal Dosen', 'id', 'lecturerSchedule'], ['Profil', 'user', 'profile']
];

const pointCatalog = [
  { category: 'Formasi Cerdas Humanis 4 (FCH 4) : Global Competence (GC)', type: 'Organisasi kemahasiswaan (ormawa)', role: 'Menjadi anggota pengurus BEM/ DPM Fakultas/Jurusan/Prodi', points: 30, verified: true },
  { category: 'Formasi Cerdas Humanis 4 (FCH 4) : Global Competence (GC)', type: 'Kepanitiaan', role: 'Menjadi Anggota Panitia dalam kepanitiaan di tingkat Fakultas/Jurusan/Prodi, dalam waktu lebih dari tiga bulan', points: 15, verified: true },
  { category: 'Formasi Cerdas Humanis 4 (FCH 4) : Global Competence (GC)', type: 'Kepanitiaan', role: 'Menjadi Anggota Panitia dalam kepanitiaan di tingkat Fakultas/Jurusan/Prodi, dalam waktu lebih dari tiga bulan', points: 15, verified: true },
  { category: 'Formasi Cerdas Humanis 4 (FCH 4) : Global Competence (GC)', type: 'Kepanitiaan', role: 'Menjadi Anggota Panitia dalam kepanitiaan di tingkat universitas, dalam waktu satu - tiga bulan', points: 15, verified: true },
  { category: 'Formasi Cerdas Humanis 3 (FCH 3) : Self-Actualization (SA)', type: 'Unit Kegiatan Mahasiswa', role: 'Menjadi Anggota UKM', points: 20, verified: true },
  { category: 'Seminar, pelatihan, lokakarya', type: 'Seminar, pelatihan, lokakarya', role: 'Sebagai peserta di tingkat lokal', points: 5, verified: true },
  { category: 'Seminar, pelatihan, lokakarya', type: 'Seminar, pelatihan, lokakarya', role: 'Sebagai peserta di tingkat lokal', points: 5, verified: true },
  { category: 'Seminar, pelatihan, lokakarya', type: 'Seminar, pelatihan, lokakarya', role: 'Sebagai peserta di tingkat lokal', points: 5, verified: true },
  { category: 'Inisiasi Universitas (Inisiasi Sanata Dharma - INSAHA)', type: 'Inisiasi Universitas (Inisiasi Sanata Dharma - INSAHA)', role: 'Menjadi peserta Inisiasi Universitas (Inisiasi Sanata Dharma - INSAHA)', points: 0, verified: true }
];

function header(title, action = '') {
  return `<header class="topbar"><button class="back-button" data-page="home">‹ &nbsp;Beranda</button><h1 class="topbar-title">${title}</h1>${action ? `<button class="top-action" data-action="${action}" aria-label="${action}">${icon(action === 'download' ? 'download' : 'bell', 17)}</button>` : '<span class="top-action"></span>'}</header>`;
}

function homePage() {
  return `<header class="topbar home-topbar"><h1 class="topbar-title">Sistem Informasi Mahasiswa</h1><div class="home-account"><button class="icon-button" data-action="bell" aria-label="Notifikasi">${icon('bell', 18)}</button><span class="account-avatar">BA</span><span><strong>Bilqis Ayudia</strong><small>Mahasiswa Aktif</small></span></div></header><section class="page-content home-content">
    <div class="welcome"><div class="avatar-dot"></div><div><small>Selamat pagi,</small><h2>Bilqis Ayudia</h2></div></div>
    <div class="welcome-note"><div><strong>Semangat kuliah hari ini!</strong><p>Semua kebutuhan akademikmu,<br>kini dalam satu genggaman.</p></div><button class="icon-button" data-action="bell" aria-label="Notifikasi">${icon('bell', 19)}</button></div>
    <div class="dashboard-stats"><article class="card dashboard-stat"><span>IPK Kumulatif</span><strong>3.44</strong><small>Indeks Prestasi Kumulatif</small></article><article class="card dashboard-stat"><span>SKS Lulus</span><strong>84 <small>SKS</small></strong><small>Total kredit kumulatif</small></article><article class="card dashboard-stat"><span>Poin Kegiatan</span><strong>110 <small>poin</small></strong><small>Syarat kelulusan terpenuhi</small></article></div>
    <div class="section-head shortcut-heading"><h2>Akses Cepat</h2><span>Semua layanan akademik</span></div>
    <div class="shortcut-grid">${shortcuts.map(([label, glyph, page]) => `<button class="shortcut" data-page="${page}"><span class="shortcut-icon">${icon(glyph, 19)}</span><span>${label}</span></button>`).join('')}</div>
  </section>`;
}

function loginPage() {
  return `<section class="login-page">
    <div class="login-brand-panel">
      <div class="login-brand"><span class="login-brand-mark">U</span><span>UNIVERSITAS SANATA DHARMA<small>SISTEM INFORMASI MAHASISWA</small></span></div>
      <div class="login-welcome"><span class="login-eyebrow">PORTAL AKADEMIK</span><h1>Satu pintu untuk perjalanan akademikmu.</h1><p>Akses informasi perkuliahan, nilai, jadwal, dan kegiatan mahasiswa dengan mudah.</p></div>
      <div class="login-brand-footer">${icon('grade', 18)} <span>Belajar, bertumbuh, dan berdampak.</span></div>
    </div>
    <div class="login-form-panel">
      <form class="login-form">
        <div class="login-mobile-brand"><span class="login-brand-mark">U</span><span>UNIVERSITAS SANATA DHARMA</span></div>
        <span class="login-eyebrow">SELAMAT DATANG</span>
        <h2>Masuk ke akunmu</h2>
        <p class="login-description">Gunakan NIM dan kata sandi untuk melanjutkan ke portal mahasiswa.</p>
        <label class="login-field">NIM<input name="nim" type="text" inputmode="numeric" autocomplete="username" placeholder="Contoh: 245314019" required></label>
        <label class="login-field">Kata sandi<input name="password" type="password" autocomplete="current-password" placeholder="Masukkan kata sandi" required></label>
        <button class="login-submit" type="submit">Masuk ${icon('logout', 17)}</button>
        <p class="login-demo-note">Mode demo: formulir ini hanya membuka contoh portal dan tidak memverifikasi akun ke server.</p>
      </form>
      <footer class="login-footer">Universitas Sanata Dharma · Portal Mahasiswa</footer>
    </div>
  </section>`;
}

function pointRowsWithSubmissions() {
  return [...pointCatalog, ...pointSubmissions.map(submission => ({
    category: submission.category,
    type: 'Pengajuan Mahasiswa',
    role: `${submission.title} — ${submission.organizer}`,
    points: Number(submission.points),
    verified: false
  }))];
}

function pointsPage() {
  const allPoints = pointRowsWithSubmissions();
  const categories = [...new Set(allPoints.map(point => point.category))];
  const types = [...new Set(allPoints.map(point => point.type))];
  const roles = [...new Set(allPoints.map(point => point.role))];
  return `${header(pageTitles.points)}<section class="page-content points-content">
    <div class="point-filters card">
      ${[['category', 'Kategori', categories], ['type', 'Jenis', types], ['role', 'Peran', roles]].map(([key, label, options]) => `<label class="point-filter"><span>${label}</span><select data-point-filter="${key}" aria-label="Filter ${label}"><option value="">Semua</option>${options.map(option => `<option value="${escapeHtml(option)}">${escapeHtml(option)}</option>`).join('')}</select></label>`).join('')}
      <form class="point-search" role="search"><label for="point-search-input">Cari Kategori/Jenis/Peran:</label><input id="point-search-input" type="search" autocomplete="off"><button type="submit">CARI</button></form>
    </div>
    <section class="point-results card">
      <h2>Daftar Poin Kegiatan Kemahasiswaan Anda:</h2>
      <div class="point-table-wrap"><table class="point-table"><thead><tr><th>No.</th><th>Kategori</th><th>Jenis</th><th>Peran</th><th>Poin</th><th>Verifikasi</th></tr></thead><tbody id="point-rows"></tbody></table></div>
    </section>
    <section class="point-totals" aria-label="Jumlah poin">
      <h2>Jumlah Poin:</h2>
      <p>Poin yang BELUM diverifikasi: <strong id="pending-points">0</strong></p>
      <p>Poin yang SUDAH diverifikasi: <strong id="verified-points">110</strong></p>
      <h2>Poin Wajib:</h2>
      ${[['INSAHA', 'SUDAH'], ['FCH 1', 'BELUM'], ['FCH 2', 'BELUM'], ['FCH 3', 'SUDAH'], ['FCH 4', 'SUDAH']].map(([category, status]) => `<p>${category}: <span class="${status === 'SUDAH' ? 'mandatory-done' : 'mandatory-pending'}">${status}</span></p>`).join('')}
    </section>
  </section><div class="bottom-action"><button class="primary-button" data-action="new-point">${icon('plus', 15)} Ajukan Poin Kegiatan Baru</button></div>`;
}

function renderPointRows() {
  const filters = Object.fromEntries([...app.querySelectorAll('[data-point-filter]')].map(select => [select.dataset.pointFilter, select.value]));
  const query = app.querySelector('#point-search-input')?.value.trim().toLocaleLowerCase('id') || '';
  const submissions = pointRowsWithSubmissions().filter(point => !point.verified);
  const rows = pointRowsWithSubmissions().filter(point =>
    (!filters.category || point.category === filters.category) &&
    (!filters.type || point.type === filters.type) &&
    (!filters.role || point.role === filters.role) &&
    (!query || `${point.category} ${point.type} ${point.role}`.toLocaleLowerCase('id').includes(query))
  );
  const tableBody = app.querySelector('#point-rows');
  if (!tableBody) return;
  tableBody.innerHTML = rows.length
    ? rows.map((point, index) => `<tr><td>${index + 1}</td><td>${escapeHtml(point.category)}</td><td>${escapeHtml(point.type)}</td><td>${escapeHtml(point.role)}</td><td>${point.points}</td><td class="${point.verified ? 'point-verified' : 'point-unverified'}">${point.verified ? 'Y' : 'N'}</td></tr>`).join('')
    : '<tr><td class="point-empty" colspan="6">Tidak ada poin yang sesuai dengan pencarian.</td></tr>';
  app.querySelector('#pending-points').textContent = String(submissions.filter(point => !point.verified).reduce((sum, point) => sum + point.points, 0));
  app.querySelector('#verified-points').textContent = String(pointCatalog.filter(point => point.verified).reduce((sum, point) => sum + point.points, 0));
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[character]);
}

const grades = [
  ['INFO101', 'Algoritma dan Pemrograman', '3', 'B', ''],
  ['MATE102', 'Matematika Diskret', '3', 'B', ''],
  ['MATE101', 'Logika Matematika', '2', 'B+', ''],
  ['INFO103', 'Informatika dan Dampak Sosialnya', '2', 'B+', ''],
  ['BING 101', 'Bahasa Inggris', '3', 'A', 'green'],
  ['BIND 101', 'Bahasa Indonesia', '3', 'A', 'green'],
  ['INFO102', 'Sistem Digital', '2', 'C+', 'orange']
];

function gradesPage() {
  return `${header(pageTitles.grades)}<section class="page-content grades-content">
    <div class="semester-select">Nilai Semester</div>
    <div class="card blue-card grade-summary"><div class="row-between"><span class="eyebrow">SEMESTER GASAL 2024/2025</span><span class="verified">Terverifikasi</span></div><h2>Program Studi Informatika</h2><p class="student-id">NIM: 24060124120001 • Bilqis Ayudia</p><div class="stats"><div class="stat"><small>IPS (Sem 1)</small><strong>3.39</strong></div><div class="stat"><small>SKS Diambil</small><strong>20</strong></div><div class="stat"><small>IP Kumulatif</small><strong>3.44</strong></div></div><div class="summary-foot"><span>Jumlah SKS Lulus: <strong>84 SKS</strong></span><span>Kredit Kumulatif: <strong>84 SKS</strong></span></div></div>
    <div class="term-label"><span>DAFTAR MATA KULIAH (9 MATKUL)</span><span>TOTAL: 20 SKS</span></div>
    <div class="card table-card"><div class="table-title">${icon('calendar', 12)} Tabel Nilai Semester 1</div><table class="grade-table"><thead><tr><th>KODE</th><th>NAMA MATA KULIAH</th><th>SKS</th><th>NILAI</th></tr></thead><tbody>${grades.map(([code, name, sks, grade, color]) => `<tr><td>${code}</td><td>${name}</td><td>${sks}</td><td><span class="grade ${color}">${grade}</span></td></tr>`).join('')}</tbody></table></div>
  </section>`;
}

const transactions = [
  ['USKS/UKS/UKP Thp I', '05-10-2025 • Bank Virtual Account BRI', 'Rp 5.510.000'],
  ['USKS/UKS/UKP Thp I', '24-03-2026 • Bank Virtual Account BRI', 'Rp 6.380.000'],
  ['UKT Tahap 1', '31-07-2025 • Bank Virtual Account BRI', 'Rp 2.750.000'],
  ['UKT Tahap 2', '27-01-2026 • Bank Virtual Account BRI', 'Rp 2.750.000'],
  ['Kemahasiswaan (Kmhs)', '31-07-2025 • Bank Virtual Account BRI', 'Rp 225.000'],
  ['Kemahasiswaan (Kmhs)', '27-01-2026 • Bank Virtual Account BRI', 'Rp 225.000'],
  ['Sos Mhs', '31-07-2025 • Bank Virtual Account BRI', 'Rp 35.000'],
  ['Sos Mhs', '27-01-2026 • Bank Virtual Account BRI', 'Rp 40.000']
];

function financePage() {
  const methods = [['BRI', 'VA'], ['Mandiri', 'VA'], ['BNI', 'VA'], ['QRIS', 'E-Wallet']];
  return `${header(pageTitles.finance)}<section class="page-content finance-content">
    <div class="card blue-card finance-summary"><div class="metric-head"><span>Total Tagihan &amp; Pembayaran Kuliah<br><span class="eyebrow">NIM: 24060124120001 • Bilqis Ayudia</span></span><span class="valid-chip success">${icon('check', 12)} Lunas 100%</span></div><div class="finance-numbers"><div class="finance-number">Total Tagihan<strong>Rp 25.705.000</strong></div><div class="finance-number">Total Terbayar<strong class="success">Rp 25.705.000</strong></div></div><div class="finance-bottom row-between"><span>UK Belum Dibayar: <strong>Rp 0</strong></span><span>Denda: <strong>Rp 0</strong></span></div></div>
    <div class="card method-card"><div class="row-between"><div><h2 class="subheading">Pilih Metode Pembayaran</h2><p class="small-note" style="margin-top:5px;line-height:1.5">Pilih saluran pembayaran resmi yang Anda inginkan</p></div><span class="tag">4 Saluran</span></div><div class="method-grid">${methods.map(([name, type]) => `<button class="method ${selectedMethod === name ? 'selected' : ''}" data-method="${name}">${name}<small>${type}</small></button>`).join('')}</div><div class="row-between small-note"><span>ⓘ Pembayaran diverifikasi otomatis 24 jam</span><button class="text-button" data-action="payment-help">Petunjuk</button></div></div>
    <div class="card transactions"><div class="section-head"><span>Rincian Pembayaran / Pembebasan</span><span class="text-button">8 Transaksi</span></div>${transactions.map(([name, date, amount]) => `<div class="transaction"><div><strong>${name}</strong><small>${date}</small></div><div class="transaction-amount">${amount}<small>Denda: Rp 0</small></div></div>`).join('')}<button class="receipt-button" data-action="receipt">${icon('download', 13)} Unduh Kuitansi Sah Digital</button></div>
  </section>`;
}

const schedule = [
  ['SENIN', [
    ['07:00 – 09:50', 'SDEV204', 'Algoritma Optimisasi', 'Kelas A', 'K.204', 'Ir. Drs. Haris Sriwindono M.Kom., Ph.D.', '3 SKS'],
    ['10:00 – 12:50', 'SNET52W', 'Virtualisasi & Cloud', 'Kelas A', 'Lab Jaringan', 'H. Agung Hernawan', '3 SKS'],
    ['13:00 – 16:50', 'INFO118', 'Proyek Informatika', 'Kelas AP', 'Lab Basis Data', 'Agnes Maria Polina', '4 SKS']
  ]],
  ['SELASA', [
    ['07:00 – 09:50', 'NTW203', 'Jaringan Toleransi Tunda', 'Kelas A', 'Lab Jaringan', 'Bambang Soelistijanto', '3 SKS'],
    ['13:00 – 15:50', 'SDEV207', 'Desain UI/UX', 'Kelas A', 'K.205', 'Iwan Bintono', '3 SKS']
  ]],
  ['RABU', [['10:00 – 12:50', 'NTW201', 'Protokol TCP/IP', 'Kelas A', 'Lab Jaringan', 'H. Agung Hernawan', '3 SKS']]],
  ['KAMIS', [['07:00 – 09:50', 'INFO117', 'Kriptografi', 'Kelas E', 'K.205', 'Bambang Soelistijanto', '3 SKS']]]
];

function schedulePage() {
  return `${header(pageTitles.schedule, 'download')}<section class="page-content schedule-content"><p class="schedule-legend">Jadwal Kuliah Mingguan</p><table class="schedule-table"><thead><tr><th>Hari / Jam</th><th>Mata Kuliah &amp; Kelas</th><th>Ruang &amp; Dosen</th></tr></thead><tbody>${schedule.map(([day, items]) => `<tr class="day"><td colspan="3">${day}</td></tr>${items.map(([time, code, name, klass, room, lecturer, credits]) => `<tr><td>${time}<small>${credits}</small></td><td><strong>${code}</strong>${name}<small>${klass}</small></td><td style="text-align:right"><span class="room">${room}</span><small>${lecturer}</small></td></tr>`).join('')}`).join('')}<tr class="day"><td colspan="3">JUMAT &amp; SABTU</td></tr><tr><td colspan="3" class="schedule-empty">Tidak ada jadwal perkuliahan</td></tr></tbody></table></section>`;
}

const lecturerNames = [
  'Agnes Maria Polina S.Kom., M.Sc.',
  'Dr. Alb. Agung Hadhiatma M.T.',
  'Prof. Dr. Ir. Anastasia Rita Widiarti',
  'Bagaskara Eka Nugraha S.T., M.Eng.',
  'Prof. Ir. Bambang Soelistijanto Ph.D.',
  'Cyprianus Kuntoro Adi, S.J. M.A., M.Sc., Ph.D.',
  'Eduardus Hardika Sandy Atmaja Ph.D.',
  'Eko Hari Parmadi S.Si., M.Kom.',
  'Drs. Hari Suparwoto, S.I. M.App.IT',
  'Ir. Drs. Haris Sriwindono M.Kom., Ph.D.',
  'Ir. Henricus Agung Hernawan S.T., M.Kom.',
  'Dr. Ir. Iwan Binanto',
  'Ir. B. Budi Darmawan S.T., M.Sc.',
  'Drs. Johanes Eka Pribadi M.Sc., Ph.D.',
  'Ir. Kartono Pinyarto S.T., M.Cs.',
  'Ir. Paulina Heruningsih Prima Rosa S.Si., M.Sc.',
  'Dr. Puspaningtyas Sanyoto Adi S.T., M.T.',
  'Dr. Ir. Ridowati Gunawan S.Kom., M.T.',
  'Ir. Robertus Adi Nugroho M.Eng.'
];
let selectedLecturer = '';

const lecturerScheduleData = [
  ['Agnes Maria Polina S.Kom., M.Sc.', 'INFO118', 'Proyek Informatika', 'Kelas A', 'Senin', '13:00', '13:50'],
  ['Prof. Ir. Bambang Soelistijanto Ph.D.', 'INFO117', 'Kriptografi', 'Kelas E', 'Kamis', '07:00', '09:50'],
  ['Prof. Ir. Bambang Soelistijanto Ph.D.', 'NETW203', 'Jaringan Toleransi Tunda', 'Kelas A', 'Selasa', '07:00', '09:50'],
  ['Ir. Drs. Haris Sriwindono M.Kom., Ph.D.', 'SDEV204', 'Algoritma Optimisasi', 'Kelas A', 'Senin', '07:00', '09:50'],
  ['Ir. Henricus Agung Hernawan S.T., M.Kom.', 'SNET52W', 'Virtualisasi dan Teknologi Cloud', 'Kelas A', 'Senin', '10:00', '12:50'],
  ['Ir. Henricus Agung Hernawan S.T., M.Kom.', 'NETW201', 'Protokol TCP/IP Suite', 'Kelas A', 'Rabu', '10:00', '12:50'],
  ['Dr. Ir. Iwan Binanto', 'SDEV207', 'Desain UI/UX', 'Kelas A', 'Selasa', '13:00', '15:50']
];
const lecturerWeekdays = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const lecturerTimeSlots = Array.from({ length: 15 }, (_, index) => `${String(index + 6).padStart(2, '0')}-${String(index + 7).padStart(2, '0')}`);

function lecturerSchedulePage() {
  const options = lecturerNames.map(name => `<option value="${escapeHtml(name)}"></option>`).join('');
  return `${header(pageTitles.lecturerSchedule)}<section class="page-content lecturer-content">
    <div class="lecturer-search-panel">
      <label for="lecturer-search">Nama Dosen</label>
      <input id="lecturer-search" class="lecturer-search-input" type="search" list="lecturer-options" value="${escapeHtml(selectedLecturer)}" placeholder="Cari atau pilih nama dosen..." autocomplete="off">
      <datalist id="lecturer-options">${options}</datalist>
    </div>
    <div class="lecturer-grid-wrap">
      <table class="lecturer-grid" aria-label="Jadwal mengajar dosen">
        <thead><tr><th>Hari/Jam</th>${lecturerTimeSlots.map(slot => `<th>${slot}</th>`).join('')}</tr></thead>
        <tbody>${lecturerWeekdays.map(day => `<tr><th scope="row">${day}</th>${lecturerTimeSlots.map(() => '<td></td>').join('')}</tr>`).join('')}</tbody>
      </table>
      <p class="lecturer-grid-empty">${selectedLecturer ? 'Tidak ada jadwal mengajar untuk dosen ini.' : 'Pilih nama dosen untuk melihat jadwal mengajarnya.'}</p>
    </div>
    <div class="lecturer-actions"><button class="secondary-button lecturer-cancel" type="button">Batal</button><button class="primary-button lecturer-download" data-action="download-lecturer-schedule" type="button" disabled>Download</button></div>
  </section>`;
}

function renderLecturerSchedule(preserveSearch = false) {
  const input = app.querySelector('#lecturer-search');
  const tableBody = app.querySelector('.lecturer-grid tbody');
  if (!input || !tableBody) return;

  if (!preserveSearch) input.value = selectedLecturer;
  tableBody.replaceChildren();
  const entries = lecturerScheduleData.filter(([name]) => name === selectedLecturer);
  const schedulesByDay = new Map(lecturerWeekdays.map(day => [day, entries.filter(entry => entry[4] === day)]));

  lecturerWeekdays.forEach(day => {
    const row = document.createElement('tr');
    const dayCell = document.createElement('th');
    dayCell.scope = 'row';
    dayCell.textContent = day;
    row.append(dayCell);
    const dayEntries = schedulesByDay.get(day);

    let hour = 6;
    while (hour < 21) {
      const entry = dayEntries.find(([, , , , , start]) => Number(start.slice(0, 2)) === hour);
      const cell = document.createElement('td');
      if (entry) {
        const [, code, course, section, , start, end] = entry;
        const endHour = Number(end.slice(0, 2)) + (Number(end.slice(3, 5)) > 0 ? 1 : 0);
        const span = Math.max(1, Math.min(endHour - hour, 21 - hour));
        cell.colSpan = span;
        cell.className = 'lecturer-class-cell';
        cell.innerHTML = `<strong>${escapeHtml(code)}</strong><span>${escapeHtml(course)}</span><small>${escapeHtml(section)} · ${escapeHtml(start)}–${escapeHtml(end)}</small>`;
        hour += span;
      } else {
        hour += 1;
      }
      row.append(cell);
    }
    tableBody.append(row);
  });

  const hasSelection = Boolean(selectedLecturer);
  app.querySelector('.lecturer-grid-empty').hidden = entries.length > 0;
  app.querySelector('.lecturer-grid-empty').textContent = hasSelection
    ? entries.length ? '' : 'Jadwal dosen ini belum tersedia.'
    : 'Pilih nama dosen untuk melihat jadwal mengajarnya.';
  app.querySelector('.lecturer-download').disabled = !hasSelection;
}

function downloadLecturerSchedule() {
  const entries = lecturerScheduleData.filter(([name]) => name === selectedLecturer);
  const rows = [
    ['Nama Dosen', 'Hari', 'Jam', 'Kode Mata Kuliah', 'Mata Kuliah', 'Kelas'],
    ...entries.map(([name, code, course, section, day, start, end]) => [name, day, `${start}-${end}`, code, course, section])
  ];
  const csv = rows.map(row => row.map(value => `"${value.replaceAll('"', '""')}"`).join(',')).join('\r\n');
  const url = URL.createObjectURL(new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = `jadwal-dosen-${selectedLecturer.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.csv`;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  showToast('Jadwal dosen berhasil diunduh.');
}

const drsCourses = [
  ['INFO118', 'Proyek Informatika', 'A', 2, 580000, 'Agnes Maria Polina', 'Senin', '13:00', '13:50'],
  ['INFO117', 'Kriptografi', 'E', 3, 870000, 'Bambang Soelistijanto', 'Kamis', '07:00', '09:50'],
  ['SDEV204', 'Algoritma Optimisasi', 'A', 3, 870000, 'Ir. Drs. Haris Sriwindono M.Kom., Ph.D.', 'Senin', '07:00', '09:50'],
  ['SNET52W', 'Virtualisasi dan Teknologi Cloud', 'A', 3, 870000, 'Henricus Agung Hernawan', 'Senin', '10:00', '12:50'],
  ['NETW201', 'Protokol TCP/IP Suite', 'A', 3, 870000, 'Henricus Agung Hernawan', 'Rabu', '10:00', '12:50'],
  ['NETW203', 'Jaringan Toleransi Tunda', 'A', 3, 870000, 'Bambang Soelistijanto', 'Selasa', '07:00', '09:50'],
  ['SDEV207', 'Desain UI/UX', 'A', 3, 870000, 'Iwan Binanto', 'Selasa', '13:00', '15:50']
];

function formatRupiah(amount) {
  return `Rp ${new Intl.NumberFormat('id-ID').format(amount)}`;
}

function drsPage() {
  const totalCredits = drsCourses.reduce((total, [, , , credits]) => total + credits, 0);
  const totalCost = drsCourses.reduce((total, [, , , , fee]) => total + fee, 0);
  return `${header(pageTitles.drs)}<section class="page-content drs-content">
    <article class="card blue-card drs-summary">
      <span class="eyebrow">Daftar Rencana Studi Resmi</span>
      <h2>Program Studi Informatika (Sains dan Teknologi)</h2>
      <p class="drs-student-id">NIM: 245314019 <span>•</span> BILQIS AYUDIA <span>•</span> Jenjang: S1</p>
      <div class="drs-summary-footer">
        <span class="drs-adviser"><span aria-hidden="true">✓</span> ACC Dosen Wali: Prof. Dr. Ir. Anastasia Rita Widiarti</span>
        <span class="drs-total">Total<strong>${totalCredits} SKS</strong></span>
      </div>
    </article>
    <div class="drs-list-heading"><h2>Rincian Mata Kuliah &amp; Tarif SKS:</h2><strong>${formatRupiah(totalCost)}</strong></div>
    <div class="drs-course-list">${drsCourses.map(([code, name, section, credits, fee, lecturer, day, start, end]) => `<article class="card drs-course">
      <div class="drs-course-top"><span class="tag">${code} <span aria-hidden="true">•</span> Kls ${section}</span><strong>${formatRupiah(fee)}</strong></div>
      <h3>${name} (${credits} SKS)</h3>
      <div class="drs-course-details"><span>Dosen: ${lecturer}</span><span>${day} ${start} - ${end}</span></div>
    </article>`).join('')}</div>
    <div class="drs-grand-total"><span>TOTAL</span><strong>${totalCredits} SKS</strong><strong>${formatRupiah(totalCost)}</strong></div>
  </section>`;
}

const students = [
  ['SIRILUS ESPIANTO WILY WASKITO', '215314010', 'H'],
  ['NORBERTUS WEMPY JUNIOR KERAF', '225314043', 'H'],
  ['CHONDRADUS M. A. NIKANDRO LANA', '225314044', 'H'],
  ['YULIUS FARREL PUTRA AGUNG NUGRAHA', '225314045', 'H'],
  ['ALVIN TRIYADI', '225314144', 'H'],
  ['IRGA PRAYOGA', '225314199', 'A'],
  ['GERARD MAYELA ARDIANTA', '235314003', 'H'],
  ['BENEDICTUS DITUS TAMARESTANTO', '235314007', 'H'],
  ['SAMUEL SANTOSO', '235314011', 'S'],
  ['CHANDRA SEKHARA', '235314020', 'H'],
  ['SENSUS SANDI', '235314027', 'H'],
  ['SAMUEL MARE PAPIANG', '235314076', 'H'],
  ['LIONEL MESSI MAMBRAR', '235314083', 'A'],
  ['TURIBIUS RIVALDO MANGAS', '235314085', 'H'],
  ['ARDIANTO SEPTIANUS', '235314093', 'H'],
  ['YUSTINA NATALIE SHEILLA PURNAMAWATI', '235314102', 'H'],
  ['JANTZI LAHE', '235314105', 'A'],
  ['GILBERTH UNTUNG', '235314107', 'H'],
  ['TAMU RAMBU TUA', '235314108', 'A'],
  ['ALFEUS GALIH PUTRA CAHYONO', '235314121', 'H'],
  ['NICHO HERJUNA', '235314122', 'H'],
  ['ABIEL HOSANA SEBASTIAN', '235314123', 'A'],
  ['ROGANDA LIEH TAKIAN LUMBANTORUAN', '235314129', 'H'],
  ['DIMAS ARTOH', '235314176', 'A'],
  ['SHEILA ANDA ANDRYANSAH', '235314182', 'H'],
  ['GABRIEL MARIA SGT NURCHAYANTO ADH', '235314191', 'H'],
  ['MOCHAMAD REZA SAPUTRA', '235314193', 'H'],
  ['CEDRIC CHANDRA', '235314195', 'H'],
  ['ANTONIA ANASTASIA NDANG', '235314196', 'H'],
  ['ALBERTO SAFADA', '235314199', 'H'],
  ['EGIDIUS SETIAN EKA PUTRA', '235314202', 'H'],
  ['MICHAEL FILLIUS SINAGA', '235314207', 'H'],
  ['BILQIS AYUDIA', '245314019', 'H'],
  ['BRIORISA APRILIA KALISTA', '245314034', 'H'],
  ['VINSENSIUS RESTU BIMA NATA', '245314051', 'H'],
  ['BURU FRAIM PUBA', '245314053', 'H'],
  ['JOHANES KAYL MELANGAM', '245314070', 'H'],
  ['CHAROLIN LOUISA IPASSA', '245314071', 'H'],
  ['TIO ALAN KURNIAWAN', '245314114', 'H'],
  ['ROBERTHO CHARLOZ WARJUKU WORIORI', '245314160', 'A'],
  ['LAMBERTUS BIMA SAKTI', '245314162', 'H']
];
const attendanceStatuses = new Map(students.map(([, nim, status]) => [nim, status]));
const attendanceOptions = [
  ['H', 'Hadir'],
  ['I', 'Izin'],
  ['S', 'Sakit'],
  ['A', 'Alfa']
];
const studentApproval = { consent: '', note: '', date: '', savedAt: '' };

try {
  const savedAttendance = localStorage.getItem('lpkp-attendance');
  if (savedAttendance) {
    const savedStatuses = JSON.parse(savedAttendance);
    if (!savedStatuses || typeof savedStatuses !== 'object' || Array.isArray(savedStatuses)) {
      throw new TypeError('Format data presensi tersimpan tidak valid.');
    }
    for (const [nim, status] of Object.entries(savedStatuses)) {
      if (!attendanceStatuses.has(nim) || !attendanceOptions.some(([code]) => code === status)) {
        throw new TypeError(`Status presensi tersimpan tidak valid untuk NIM ${nim}.`);
      }
    }
    Object.entries(savedStatuses).forEach(([nim, status]) => attendanceStatuses.set(nim, status));
  }
} catch (error) {
  console.error('Data presensi tersimpan tidak dapat dibaca.', error);
}

try {
  const savedApproval = localStorage.getItem('lpkp-student-approval');
  if (savedApproval) {
    const approval = JSON.parse(savedApproval);
    if (!approval || typeof approval !== 'object' || Array.isArray(approval)
      || !['', 'N', 'Y'].includes(approval.consent)
      || typeof approval.note !== 'string'
      || typeof approval.date !== 'string'
      || typeof approval.savedAt !== 'string') {
      throw new TypeError('Format persetujuan mahasiswa tersimpan tidak valid.');
    }
    Object.assign(studentApproval, approval);
  }
} catch (error) {
  console.error('Persetujuan mahasiswa tersimpan tidak dapat dibaca.', error);
}

function lpkpPage() {
  const courses = [
    ['SDEV207 (Kelas A)', 'Desain UI/UX', '6 / 16 Pertemuan'],
    ['NTW203 (Kelas A)', 'Jaringan Toleransi Tunda', '0 / 16 Pertemuan'],
    ['INFO117 (Kelas E)', 'Kriptografi', '0 / 16 Pertemuan'],
    ['NTW201 (Kelas A)', 'Protokol TCP/IP Suite', '0 / 16 Pertemuan'],
    ['INFO118 (Kelas AP)', 'Proyek Informatika', '16 / 16 Pertemuan'],
    ['INFO101 (Kelas A)', 'Algoritma dan Pemrograman', '16 / 16 Pertemuan'],
    ['SNET52W (Kelas A)', 'Virtualisasi dan Teknologi Cloud', '0 / 16 Pertemuan']
  ];
  return `${header(pageTitles.lpkp)}<section class="page-content lpkp-content">
    <div class="card lpkp-card"><div class="lpkp-title"><span style="background:none;color:inherit;font-size:10px;padding:0">Daftar Matakuliah &amp; LPKP</span><span>8 Mata Kuliah</span></div><p>Lembar Pengesahan Kehadiran Kegiatan Pembelajaran (Presensi Verifikasi Luar Perkuliahan)</p></div>
    <div class="card lpkp-card"><div class="lpkp-title">Pilih Mata Kuliah untuk Detail Pertemuan <span>3 / 16 Pertemuan</span></div>
      <div class="course-title">#1 • SDEV207 (Kelas A)<br>Desain UI/UX</div>
      <article class="card course-card" style="margin:0">
        <h3 style="margin:0;font-size:10px">Desain UI/UX (Kelas A)</h3>
        <p class="course-info">Dosen: Dr. Ir. Iwan Binanto • 1 Ruang kuliah</p>
        <div class="meeting-title">Pertemuan ke- (1 sampai 16):</div>
        <div class="meeting-grid">${Array.from({length:16}, (_, i) => `<span class="meeting ${i < 2 ? 'done' : ''} ${i === 2 ? 'current' : ''}">${i + 1}</span>`).join('')}</div>
        <div class="meeting-fields">${[['Program Studi:', 'Informatika'], ['Fakultas:', 'Sains dan Teknologi'], ['Mata Kuliah/Kelas:', 'Desain UI/UX/A'], ['Hari/Jam:', 'Selasa / 13:00 - 16:00'], ['Jumlah Mahasiswa:', `${students.length}`], ['SKS/JP:', '3/3'], ['Dosen:', 'Dr. Ir. Iwan Binanto[1]']].map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join('')}</div>
        <div class="card course-card" style="margin:9px 0 0;padding:9px">
          <div class="lpkp-title">Detail Sesi Perkuliahan <span>Regular</span></div>
          <div class="meeting-fields">${[['Pertemuan ke:', '3 (dari 16)'], ['Tanggal:', '15-09-2026'], ['Jam Mulai:', '13:00'], ['Jam Selesai:', '16:00'], ['Dosen yang hadir:', 'Dr. Ir. Iwan Binanto[1]']].map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join('')}
            <label class="material-field">Materi<textarea aria-label="Materi perkuliahan" rows="2">UX Design Process #1</textarea></label>
          </div>
        </div>
        <div class="attendance-head"><span>Daftar Mahasiswa</span><span>${students.length} Mahasiswa</span></div>
        <div class="row-between attendance-summary" style="margin-bottom:4px"></div>
        <div class="attendance-table-wrap"><table class="attendance-table"></table></div>
        <section class="student-approval" aria-labelledby="approval-title">
          <div class="lpkp-title"><span id="approval-title" style="background:none;color:inherit;font-size:inherit;padding:0">Persetujuan Mahasiswa</span><span class="approval-state">Belum Disimpan</span></div>
          <div class="approval-fields">
            <div class="approval-row"><span>Jumlah Mahasiswa Tidak Hadir</span><strong class="absent-count"></strong></div>
            <div class="approval-row"><span>Kunci Dosen</span><strong class="success">Sudah Dikunci</strong></div>
            <div class="approval-row"><span>Mahasiswa Pemeriksa</span><strong>LAMBERTUS BIMA SAKTI</strong></div>
            <fieldset class="approval-row consent-row"><legend>Persetujuan Mahasiswa</legend><span>Apakah isi/kegiatan perkuliahan sesuai dengan yang dituliskan oleh dosen dalam kolom materi?</span><div class="consent-options"></div></fieldset>
            <label class="material-field approval-note">Keterangan Persetujuan <small>(Opsional)</small><textarea class="approval-note-input" rows="3"></textarea></label>
            <label class="approval-row approval-date"><span>Tgl Persetujuan Mahasiswa</span><input class="approval-date-input" type="date"></label>
            <div class="approval-row"><span>Tgl Simpan Dosen</span><strong>2026-09-15 14:20:11.0</strong></div>
          </div>
          <div class="approval-actions"><button class="primary-button approval-save" data-action="save-approval" disabled>Simpan</button><button class="secondary-button approval-close" type="button">Tutup</button></div>
        </section>
        <button class="secondary-button approval-open" type="button" hidden>Buka Persetujuan Mahasiswa</button>
      </article>
    </div>
    <div class="card course-list">${courses.map(([meta, name, count]) => `<div class="course-list-item"><span><small>${meta}</small>${name}</span><span class="course-count ${count.startsWith('16') ? 'complete' : ''}">${count}</span></div>`).join('')}</div>
  </section>`;
}

function profilePage() {
  return `${header(pageTitles.profile)}<section class="page-content profile-content">
    <div class="card profile-hero"><div class="profile-avatar">BA</div><h2>BILQIS AYUDIA</h2><p>245314019</p><p class="program">Informatika • Sains dan Teknologi</p><div class="badges"><span class="badge">Status: Aktif</span><span class="badge blue">IPK: 3.44</span></div><button class="ktm-link" data-page="ktm">${icon('id', 15)} Lihat KTM Digital</button></div>
    <div class="card"><div class="section-head"><h2>Data Akademik Pribadi</h2><button class="text-button" data-action="edit">${icon('edit', 13)} Edit Data Sendiri</button></div>${[['NIM Resmi', '<strong>245314019</strong>'], ['Fakultas', 'Sains dan Teknologi'], ['Email Kampus', '245314019@student.usd.ac.id'], ['Dosen Wali (DPA)', '<strong>Prof. Dr. Ir. Anastasia Rita Widiarti</strong>'], ['Tahun Akademik', '2024 / 2025 / Gasal'], ['SKS Lulus Kumulatif', '<strong class="success">84 SKS</strong>']].map(([label, value]) => `<div class="detail-row"><span>${label}</span><span>${value}</span></div>`).join('')}</div>
    <button class="primary-button logout" data-action="logout">${icon('logout', 14)} Keluar / Ganti Akun Mahasiswa</button>
  </section>`;
}

function ktmPage() {
  return `${header(pageTitles.ktm)}<section class="page-content ktm-content"><div class="ktm-top"><span class="active-chip">Mahasiswa Aktif</span></div>
    <div class="ktm-card"><div class="university"><span class="uni-mark">U</span><span>UNIVERSITAS SANATA DHARMA<small>KTM Digital Mahasiswa</small></span></div><div class="ktm-student"><div class="photo-placeholder"></div><div><strong>Bilqis Ayudia<br>245314019</strong><small>S1 Informatika· Sem 5</small></div></div><div class="ktm-footer"><span>Angkatan 2024/2025</span><span class="valid-chip">Valid Thru: 2028</span></div></div>
    <button class="secondary-button" data-action="edit">Biodata Diri</button>
    <div class="card bio-card">${[['Nama Lengkap', '<strong>Bilqis Ayudia</strong>'], ['NIK Kependudukan', '<strong>3174091204050001</strong>'], ['Tempat, Tgl Lahir', '<strong>Yogyakarta, 12 April 2005</strong>'], ['Email Kampus', '<strong style="color:#155dff">bilqis@student.univ.ac.id</strong>'], ['No. WhatsApp', '<strong>+62 812-8899-2310</strong>']].map(([label, value]) => `<div class="detail-row"><span>${label}</span><span>${value}</span></div>`).join('')}<div class="detail-row address-row"><span>Alamat Domisili</span><strong>Paingan, Maguwoharjo</strong></div></div>
  </section>`;
}

function navBar() {
  const tabs = [['home', 'home', 'Beranda'], ['grades', 'grade', 'Akademik'], ['points', 'group', 'Kegiatan mahasiswa'], ['profile', 'user', 'Profil']];
  const activeTab = ['grades', 'finance', 'schedule'].includes(currentPage) ? 'grades' : currentPage === 'ktm' ? 'profile' : currentPage;
  return `<nav class="bottom-nav" aria-label="Navigasi utama">${tabs.map(([page, glyph, label]) => `<button class="nav-item ${activeTab === page ? 'active' : ''}" data-page="${page}">${icon(glyph)}<span>${label === 'Kegiatan mahasiswa' ? 'Kegiatan<br> mahasiswa' : label}</span></button>`).join('')}</nav>`;
}

function render() {
  app.classList.toggle('is-login', currentPage === 'login');
  if (currentPage === 'login') {
    app.innerHTML = loginPage();
    return;
  }
  const pages = { home: homePage, points: pointsPage, grades: gradesPage, finance: financePage, schedule: schedulePage, lecturerSchedule: lecturerSchedulePage, drs: drsPage, lpkp: lpkpPage, profile: profilePage, ktm: ktmPage };
  app.innerHTML = `${pages[currentPage]()}${navBar()}`;
  if (currentPage === 'points') renderPointRows();
  if (currentPage === 'lpkp') renderAttendanceControls();
  if (currentPage === 'lecturerSchedule') renderLecturerSchedule();
}

function updateAttendanceSummary(summary) {
  summary.replaceChildren();
  attendanceOptions.forEach(([code, label]) => {
    const count = [...attendanceStatuses.values()].filter(status => status === code).length;
    const badge = document.createElement('span');
    badge.className = `attendance-count status-${code}`;
    badge.textContent = `${label} ${count}`;
    summary.append(badge);
  });
  const saveButton = document.createElement('button');
  saveButton.className = 'primary-button attendance-save';
  saveButton.dataset.action = 'save-attendance';
  saveButton.textContent = 'Simpan';
  summary.append(saveButton);
}

function saveStudentApproval() {
  studentApproval.savedAt = `${new Date().toLocaleString('sv-SE').replace('T', ' ')}.0`;
  try {
    localStorage.setItem('lpkp-student-approval', JSON.stringify(studentApproval));
    app.querySelector('.approval-state').textContent = `Disimpan ${studentApproval.savedAt}`;
    showToast('Persetujuan mahasiswa berhasil disimpan.');
  } catch (error) {
    studentApproval.savedAt = '';
    console.error('Persetujuan mahasiswa gagal disimpan.', error);
    showToast('Persetujuan gagal disimpan. Silakan coba lagi.');
  }
}

function saveAttendance() {
  try {
    localStorage.setItem('lpkp-attendance', JSON.stringify(Object.fromEntries(attendanceStatuses)));
    showToast(`Presensi ${students.length} mahasiswa berhasil disimpan.`);
  } catch (error) {
    console.error('Data presensi gagal disimpan.', error);
    showToast('Presensi gagal disimpan. Silakan coba lagi.');
  }
}

function renderAttendanceControls() {
  const heading = app.querySelector('.lpkp-content .attendance-head');
  if (!heading) return;
  heading.querySelector('span:last-child').textContent = `${students.length} Mahasiswa`;

  const summary = heading.nextElementSibling;
  updateAttendanceSummary(summary);

  const wrapper = summary.nextElementSibling;
  const table = wrapper.querySelector('.attendance-table');
  table.innerHTML = '<thead><tr><th>No</th><th>NIM</th><th>Nama</th><th>Kehadiran</th></tr></thead>';
  const body = document.createElement('tbody');

  students.forEach(([name, nim], index) => {
    const row = document.createElement('tr');
    const numberCell = document.createElement('td');
    numberCell.textContent = String(index + 1);
    const nimCell = document.createElement('td');
    nimCell.textContent = nim;
    const nameCell = document.createElement('td');
    nameCell.textContent = name;
    const statusCell = document.createElement('td');
    const select = document.createElement('select');
    select.className = 'attendance-select';
    select.dataset.attendanceNim = nim;
    select.setAttribute('aria-label', `Kehadiran ${name} (${nim})`);
    attendanceOptions.forEach(([code, label]) => {
      const option = document.createElement('option');
      option.value = code;
      option.textContent = `${label} (${code})`;
      select.append(option);
    });
    select.value = attendanceStatuses.get(nim);
    select.dataset.status = select.value;
    statusCell.append(select);
    row.append(numberCell, nimCell, nameCell, statusCell);
    body.append(row);
  });

  table.append(body);
  const approval = app.querySelector('.student-approval');
  approval.querySelector('.absent-count').textContent = String([...attendanceStatuses.values()].filter(status => status !== 'H').length);
  approval.querySelector('.approval-note-input').value = studentApproval.note;
  approval.querySelector('.approval-date-input').value = studentApproval.date;
  approval.querySelector('.approval-state').textContent = studentApproval.savedAt ? `Disimpan ${studentApproval.savedAt}` : 'Belum Disimpan';
  approval.querySelector('.consent-options').replaceChildren();
  [['N', 'N'], ['Y', 'Y']].forEach(([value, label]) => {
    const wrapper = document.createElement('label');
    wrapper.className = 'consent-option';
    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'student-consent';
    radio.value = value;
    radio.checked = studentApproval.consent === value;
    radio.addEventListener('change', () => {
      studentApproval.consent = value;
      studentApproval.savedAt = '';
      approval.querySelector('.approval-state').textContent = 'Belum Disimpan';
      approval.querySelector('.approval-save').disabled = !studentApproval.consent || !studentApproval.date;
    });
    wrapper.append(radio, document.createTextNode(label));
    approval.querySelector('.consent-options').append(wrapper);
  });
  approval.querySelector('.approval-save').disabled = !studentApproval.consent || !studentApproval.date;
  if (studentApproval.savedAt) app.querySelector('.approval-open').textContent = 'Buka Persetujuan Mahasiswa';
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 2600);
}

function openEditModal() {
  const overlay = document.createElement('div');
  overlay.className = 'modal-backdrop';
  overlay.innerHTML = `<form class="modal"><h2>Edit Biodata Mahasiswa</h2><label class="form-field">Nama Lengkap<input name="name" value="Bilqis Ayudia" required></label><label class="form-field">Email Kampus<input name="email" type="email" value="bilqis@student.univ.ac.id" required></label><label class="form-field">No. WhatsApp<input name="phone" value="+62 812-8899-2310" required></label><div class="modal-actions"><button type="button" class="primary-button cancel">Batal</button><button type="submit" class="primary-button">Simpan</button></div></form>`;
  document.body.appendChild(overlay);
  overlay.querySelector('.cancel').addEventListener('click', () => overlay.remove());
  overlay.addEventListener('click', event => { if (event.target === overlay) overlay.remove(); });
  overlay.querySelector('form').addEventListener('submit', event => {
    event.preventDefault();
    overlay.remove();
    showToast('Perubahan biodata berhasil disimpan.');
  });
  overlay.querySelector('input').focus();
}

function openPointModal() {
  const overlay = document.createElement('div');
  overlay.className = 'modal-backdrop';
  overlay.innerHTML = `<div class="modal point-modal" role="dialog" aria-modal="true" aria-labelledby="point-modal-title"><form><div class="modal-heading"><h2 id="point-modal-title">Ajukan Poin Kegiatan Baru</h2><button type="button" class="modal-close" aria-label="Tutup">×</button></div><p class="modal-description">Lengkapi informasi kegiatan dan lampirkan bukti untuk diajukan ke admin.</p><label class="form-field">Kategori Kegiatan<select name="category" required><option value="">Pilih kategori</option><option>Seminar &amp; Konferensi</option><option>Organisasi &amp; Kepanitiaan</option><option>Kompetisi</option><option>Pengabdian Masyarakat</option><option>Prestasi</option><option>Kegiatan Lainnya</option></select></label><label class="form-field">Nama Kegiatan<input name="title" placeholder="Contoh: Seminar Nasional Teknologi" required maxlength="120"></label><label class="form-field">Penyelenggara<input name="organizer" placeholder="Nama penyelenggara kegiatan" required maxlength="100"></label><div class="form-row"><label class="form-field">Tanggal Kegiatan<input name="date" type="date" required></label><label class="form-field">Poin Diajukan<input name="points" type="number" min="1" max="50" placeholder="1–50" required></label></div><label class="form-field">Bukti Kegiatan<input name="evidence" type="file" accept=".pdf,.jpg,.jpeg,.png" required><small>Format PDF, JPG, atau PNG.</small></label><div class="modal-actions"><button type="button" class="primary-button cancel">Batal</button><button type="submit" class="primary-button">Kirim Pengajuan</button></div></form></div>`;
  document.body.appendChild(overlay);

  const close = () => {
    document.removeEventListener('keydown', onKeyDown);
    overlay.remove();
  };
  const onKeyDown = event => {
    if (event.key === 'Escape') close();
  };
  document.addEventListener('keydown', onKeyDown);
  overlay.querySelector('.cancel').addEventListener('click', close);
  overlay.querySelector('.modal-close').addEventListener('click', close);
  overlay.addEventListener('click', event => { if (event.target === overlay) close(); });
  overlay.querySelector('form').addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const dateParts = String(formData.get('date')).split('-');
    pointSubmissions.unshift({
      category: String(formData.get('category')),
      title: String(formData.get('title')).trim(),
      organizer: String(formData.get('organizer')).trim(),
      date: `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`,
      points: String(formData.get('points')),
      evidence: String(formData.get('evidence').name)
    });
    close();
    render();
    showToast('Pengajuan poin berhasil dikirim dan menunggu validasi admin.');
  });
  overlay.querySelector('select').focus();
}

app.addEventListener('click', event => {
  if (event.target.closest('[data-action="logout"]')) {
    sessionStorage.removeItem(sessionKey);
    currentPage = 'login';
    render();
    showToast('Anda telah keluar dari portal mahasiswa.');
    return;
  }
  if (event.target.closest('.lecturer-cancel')) {
    selectedLecturer = '';
    render();
    return;
  }
  if (event.target.closest('.approval-close')) {
    app.querySelector('.student-approval').hidden = true;
    app.querySelector('.approval-open').hidden = false;
    return;
  }
  if (event.target.closest('.approval-open')) {
    app.querySelector('.student-approval').hidden = false;
    app.querySelector('.approval-open').hidden = true;
    return;
  }
  const pageButton = event.target.closest('[data-page]');
  if (pageButton) {
    currentPage = pageButton.dataset.page;
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  const methodButton = event.target.closest('[data-method]');
  if (methodButton) {
    selectedMethod = methodButton.dataset.method;
    render();
    showToast(`Metode pembayaran ${selectedMethod} dipilih.`);
    return;
  }
  const actionButton = event.target.closest('[data-action]');
  if (!actionButton) return;
  const action = actionButton.dataset.action;
  if (action === 'edit') openEditModal();
  else if (action === 'bell') showToast('Tidak ada notifikasi baru.');
  else if (action === 'receipt') showToast('Kuitansi pembayaran digital siap diunduh.');
  else if (action === 'payment-help') showToast('Pilih bank atau QRIS untuk melihat saluran pembayaran.');
  else if (action === 'save-attendance') saveAttendance();
  else if (action === 'save-approval') saveStudentApproval();
  else if (action === 'download-lecturer-schedule') downloadLecturerSchedule();
  else if (action === 'new-point') openPointModal();
  else if (action === 'download') showToast('Jadwal kuliah siap diunduh.');
});

app.addEventListener('change', event => {
  if (event.target.matches('[data-point-filter]')) {
    renderPointRows();
    return;
  }
  if (event.target.matches('#lecturer-search')) {
    const enteredName = event.target.value.trim();
    if (!lecturerNames.includes(enteredName)) {
      selectedLecturer = '';
      render();
      if (enteredName) showToast('Pilih nama dosen dari daftar.');
      return;
    }
    selectedLecturer = enteredName;
    renderLecturerSchedule();
    return;
  }
  const select = event.target.closest('[data-attendance-nim]');
  if (select) {
    attendanceStatuses.set(select.dataset.attendanceNim, select.value);
    select.dataset.status = select.value;
    updateAttendanceSummary(app.querySelector('.attendance-summary'));
    app.querySelector('.absent-count').textContent = String([...attendanceStatuses.values()].filter(status => status !== 'H').length);
    return;
  }
  if (event.target.matches('.approval-date-input')) {
    studentApproval.date = event.target.value;
    studentApproval.savedAt = '';
    app.querySelector('.approval-state').textContent = 'Belum Disimpan';
    app.querySelector('.approval-save').disabled = !studentApproval.consent || !studentApproval.date;
  }
});

app.addEventListener('input', event => {
  if (event.target.matches('#point-search-input')) {
    renderPointRows();
    return;
  }
  if (event.target.matches('#lecturer-search')) {
    if (event.target.value.trim() !== selectedLecturer) {
      selectedLecturer = '';
      renderLecturerSchedule(true);
    }
    return;
  }
  if (event.target.matches('.approval-note-input')) {
    studentApproval.note = event.target.value;
    studentApproval.savedAt = '';
    app.querySelector('.approval-state').textContent = 'Belum Disimpan';
  }
});

app.addEventListener('submit', event => {
  if (event.target.matches('.login-form')) {
    event.preventDefault();
    if (!event.target.reportValidity()) return;
    sessionStorage.setItem(sessionKey, 'demo');
    currentPage = 'home';
    render();
    window.scrollTo({ top: 0 });
    showToast('Selamat datang di portal mahasiswa.');
    return;
  }
  if (!event.target.matches('.point-search')) return;
  event.preventDefault();
  renderPointRows();
});

render();

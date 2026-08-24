export interface SampleEssay {
  id: string;
  title: string;
  genre: string;
  studentName: string;
  description: string;
  content: string;
}

export const SAMPLE_ESSAYS: SampleEssay[] = [
  {
    id: 'teknologi-ai',
    title: 'Peran Kecerdasan Buatan dalam Pendidikan Masa Depan',
    genre: 'Esai Argumentatif',
    studentName: 'Ahmad Fauzan (Kelas XI)',
    description: 'Esai tentang dampak AI pada proses belajar mengajar siswa.',
    content: `Perkembangan teknologi zaman sekarang sudah sangat pesat sekali terutama dibidang kecerdasan buatan atau artificial intelligence. Banyak siswa-siswa yang memakai AI untuk mengerjakan tugas sekolah mereka sehari-hari.

Hal ini tentu saja menimbulkan dampak positif dan juga dampak negatif bagi perkembangan intelektual pelajar. Disatu sisi, AI membantu murid mencari referensi materi pelajaran dengan sangat cepat dan mudah dipahami. Murid tidak perlu lagi repot-repot membuka buku tebal di perpustakaan berjam-jam.

Namun demikian, ada sisi buruknya yang mana murid menjadi malas berfikir kritis dan hanya mengandalkan copy paste jawaban secara instant. Guru juga kesulitan untuk menilai apakah tugas tersebut asli hasil karya murid atau bikinan mesin. Oleh karena itu, kita harus bijak didalam menggunakan teknologi ini agar supaya tidak merugikan masa depan kita sendiri.`
  },
  {
    id: 'lingkungan-sampah',
    title: 'Krisis Sampah Plastik di Lingkungan Sekolah',
    genre: 'Esai Persuasif',
    studentName: 'Siti Rahmawati (Kelas X)',
    description: 'Ajakan mengurangi sampah plastik sekali pakai di kantin sekolah.',
    content: `Sampah plastik adalah masalah yang sangat krusial di sekolah kita saat ini. Setiap hari saat jam istirahat tiba, kantin sekolah dipenuhi oleh ratusan botol dan kantong plastik yang dibuang sembarangan oleh para murid-murid.

Pemandangan ini sangat tidak sedap dipandang mata dan juga mencemari lingkungan sekitar sekolah. Padahal pihak sekolah sudah menyediakan tempat sampah organik dan non organik, tetapi kesadaran siswa masih sangat minim sekali. Banyak siswa yang acuh tak acuh terhadap kebersihan lingkungan belajarnya.

Untuk mengatasi permasalahan yang kronis ini, diperlukan sangsi yang tegas dan program wajib membawa tumbler dari rumah. Selain daripada itu, pengelola kantin sebaiknya dilarang menjual makanan yang dibungkus plastik sekali pakai. Dengan begitu, lingkungan sekolah kita akan menjadi asri, sehat, dan nyaman untuk belajar bersama.`
  },
  {
    id: 'budaya-literasi',
    title: 'Menumbuhkan Minat Baca di Era Gawai',
    genre: 'Esai Eksposisi',
    studentName: 'Budi Santoso (Kelas XII)',
    description: 'Analisis tantangan literasi membaca buku di kalangan remaja modern.',
    content: `Minat baca dikalangan generasi muda Indonesia saat sekarang ini dinilai masih cukup rendah. Kehadiran telepon pintar atau gawai pintar membuat remaja lebih asik menghabiskan waktu berjam jam untuk berselancar di sosial media daripada membaca buku bacaan yang berbobot.

Faktor penyebab utama dari rendahnya budaya literasi ini adalah kurangnya pembiasaan membaca sedari dini di lingkungan keluarga. Anak-anak jaman now lebih terbiasa disuguhkan tontonan video pendek yang instan dan menghibur sehingga daya konsentrasi mereka menjadi pendek saat membaca tulisan yang panjang.

Upaya meningkatkan literasi dapat dimulai dari pojok baca interaktif di setiap kelas serta perpustakaan digital yang menarik. Jika membaca dijadikan kebiasaan yang menyenangkan, niscaya wawasan generasi penerus bangsa akan semakin luas dan mampu bersaing ditingkat global.`
  }
];

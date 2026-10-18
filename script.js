// ==========================================
// PENGATURAN SIRAM - UBAH NOMOR DI BAGIAN INI
// ==========================================
// Gunakan kode negara 62, tanpa tanda +, spasi, atau angka 0 di depan.
// Contoh: nomor 081234567890 ditulis menjadi 6281234567890.
const NOMOR_WHATSAPP = "6281234567890"; // GANTI dengan nomor WhatsApp penjual

// Membuka menu navigasi pada layar kecil.
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", function () {
  const menuSedangTerbuka = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", menuSedangTerbuka);
});

// Tutup menu setelah salah satu tautan navigasi dipilih.
document.querySelectorAll("#navLinks a").forEach(function (link) {
  link.addEventListener("click", function () {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Membuat tautan WhatsApp dengan pesan yang sudah terisi.
function buatTautanWhatsApp(pesan) {
  return "https://wa.me/" + NOMOR_WHATSAPP + "?text=" + encodeURIComponent(pesan);
}

// Tombol pesan untuk setiap produk.
document.querySelectorAll(".order-button").forEach(function (button) {
  button.addEventListener("click", function () {
    const namaProduk = button.dataset.product;
    const hargaAngka = Number(button.dataset.price);
    const hargaFormat = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0
    }).format(hargaAngka);

    const pesan = "Halo, saya ingin memesan produk SIRAM:\n" +
      "Produk: " + namaProduk + "\n" +
      "Harga: " + hargaFormat + "\n" +
      "Jumlah: 1\n" +
      "Apakah produk ini tersedia?";

    window.open(buatTautanWhatsApp(pesan), "_blank", "noopener");
  });
});

// Tombol WhatsApp pada bagian kontak.
const contactWhatsApp = document.getElementById("contactWhatsApp");
contactWhatsApp.href = buatTautanWhatsApp(
  "Halo SIRAM, saya ingin bertanya tentang produk pupuk organik."
);

// Tahun otomatis pada footer.
document.getElementById("year").textContent = new Date().getFullYear();

// ==========================================
// KUIS EDUKASI SEDERHANA
// ==========================================
const daftarKuis = [
  {
    pertanyaan: "Kulit pisang termasuk jenis sampah apa?",
    pilihan: ["Anorganik", "Organik", "Limbah elektronik"],
    jawaban: 1,
    penjelasan: "Benar! Kulit pisang adalah sampah organik yang dapat terurai secara alami."
  },
  {
    pertanyaan: "Mana contoh sampah anorganik?",
    pilihan: ["Daun kering", "Sisa nasi", "Botol plastik"],
    jawaban: 2,
    penjelasan: "Benar! Botol plastik termasuk anorganik dan perlu dipilah sesuai jenisnya."
  },
  {
    pertanyaan: "Apa langkah awal sebelum mengolah sampah organik?",
    pilihan: ["Mencampurnya dengan semua sampah", "Memilah sampah", "Membuangnya ke sungai"],
    jawaban: 1,
    penjelasan: "Benar! Pemilahan membantu sampah organik diolah dengan lebih tepat."
  }
];

let nomorKuis = 0;
const quizQuestion = document.getElementById("quizQuestion");
const quizOptions = document.getElementById("quizOptions");
const quizFeedback = document.getElementById("quizFeedback");
const nextQuestion = document.getElementById("nextQuestion");

function tampilkanKuis() {
  const kuis = daftarKuis[nomorKuis];
  quizQuestion.textContent = kuis.pertanyaan;
  quizOptions.innerHTML = "";

  kuis.pilihan.forEach(function (pilihan, index) {
    const tombol = document.createElement("button");
    tombol.className = "quiz-option";
    tombol.textContent = pilihan;

    tombol.addEventListener("click", function () {
      // Cegah pilihan diubah berkali-kali pada pertanyaan yang sama.
      if (quizOptions.dataset.answered === "true") return;
      quizOptions.dataset.answered = "true";

      if (index === kuis.jawaban) {
        tombol.classList.add("correct");
        quizFeedback.textContent = kuis.penjelasan;
      } else {
        tombol.classList.add("wrong");
        quizFeedback.textContent = "Belum tepat. Coba ingat kembali materi pemilahan sampah.";
        quizOptions.children[kuis.jawaban].classList.add("correct");
      }
    });

    quizOptions.appendChild(tombol);
  });

  quizOptions.dataset.answered = "false";
  quizFeedback.textContent = "Pilih jawabanmu di atas.";
  nextQuestion.textContent = nomorKuis === daftarKuis.length - 1
    ? "Ulangi dari awal ↻"
    : "Pertanyaan berikutnya →";
}

nextQuestion.addEventListener("click", function () {
  nomorKuis = (nomorKuis + 1) % daftarKuis.length;
  tampilkanKuis();
});

tampilkanKuis();

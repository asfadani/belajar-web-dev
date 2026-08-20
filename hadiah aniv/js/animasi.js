// ==========================================
// 1. ANIMASI MESIN KETIK (TYPEWRITER)
// ==========================================
const kalimat = "Happy 2nd Anniversary My Pretty❤️";
const elemenTeks = document.getElementById("teks-animasi");
// Memecah kalimat menjadi array agar Emoji terbaca sempurna
const hurufArray = [...kalimat];
let indexHuruf = 0;

function ketikTeks() {
    if (indexHuruf < hurufArray.length) {
        elemenTeks.innerHTML += hurufArray[indexHuruf];
        indexHuruf++;
        setTimeout(ketikTeks, 150); // Kecepatan mengetik (150 milidetik per huruf)
    }
}

// Mulai mengetik 0.5 detik setelah halaman dibuka
setTimeout(ketikTeks, 500);

// ==========================================
// 2. ANIMASI FADE-IN SAAT DI-SCROLL
// ==========================================
const kotakPlayer = document.getElementById("kotak-player");
// Ambil elemen layar pertama
const layarAwal = document.getElementById("layar-awal");

const pemantau = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // 1. Munculkan Player
            kotakPlayer.classList.remove("opacity-0", "translate-y-20");
            kotakPlayer.classList.add("opacity-100", "translate-y-0");

            // 2. Paksa layar awal memudar dengan CSS bawaan browser (bukan Tailwind)
            layarAwal.style.transition = "opacity 1s ease-out";
            layarAwal.style.opacity = "0";

            // 3. Setelah 1 detik (waktu pudar selesai), hapus layar awal seutuhnya!
            setTimeout(() => {
                layarAwal.style.display = "none";
                // Pastikan layar terkunci rapi di posisi atas
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 1000);

            // Matikan sensor
            pemantau.unobserve(kotakPlayer);
        }
    });
}, {
    threshold: 0.3
});

// INI BARIS YANG HILANG SEBELUMNYA! (Wajib ada agar sensornya aktif)
pemantau.observe(kotakPlayer);


// ==========================================
// 3. FITUR PEMUTAR MUSIK UTAMA
// ==========================================
const btnPlay = document.getElementById("btn-play");
const iconPlay = document.getElementById("icon-play");

let ytPlayer;
let isPlaying = false;

// Fungsi ini OTOMATIS dijalankan oleh YouTube saat halamannya dimuat
function onYouTubeIframeAPIReady() {
    ytPlayer = new YT.Player('youtube-audio', {
        height: '0',
        width: '0',
        videoId: 'E3-tmG0SU7k',
        playerVars: {
            'autoplay': 0,
            'controls': 0,
            'playsinline': 1
        }
    });
}

// Perintah saat tombol Play buatanmu diklik
btnPlay.addEventListener("click", function () {
    // Cegah error jika YouTube belum selesai memuat
    if (!ytPlayer || typeof ytPlayer.playVideo !== 'function') {
        alert("Sistem YouTube masih memuat, tunggu sebentar ya...");
        return;
    }

    if (!isPlaying) {
        // Putar YouTube
        ytPlayer.playVideo();
        isPlaying = true;

        // Ubah ikon jadi Pause
        iconPlay.classList.remove("fa-play", "ml-1");
        iconPlay.classList.add("fa-pause");
    } else {
        // Hentikan YouTube
        ytPlayer.pauseVideo();
        isPlaying = false;

        // Ubah ikon jadi Play
        iconPlay.classList.remove("fa-pause");
        iconPlay.classList.add("fa-play", "ml-1");
    }
});

// ==========================================
// 4. EFEK ANIMASI SCROLL PARALLAX (KOLASE FOTO)
// ==========================================
const sectionKolase = document.getElementById("section-kolase");
const baris1 = document.getElementById("baris-1");
const baris2 = document.getElementById("baris-2");
const baris3 = document.getElementById("baris-3");

// Sistem akan membaca setiap kali layar di-scroll
window.addEventListener("scroll", () => {
    // Pastikan elemennya ada sebelum menjalankan animasi
    if (!sectionKolase) return;

    // Ambil informasi posisi section kolase saat ini
    const rect = sectionKolase.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Hitung di mana titik tengah section terhadap titik tengah layar monitor
    const sectionCenter = rect.top + (rect.height / 2);
    const screenCenter = windowHeight / 2;

    // Hitung jarak (Jika posisinya pas di tengah layar, hasilnya adalah 0)
    const distance = sectionCenter - screenCenter;

    // Tingkat kelembutan/kecepatan gerak (bisa kamu ubah, misal 0.1 atau 0.3)
    const speed = 0.15;

    // Hitung pergeseran pixel
    const gerakKanan = distance * speed;
    const gerakKiri = -(distance * speed);

    // Dorong fotonya ke kanan dan ke kiri!
    // Saat posisinya 0 (pas di tengah layar), translate-nya jadi 0px (berhenti/normal)
    if (baris1 && baris2 && baris3) {
        baris1.style.transform = `translateX(${gerakKanan}px)`;
        baris2.style.transform = `translateX(${gerakKiri}px)`;
        baris3.style.transform = `translateX(${gerakKanan}px)`;
    }
});

// ==========================================
// 5. EFEK BACKGROUND LINGKARAN BLUR PINK
// ==========================================
const bgContainer = document.getElementById("bg-animasi");

// Kamu bisa mengubah angka ini untuk menambah/mengurangi jumlah lingkaran
const jumlahLingkaran = 8;

for (let i = 0; i < jumlahLingkaran; i++) {
    // 1. Buat elemen div baru
    const lingkaran = document.createElement("div");

    // 2. Acak ukuran (antara 150px sampai 450px)
    const ukuran = Math.floor(Math.random() * 300) + 150;

    // 3. Acak posisi X dan Y (dalam persentase 0% - 100%)
    const posX = Math.floor(Math.random() * 100);
    const posY = Math.floor(Math.random() * 100);

    // 4. Masukkan class Tailwind (Bentuk bulat, warna pink, efek blur ekstrem)
    // Gunakan opacity (misal /20 atau /30) agar warnanya pendar dan tidak terlalu menyilaukan
    lingkaran.className = "absolute rounded-full bg-pink-500/20 blur-[80px] md:blur-[120px]";

    // 5. Terapkan hasil acakan ke dalam CSS style
    lingkaran.style.width = `${ukuran}px`;
    lingkaran.style.height = `${ukuran}px`;
    lingkaran.style.left = `${posX}%`;
    lingkaran.style.top = `${posY}%`;

    // 6. Suntikkan lingkaran ini ke dalam wadah background
    bgContainer.appendChild(lingkaran);
}

// ==========================================
// 6. ANIMASI MESIN KETIK UNTUK KOLASE FOTO
// ==========================================
const teksKolase = document.getElementById("teks-kolase");
const sectionKolaseTarget = document.getElementById("section-kolase");

const kalimatKolase = "A truly beautiful two-year journey.";
const hurufKolaseArray = [...kalimatKolase];
let indexHurufKolase = 0;
let sudahNgetik = false; // Pengunci agar tidak ngetik berulang kali

function ketikTeksKolase() {
    if (indexHurufKolase < hurufKolaseArray.length) {
        teksKolase.innerHTML += hurufKolaseArray[indexHurufKolase];
        indexHurufKolase++;
        setTimeout(ketikTeksKolase, 120); // Kecepatan mengetik (120 milidetik per huruf)
    }
}

// Pasang sensor (CCTV) untuk bagian kolase
const pantauKolase = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // Jika layarnya sudah menyentuh bagian kolase dan belum pernah ngetik
        if (entry.isIntersecting && !sudahNgetik) {
            sudahNgetik = true; // Kunci agar tidak ngetik ulang

            // Tunggu 0.5 detik setelah di-scroll, baru mulai ngetik
            setTimeout(ketikTeksKolase, 500);

            // Matikan sensor setelah selesai
            pantauKolase.unobserve(sectionKolaseTarget);
        }
    });
}, {
    threshold: 0.4 // Animasi terpicu saat 40% bagian kolase sudah terlihat di layar
});

// Nyalakan sensornya
if (sectionKolaseTarget && teksKolase) {
    pantauKolase.observe(sectionKolaseTarget);
}

// ==========================================
// 7. ANIMASI FADE-IN UNTUK SECTION NARASI
// ==========================================
const elemenNarasi = document.getElementById("teks-narasi");
const sectionNarasiTarget = document.getElementById("section-narasi");

// Buat sensor baru khusus untuk teks narasi
const pantauNarasi = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // Jika section narasi mulai terlihat di layar
        if (entry.isIntersecting) {
            // Hapus class yang menyembunyikan teks
            elemenNarasi.classList.remove("opacity-0", "translate-y-10");

            // Tambahkan class untuk memunculkan teks di posisi normal
            elemenNarasi.classList.add("opacity-100", "translate-y-0");

            // Matikan sensor agar efeknya hanya terjadi satu kali
            pantauNarasi.unobserve(sectionNarasiTarget);
        }
    });
}, {
    threshold: 0.3 // Efek muncul saat 30% area narasi terlihat
});

// Nyalakan sensornya
if (sectionNarasiTarget && elemenNarasi) {
    pantauNarasi.observe(sectionNarasiTarget);
}

// ==========================================
// 8. ANIMASI 3D KARTU MOMEN TERBAIK
// ==========================================
const sectionMomen = document.getElementById("section-momen");
const judulMomen = document.getElementById("judul-momen");
const semuaKartuInner = document.querySelectorAll(".kartu-inner");
const semuaKartuContainer = document.querySelectorAll(".kartu-container");

// 1. CCTV untuk memunculkan judul dan memutar kartu saat di-scroll
const pantauMomen = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Munculkan Judul
            judulMomen.classList.remove("opacity-0", "translate-y-10");
            judulMomen.classList.add("opacity-100", "translate-y-0");

            // Putar kartu satu per satu (efek bergelombang)
            semuaKartuInner.forEach((kartu, index) => {
                setTimeout(() => {
                    kartu.style.transform = "rotateY(0deg)"; // 0deg = Menghadap depan (Foto)
                }, index * 300 + 400); // Jeda 0.3 detik antar kartu
            });

            pantauMomen.unobserve(sectionMomen); // Matikan CCTV
        }
    });
}, { threshold: 0.3 });

if (sectionMomen) pantauMomen.observe(sectionMomen);

// 2. Logika Klik Tombol Setuju / Tidak
semuaKartuContainer.forEach(container => {
    const btnSetuju = container.querySelector(".btn-setuju");
    const btnTidak = container.querySelector(".btn-tidak");
    const kartuInner = container.querySelector(".kartu-inner");
    const ikonLove = container.querySelector(".ikon-love");

    // Jika SETUJU di-klik
    btnSetuju.addEventListener("click", () => {
        // Balikkan kartu ke sisi motif remi
        kartuInner.style.transform = "rotateY(180deg)";

        // Jeda 0.4 detik (saat kartu sedang berputar), lalu ubah bentuk Love-nya
        setTimeout(() => {
            ikonLove.classList.remove("fa-regular", "text-pink-300");
            ikonLove.classList.add("fa-solid", "text-pink-500");
            // Berikan efek cahaya Neon Pink yang kuat
            ikonLove.style.textShadow = "0 0 20px #ec4899, 0 0 40px #ec4899";
        }, 400);
    });

    // Jika TIDAK di-klik
    btnTidak.addEventListener("click", () => {
        // Balikkan kartu ke sisi motif remi
        kartuInner.style.transform = "rotateY(180deg)";

        // Jeda 0.4 detik, kembalikan wujud Love menjadi garis biasa (Outline) tanpa cahaya
        setTimeout(() => {
            ikonLove.classList.remove("fa-solid", "text-pink-500");
            ikonLove.classList.add("fa-regular", "text-pink-300");
            ikonLove.style.textShadow = "none";
        }, 400);
    });
});

const sectionNarasi2Target = document.getElementById("section-narasi-2");
const elemenNarasi2 = document.getElementById("teks-narasi-2");

// Buat sensor khusus untuk narasi penutup
const pantauNarasi2 = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Hapus mode tembus pandang
            elemenNarasi2.classList.remove("opacity-0", "translate-y-10");
            // Munculkan teksnya
            elemenNarasi2.classList.add("opacity-100", "translate-y-0");

            // Matikan sensor setelah muncul
            pantauNarasi2.unobserve(sectionNarasi2Target);
        }
    });
}, {
    threshold: 0.3
});

// Nyalakan sensornya
if (sectionNarasi2Target && elemenNarasi2) {
    pantauNarasi2.observe(sectionNarasi2Target);
}

// ==========================================
// 10. ANIMASI FADE-IN UNTUK VIDEO MENTION
// ==========================================
const sectionVideo = document.getElementById("section-video");
const judulVideo = document.getElementById("judul-video");
const wadahVideo = document.getElementById("wadah-video");

const pantauVideo = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Munculkan Judul
            judulVideo.classList.remove("opacity-0", "translate-y-10");
            judulVideo.classList.add("opacity-100", "translate-y-0");

            // Munculkan Bingkai Video
            wadahVideo.classList.remove("opacity-0", "translate-y-10");
            wadahVideo.classList.add("opacity-100", "translate-y-0");

            // Matikan sensor setelah videonya muncul
            pantauVideo.unobserve(sectionVideo);
        }
    });
}, {
    threshold: 0.2 // Akan terpicu saat 20% area video masuk layar
});

// Nyalakan sensornya
if (sectionVideo && judulVideo && wadahVideo) {
    pantauVideo.observe(sectionVideo);
}

const tutupAmplop = document.getElementById("tutup-amplop");
const kertasSurat = document.getElementById("kertas-surat");
const suratTerbuka = document.getElementById("surat-terbuka");
const isiSuratModal = document.getElementById("isi-surat-modal");

function bukaSurat() {
    // 1. Putar tutup amplop ke atas (terbuka)
    tutupAmplop.style.transform = "rotateX(180deg)";

    // 2. Jeda 0.4 detik, lalu dorong kertas surat menyembul ke atas sedikit
    setTimeout(() => {
        kertasSurat.style.transform = "translateY(-60px)";
    }, 400);

    // 3. Jeda 1.2 detik, munculkan popup surat versi layar penuh agar mudah dibaca
    setTimeout(() => {
        suratTerbuka.classList.remove("hidden");

        // Jeda sangat singkat agar browser sempat memproses penghapusan 'hidden'
        setTimeout(() => {
            suratTerbuka.classList.remove("opacity-0", "pointer-events-none");
            suratTerbuka.classList.add("opacity-100");

            // Efek kertas membesar (pop-up zoom)
            isiSuratModal.classList.remove("scale-90");
            isiSuratModal.classList.add("scale-100");
        }, 50);
    }, 1200);
}

function tutupSurat() {
    // 1. Sembunyikan popup surat perlahan
    suratTerbuka.classList.remove("opacity-100");
    suratTerbuka.classList.add("opacity-0", "pointer-events-none");

    isiSuratModal.classList.remove("scale-100");
    isiSuratModal.classList.add("scale-90");

    // 2. Kembalikan amplop ke posisi tertutup semula
    setTimeout(() => {
        suratTerbuka.classList.add("hidden");
        kertasSurat.style.transform = "translateY(0)";

        // Tutup flap amplopnya lagi
        setTimeout(() => {
            tutupAmplop.style.transform = "rotateX(0deg)";
        }, 400);
    }, 500);
}

// ==========================================
// 12. FUNGSI KIRIM PESAN KE WHATSAPP
// ==========================================
function kirimKeWA() {
    // 1. Ambil teks yang ditulis oleh pasanganmu
    const teksPesan = document.getElementById("pesan-balasan").value;

    // 2. Cek apakah kotaknya masih kosong
    if (teksPesan.trim() === "") {
        alert("Pesan tidak boleh kosong ya! Tulis sesuatu dong buat aku 🥺");
        return; // Hentikan proses jika kosong
    }

    // 3. Masukkan NOMOR WHATSAPP KAMU di sini
    // WAJIB: Gunakan kode negara (62) sebagai ganti angka 0 di depan.
    // Contoh jika nomormu 08123456789 -> tulis 628123456789
    const nomorWA = "6285934405716";

    // 4. Susun pesan otomatisnya
    const pesanFormat = "Halo sayang! Ini pesan balasan dari website anniversary kita:\n\n" + teksPesan;

    // 5. Ubah teks menjadi format link URL
    const urlWA = `https://wa.me/${nomorWA}?text=${encodeURIComponent(pesanFormat)}`;

    // 6. Buka WhatsApp di tab baru
    window.open(urlWA, "_blank");
}
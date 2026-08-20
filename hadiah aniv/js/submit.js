const tanggalBenar = "2024-08-20";

// 2. Ambil elemen dari HTML
const inputTanggal = document.getElementById("tanggal-jadian");
const btnSubmit = document.getElementById("btn-submit");

// 3. Buat perintah saat tombol Submit diklik
btnSubmit.addEventListener("click", function () {

    // Ambil nilai tanggal yang diisi 
    const tebakanTanggal = inputTanggal.value;

    // Mulai pengecekan
    if (tebakanTanggal === tanggalBenar) {
        // JIKA BENAR: Munculkan pesan dan pindah ke Landing Page
        tampilkanAlert("Happy Aniversarry Pretty");
        window.location.href = "home.html";

    } else if (tebakanTanggal === "") {
        // JIKA KOSONG
        tampilkanAlert("Isi dulu tanggalnya dong!");

    } else {
        // JIKA SALAH
        tampilkanAlert("Masa lupa tanggal jadian kita?");
        inputTanggal.value = "";
        inputTanggal.type = "text";
    }
});

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

// Fungsi untuk memunculkan custom alert
function tampilkanAlert(pesan) {
    const wadahAlert = document.getElementById("custom-alert");
    const boxAlert = document.getElementById("alert-box");
    const teksAlert = document.getElementById("alert-message");

    teksAlert.innerText = pesan; // Mengganti teks sesuai yang dikirim
    wadahAlert.classList.remove("hidden");

    // Jeda sedikit agar efek transisinya berjalan mulus
    setTimeout(() => {
        wadahAlert.classList.remove("opacity-0", "pointer-events-none");
        boxAlert.classList.remove("scale-90");
        boxAlert.classList.add("scale-100");
    }, 10);
}

// Fungsi untuk menutup custom alert saat tombol "Coba Lagi" diklik
function tutupAlert() {
    const wadahAlert = document.getElementById("custom-alert");
    const boxAlert = document.getElementById("alert-box");

    wadahAlert.classList.add("opacity-0", "pointer-events-none");
    boxAlert.classList.remove("scale-100");
    boxAlert.classList.add("scale-90");

    // Sembunyikan sepenuhnya setelah transisi selesai (300ms)
    setTimeout(() => {
        wadahAlert.classList.add("hidden");
    }, 300);
}
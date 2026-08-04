
const navbar = document.getElementById('navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.remove('-translate-y-full');
            navbar.classList.add('translate-y-0');
        } else {
            navbar.classList.add('-translate-y-full');
            navbar.classList.remove('translate-y-0');
        }
    });
}

// 2. Logika Hamburger Menu (Mobile)
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navLinks = document.getElementById('nav-links');
const menuIcon = mobileMenuBtn ? mobileMenuBtn.querySelector('i') : null;

// Pastikan elemennya ada sebelum menjalankan fungsi
if (mobileMenuBtn && navLinks && menuIcon) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('translate-x-full');
        navLinks.classList.toggle('translate-x-0');

        // Ubah ikon antara hamburger dan silang
        if (navLinks.classList.contains('translate-x-0')) {
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-xmark');
        } else {
            menuIcon.classList.remove('fa-xmark');
            menuIcon.classList.add('fa-bars');
        }
    });

    // 3. Menutup menu otomatis jika link diklik (untuk versi mobile)
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.add('translate-x-full');
            navLinks.classList.remove('translate-x-0');
            menuIcon.classList.remove('fa-xmark');
            menuIcon.classList.add('fa-bars');
        });
    });
} // PENUTUP IF UNTUK BAGIAN MOBILE MENU (Ini yang sering terlewat)

// 4. Logika Fade-in Animasi saat Scroll (Intersection Observer)
const fadeSections = document.querySelectorAll('.fade-in-section');
const observerOptions = {
    root: null,
    threshold: 0.15, // Animasi dipicu saat 15% bagian section sudah terlihat di layar
    rootMargin: "0px"
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Hapus class sembunyi, tambahkan class tampil
            entry.target.classList.remove('opacity-0', 'translate-y-10');
            entry.target.classList.add('opacity-100', 'translate-y-0');

            // Stop observasi agar animasi hanya berjalan satu kali
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Terapkan observer ke setiap section yang memiliki class .fade-in-section
if (fadeSections.length > 0) {
    fadeSections.forEach(section => {
        observer.observe(section);
    });
}
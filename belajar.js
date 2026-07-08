// Cek apakah file js sudah terhubung
console.log("Halo! File JS sudah berhasil terhubung!");

// Variabel untuk mencari form login
const formLogin = document.querySelector('form');

// Membuat event jika submit data di form login
formLogin.addEventListener('submit', function (event) {
    // Buat agar tidak langsung refresh
    event.preventDefault();

    // Pemberitahuan jika event berhasil
    alert("Berhasil!")

    // Variabel untuk mengambil value form
    const inputUsername = document.getElementById('Username').value;
    const inputPassword = document.getElementById('pass').value;

    // Perintah untuk menampilkan value setelah di input
    console.log("Ussername yang diinput", inputUsername);
    console.log("Password yang diinput", inputPassword);
}
);

// Membuat ikon mata pada password
// Variabel mengambil ikon mata dan password
const intipPassword = document.getElementById('lihatPass');
const inputPassword = document.getElementById('pass');

intipPassword.addEventListener('click', function () {
    if (inputPassword.type == 'password') {
        inputPassword.type = 'text';
    } else {
        inputPassword.type = 'password';
    }
});



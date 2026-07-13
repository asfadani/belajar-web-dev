// Cek apakah file js sudah terhubung
console.log("Halo! File JS sudah berhasil terhubung!");
// Variabel untuk mencari form login
const formLogin = document.querySelector('form');

// Membuat event jika submit data di form login
formLogin.addEventListener('submit', function (event) {
    // Buat agar tidak langsung refresh
    event.preventDefault();

    // Variabel untuk mengambil value form
    const inputUsername = document.getElementById('Username').value;
    const inputPassword = document.getElementById('pass').value;

    // Bungkus data sesuai cetakan GO
    const dataKirim = {
        username: inputUsername,
        password: inputPassword
    };

    // Kirim data ke GO dengan (fetch)
    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Memberi tahu GO ini konten JSON
        },
        body: JSON.stringify(dataKirim) // Mengubah objek JS mjd JSON
    })
        .then(response => response.text()) // Menerima balasan dari GO 
        .then(hasil => {
            alert("Pesan dari server: " + hasil);
        })
        .catch(error => {
            // Yang ditampilkan jika derver ,ati
            console.error("Gagal mengirim data: ", error);
            alert("Gagal terhubung ke server");
        });
});

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



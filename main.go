package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
)

type DataLogin struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

func main() {
	// 1. Membuat endpoint (rute)
	// Kalau di Python FastAPI/Flask, ini mirip seperti @app.route("/")
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Server backend sudah nyala")
	})

	// Membuat routing login
	http.HandleFunc("/login", func(w http.ResponseWriter, r *http.Request) {
		// Keamanan CROS (agar front end 5500 bisa mengirim data ke backend 3000)
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		// Pengecekan jalur oleh browser sebelum data asli
		if r.Method == http.MethodOptions {
			return
		}

		// Memastikan data agar dikirim dengan metode POST
		if r.Method != http.MethodPost {
			http.Error(w, "Metode tidak diizinkan", http.StatusMethodNotAllowed)
			return
		}

		// Menyiapkan penampung sesuai struktur
		var wadah DataLogin

		// Menerjemahkan data json, dan memasukkan ke wadah
		err := json.NewDecoder(r.Body).Decode(&wadah)
		if err != nil {
			http.Error(w, "Data tidak sesuai format", http.StatusBadRequest)
			return
		}

		// Koneksi ke mariadb
		db, err := sql.Open("mysql", "root:Asfa1745@tcp(127.0.0.1:3306)/db_belajar_web")
		if err != nil {
			http.Error(w, "Server gagal terhubung ke dataase", http.StatusInternalServerError)
			return
		}
		defer db.Close() // Menutup koneks setelah selesai

		// Query untuk cek apakah password cocok
		var dbUsername string
		query := "SELECT username FROM users WHERE username = ? AND password = ?"

		// mencari 1 baris data dengan .QueryRow, tanda ? akan diisi secara aman dari data yang ada di wadah
		err = db.QueryRow(query, wadah.Username, wadah.Password).Scan(&dbUsername)

		if err != nil {
			// jika erorr == sql.ErrNoRows, artinya data tidak ditemukan di database
			if err == sql.ErrNoRows {
				fmt.Fprintf(w, "GAGAL : Username atau Password salah")
			} else {
				fmt.Fprintf(w, "ERROR sistem : %s", err.Error())
			}
			return
		}

		// username dan pw cocok jika lolos if else nya
		fmt.Fprintf(w, "SUKSES : Selamat datang %s!", dbUsername)

		// // Cetak data yang ditangkap ke terminal
		// fmt.Println("==========================")
		// fmt.Println("Terdaat percobaan login")
		// fmt.Println("Username yang ditangkap:", wadah.Username)
		// fmt.Println("Password yang ditangkap:", wadah.Password)
		// fmt.Println("==========================")

		// // Memberi balasan ke frontend
		// fmt.Fprintf(w, "Data berhasil diproses Golang")
	})

	// 3. Kode yang stadnby menunggu request
	fmt.Println("Server berjalan di port 3000")
	fmt.Println("Buka server dan buka localhost:3000")
	http.ListenAndServe(":3000", nil)

}

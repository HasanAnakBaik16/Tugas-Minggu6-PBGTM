function bukaMenu() {
  document.getElementById("menu").classList.toggle("tampil");
}

var dataEkskul = {
  "Pramuka": { ikon: "🏕️", deskripsi: "Kegiatan setiap hari Sabtu." },
  "Paskibra": { ikon: "🚩", deskripsi: "Latihan baris-berbaris." },
  "Rebana": { ikon: "🥁", deskripsi: "Latihan musik rebana & sholawat." },
  "Rohis": { ikon: "🕌", deskripsi: "Kajian dan kegiatan keislaman." },
  "Foster": { ikon: "🏍", deskripsi: "Latihan tentang keamanan bermotor." },
  "PMR": { ikon: "➕", deskripsi: "Pelatihan pertolongan pertama." },
  "Voly": { ikon: "🏐", deskripsi: "Latihan bola voli." },
  "Futsal": { ikon: "⚽", deskripsi: "Latihan setiap Selasa & Kamis." },
  "Jepang": { ikon: "🎌", deskripsi: "Belajar bahasa & budaya Jepang." },
  "Jurnalis": { ikon: "📰", deskripsi: "Menulis berita & dokumentasi." },
  "MTQ": { ikon: "📖", deskripsi: "Latihan tilawah & seni baca Al-Qur'an." },
  "Drumband": { ikon: "🎺", deskripsi: "Latihan marching band sekolah." },
  "Tari": { ikon: "💃", deskripsi: "Latihan tari tradisional & modern." },
  "Pencak Silat": { ikon: "🥋", deskripsi: "Latihan bela diri pencak silat." },
  "Padus": { ikon: "🎤", deskripsi: "Latihan paduan suara." }
};

function pilihEkskul(nama) {
  localStorage.setItem("ekskulDipilih", nama);
  window.location.href = "form.html";
}

function lihatPassword(idInput, tombol) {
  var input = document.getElementById(idInput);
  if (input.type === "password") {
    input.type = "text";
    tombol.textContent = "🙈";
  } else {
    input.type = "password";
    tombol.textContent = "👁";
  }
}

var formDaftar = document.getElementById("formDaftar");

if (formDaftar) {
  var selectEkskul = document.getElementById("ekskul");

  function tampilkanEkskul(nama) {
    document.getElementById("ikonEkskul").textContent = dataEkskul[nama].ikon;
    document.getElementById("namaEkskul").textContent = nama;
    document.getElementById("deskripsiEkskul").textContent = dataEkskul[nama].deskripsi;
  }

  var namaEkskul = localStorage.getItem("ekskulDipilih");
  if (namaEkskul === null || dataEkskul[namaEkskul] === undefined) {
    namaEkskul = "Pramuka";
  }
  selectEkskul.value = namaEkskul;
  tampilkanEkskul(namaEkskul);

  selectEkskul.addEventListener("change", function () {
    tampilkanEkskul(selectEkskul.value);
  });

  function tandai(input, pesanId, benar, teksSalah, teksBenar) {
    var pesan = document.getElementById(pesanId);
    if (benar) {
      input.className = "benar";
      pesan.textContent = teksBenar;
      pesan.className = "pesan pesan-benar";
    } else {
      input.className = "salah";
      pesan.textContent = teksSalah;
      pesan.className = "pesan pesan-salah";
    }
    return benar;
  }

  var polaEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function cekNama() {
    var el = document.getElementById("nama");
    var teks = el.value.trim();
    var pesanSalah = teks.length === 0 ? "Nama tidak boleh kosong." : "Nama minimal 3 karakter.";
    return tandai(el, "pesanNama", teks.length >= 3, pesanSalah, "Nama sudah benar.");
  }
  function cekKelas() {
    var el = document.getElementById("kelas");
    return tandai(el, "pesanKelas", el.value !== "", "Kelas belum dipilih.", "Kelas sudah dipilih.");
  }
  function cekJurusan() {
    var el = document.getElementById("jurusan");
    return tandai(el, "pesanJurusan", el.value.trim() !== "", "Jurusan / rombel tidak boleh kosong.", "Sudah terisi.");
  }
  function cekEmail() {
    var el = document.getElementById("email");
    var teks = el.value.trim();
    var pesanSalah = teks.length === 0 ? "Email tidak boleh kosong." : "Format email belum benar (contoh: nama@gmail.com).";
    return tandai(el, "pesanEmail", polaEmail.test(teks), pesanSalah, "Email sudah benar.");
  }
  function cekPassword() {
    var el = document.getElementById("password");
    var pesanSalah = el.value.length === 0 ? "Password tidak boleh kosong." : "Password minimal 8 karakter.";
    return tandai(el, "pesanPassword", el.value.length >= 8, pesanSalah, "Password sudah benar.");
  }
  function cekKonfirmasi() {
    var el = document.getElementById("konfirmasi");
    var sama = el.value === document.getElementById("password").value && el.value !== "";
    var pesanSalah = el.value === "" ? "Konfirmasi password tidak boleh kosong." : "Konfirmasi harus sama persis dengan password.";
    return tandai(el, "pesanKonfirmasi", sama, pesanSalah, "Password cocok.");
  }

  document.getElementById("nama").addEventListener("input", cekNama);
  document.getElementById("kelas").addEventListener("change", cekKelas);
  document.getElementById("jurusan").addEventListener("input", cekJurusan);
  document.getElementById("email").addEventListener("input", cekEmail);
  document.getElementById("password").addEventListener("input", function () {
    cekPassword();
    if (document.getElementById("konfirmasi").value !== "") cekKonfirmasi();
  });
  document.getElementById("konfirmasi").addEventListener("input", cekKonfirmasi);

  formDaftar.addEventListener("submit", function (event) {
    event.preventDefault();

    var hasil = [cekNama(), cekKelas(), cekJurusan(), cekEmail(), cekPassword(), cekKonfirmasi()];
    var semuaBenar = hasil.indexOf(false) === -1;

    if (!semuaBenar) {
      var kolom = formDaftar.querySelector(".salah");
      if (kolom) kolom.focus();
    }

    if (semuaBenar) {
      var tombol = document.querySelector(".tombol-daftar");
      tombol.textContent = "Memproses...";
      tombol.disabled = true;

      setTimeout(function () {
        sessionStorage.setItem("pendaftaranBerhasil", "ya");
        window.location.reload();
      }, 1000);
    }
  });

  if (sessionStorage.getItem("pendaftaranBerhasil") === "ya") {
    sessionStorage.removeItem("pendaftaranBerhasil");
    document.getElementById("pesanSukses").style.display = "block";
    alert("Pendaftaran Berhasil!");
  }
}

const documentProperties = [
  "surat_lamaran",
  "drh",
  "ktp",
  "foto",
  "sk_pangkat",
  "sk_pengangkatan_jabatan_terakhir",
  "sk_pengangkatan_pertama_kali",
  "ijazah",
  "sttp",
  "skp",
  "lhkpn",
  "spt",
  "surat_rekomendasi",
  "surat_pernyataan_tidak_pidana",
  "surat_pernyataan_tidak_dijatuhi_hukdis",
  "surat_keterangan_pakta_integritas",
  "surat_keterangan_jasmani_rohani",
  "surat_keterangan_bebas_napza",
];

const documentPropertiesWithLabel = [
  {
    key: "surat_lamaran",
    description: "Surat Lamaran",
  },
  {
    key: "drh",
    description: "Daftar Riwayat Hidup Lengkap",
  },
  {
    key: "ktp",
    description: "KTP",
  },
  {
    key: "foto",
    description: "Pas foto berwarna terbaru ukuran 4x6",
  },
  {
    key: "sk_pangkat",
    description: "SK Pangkat Terakhir",
  },
  {
    key: "sk_pengangkatan_jabatan_terakhir",
    description: "SK Pengangkatan dalam Jabatan Terakhir",
  },
  {
    key: "sk_pengangkatan_pertama_kali",
    description:
      "SK Pengangkatan Pertama Kali dalam Jabatan Pimpinan Tinggi Pratama (Eselon II.a), dikecualikan bagi pelamar yang berasal dari Jabatan Fungsional",
  },
  {
    key: "ijazah",
    description:
      "Ijazah Diploma (DIV)/Sarjana (S-1) dan Ijazah (S-2/S-3 jika ada)",
  },
  {
    key: "sttp",
    description: "STTP Pendidikan dan Pelatihan Kepemimpinan",
  },
  {
    key: "skp",
    description:
      "Penilaian Prestasi Kerja 2 (dua) tahun terakhir (tahun 2020 dan 2021)",
  },
  {
    key: "lhkpn",
    description: "Bukti penyerahan LHKPN Tahun 2021",
  },
  {
    key: "spt",
    description: "Bukti penyerahan SPT Tahun 2021",
  },
  {
    key: "surat_rekomendasi",
    description:
      "Surat Persetujuan/Rekomendasi dari Pejabat Pembina Kepegawaian (PPK)",
  },
  {
    key: "surat_pernyataan_tidak_pidana",
    description: "Surat Pernyataan tidak sedang dalam proses peradilan pidana",
  },
  {
    key: "surat_pernyataan_tidak_dijatuhi_hukdis",
    description:
      "Surat Pernyataan tidak pernah dijatuhi hukuman disiplin sesuai dengan ketentuan peraturan perundang-undangan yang berlaku",
  },
  {
    key: "surat_keterangan_pakta_integritas",
    description: "Surat pernyataan Pakta Integritas",
  },
  {
    key: "surat_keterangan_jasmani_rohani",
    description:
      "Surat Keterangan Sehat Jasmani dan Rohani dari Rumah Sakit Pemerintah",
  },
  {
    key: "surat_keterangan_bebas_napza",
    description: "Surat Keterangan Bebas NAPZA dari Rumah Sakit Pemerintah",
  },
];

const profileProperties = [
  "nama_gelar",
  "nip",
  "tempat_lahir",
  "tanggal_lahir",
  "alamat_email",
  "no_hp",
  "pendidikan_terakhir",
  "tahun_lulus",
  "gol_pangkat",
  "tmt_pangkat",
  "jabatan_terakhir",
  "eselon_terakhir",
  "tmt_jab_terakhir",
  "instansi",
  "tmt_pengangkatan_pertama",
];

export default {
  documentProperties,
  profileProperties,
  documentPropertiesWithLabel,
};

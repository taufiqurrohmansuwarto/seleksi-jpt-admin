-- CreateTable
CREATE TABLE "admin" (
    "id" TEXT NOT NULL,
    "username" VARCHAR(200) NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(6),
    "roles" TEXT NOT NULL DEFAULT E'USER',

    CONSTRAINT "admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documents" (
    "surat_lamaran" TEXT,
    "surat_lamaran_is_verified" BOOLEAN DEFAULT false,
    "drh" TEXT,
    "drh_is_verified" BOOLEAN DEFAULT false,
    "ktp" TEXT,
    "ktp_is_verified" BOOLEAN DEFAULT false,
    "foto" TEXT,
    "foto_is_verified" BOOLEAN DEFAULT false,
    "sk_pangkat" TEXT,
    "sk_pangkat_is_verified" BOOLEAN DEFAULT false,
    "sk_pengangkatan_jabatan_terakhir" TEXT,
    "sk_pengangkatan_jabatan_terakhir_is_verified" BOOLEAN DEFAULT false,
    "sk_pengangkatan_pertama_kali" TEXT,
    "sk_pengangkatan_pertama_kali_is_verified" BOOLEAN DEFAULT false,
    "ijazah" TEXT,
    "ijazah_is_verified" BOOLEAN DEFAULT false,
    "sttp" TEXT,
    "sttp_is_verified" BOOLEAN DEFAULT false,
    "skp" TEXT,
    "skp_is_verified" BOOLEAN DEFAULT false,
    "lhkpn" TEXT,
    "lhkpn_is_verified" BOOLEAN DEFAULT false,
    "spt" TEXT,
    "spt_is_verified" BOOLEAN DEFAULT false,
    "surat_rekomendasi" TEXT,
    "surat_rekomendasi_is_verified" BOOLEAN DEFAULT false,
    "surat_pernyataan_tidak_pidana" TEXT,
    "surat_pernyataan_tidak_pidana_is_verified" BOOLEAN DEFAULT false,
    "surat_pernyataan_tidak_dijatuhi_hukdis" TEXT,
    "surat_pernyataan_tidak_dijathui_hukdis_is_verified" BOOLEAN DEFAULT false,
    "surat_keterangan_pakta_integritas" TEXT,
    "surat_keterangan_pakta_integritas_is_verified" BOOLEAN DEFAULT false,
    "surat_keterangan_jasmani_rohani" TEXT,
    "surat_keterangan_jasmani_rohani_is_verified" BOOLEAN DEFAULT false,
    "surat_keterangan_bebas_napza" TEXT,
    "surat_keterangan_bebas_napza_is_verified" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6),
    "user_id" TEXT NOT NULL,

    CONSTRAINT "documents_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "profiles" (
    "nama_gelar" VARCHAR(200),
    "nama_gelar_is_verified" BOOLEAN DEFAULT false,
    "nip" VARCHAR(200),
    "nip_is_verified" BOOLEAN DEFAULT false,
    "tempat_lahir" VARCHAR(200),
    "tempat_lahir_is_verified" BOOLEAN DEFAULT false,
    "tanggal_lahir" DATE,
    "tanggal_lahir_is_verified" BOOLEAN DEFAULT false,
    "alamat_email" VARCHAR(200),
    "alamat_email_is_verified" BOOLEAN DEFAULT false,
    "no_hp" VARCHAR(200),
    "no_hp_is_verified" BOOLEAN DEFAULT false,
    "pendidikan_terakhir" VARCHAR(200),
    "pendidikan_terakhir_is_verified" BOOLEAN DEFAULT false,
    "tahun_lulus" SMALLINT,
    "tahun_lulus_is_verified" BOOLEAN DEFAULT false,
    "gol_pangkat" VARCHAR(200),
    "gol_pangkat_is_verified" BOOLEAN DEFAULT false,
    "tmt_pangkat" DATE,
    "tmt_pangkat_is_verified" BOOLEAN DEFAULT false,
    "jabatan_terakhir" VARCHAR(200),
    "jabatan_terakhir_is_verified" BOOLEAN DEFAULT false,
    "eselon_terakhir" VARCHAR(200),
    "eselon_terakhir_is_verified" BOOLEAN DEFAULT false,
    "tmt_jab_terakhir" DATE,
    "tmt_jab_terakhir_is_verified" BOOLEAN DEFAULT false,
    "instansi" VARCHAR(200),
    "instansi_is_verified" BOOLEAN DEFAULT false,
    "tmt_pengangkatan_pertama" DATE,
    "tmt_pengangkatan_pertama_is_verified" BOOLEAN DEFAULT false,
    "is_submit" BOOLEAN DEFAULT false,
    "is_ready_step_1" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" VARCHAR(200) NOT NULL,
    "updated_at" TIMESTAMP(6),
    "is_qualified" BOOLEAN DEFAULT false,
    "keterangan" TEXT,
    "korektor" TEXT,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admin_username_key" ON "admin"("username");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_user_id_idx" ON "profiles"("user_id");

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "profiles"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_korektor_fkey" FOREIGN KEY ("korektor") REFERENCES "admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

import {
  CheckCircleTwoTone,
  ExclamationCircleTwoTone,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Alert,
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  message,
  Result,
  Row,
  Select,
  Skeleton,
  Space,
  Steps,
  Tooltip,
  Upload,
} from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { QueryClient, useMutation, useQuery } from "react-query";
import services from "../services";
import Layout from "../src/components/Layout";

const NoData = ({ onSubmit, loading }) => {
  return (
    <Result
      status="warning"
      title="Sepertinya anda belum mengisi resume"
      extra={
        <Button type="primary" onClick={onSubmit} loading={loading}>
          Mulai Isi
        </Button>
      }
    />
  );
};

const FormProfile = ({ initialValues, refetch }) => {
  const router = useRouter();
  const [form] = Form.useForm();
  const queryClient = new QueryClient();

  const validateMessages = {
    required: "${label} is tidak boleh kosong!",
  };

  const pendidikans = [
    "SD",
    "SLTP",
    "SLTA",
    "D-I",
    "D-II",
    "D-III",
    "D-IV",
    "S-1",
    "S-2",
    "S-3",
  ];

  const golongan = [
    { title: "IV/a : Pembina", value: "IV/a" },
    {
      title: "IV/b : Pembina Tingkat I",
      value: "IV/b",
    },
    {
      title: "IV/c : Pembina Muda",
      value: "IV/c",
    },
    {
      title: "IV/d : Pembina Madya",
      value: "IV/d",
    },
    {
      title: "IV/e : Pembina Utama",
      value: "IV/e",
    },
  ];

  const eselons = [
    "I.a",
    "I.b",
    "II.a",
    "II.b",
    "III.a",
    "III.b",
    "IV.a",
    "IV.b",
  ];

  useEffect(() => {}, [initialValues]);

  const updateMutation = useMutation((data) => services.updateResume(data), {
    onSuccess: async () => {
      message.success("Data Berhasil disimpan");
      refetch();
      await queryClient.invalidateQueries("resume");
    },
    onError: (e) => {
      message.error(`Simpan error ${e}`);
    },
    onSettled: async () => {},
  });

  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 18 },
  };

  const tailLayout = {
    wrapperCol: { offset: 4, span: 18 },
  };

  const handleFinish = async (fieldValue) => {
    const values = {
      ...fieldValue,
    };

    await updateMutation.mutateAsync(values);
  };

  const FormProfile = () => {
    return (
      <>
        <Alert
          message="Perhatian"
          description="Periksa kembali data yang akan dikirim dengan seksama."
          showIcon
          type="warning"
        />
        <Divider />
        <Form
          validateMessages={validateMessages}
          labelWrap
          initialValues={initialValues}
          {...layout}
          scrollToFirstError
          onFinish={handleFinish}
          form={form}
          name="create-profile"
        >
          <Form.Item
            name="nama_gelar"
            label="Nama dan Gelar"
            extra="Contoh Iput Taufiqurrohman Suwarto, S.Kom."
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            rules={[{ required: true }]}
            extra="NIP tanpa spasi"
            name="nip"
            label="NIP"
          >
            <Input />
          </Form.Item>
          <Form.Item
            rules={[{ required: true }]}
            name="tempat_lahir"
            label="Tempat Lahir"
          >
            <Input />
          </Form.Item>
          <Form.Item
            rules={[{ required: true }]}
            name="tanggal_lahir"
            label="Tanggal Lahir"
          >
            <DatePicker format={"DD-MM-YYYY"} />
          </Form.Item>
          <Form.Item
            rules={[
              { required: true },
              { type: "email", message: "Format email harus sesuai" },
            ]}
            name="alamat_email"
            label="Email"
          >
            <Input />
          </Form.Item>
          <Form.Item
            rules={[{ required: true }]}
            name="no_hp"
            label="No. Handphone"
          >
            <Input />
          </Form.Item>
          <Form.Item
            rules={[{ required: true }]}
            name="pendidikan_terakhir"
            label="Pendidikan Terakhir"
          >
            <Select allowClear showSearch>
              {pendidikans.map((d) => (
                <Select.Option key={d} value={d}>
                  {d}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            rules={[{ required: true }]}
            name="tahun_lulus"
            label="Tahun Lulus"
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            rules={[{ required: true }]}
            name="gol_pangkat"
            label="Gol/Pangkat"
          >
            <Select showSearch allowClear>
              {golongan?.map((e) => {
                return (
                  <Select.Option key={e?.value} value={e?.value}>
                    {e.title}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            rules={[{ required: true }]}
            name="tmt_pangkat"
            label="TMT Pangkat"
          >
            <DatePicker format={"DD-MM-YYYY"} />
          </Form.Item>
          <Form.Item
            rules={[{ required: true }]}
            name="jabatan_terakhir"
            label="Jabatan Terakhir"
          >
            <Input />
          </Form.Item>
          <Form.Item
            rules={[{ required: true }]}
            name="eselon_terakhir"
            label="Eselon Terakhir"
          >
            <Select allowClear showSearch>
              {eselons?.map((e) => (
                <Select.Option key={e} value={e}>
                  {e}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
              },
            ]}
            name="tmt_jab_terakhir"
            label="TMT Jabatan Terakhir"
          >
            <DatePicker format={"DD-MM-YYYY"} />
          </Form.Item>
          <Form.Item
            rules={[{ required: true }]}
            name="instansi"
            label="Instansi"
          >
            <Input />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
              },
            ]}
            name="tmt_pengangkatan_pertama"
            extra="TMT Pengangkatan Pertama dalam JPTP"
            label="TMT Pengangkatan Pertama"
          >
            <DatePicker format={"DD-MM-YYYY"} />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Space>
              <Button
                type="primary"
                htmlType="submit"
                loading={updateMutation.isLoading}
              >
                Simpan
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </>
    );
  };

  const syaratNext = () => {
    return current < steps.length - 1;
  };

  const disabledButton = () => {
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

    const { documents, ...last } = initialValues;

    const data = documentProperties.map((d) => ({ current: documents[d] }));
    const isDocumentCompleted = data?.every((d) => !!d?.current?.length);

    const secondData = profileProperties.map((p) => ({ current: last[p] }));
    const isProfileCompleted = secondData?.every((e) => !!e?.current);

    if (current === 0 && isProfileCompleted) {
      return false;
    } else if (current === 1 && isDocumentCompleted) {
      return false;
    } else {
      return true;
    }
  };

  const submitMutation = useMutation(() => services.submitResume(), {
    onSettled: async () => {
      await queryClient.invalidateQueries("resume");
    },
    onSuccess: () => {
      message.success("Form berhasil di submit");
      router.push("/dashboard");
    },
    onError: (e) => {
      message.error("Gagal melakukan submit form", e);
    },
  });

  const handleSubmitResume = async () => {
    await submitMutation.mutateAsync();
  };

  const steps = [
    { title: "Lengkapi Profile", render: <FormProfile /> },
    {
      title: "Lengkapi Dokumen",
      render: (
        <>
          <Alert
            message="Perhatian harap diperhatikan dengan seksama"
            description="Dokumen yang diupload merupakan dokumen asli yang discan. Dapat terbaca dan terlihat dengan jelas. Dokumen bertipe file pdf/png/jpeg dengan ukuran maksimal 2MB. Teliti kembali dokumen yang sudah diupload"
            showIcon
            type="warning"
          />
          <Divider />
          <Row>
            <Col span={12}>
              <File
                description="Dokumen surat lamaran"
                documents={initialValues?.documents}
                queryClient={queryClient}
              />
              <File
                description="Dokumen Daftar Riwayat Hidup"
                title="Daftar Riwayat Hidup"
                property="drh"
                documents={initialValues?.documents}
                queryClient={queryClient}
              />
              <File
                description="Kartu Tanda Penduduk"
                title="Kartu Tanda Penduduk"
                property="ktp"
                documents={initialValues?.documents}
                queryClient={queryClient}
              />
              <File
                description="Pas foto berwarna terbaru ukuran 4x6"
                title="Foto"
                property="foto"
                documents={initialValues?.documents}
                queryClient={queryClient}
              />
              <File
                description="SK Pangkat Terakhir"
                title="SK Pangkat"
                property="sk_pangkat"
                documents={initialValues?.documents}
                queryClient={queryClient}
              />
              <File
                description="SK Pengangkatan dalam Jabatan Terakhir"
                title="SK Pengangkatan jabatan terakhir"
                property="sk_pengangkatan_jabatan_terakhir"
                documents={initialValues?.documents}
                queryClient={queryClient}
              />
              <File
                description="SK Pengangkatan Pertama Kali dalam Jabatan Pimpinan Tinggi Pratama (Eselon II.a), dikecualikan bagi pelamar yang berasal dari Jabatan Fungsional"
                title="SK Pengangkatan Pertama Kali"
                property="sk_pengangkatan_pertama_kali"
                documents={initialValues?.documents}
                queryClient={queryClient}
              />
              <File
                description="Ijazah Diploma (DIV)/Sarjana (S-1) dan Ijazah (S-2/S-3 jika ada)"
                title="Ijazah"
                property="ijazah"
                documents={initialValues?.documents}
                queryClient={queryClient}
              />
            </Col>
            <Col span={12}>
              <File
                description="STTP Pendidikan dan Pelatihan Kepemimpinan"
                title="STTP/Diklatpim 1"
                property="sttp"
                documents={initialValues?.documents}
                queryClient={queryClient}
              />
              <File
                description="Penilaian Prestasi Kerja 2 (dua) tahun terakhir (tahun 2020 dan 2021)"
                title="SKP"
                property="skp"
                documents={initialValues?.documents}
                queryClient={queryClient}
              />
              <File
                description="Bukti penyerahan LHKPN Tahun 2021"
                title="LHKPN"
                property="lhkpn"
                documents={initialValues?.documents}
                queryClient={queryClient}
              />

              <File
                description="Bukti penyerahan SPT Tahun 2021"
                title="SPT"
                property="spt"
                documents={initialValues?.documents}
                queryClient={queryClient}
              />
              <File
                description="Surat Persetujuan/Rekomendasi dari Pejabat Pembina Kepegawaian (PPK)"
                title="Surat Rekomendasi"
                property="surat_rekomendasi"
                documents={initialValues?.documents}
                queryClient={queryClient}
              />
              <File
                description="Surat Pernyataan tidak sedang dalam proses peradilan pidana"
                title="Surat Pernyataan Tidak Pidana"
                property="surat_pernyataan_tidak_pidana"
                documents={initialValues?.documents}
                queryClient={queryClient}
              />
              <File
                description="Surat Pernyataan tidak pernah dijatuhi hukuman disiplin sesuai dengan ketentuan peraturan perundang-undangan yang berlaku"
                title="Surat Pernyataan tidak dijatuhi hukdis"
                property="surat_pernyataan_tidak_dijatuhi_hukdis"
                documents={initialValues?.documents}
                queryClient={queryClient}
              />
              <File
                description="Surat pernyataan Pakta Integritas "
                title="Surat Pakta Integritas"
                property="surat_keterangan_pakta_integritas"
                documents={initialValues?.documents}
                queryClient={queryClient}
              />
              <File
                description="Surat Keterangan Sehat Jasmani dan Rohani dari Rumah Sakit Pemerintah"
                title="Surat Keterangan Jasmani dan Rohani"
                property="surat_keterangan_jasmani_rohani"
                documents={initialValues?.documents}
                queryClient={queryClient}
              />
              <File
                description="Surat Keterangan Bebas NAPZA dari Rumah Sakit Pemerintah"
                title="Surat Keterangan Bebas Napza"
                property="surat_keterangan_bebas_napza"
                documents={initialValues?.documents}
                queryClient={queryClient}
              />
            </Col>
          </Row>
        </>
      ),
    },
    {
      title: "Kirim Dokumen",
      render: (
        <div>
          <Result
            status="warning"
            title="Formulir Pendaftaran Lengkap"
            subTitle="Anda telah melengkapi semua berkas yang diperlukan untuk melakukan pendaftaran. Jika anda merasa yakin anda bisa melakukan submit. File yang telah disubmit tidak dapat diupload kembali"
            extra={[
              <Button
                loading={submitMutation.isLoading}
                type="primary"
                size="large"
                onClick={handleSubmitResume}
              >
                Submit Form
              </Button>,
            ]}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <Steps size="small" current={current}>
        {steps?.map((step) => (
          <Steps.Step key={step?.title} title={step?.title} />
        ))}
      </Steps>
      <Divider />
      {steps[current]?.render}
      <div>
        {syaratNext() && (
          <Button
            type="primary"
            disabled={disabledButton()}
            onClick={() => next()}
          >
            Selanjutnya
          </Button>
        )}

        {current > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
            Sebelumnya
          </Button>
        )}
      </div>
    </>
  );
};

const File = ({
  title = "Surat Lamaran",
  property = "surat_lamaran",
  documents,
  queryClient,
  description,
}) => {
  const [fileList, setFileList] = useState(documents?.[property]);

  const updateFileMutation = useMutation((data) => services.updateFile(data), {
    onSettled: async () => {
      await queryClient.invalidateQueries("resume");
    },
    onSuccess: (result) => {
      const { data } = result;
      setFileList(data?.data);
      message.success(`Data ${title} berhasil diupdate`);
    },
    onError: (e) => {
      message.error(`Penyimpanan gagal ${e}`);
    },
  });

  const props = {
    maxCount: 1,
    fileList,
    accept: ".pdf,.png,.jpg",
    customRequest: async (options) => {
      const { file, onSuccess, onError, onProgress } = options;
      const formData = new FormData();
      formData.append("file", file);
      formData.append("property", property);
      try {
        await updateFileMutation.mutateAsync(formData);
        onSuccess("Ok");
      } catch (error) {
        console.log(error);
        onError({ error });
      }
    },
    beforeUpload: function (file) {
      const isJpgOrPngorPDF =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "application/pdf";
      if (!isJpgOrPngorPDF) {
        message.error("You can only upload JPG/PNG/PDF file!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error("file must smaller than 2MB!");
      }
      return isJpgOrPngorPDF && isLt2M;
    },
    showUploadList: {
      showRemoveIcon: false,
    },
  };

  return (
    <div style={{ marginBottom: 8 }}>
      <Upload {...props}>
        <Tooltip title={description}>
          <Space>
            <Button
              danger={!fileList?.length}
              type="primary"
              loading={updateFileMutation.isLoading}
              icon={<UploadOutlined />}
            >
              {title}
            </Button>
            {!fileList?.length ? (
              <ExclamationCircleTwoTone twoToneColor="#cf1322" />
            ) : (
              <CheckCircleTwoTone twoToneColor="#52c41a" />
            )}
          </Space>
        </Tooltip>
      </Upload>
    </div>
  );
};

const Resume = () => {
  const { data, isLoading, refetch } = useQuery(["resume"], () =>
    services.getResume()
  );
  const queryClient = new QueryClient();

  const createMutation = useMutation(() => services.createResume(), {
    onSettled: async () => {
      await queryClient.invalidateQueries("resume");
      refetch();
    },
  });

  const handleSubmit = async () => {
    await createMutation.mutateAsync();
  };

  return (
    <Layout title="Formulir Pendaftaran">
      <Skeleton active loading={isLoading}>
        <Card>
          {data ? (
            data?.is_submit ? (
              <Result
                status="success"
                title="Form Pendaftaran anda berhasil di submit"
                subTitle="Silahkan menunggu pengumuman selanjutnya di bkd.jatimprov.go.id"
              />
            ) : (
              <FormProfile
                refetch={refetch}
                initialValues={{
                  ...data,
                  tanggal_lahir: data?.tanggal_lahir
                    ? moment(data?.tanggal_lahir)
                    : "",
                  tmt_pangkat: data?.tmt_pangkat
                    ? moment(data?.tmt_pangkat)
                    : "",
                  tmt_jab_terakhir: data?.tmt_jab_terakhir
                    ? moment(data?.tmt_jab_terakhir)
                    : "",
                  tmt_pengangkatan_pertama: data?.tmt_pengangkatan_pertama
                    ? moment(data?.tmt_pengangkatan_pertama)
                    : "",
                }}
                queryClient={queryClient}
              />
            )
          ) : (
            <NoData
              onSubmit={handleSubmit}
              loading={createMutation.isLoading}
            />
          )}
        </Card>
      </Skeleton>
    </Layout>
  );
};

Resume.auth = true;

export default Resume;

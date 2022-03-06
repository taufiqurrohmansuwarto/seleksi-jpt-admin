import { Alert, Button, Card, Divider } from "antd";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import services from "../services";
import Layout from "../src/components/Layout";

const ResumeTerkirim = () => {
  return (
    <>
      <Divider />
      <Alert
        message="Pendaftaran Berhasil"
        description="Selamat anda berhasil mengirimkan form seleksi JPT Madya Pemerintah
      Provinsi Jawa Timur, Silahkan menunggu pengumuman selanjutnya dib
      bkd.jatimprov.go.id"
        type="success"
        showIcon
      />
    </>
  );
};

const ResumeTakTerkirim = () => {
  const router = useRouter();
  return (
    <>
      <div>Silahkan klik tombol di bawah ini untuk melakukan pendaftaran</div>
      <Button type="primary" onClick={() => router.push("/resume")}>
        Daftar
      </Button>
    </>
  );
};

const Dashboard = () => {
  const { data } = useSession();
  const { data: dataResume, isLoading } = useQuery(["resume"], () =>
    services.getResume()
  );

  return (
    <Layout title="Dashboard">
      <Card loading={isLoading}>
        <div>
          Halo, {data?.user?.name}, Berikut adalah portal untuk melakukan
          pendaftaran seleksi JPT Madya di Pemerintah Provinsi Jawa Timur.
        </div>
        {dataResume && dataResume?.is_submit ? (
          <ResumeTerkirim />
        ) : (
          <ResumeTakTerkirim />
        )}
      </Card>
    </Layout>
  );
};

Dashboard.auth = true;

export default Dashboard;

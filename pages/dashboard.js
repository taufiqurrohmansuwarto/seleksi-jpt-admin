import {
  UserAddOutlined,
  UserDeleteOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Card, Col, Divider, message, Row, Statistic } from "antd";
import FileSaver from "file-saver";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useQuery } from "react-query";
import services from "../services";
import Layout from "../src/components/Layout";

const Dashboard = () => {
  const { data } = useQuery(["dashboard"], () => services.getDashboard());
  const { data: user } = useSession();
  const [loading, setLoading] = useState(false);

  const handleReport = async () => {
    try {
      setLoading(true);
      const result = await services.report();
      await FileSaver.saveAs(result?.data, "report.xls");
    } catch (error) {
      message.error("Error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Dashboard">
      <Card>
        Selamat datang, {user?.user?.name}. Berikut adalah data yang ada pada
        seleksi JPT Madya Pemerintah Provinsi Jawa Timur
        <Divider />
        <Row gutter={16}>
          <Col span={5}>
            <Card>
              <Statistic
                title="Total Peserta Submit"
                value={`${data?.totalParticipantsSubmit} orang`}
                prefix={<UserAddOutlined />}
              />
            </Card>
          </Col>
          <Col span={5}>
            <Card>
              <Statistic
                title="Total Peserta belum Submit"
                value={`${data?.totalParticipantsNotSubmit} orang`}
                prefix={<UserDeleteOutlined />}
              />
            </Card>
          </Col>
          <Col span={5}>
            <Card>
              <Statistic
                title="Total Peserta"
                value={`${data?.totalParticipants} orang`}
                prefix={<UserOutlined />}
              />
            </Card>
          </Col>
          <Col span={5}>
            <Card>
              <Statistic
                title="Total Peserta Lolos"
                value={`${data?.totalQualified} orang`}
                prefix={<UserAddOutlined />}
              />
            </Card>
          </Col>
          <Col span={4}>
            <Card>
              <Statistic
                title="Total Peserta Tidak Lolos"
                value={`${data?.totalNotQualified} orang`}
                prefix={<UserDeleteOutlined />}
              />
            </Card>
          </Col>
        </Row>
        <Divider />
        <Button type="primary" onClick={handleReport}>
          Download Data
        </Button>
      </Card>
    </Layout>
  );
};

Dashboard.auth = true;

export default Dashboard;

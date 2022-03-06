import { Table } from "antd";
import { useQuery } from "react-query";
import services from "../../services";
import Layout from "../../src/components/Layout";

const Participants = () => {
  const { data } = useQuery(["participants"], () =>
    services.listParticipants()
  );

  const columns = [
    { title: "Nama dan Gelar", dataIndex: "nama_gelar" },
    { title: "Instansi", dataIndex: "instansi" },
    { title: "Sudah Submit", dataIndex: "is_submit" },
    { title: "Lolos?", dataIndex: "is_qualified" },
    { title: "Aksi", dataIndex: "aksi", key: "aksi" },
  ];

  return (
    <Layout title="Data Pelamar">
      <div>{JSON.stringify(data)}</div>;
      <Table
        dataSource={data?.data}
        rowKey={(row) => row?.user_id}
        columns={columns}
      />
    </Layout>
  );
};

Participants.auth = true;

export default Participants;

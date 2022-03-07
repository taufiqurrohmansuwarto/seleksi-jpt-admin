import { ConfigProvider, Button } from "antd";
import { useQuery } from "react-query";
import services from "../../services";
import Layout from "../../src/components/Layout";
import ProTable from "../../src/components/ProTable";
import id from "antd/lib/locale/az_AZ";
import { useState } from "react";
import { useRouter } from "next/router";

const Participants = () => {
  const [myQuery, setQuery] = useState({
    limit: 10,
    offset: 0,
  });

  const { data } = useQuery(
    ["participants", myQuery],
    () => services.listParticipants(myQuery),
    {
      enabled: Boolean(myQuery),
    }
  );

  const router = useRouter();

  const gotoDetail = (participantId) => {
    router.push(`/participants/${participantId}/detail`);
  };

  const columns = [
    { title: "Nama dan Gelar", dataIndex: "nama_gelar", hideInSearch: true },
    { title: "Email", dataIndex: "alamat_email" },
    { title: "Instansi", dataIndex: "instansi", hideInSearch: true },
    {
      title: "Submit?",
      dataIndex: "is_submit",
      render: (_, row) => {
        return <div>{row?.is_submit ? "Sudah" : "Belum"}</div>;
      },
      valueType: "select",
      valueEnum: {
        true: { text: "Sudah", status: true },
        false: { text: "Belum", status: false },
      },
    },
    {
      title: "Lolos?",
      dataIndex: "is_qualified",
      valueType: "select",
      render: (_, row) => {
        return <div>{row?.is_qualified ? "Lolos" : "Tidak Lolos"}</div>;
      },
      valueEnum: {
        true: { text: "Tidak Lolos", status: false },
        false: { text: "Lolos", status: true },
      },
    },
    {
      title: "Aksi",
      dataIndex: "aksi",
      hideInSearch: true,
      render: (_, row) => {
        return (
          <Button
            onClick={() => gotoDetail(row?.user_id)}
            disabled={!row?.is_submit}
          >
            Detail
          </Button>
        );
      },
    },
  ];

  return (
    <Layout title="Data Pelamar">
      <ConfigProvider locale={id}>
        <ProTable
          request={async (params = {}) => {
            console.log(myQuery);
            const query = {
              ...myQuery,
              ...params,
              limit: params?.pageSize,
              offset: params?.current * params?.pageSize - params?.pageSize,
            };
            setQuery(query);
          }}
          onReset={() => setQuery({ limit: 10, offset: 0 })}
          rowKey="user_id"
          columns={columns}
          dataSource={data?.data}
          search={{
            searchText: "Find",
            resetText: "Reset",
          }}
          pagination={{
            total: data?.meta?.total,
            showTotal: (total) => <div>Total {total} items</div>,
            defaultPageSize: 10,
            showSizeChanger: false,
          }}
        />
      </ConfigProvider>
    </Layout>
  );
};

Participants.auth = true;

export default Participants;

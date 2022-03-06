import { FilePdfOutlined } from "@ant-design/icons";
import {
  Alert,
  Button,
  Descriptions,
  Divider,
  Input,
  message,
  Switch,
  Table,
  Typography,
} from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import services from "../../../services";

const Documents = ({ data, participantId, queryClient }) => {
  const correctionMutation = useMutation((data) => services.correction(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(["participant", participantId]);
      message.success("Update sukses");
    },
    onError: (e) => {
      message.error("error");
    },
  });

  const handleChange = (row, value) => {
    const data = {
      participantId,
      data: {
        property: `${row?.key}_is_verified`,
        value,
      },
    };
    correctionMutation.mutate(data);
  };

  const columns = [
    {
      title: "File",
      key: "value",
      width: 20,
      render: (_, row) => {
        return (
          <div>
            <a target="_blank" href={row?.value}>
              <FilePdfOutlined />
            </a>
          </div>
        );
      },
    },
    { title: "Deskripsi", dataIndex: "description" },

    {
      title: "Valid?",
      key: "is_verified",
      render: (_, row) => {
        return (
          <div>
            <Switch
              defaultChecked={row?.is_verified}
              onChange={(e) => {
                handleChange(row, e);
              }}
            />
          </div>
        );
      },
    },
  ];

  const [keterangan, setKeterangan] = useState(data?.keterangan);

  return (
    <>
      <Alert
        type="info"
        message="Perhatian"
        showIcon
        description="Untuk memverifikasi dokumen, geser switch di kolom valid. Pelamar otomatis menjadi lolos apabila semuanya valid dan apabila salah satu dokumen tidak valid pelamar tidak lolos. Isi Keterangan pada bawah halaman apabila pelamar tidak lolos"
      />
      <Table
        title={() => <Typography.Title level={4}>Dokumen</Typography.Title>}
        rowKey={(row) => row?.key}
        size="small"
        pagination={false}
        columns={columns}
        dataSource={data?.columns}
      />
      {!data?.is_qualified && (
        <>
          <Divider />
          <Input.TextArea
            value={keterangan}
            onChange={(e) => setKeterangan(e?.target?.value)}
            placeholder="Keterangan tidak lolos"
          />
          <div style={{ marginTop: 10 }}>
            <Button
              type="primary"
              onClick={() => {
                const data = {
                  participantId,
                  data: { property: "keterangan", value: keterangan },
                };
                correctionMutation.mutate(data);
              }}
            >
              Simpan
            </Button>
          </div>
        </>
      )}
    </>
  );
};

const Profile = ({ data }) => {
  const { documents, ...profile } = data;
  return (
    <div>
      <Descriptions title="Info Pelamar">
        <Descriptions.Item label="Nama dan Gelar">
          {profile?.nama_gelar}
        </Descriptions.Item>
        <Descriptions.Item label="NIP">{profile?.nip}</Descriptions.Item>
        <Descriptions.Item label="Tempat Lahir">
          {profile?.tempat_lahir}
        </Descriptions.Item>
        <Descriptions.Item label="Tanggal Lahir">
          {moment(profile?.tanggal_lahir).format("DD-MM-YYYY")}
        </Descriptions.Item>
        <Descriptions.Item label="Email">
          {profile?.alamat_email}
        </Descriptions.Item>
        <Descriptions.Item label="No. Handphone">
          {profile?.no_hp}
        </Descriptions.Item>
        <Descriptions.Item label="Pendidikan Terakhir">
          {profile?.pendidikan_terakhir}
        </Descriptions.Item>
        <Descriptions.Item label="Tahun Lulus">
          {profile?.tahun_lulus}
        </Descriptions.Item>
        <Descriptions.Item label="Golongan/Pangkat">
          {profile?.gol_pangkat}
        </Descriptions.Item>
        <Descriptions.Item label="TMT Pangkat">
          {moment(profile?.tmt_pangkat).format("DD-MM-YYYY")}
        </Descriptions.Item>
        <Descriptions.Item label="Jabatan Terakhir">
          {profile?.jabatan_terakhir}
        </Descriptions.Item>
        <Descriptions.Item label="Eselon Terakhir">
          {profile?.eselon_terakhir}
        </Descriptions.Item>
        <Descriptions.Item label="TMT Jabatan Terakhir">
          {moment(profile?.tmt_jab_terakhir).format("DD-MM-YYYY")}
        </Descriptions.Item>
        <Descriptions.Item label="Instansi">
          {profile?.instansi}
        </Descriptions.Item>
        <Descriptions.Item label="TMT Pengangkatan Pertama">
          {moment(profile?.tmt_pengangkatan_pertama).format("DD-MM-YYYY")}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

const ParticipantDetail = () => {
  const router = useRouter();
  const {
    query: { participantId },
  } = router;

  const { data, isLoading, isError } = useQuery(
    ["participant", participantId],
    () => services.getParticipant(participantId)
  );

  const queryClient = useQueryClient();

  if (isLoading) {
    return <div>loading..</div>;
  }

  if (isError) {
    return <div>hello</div>;
  }

  return (
    <div>
      {data && (
        <>
          <Profile data={data} />
          <Divider />
          <Documents
            data={data}
            participantId={participantId}
            queryClient={queryClient}
          />
        </>
      )}
    </div>
  );
};

ParticipantDetail.auth = true;

export default ParticipantDetail;

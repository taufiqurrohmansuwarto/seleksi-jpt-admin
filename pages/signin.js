import { Button, Col, Row, Space, Typography } from "antd";
import { getProviders, signIn } from "next-auth/react";

export default function SignIn({ providers }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minWidth: "100vh",
        minHeight: "100vh",
        paddingTop: "6rem",
      }}
    >
      <Row align="middle">
        <img src="gambar.png" alt="" />
        <Col>
          <Typography.Title level={3} strong>
            Seleksi JPT Madya Pemerintah Provinsi Jawa Timur
          </Typography.Title>
          <Space direction="vertical">
            {Object?.values(providers).map((provider) => (
              <div key={provider.name}>
                <Button
                  //   shape="round"
                  type="primary"
                  onClick={() => signIn(provider.id)}
                >
                  Sign In with {provider.name}
                </Button>
              </div>
            ))}
          </Space>
          <div style={{ marginTop: 10 }}>
            <p>
              This code available on{" "}
              <a
                href="https://github.com/taufiqurrohmansuwarto/seleksi-jpt"
                target="_blank"
              >
                github
              </a>
            </p>
            <p>
              Version <a>0.0.1-a.1</a>
            </p>
            <Space>
              <img src="logobkd.jpg" alt="" style={{ width: 50 }} />
              <img src="pemprov.png" alt="" style={{ width: 20 }} />
            </Space>
            <div>
              <Typography.Text strong>
                @Copyright BKD Provinsi Jawa Timur 2022
              </Typography.Text>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}

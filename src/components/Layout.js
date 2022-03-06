import { LogoutOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Menu, Space } from "antd";
import { signOut, useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import mainRoutes from "../routes/main-routes";

const ProLayout = dynamic(() => import("@ant-design/pro-layout"), {
  ssr: false,
});

const PageContainer = dynamic(
  () => import("@ant-design/pro-layout").then((m) => m?.PageContainer),
  { ssr: false }
);

const handleSignout = () => {
  signOut();
};

const menu = () => (
  <Menu>
    <Menu.Item key="logut" onClick={handleSignout} icon={<LogoutOutlined />}>
      Logout
    </Menu.Item>
  </Menu>
);

// create menu dashboard, documents, contacts

const menuItemRender = (options, element) => {
  return (
    <Link href={`${options.path}`}>
      <a>{element}</a>
    </Link>
  );
};

function Layout({ children, title = "SELEKSI JPT" }) {
  const { data, status } = useSession();
  const router = useRouter();

  const active = `/${router?.asPath?.split("/")?.[1]}`;

  return (
    <ProLayout
      route={mainRoutes}
      collapsed
      navTheme="dark"
      style={{ minHeight: "100vh" }}
      // menuHeaderRender={() => <ButtonCreate />}
      menuItemRender={menuItemRender}
      // menuExtraRender={() => <ButtonCreate />}
      selectedKeys={[active]}
      rightContentRender={() => {
        return (
          <Space align="center">
            <span>{data?.user?.name}</span>
            <Dropdown overlay={menu(router)}>
              <Avatar style={{ cursor: "pointer" }} src={data?.user?.image} />
            </Dropdown>
          </Space>
        );
      }}
      title={title}
      theme="dark"
      disableContentMargin
      fixSiderbar
      loading={status === "loading"}
      collapsedButtonRender={false}
    >
      <PageContainer>{children}</PageContainer>
    </ProLayout>
  );
}

export default Layout;

import "@ant-design/pro-layout/dist/layout.css";
import { ConfigProvider, Spin } from "antd";
import "antd/dist/antd.css";
import id from "antd/lib/locale/id_ID";
import moment from "moment";
import "moment/locale/id";
import { SessionProvider, signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
moment.locale("id");

const validateMessages = {
  required: "'${name}' tidak boleh kosong!",
};

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <SessionProvider
      session={pageProps?.session}
      basePath="/seleksi-jpt-admin/api/auth"
      baseUrl="/seleksi-jpt-admin"
      refetchInterval={0}
    >
      <ConfigProvider form={{ validateMessages }} locale={id}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps?.dehydratedState}>
            {Component.auth ? (
              <Auth>
                <Component {...pageProps} />;
              </Auth>
            ) : (
              <Component {...pageProps} />
            )}
          </Hydrate>
        </QueryClientProvider>
      </ConfigProvider>
    </SessionProvider>
  );
}

function Auth({ children, roles }) {
  const { data, status } = useSession({
    required: true,
    onUnauthenticated: () => signIn(),
  });

  if (status === "loading") {
    return <Spin />;
  }

  if (data?.user) {
    return children;
  } else {
    return <div>error</div>;
  }
}

export default MyApp;

import { Outlet } from "react-router-dom";
import Header from "./components/layout/header";
import axios from "./util/axios.customize";
import { useContext, useEffect } from "react";
import { AuthContext } from "./components/context/auth.context";
import { Spin } from "antd";

function App() {
  const { setAuth, appLoading, setAppLoading } = useContext(AuthContext);

  useEffect(() => {
    const fetchAccount = async () => {
      setAppLoading(true);
      const res = await axios.get("/v1/api/user");
      if (res && !res.message) {
        setAuth({
          isAuthenticated: true,
          user: {
            email: res.email,
            name: res.name,
          },
        });
      }
      setAppLoading(false);
    };

    fetchAccount();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-yellow-50 to-yellow-100">
      {appLoading === true ? (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <Spin size="large" />
        </div>
      ) : (
        <>
          <Header />
          <main className="pt-4 pb-10 px-2">
            <Outlet />
          </main>
        </>
      )}
    </div>
  );
}

export default App;

import { CrownOutlined } from "@ant-design/icons";
import { Result } from "antd";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] py-8 px-2">
      <Result
        icon={<CrownOutlined className="text-4xl text-yellow-500" />}
        title={
          <span className="text-2xl font-bold text-indigo-700">
            JSON Web Token (React/Node.JS) - iotstar.vn
          </span>
        }
        className="bg-white/90 rounded-xl shadow p-6 w-full max-w-xl"
      />
    </div>
  );
};

export default HomePage;

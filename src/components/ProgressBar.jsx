import { Steps, ConfigProvider } from "antd";

const items = [
  {
    title: "Information",
  },
  {
    title: "Betaling",
  },
  {
    title: "Overblik",
  },
];

const ProgressBar = ({ step }) => (
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: "#EC5564",
        colorText: "#000000",
      },
    }}
  >
    <div className="py-3 bg-gray-200 ">
      <div className="md:mx-52">
        <Steps
          current={step - 2}
          size="small"
          labelPlacement="vertical"
          responsive={false}
          items={items}
        />
      </div>
    </div>
  </ConfigProvider>
);
export default ProgressBar;

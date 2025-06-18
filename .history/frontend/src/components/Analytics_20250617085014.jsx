import DoughnutChart from "./chart/Doughnut";

const Analytics = () => {
  const roles = ["Admin", "Doctor", "User"];
  const data = [1, 10, 50];

  const ChartBlock = ({ title }) => (
    <div className="flex flex-col items-center justify-center w-1/2 h-full">
      <h1 className="px-[15px] py-3 text-lg font-semibold">{title}</h1>
      <DoughnutChart labels={roles} data={data} />
    </div>
  );

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="flex flex-row flex-1">
        <ChartBlock title="Users Associated With Medigo" />
        <ChartBlock title="Users Associated With Medigo" />
      </div>
      <div className="flex flex-row flex-1">
        <ChartBlock title="Users Associated With Medigo" />
        <ChartBlock title="Users Associated With Medigo" />
      </div>
    </div>
  );
};

export default Analytics;

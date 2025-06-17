import DoughnutChart from "./chart/Doughnut";

const Analytics = () => {
  const roles = ["Admin", "Doctor", "Patient"];
  const data = [1, 10, 50];

  const ChartBlock = ({ title }) => (
    <div className=" flex flex-col flex-2 items-center justify-center w-[28vw] h-full">
      <h1 className="py-3 text-lg font-semibold">{title}</h1>
      <DoughnutChart labels={roles} data={data} />
    </div>
  );

  return (
    <div className="w-[90] h-full flex flex-col">
      <div className="flex">
        <ChartBlock title="Users Associated With Medigo"  />
        <ChartBlock title="Users Associated With Medigo" />
      </div>
      <div className="flex flex-row flex-1 py-10">
        <ChartBlock title="Users Associated With Medigo" />
        <ChartBlock title="Users Associated With Medigo" />
      </div>
    </div>
  );
};

export default Analytics;

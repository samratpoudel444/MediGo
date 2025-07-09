import DoughnutChart from "./chart/Doughnut";

const Analytics = () => {
  const roles = ["Admin", "Doctor", "Patient"];
  const data = [1, 10, 50];

  const ChartBlock = ({ title }) => (
    <div className=" flex flex-col flex-2 items-center justify-center w-[35vw] h-[42vh] mt-8">
      <h1 className="py-3 text-lg font-semibold">{title}</h1>
      <DoughnutChart labels={roles} data={data} />
    </div>
  );

  return (
    <div className="w-[80vw] grid grid-col">
      <div className="flex items-start justify-center">
        <ChartBlock title="Users Associated With Medigo" />
      </div>
    
    </div>
  );
};

export default Analytics;

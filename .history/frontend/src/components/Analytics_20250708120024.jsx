import { useQuery } from "@tanstack/react-query";
import DoughnutChart from "./chart/Doughnut";
import axiosInstance from "./utils/AxiosInstance";


const getData= async()=>
{
  try{
    const response = axiosInstance.get("/api/v1/userCount");
    return response.data;
  }
  catch(err)
  {
    console.log(err);
    return err.response;
  }

  const {data}= useQuery({
    queryKey
  })
}
const Analytics = () => {
  const ChartBlock = ({ title }) => (
    <div className=" flex flex-col flex-2 items-center justify-center w-[35vw] h-[42vh] mt-8">
      <h1 className="py-3 text-lg font-semibold">{title}</h1>
      <DoughnutChart labels={roles} data={data} />
    </div>
  );

  return (
    <div className="w-[80vw] grid grid-col">
      <div className="items-start">
        <ChartBlock title="Users Associated With Medigo" />
      </div>
    
    </div>
  );
};

export default Analytics;

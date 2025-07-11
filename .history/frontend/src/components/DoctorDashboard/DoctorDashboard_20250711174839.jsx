import Chart from "./chart";



const Dashboard= ()=>
{
    return (
      <div className="grid grid-cols-2 justify-center items-start  gap-10">
        <div className="flex-1 min-h-[400px] lg:min-h-full">
          <Chart 
          title:{}/>
        </div>
      </div>
    );   
}

export default Dashboard;
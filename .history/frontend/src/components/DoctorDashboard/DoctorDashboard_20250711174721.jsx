import Chart from "./chart";



const Dashboard= ()=>
{
    return (
      <div className="grid grid-cols-2 justify-center items-start  gap-10">
        <div className="">
          <Chart />
        </div>
      </div>
    );   
}

export default Dashboard;
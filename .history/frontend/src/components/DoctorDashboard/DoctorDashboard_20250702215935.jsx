import Chart from "./chart";



const Dashboard= ()=>
{
    return (
      <div className="grid grid-cols-2 justify-center items-start border">
        <div className="">
          <Chart />
        </div>
        <div className="">
          <Chart />
        </div>
        <div className="">
          <Chart />
        </div>
      </div>
    );   
}

export default Dashboard;
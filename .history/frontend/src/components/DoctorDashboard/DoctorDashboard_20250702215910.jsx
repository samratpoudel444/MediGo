import Chart from "./chart";



const Dashboard= ()=>
{
    return (
      <div className="grid grid-row-2 justify-center ite  border">
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
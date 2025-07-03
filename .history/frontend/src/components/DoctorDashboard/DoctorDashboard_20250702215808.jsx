import Chart from "./chart";



const Dashboard= ()=>
{
    return (
      <div className="grid gridrow justify-center item-start border">
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
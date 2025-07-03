import Chart from "./chart";



const Dashboard= ()=>
{
    return (
      <div className="grid grid-2-row justify-center item-start border">
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
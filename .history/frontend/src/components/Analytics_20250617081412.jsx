import DoughnutChart from "./chart/Doughnut";





const Analytics= ()=>
{
    const roles= ["Admin", "Doctor", "User"]
    const data=[1,10,50] 
   return (
     <div>
       <div>
         <DoughnutChart labels={roles} data={data} />
       </div>
     </div>
   ); 
}


export default Analytics;
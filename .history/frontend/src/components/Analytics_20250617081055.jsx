import DoughnutChart from "./chart/Doughnut";





const Analytics= ()=>
{
    const roles= ["Admin", "Doctor", "User"]
    const data=[] 
   return (
     <>
       <DoughnutChart labels={roleLs} data={roleCounts} />
     </>
   ); 
}


export default Analytics;
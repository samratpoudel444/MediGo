import DoughnutChart from "./chart/Doughnut";





const Analytics= ()=>
{
    const roles= ["Admin", "Doctor", "User"]
    const data=[] 
   return (
     <>
       <DoughnutChart labels={roles} data={roleCounts} />
     </>
   ); 
}


export default Analytics;
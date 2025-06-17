import { Doughnut } from "react-chartjs-2"



const Analytics= ()=>
{
    const roles= ["Admin", "Doctor", "User"]
    const data=[] 
   return (
     <>
       <Doughnut labels={roleLabels} data={roleCounts} />
     </>
   ); 
}


export default Analytics;
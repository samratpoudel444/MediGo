import cron from 'node-cron'
import { FilterDoctors } from './getAppointments'
FilterDoctors

cron.schedule('* * * * *', async()=>
{

})
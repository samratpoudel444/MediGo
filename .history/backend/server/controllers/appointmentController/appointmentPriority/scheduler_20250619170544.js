import cron from 'node-cron'
import { getAppointmentAsPerDoctor } from './getAppointments'
getAppointmentAsPerDoctor

cron.schedule('* * * * *', async()=>
{

})
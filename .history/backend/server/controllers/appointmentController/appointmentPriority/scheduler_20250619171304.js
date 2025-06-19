import cron from 'node-cron'
import { FilterDoctors } from './getAppointments'


cron.schedule('* * * * *', async()=>
{
FilterDoctors();
});


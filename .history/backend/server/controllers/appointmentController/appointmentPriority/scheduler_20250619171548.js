import cron from 'node-cron'
import { FilterDoctors } from './getAppointments'


cron.schedule('* * 20 * *', async()=>
{
FilterDoctors();
});

cron.schedule('* * * * *')


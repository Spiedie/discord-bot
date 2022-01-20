import cron from 'node-cron';

import config from '../../config';
import { updateDiscordRoles, updateLeagueUsers } from '../../tasks';
import { Job } from '../types';

const updateUsersJob: Job = {
  interval: {
    testing: undefined,
    development: undefined, //'* * * * *',
    stage: '* * *',
    production: '* * *',
  },
  schedule: () => {
    const intervalMap = updateUsersJob.interval;
    const interval = intervalMap[config.environment];
    if (interval) {
      cron.schedule(interval, async () => {
        try {
          await updateLeagueUsers.execute();
          await updateDiscordRoles.execute();
        } catch (error) {
          console.error('Error executing updateUsersJob.', error);
        }
      });
    }
  },
};

export default updateUsersJob;

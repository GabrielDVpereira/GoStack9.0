import Bee from 'bee-queue';
import NewPackge from '../Jobs/NewPackage';
import redisConfig from '../../config/redis';

const jobs = [NewPackge];

class Queue {
  constructor() {
    this.queues = {};
    this.init();
  }

  init() {
    jobs.forEach(({ jobKey, jobAction }) => {
      this.queues[jobKey] = {
        bee: new Bee(jobKey, { redis: redisConfig }),
        jobAction,
      };
    });
  }

  add(jobKey, jobInfo) {
    return this.queues[jobKey].bee.createJob(jobInfo).save();
  }

  processQueue() {
    jobs.forEach((job) => {
      const { bee, jobAction } = this.queues[job.jobKey];
      bee.process(jobAction);
      bee.on('failed', this.onError);
      bee.on('succeeded', this.onSuccess);
    });
  }

  onError(job, err) {
    console.log(`Queue ${job.queue.name}: FAILED`, err);
  }

  onSuccess(successResponse) {
    console.log(`Received result for job ${successResponse.id}: ${successResponse}`);
  }
}

export default new Queue();

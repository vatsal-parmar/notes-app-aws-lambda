import { Queue } from '@serverless-stack/resources';

export function QueueStack({ stack, app }) {
  // Create a SQS Queue
  const queue = new Queue(stack, 'Queue', {
    consumer: {
      function: {
        handler: 'functions/queueConsumer.main',
        permissions: ['ses'],
      },
    },
  });

  return {
    queue,
  };
}

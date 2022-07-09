import AWS from 'aws-sdk';
var sqs = new AWS.SQS({ region: 'ap-south-1' });

export const main = async (event, context) => {
  const QUEUE_URL = process.env.QUEUE_URL;

  try {
    var params = {
      MessageBody: JSON.stringify(event.request.userAttributes),
      QueueUrl: QUEUE_URL,
    };

    // sending message to queue to send welcome email.
    sqs.sendMessage(params, function (err, data) {
      if (err) {
        console.log('error:', 'Fail Send Message' + err);
      } else {
        // console.log('data:', data.MessageId);
      }
    });
  } catch (e) {
    console.log('err in post confirmation', e.message);
  }

  context.succeed(event); // SUCCESS
};

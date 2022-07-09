import handler from '../util/handler';
import aws from 'aws-sdk';

var ses = new aws.SES({ region: 'ap-south-1' });

export const main = handler(async (event) => {
  console.log('qc ==>', event);
  try {
    const userData = JSON.parse(event.Records[0].body);
    const email = userData.email;
    console.log('userData', userData, email);

    if (email) {
      sendEmail(
        email,
        'Congratulations, you have been confirmed. Welcome to the notes app.',
        function (status) {
          return { success: true };
        }
      );
    } else {
      // Nothing to do, the user's email ID is unknown
      return { success: false };
    }
  } catch (e) {
    console.log('error while sending welcome message to user', e.message);
    return { success: false };
  }
});

function sendEmail(to, body, completedCallback) {
  var eParams = {
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Body: {
        Text: {
          Data: body,
        },
      },
      Subject: {
        Data: 'Registration completed',
      },
    },

    // Replace source_email with your SES validated email address
    Source: 'vatsalparmar33@gmail.com',
  };

  var email = ses.sendEmail(eParams, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log('===EMAIL SENT===');
    }
    completedCallback('Email sent');
  });
  console.log('EMAIL CODE END');
}

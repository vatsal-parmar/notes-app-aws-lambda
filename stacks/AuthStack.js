import * as iam from 'aws-cdk-lib/aws-iam';
import { Auth, use } from '@serverless-stack/resources';
import { StorageStack } from './StorageStack';
import { ApiStack } from './ApiStack';
import { QueueStack } from './QueueStack';

export function AuthStack({ stack, app }) {
  const { bucket } = use(StorageStack);
  const { api } = use(ApiStack);
  const { queue } = use(QueueStack);

  // Create a Cognito User Pool and Identity Pool
  const auth = new Auth(stack, 'Auth', {
    login: ['email'],
    triggers: {
      postConfirmation: {
        handler: 'functions/postConfirmation.main',
        environment: { QUEUE_URL: queue.queueUrl },
        permissions: ['sqs'],
      },
    },
  });

  auth.attachPermissionsForAuthUsers([
    // Allow access to the API
    api,
    // Policy granting access to a specific folder in the bucket
    new iam.PolicyStatement({
      actions: ['s3:*'],
      effect: iam.Effect.ALLOW,
      resources: [
        bucket.bucketArn + '/private/${cognito-identity.amazonaws.com:sub}/*',
      ],
    }),
  ]);

  // Show the auth resources in the output
  stack.addOutputs({
    Region: app.region,
    UserPoolId: auth.userPoolId,
    IdentityPoolId: auth.cognitoIdentityPoolId,
    UserPoolClientId: auth.userPoolClientId,
  });

  return {
    auth,
  };
}

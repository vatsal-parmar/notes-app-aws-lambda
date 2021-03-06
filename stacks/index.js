import { StorageStack } from './StorageStack';
import { ApiStack } from './ApiStack';
import { AuthStack } from './AuthStack';
import { FrontendStack } from './FrontendStack';
import { QueueStack } from './QueueStack';

export default function main(app) {
  app.setDefaultFunctionProps({
    runtime: 'nodejs16.x',
    srcPath: 'backend',
    bundle: {
      format: 'esm',
    },
  });
  app
    .stack(StorageStack)
    .stack(ApiStack)
    .stack(QueueStack)
    .stack(AuthStack)
    .stack(FrontendStack);
}

import * as platformUtils from './platform.util';
import * as screenUtils from './screen.util';
import * as commonUtils from '../../common/utilities/common.util';
import * as uiUtils from './ui.util';

export const appUtils = {
  ...platformUtils,
  ...screenUtils,
  ...commonUtils,
  ...uiUtils,
  // ...storageUtils, // Don't spread it
};

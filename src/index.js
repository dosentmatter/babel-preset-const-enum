import { declare } from '@babel/helper-plugin-utils';
import constEnum from 'babel-plugin-const-enum';

export default declare((api, { allExtensions = false, transform }) => {
  api.assertVersion(7);

  if (typeof allExtensions !== 'boolean') {
    throw new Error('allExtensions option must be boolean|undefined');
  }

  const plugins = [[constEnum, { transform }]];

  return {
    overrides: allExtensions
      ? [
          {
            plugins,
          },
        ]
      : [
          {
            test: /\.tsx?$/,
            plugins,
          },
        ],
  };
});

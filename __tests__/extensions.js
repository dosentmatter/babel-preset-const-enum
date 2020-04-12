import { transformAsync } from '@babel/core';
import preset from '../src';

const options = {
  presets: [preset],
};

const input = `const enum Direction { Left, Right, Down, Up };
`;

it('Transforms *.ts', async () => {
  const { code: output } = await transformAsync(input, {
    ...options,
    filename: 'file.ts',
  });
  expect(output).toMatchSnapshot();
});

it('Transforms *.tsx', async () => {
  const { code: output } = await transformAsync(input, {
    ...options,
    filename: 'file.tsx',
  });
  expect(output).toMatchSnapshot();
});

it('Transforms *.*', async () => {
  const { code: output } = await transformAsync(input, {
    filename: 'file.js',
    presets: [[preset, { allExtensions: true }]],
  });
  expect(output).toMatchSnapshot();
});

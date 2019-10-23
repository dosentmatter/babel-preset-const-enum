import { transformAsync } from '@babel/core';
import preset from '../src';

const options = {
  filename: 'file.ts',
  presets: [preset],
};

it('Transforms no initializers', async () => {
  const input = `const enum Direction { Left, Right, Down, Up };
`;

  const { code: output } = await transformAsync(input, options);
  expect(output).toMatchSnapshot();
});

it('Transforms string members', async () => {
  const input = `const enum Enum {
  A = 1,
  B = A,
  C = '',
  D = C,
  E = 1,
  F,
}
`;

  const { code: output } = await transformAsync(input, options);
  expect(output).toMatchSnapshot();
});

it('Transforms computed members', async () => {
  const input = `const enum MyEnum {
  A = 1,
  B = A,
  C,
  D = C,
  E = 1,
  F,
  G = A * E,
  H = A ** B ** C,
  I = A << 20
}
`;

  const { code: output } = await transformAsync(input, options);
  expect(output).toMatchSnapshot();
});

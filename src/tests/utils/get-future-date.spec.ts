import { expect, test } from 'vitest';
import { getFutureDate } from './get-future-date';

test('Acrescenta 1 ano na data enviada', () => {
  const year = new Date().getFullYear();

  expect(getFutureDate(`${year}-03-01`).getFullYear()).toEqual(2025);
});

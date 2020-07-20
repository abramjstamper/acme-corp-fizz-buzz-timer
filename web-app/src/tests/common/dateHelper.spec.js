import { formatSecondsIntoString, padZero } from '../../common/dateHelper';

it('formatSecondsIntoString handles empty parameters', () => {
  expect(formatSecondsIntoString()).toEqual('0:00:00');
});

it('formatSecondsIntoString parses and displays h:MM:SS correctly', () => {
  expect(formatSecondsIntoString(0)).toEqual('0:00:00');
  expect(formatSecondsIntoString(5)).toEqual('0:00:05');
  expect(formatSecondsIntoString(55)).toEqual('0:00:55');
  expect(formatSecondsIntoString(65)).toEqual('0:01:05');
  expect(formatSecondsIntoString(75)).toEqual('0:01:15');
  expect(formatSecondsIntoString(900)).toEqual('0:15:00');
  expect(formatSecondsIntoString(3601)).toEqual('1:00:01');
  expect(formatSecondsIntoString(3610)).toEqual('1:00:10');
  expect(formatSecondsIntoString(3661)).toEqual('1:01:01');
  expect(formatSecondsIntoString(6915)).toEqual('1:55:15');
});

it('padZero handles empty parameters', () => {
  expect(padZero()).toEqual('00');
});

it('padZero handles value greater than 10', () => {
  expect(padZero(10)).toEqual('10');
});

it('padZero handles value less than 10', () => {
  expect(padZero(9)).toEqual('09');
});
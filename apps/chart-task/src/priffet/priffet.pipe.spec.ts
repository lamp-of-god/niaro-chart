import { PriffetPipe } from './priffet.pipe';

describe('PriffetPipe', () => {
  it('create an instance', () => {
    const pipe = new PriffetPipe();
    expect(pipe).toBeTruthy();
  });

  it('converts text as required', () => {
    const pipe = new PriffetPipe();
    expect(pipe.transform('abcd')).toBe('aBcD');
  });
});

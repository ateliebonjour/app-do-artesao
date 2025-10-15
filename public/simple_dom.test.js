import { describe, it, expect } from 'vitest';

describe('Simple DOM test with jsdom', () => {
  it('should create a div and set its text', () => {
    const div = document.createElement('div');
    div.innerText = 'Hello, Vitest!';
    expect(div.innerText).toBe('Hello, Vitest!');
  });
});

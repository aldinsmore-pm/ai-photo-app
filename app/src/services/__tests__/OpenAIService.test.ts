// @ts-nocheck

import OpenAIService from '../OpenAIService';

describe('OpenAIService (stub)', () => {
  it('generateImage returns placeholder data', async () => {
    const result = await OpenAIService.generateImage('kodachrome-64');
    expect(result).toHaveProperty('data');
    expect(Array.isArray(result.data)).toBe(true);
    expect(result.data[0]).toHaveProperty('url');
  });

  it('editImage returns placeholder data', async () => {
    const result = await OpenAIService.editImage('file://source.png');
    expect(result.data[0].url).toContain('edit');
  });
}); 
import OpenAI from 'react-native-openai';
import { ENV } from '../env';
import { buildPrompt } from '../utils/promptBuilder';

export type GenerateImageOptions = {
  quality?: 'auto' | 'low' | 'medium' | 'high';
  size?: 'auto' | '1024x1024' | '1536x1024' | '1024x1536';
  outputFormat?: 'jpeg' | 'png' | 'webp';
  n?: number; // number of images
  inputFidelity?: 'high' | 'default';
};

export type EditImageOptions = GenerateImageOptions & {
  maskUri?: string;
  presetId?: string;
};

/**
 * OpenAIService – thin wrapper around the `react-native-openai` client.
 * For now the implementation is stubbed / mocked so that we can develop the UI layer
 * and run our CI without an actual network call or a valid API key.
 *
 * Once the image pipeline is ready, swap the stubbed sections with real API calls.
 */
class OpenAIService {
  private client: OpenAI;
  private isMock: boolean;

  constructor() {
    this.isMock = ENV.OPENAI_API_KEY === 'test' || ENV.OPENAI_API_KEY === 'mock';
    this.client = new OpenAI({ apiKey: ENV.OPENAI_API_KEY, host: 'api.openai.com' });
  }

  /**
   * Generate an image from a preset prompt.
   * Currently returns mocked placeholder data so that UI can render without backend.
   */
  async generateImage(presetId: string, options: GenerateImageOptions = {}) {
    if (this.isMock) {
      return {
        created: Date.now(),
        data: [
          {
            url: `https://placehold.co/1024x1024.png?text=${encodeURIComponent(presetId)}`,
          },
        ],
        options,
      } as const;
    }

    const prompt = buildPrompt(presetId);
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const response = await (this.client as any).images.generate({
      model: 'gpt-image-1',
      prompt,
      quality: options.quality ?? 'auto',
      size: options.size ?? 'auto',
      n: options.n ?? 1,
      output_format: options.outputFormat ?? 'jpeg',
      input_fidelity: options.inputFidelity ?? 'default',
    } as any);

    return response;
  }

  /**
   * Edit an existing image applying a mask. Stubbed for now.
   */
  async editImage(presetId: string, sourceUri: string, maskUri?: string, options: EditImageOptions = {}) {
    if (this.isMock) {
      return {
        created: Date.now(),
        data: [
          {
            url: `https://placehold.co/1024x1024.png?text=edit`,
          },
        ],
        sourceUri,
        maskUri,
        options,
      } as const;
    }

    const prompt = buildPrompt(presetId);
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const response = await (this.client as any).images.edit({
      model: 'gpt-image-1',
      image: sourceUri,
      prompt,
      mask: maskUri,
      input_fidelity: options.inputFidelity ?? 'default',
      quality: options.quality ?? 'auto',
      size: options.size ?? 'auto',
      output_format: options.outputFormat ?? 'jpeg',
    } as any);

    return response;
  }
}

export default new OpenAIService(); 
import OpenAI from 'react-native-openai';
import { ENV } from '../env';

export type GenerateImageOptions = {
  quality?: 'auto' | 'low' | 'medium' | 'high';
  size?: 'auto' | '1024x1024' | '1536x1024' | '1024x1536';
  outputFormat?: 'jpeg' | 'png' | 'webp';
  n?: number; // number of images
  inputFidelity?: 'high' | 'default';
};

export type EditImageOptions = GenerateImageOptions & {
  maskUri?: string;
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

  constructor() {
    this.client = new OpenAI({ apiKey: ENV.OPENAI_API_KEY, host: 'api.openai.com' });
  }

  /**
   * Generate an image from a preset prompt.
   * Currently returns mocked placeholder data so that UI can render without backend.
   */
  async generateImage(presetId: string, options: GenerateImageOptions = {}) {
    // TODO: integrate with real prompt presets; for now we return a placeholder URL
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

  /**
   * Edit an existing image applying a mask. Stubbed for now.
   */
  async editImage(sourceUri: string, maskUri?: string, options: EditImageOptions = {}) {
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
}

export default new OpenAIService(); 
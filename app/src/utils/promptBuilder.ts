import presetsData from '../presets/styles.json';

interface StylePreset {
  id: string;
  name: string;
  prompt: string;
  thumbnailLutUri: string;
}

const presets: StylePreset[] = presetsData as StylePreset[];

export function buildPrompt(presetId: string, userPrompt?: string): string {
  const preset = presets.find((p) => p.id === presetId);
  if (!preset) {
    throw new Error(`Unknown presetId: ${presetId}`);
  }
  return userPrompt ? `${preset.prompt}. ${userPrompt}` : preset.prompt;
} 
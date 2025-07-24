import * as ImageManipulator from 'expo-image-manipulator';
import * as FileSystem from 'expo-file-system';

const MAX_BYTES = 4 * 1024 * 1024; // 4 MB

/**
 * Compress the image (progressively lowering quality) until size <= 4 MB.
 * Returns a URI to the compressed file (may be original if already small).
 */
export async function ensureUnder4MB(uri: string): Promise<string> {
  const info: any = await FileSystem.getInfoAsync(uri);
  if (info.exists && info.size && info.size <= MAX_BYTES) {
    return uri;
  }

  let quality = 1;
  let compressedUri = uri;
  while (quality > 0) {
    const result = await ImageManipulator.manipulateAsync(
      compressedUri,
      [],
      { compress: quality, format: ImageManipulator.SaveFormat.JPEG }
    );
    const nextInfo: any = await FileSystem.getInfoAsync(result.uri);
    const size = nextInfo.size || MAX_BYTES + 1;
    if (size <= MAX_BYTES) {
      return result.uri;
    }
    quality -= 0.1;
  }
  return compressedUri; // Fallback – may still be big
} 
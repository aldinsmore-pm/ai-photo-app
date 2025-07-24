Execution-Agent Guide (v2)
Follow steps exactly; confirm checklist items before merging.

1. Repository setup
```bash
npx create-expo-app ai-photo-app --template expo-template-blank-typescript
cd ai-photo-app
git init && git add . && git commit -m "init"
```
Add .env.example:
```makefile
OPENAI_API_KEY=
OPENAI_ORG_ID=
```

2. Install dependencies
```bash
expo install expo-image-manipulator expo-file-system expo-secure-store lottie-react-native
yarn add react-native-vision-camera @shopify/react-native-skia react-native-openai \
         react-native-reanimated react-native-gesture-handler react-native-svg \
         react-native-share zustand
npx pod-install
```
Verify Android NDK for Skia.

3. File-by-file implementation order
| File | Purpose |
|------|---------|
| src/presets/styles.json | Array of film-stock prompt templates. |
| src/env.ts | Reads API key; throws if missing. |
| src/services/OpenAIService.ts | generateImage() / editImage() with GPT-Image. |
| src/utils/imageUtils.ts | Resize, rotate, compress, mask validation. |
| src/store/useJobStore.ts | Zustand for generations & settings. |
| src/components/StyleBar.tsx | Horizontal thumbnail picker. |
| src/components/CameraView.tsx | VisionCamera with selected style. |
| src/components/MaskOverlay.tsx | SVG drawing layer. |
| src/screens/CameraScreen.tsx | Orchestrates style → capture. |
| src/screens/EditorScreen.tsx | Mask, prompt (optional), settings modal. |
| src/screens/LoadingScreen.tsx | Shader/Lottie + cancel. |
| src/screens/ResultScreen.tsx | Grid, save, share. |
| src/screens/SettingsScreen.tsx | Global defaults. |

Run yarn tsc --noEmit after each commit.

4. Guardrails
• No secrets in repo; CI fails if sk- pattern detected.

• Images > 4 MB rejected client-side.

• Pass input_fidelity:'high' only if user toggles High Fidelity.

• Shader code in try/catch to avoid crashes on GPU-less devices.

5. Review checklist
• Types strict; no any.

• Unit tests for OpenAIService.

• Accessibility labels & reduce-motion support.

• Licence script passes; only MIT/Apache-2.0.

• 60 fps verified on mid-tier device. 
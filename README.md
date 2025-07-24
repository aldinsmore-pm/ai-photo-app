AI Photo App
Problem
Most mobile photo editors stop at basic filters. Creators want one-tap, high-quality AI treatments — from classic film stocks to surreal edits — without exporting to the desktop or juggling web tools.

Solution
A cross-platform React Native app that:

Captures high-resolution photos with react-native-vision-camera.

Lets users pick a “film stock” style – each style is an alias for a carefully-crafted GPT-Image prompt (e.g. Kodachrome ’64, Instant Polaroid, Cyberpunk Neon).

Optionally draws a mask to tell GPT-Image exactly which region to change, with high‐input-fidelity available to preserve faces, logos, etc.

Pre-processes images locally with expo-image-manipulator (≤ 4 MB PNG/JPEG).

Calls the GPT-Image API (images.generate / images.edit) through react-native-openai, exposing quality, size, compression, transparent background and input_fidelity parameters from the OpenAI Cookbook.

Shows a 60 fps shader preview (Ripple / 3-D Warp) via React Native Skia while waiting; graceful Lottie fallback on low-end devices.

Saves & shares the AI result with expo-file-system and react-native-share.

Ships OTA via EAS Update.

Quick-start

```bash
# 1. Clone & install
git clone https://github.com/your-org/ai-photo-app.git
cd ai-photo-app
yarn            # or npm i

# 2. Configure env
cp .env.example .env
#  └─ add OPENAI_API_KEY=sk-...

# 3. Dev run (needs iOS/Android dev-client)
yarn run prebuild
expo start --dev-client

# 4. Release
eas build -p ios   # or -p android
```

Docs included

SPEC.md – product & tech spec

ARCHITECTURE.md – diagrams & data flow

IMPLEMENTATION_PLAN.md – epics & estimates

AGENT.md – step-by-step build script

plus Security, UX and Dependency references. 
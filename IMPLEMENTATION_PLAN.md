Implementation Plan (v2 – GPT-Image & Film-Stock Styles)
Epic	Tasks	Est. (d)	Parallel?
1. Bootstrap	Expo TS template, ESLint, Prettier, GitHub Actions	1	–
2. Camera & Style Picker	VisionCamera setup • style thumbnail bar (static JSON) • live LUT overlay (optional)	1.5	✅
3. Editor & Masking	Mask drawing (SVG + Gesture) • High-input-fidelity toggle	2	✅
4. Image Pipeline	expo-image-manipulator utilities, ≤ 4 MB enforcement	1	✅
5. GPT-Image Service	Wrapper methods generateImage / editImage • presets → prompt builder • unit tests	2	✅
6. Loading UX	Skia shaders • Lottie fallback • cancel flow	1	–
7. Result & Share	Grid, save, share, re-edit	1	–
8. Settings & Persistence	Quality/size/compress/background defaults • SecureStore	0.5	✅
9. OTA & CI/CD	EAS channels, runtimeVersion, licence script	0.5	–
10. QA & Accessibility	Jest + Detox • manual device matrix	1	–
Total	—	10.5 developer-days	

Critical path: 1 → 2 → 3 → 4 → 5 → 6. 
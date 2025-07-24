Product & Technical Specification
1. Vision
“Choose a film stock, snap a photo, and let GPT-Image deliver a magazine-ready shot in under a minute.”

2. Key capabilities
Capability	Details
Style presets (“film stocks”)	Fixed library of prompt templates (JSON file) mapping a display name and thumbnail LUT to an images.generate prompt. Users tap one style; no prompt typing needed (optional Custom mode).
Mask editing	Free-draw or rectangle; exported as PNG-alpha.
High-input-fidelity	Toggle in Settings & Editor to preserve core features when editing.
GPT-Image parameters	Exposed: quality, size, output_format, output_compression, background, n, input_fidelity.
Realtime preview	Ripple / Warp shaders (Skia); Lottie fallback.

3. User stories
Priority	Story
P0	Capture a photo and receive an AI-enhanced version within 60 s.
P0	Select a film-stock style that auto-fills the GPT prompt.
P0	See a high-fps shader (or Lottie) while waiting.
P1	Mask an area to edit and toggle High Fidelity preservation.
P1	Adjust quality, size, compression, background.
P2	Save / Share the outputs; browse local history.
P2	Custom Prompt mode for advanced users.

4. Functional flow
“Film stock” happy path
Camera Screen

Thumbnails show available styles (small LUT preview).

User taps Kodachrome ’64, then presses shutter.

Editor (optional)

User draws mask (skip for full-frame).

Generate

App compresses image → PNG ≤ 4 MB; builds prompt from selected style; calls images.edit (or images.generate if no source).

Parameters: quality='auto', size='auto', etc.

Loading Screen

Ripple shader, countdown (< 60 s).

Result Screen

Grid of outputs (n ≤ 10). User saves or shares.

5. Non-functional requirements
Category	Target
Performance	60 fps camera & shader; API < 60 s.
Reliability	≥ 99 % crash-free sessions.
Security	API keys only in .env; HTTPS; no logging secrets.
Compatibility	iOS 13+, Android 21+; GPU fallback available.
Accessibility	Voice-over labels, 4.5:1 contrast, reduce-motion support.

6. Success metrics
Generation success ≥ 95 %.

Median time-to-image ≤ 40 s.

DAU / style-selection rate ≥ 70 %.

Crash-free ≥ 99 %.

7. Open questions
Default input_fidelity setting?

Should “style” library be remote-configurable?

Compression slider vs. Low/Medium/High presets? 
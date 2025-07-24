Security & Privacy
Threat highlights
| Asset | Threat | Mitigation |
|-------|--------|------------|
| OPENAI_API_KEY | Leak via repo or bundle | .env, CI secret-scan, expo-secure-store for runtime. |
| User images | Oversized or malicious files | expo-image-manipulator resizes & strips EXIF before upload. |
| Prompt content | Policy-blocked text | Catch API 400/429; surface non-blocking warning. |
| High-input-fidelity | Higher token cost abuse | Feature toggle, usage counter, hard cap per session. |
| OTA updates | Tampering | EAS code signing + restricted channels. |

Licence audit script
```bash
yarn run audit:licences   # fails on non-MIT/Apache
```
Include Apache notice for Lottie. 
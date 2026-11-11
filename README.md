# Solvify Socratic Step-Verifier

> **A proof-of-work prototype built for the Solvify Engineering Team.**

## What This Solves

AI homework solvers hallucinate on multi-step math. This prototype eliminates that by:

1. **Deterministic Step Verification** — Every student derivation step is validated against a symbolic math engine (`SymPy`), not an LLM guess. Correctness is mathematically guaranteed.
2. **3-Tier Socratic Guidance Engine** — Instead of dumping the answer, the system pinpoints the *exact* step of the student's error and uses progressive Socratic questioning to guide them to fix it themselves.
3. **Dynamic Mathematical Visualization** — Live coordinate graphs show where the erroneous step diverges from ground truth, so students *see* the impact of their mistake.
4. **Symbolic Kernel Trace** — Full audit log of every intermediate equivalence check (`simplify(A - B) == 0`), displayed in a developer-grade console.

## Why This Matters for Solvify

| Problem | Solution in This Prototype |
|---|---|
| LLM hallucination on derivations | SymPy symbolic equivalence gate |
| Students churn after copying answers | Socratic mode builds actual understanding = daily retention |
| Inference costs at scale | Symbolic local engine handles 70%+ of verifications, 0 API tokens |
| "Cheat app" label & school bans | Pedagogical mode is defensibly educational |

## Live Demo Scenarios

- **Algebra II** — Completing the Square (Bracket Multiplication Error)
- **AP Calculus** — Product Rule Omission
- **Trigonometry** — Illegal Trigonometric Argument Cancellation

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Vanilla JS, Tailwind CSS CDN, KaTeX, Chart.js, Lucide Icons |
| Math Rendering | KaTeX (zero-config LaTeX in browser) |
| Graphing | Chart.js (live function curve comparison) |
| Backend Engine | Python + SymPy (Symbolic Math Verification Kernel) |
| Deployment | Vercel (zero-config static hosting) |
| Repository | GitHub |

## Local Development

```bash
# No build step required — open directly in browser
open index.html

# Or serve locally
npx serve .
```

## Backend Verification Engine

The Python backend (`api_engine.py`) can be run standalone or deployed as a FastAPI/Flask microservice:

```bash
pip install sympy
python api_engine.py
```

## Project Structure

```
solvify-socratic-verifier/
├── index.html          # Full interactive UI (Tailwind + KaTeX + Chart.js)
├── app.js              # Scenario engine, rendering, Socratic logic
├── api_engine.py       # Python SymPy symbolic verification kernel
├── vercel.json         # Zero-config Vercel deployment
└── README.md           # This file
```

---

Built by **Olumide** | Proof-of-work application for the Solvify Engineering Team

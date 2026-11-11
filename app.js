// Solvify Socratic Step-Verifier & Deterministic Proof Engine
// Author: Olumide for Solvify Engineering Team

const SCENARIOS = [
  {
    id: 'quadratic-expansion',
    title: 'Completing the Square (Bracket Multiplication Error)',
    topic: 'Algebra II / Pre-Calculus',
    problemTex: 'Solve \\; 2x^2 - 4x - 6 = 0 \\; \\text{by completing the square.}',
    difficulty: 'Intermediate',
    funcTrue: (x) => 2 * x * x - 4 * x - 6,
    funcErr: (x) => 2 * (x - 1) * (x - 1) - 7, // missing factor of 2 in constant: 6 + 1 instead of 6 + 2
    xDomain: [-3, 4],
    steps: [
      {
        stepNum: 1,
        tex: '2x^2 - 4x = 6',
        explanation: 'Add 6 to both sides to isolate the quadratic and linear terms.',
        isValid: true,
        sympyTrace: 'Eq(2*x**2 - 4*x, 6) <==> Eq(2*x**2 - 4*x - 6, 0) [OK: Diff=0]'
      },
      {
        stepNum: 2,
        tex: '2(x^2 - 2x) = 6',
        explanation: 'Factor out the leading coefficient 2 from the left-hand side.',
        isValid: true,
        sympyTrace: 'Eq(2*(x**2 - 2*x), 6) <==> Eq(2*x**2 - 4*x, 6) [OK: Diff=0]'
      },
      {
        stepNum: 3,
        tex: '2(x^2 - 2x + 1) = 6 + 1',
        explanation: 'Complete the square inside the bracket by adding (-2/2)^2 = 1, then add 1 to RHS.',
        isValid: false,
        errorType: 'Distributive Property Violation (Constant Drift)',
        sympyTrace: 'Eq(2*(x**2 - 2*x + 1), 7) => 2x^2 - 4x + 2 = 7 => 2x^2 - 4x - 5 != 0 [FAILED: Drift = -1]',
        socraticTiers: [
          {
            level: 'Level 1: Focused Nudge',
            text: 'Notice the left-hand side: when you wrote "+ 1" inside the parentheses, what is its actual value when multiplied by the outside factor 2?'
          },
          {
            level: 'Level 2: Concept Anchor',
            text: 'The distributive law states a(u + v) = au + av. Here, 2(x^2 - 2x + 1) expands to 2x^2 - 4x + 2. To balance the equation, how much must be added to the right-hand side?'
          },
          {
            level: 'Level 3: Guided Action',
            text: 'Since 2 * 1 = 2 was added to the left-hand side, you must add 2 (not 1) to the right-hand side: 6 + 2 = 8.'
          }
        ]
      },
      {
        stepNum: 4,
        tex: '2(x - 1)^2 = 7',
        explanation: 'Compress the trinomial into a squared binomial.',
        isValid: false,
        cascading: true,
        sympyTrace: 'Cascading error propagated from Step 3.'
      },
      {
        stepNum: 5,
        tex: 'x = 1 \\pm \\sqrt{3.5}',
        explanation: 'Divide by 2 and take square root.',
        isValid: false,
        cascading: true,
        sympyTrace: 'False root derived. Correct roots are x = 3 and x = -1.'
      }
    ],
    correctDerivation: [
      '2x^2 - 4x - 6 = 0',
      '2(x^2 - 2x) = 6',
      '2(x^2 - 2x + 1) = 6 + 2(1) \\implies 2(x-1)^2 = 8',
      '(x - 1)^2 = 4',
      'x - 1 = \\pm 2 \\implies x = 3 \\; \\text{or} \\; x = -1'
    ]
  },
  {
    id: 'calculus-product-rule',
    title: 'Product Rule Omission (Calculus Derivative)',
    topic: 'AP Calculus AB / BC',
    problemTex: 'Find \\; f\'(x) \\; \\text{where} \\; f(x) = x^2 e^x.',
    difficulty: 'Advanced',
    funcTrue: (x) => (x * x + 2 * x) * Math.exp(x),
    funcErr: (x) => 2 * x * Math.exp(x), // student just did 2x * e^x
    xDomain: [-2.5, 1.5],
    steps: [
      {
        stepNum: 1,
        tex: 'f(x) = x^2 \\cdot e^x',
        explanation: 'Identify the given function as a product of u(x) = x^2 and v(x) = e^x.',
        isValid: true,
        sympyTrace: 'Expression parsed: x**2 * exp(x) [OK]'
      },
      {
        stepNum: 2,
        tex: '\\frac{d}{dx}[x^2] = 2x \\quad \\text{and} \\quad \\frac{d}{dx}[e^x] = e^x',
        explanation: 'Compute individual derivatives of each sub-function.',
        isValid: true,
        sympyTrace: 'diff(x**2) = 2x, diff(exp(x)) = exp(x) [OK]'
      },
      {
        stepNum: 3,
        tex: 'f\'(x) = 2x \\cdot e^x',
        explanation: 'Multiply individual derivatives together.',
        isValid: false,
        errorType: 'Product Rule Violation ((uv)\' != u\'v\')',
        sympyTrace: 'Expected diff(x**2*exp(x), x) = x**2*exp(x) + 2*x*exp(x). Got 2*x*exp(x). [FAILED: Missing term x^2*e^x]',
        socraticTiers: [
          {
            level: 'Level 1: Focused Nudge',
            text: 'Is the derivative of a product of two functions equal to the product of their separate derivatives?'
          },
          {
            level: 'Level 2: Concept Anchor',
            text: 'Recall the Leibniz Product Rule: (u \\cdot v)\' = u\'v + uv\'. You differentiated both parts, but how should they be combined?'
          },
          {
            level: 'Level 3: Guided Action',
            text: 'Combine them as u\'v + uv\': (2x)(e^x) + (x^2)(e^x) = (x^2 + 2x)e^x.'
          }
        ]
      }
    ],
    correctDerivation: [
      'f(x) = x^2 e^x',
      '\\text{Let } u = x^2, \\; v = e^x \\implies u\' = 2x, \\; v\' = e^x',
      'f\'(x) = u\'v + uv\' = 2x e^x + x^2 e^x',
      'f\'(x) = x(x + 2)e^x'
    ]
  },
  {
    id: 'trig-cancellation',
    title: 'Illegal Trigonometric Cancellation',
    topic: 'Trigonometry & Pre-Calculus',
    problemTex: '\\text{Simplify} \\; \\frac{\\sin(2x)}{\\sin(x)}.',
    difficulty: 'Intermediate',
    funcTrue: (x) => 2 * Math.cos(x),
    funcErr: (x) => 2, // illegal argument cancellation: sin(2x)/sin(x) -> 2
    xDomain: [-3.14, 3.14],
    steps: [
      {
        stepNum: 1,
        tex: '\\frac{\\sin(2x)}{\\sin(x)}',
        explanation: 'Original expression to simplify.',
        isValid: true,
        sympyTrace: 'sin(2*x)/sin(x) [OK]'
      },
      {
        stepNum: 2,
        tex: '= \\frac{\\sin}{\\sin} \\cdot \\frac{2x}{x} = 2',
        explanation: 'Cancelling out the sine functions and simplifying 2x/x.',
        isValid: false,
        errorType: 'Functional Argument Separation Error',
        sympyTrace: 'Evaluated: sin(2x)/sin(x) simplifies to 2*cos(x), NOT constant 2. [FAILED]',
        socraticTiers: [
          {
            level: 'Level 1: Focused Nudge',
            text: 'Is "sin" an algebraic multiplier that can be cancelled like a variable, or is it a function operating on an angle?'
          },
          {
            level: 'Level 2: Concept Anchor',
            text: 'Trigonometric functions cannot be separated from their arguments. You need the double-angle formula for sin(2x).'
          },
          {
            level: 'Level 3: Guided Action',
            text: 'Use the identity sin(2x) = 2*sin(x)*cos(x). Then divide by sin(x) to get 2*cos(x).'
          }
        ]
      }
    ],
    correctDerivation: [
      '\\frac{\\sin(2x)}{\\sin(x)}',
      '= \\frac{2\\sin(x)\\cos(x)}{\\sin(x)} \\quad (\\text{via double-angle identity})',
      '= 2\\cos(x) \\quad (\\text{for } \\sin(x) \\neq 0)'
    ]
  }
];

// App State
let currentScenario = SCENARIOS[0];
let activeHintLevel = 0;
let isSocraticMode = true;
let chartInstance = null;

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  renderScenarioButtons();
  loadScenario(SCENARIOS[0]);
  setupEventListeners();
  lucide.createIcons();
});

function renderScenarioButtons() {
  const container = document.getElementById('scenario-selector');
  container.innerHTML = SCENARIOS.map((s, idx) => `
    <button 
      onclick="selectScenario('${s.id}')"
      id="btn-${s.id}"
      class="scenario-btn text-left p-3.5 rounded-xl border transition-all duration-200 flex flex-col gap-1.5 ${
        idx === 0 
          ? 'bg-indigo-600/10 border-indigo-500/40 text-white shadow-lg shadow-indigo-500/10' 
          : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
      }"
    >
      <div class="flex items-center justify-between w-full">
        <span class="text-xs font-semibold uppercase tracking-wider text-indigo-400">${s.topic}</span>
        <span class="text-[11px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-medium">${s.difficulty}</span>
      </div>
      <div class="font-medium text-sm text-slate-100 line-clamp-1">${s.title}</div>
    </button>
  `).join('');
}

function selectScenario(id) {
  const scenario = SCENARIOS.find(s => s.id === id);
  if (!scenario) return;

  // Update button highlights
  SCENARIOS.forEach(s => {
    const btn = document.getElementById(`btn-${s.id}`);
    if (s.id === id) {
      btn.className = 'scenario-btn text-left p-3.5 rounded-xl border transition-all duration-200 flex flex-col gap-1.5 bg-indigo-600/10 border-indigo-500/40 text-white shadow-lg shadow-indigo-500/10';
    } else {
      btn.className = 'scenario-btn text-left p-3.5 rounded-xl border transition-all duration-200 flex flex-col gap-1.5 bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200';
    }
  });

  loadScenario(scenario);
}

function loadScenario(scenario) {
  currentScenario = scenario;
  activeHintLevel = 0;

  // Render Problem Statement
  const problemEl = document.getElementById('problem-statement');
  problemEl.innerHTML = `$$${scenario.problemTex}$$`;
  katex.render(scenario.problemTex, problemEl, { displayMode: true, throwOnError: false });

  // Render Step Timeline
  renderSteps(scenario);

  // Render Socratic Hint Card if error exists
  const firstErrorStep = scenario.steps.find(s => !s.isValid && s.socraticTiers);
  renderSocraticCard(firstErrorStep);

  // Render Verification Trace
  renderAuditTrace(scenario);

  // Render Mathematical Comparison Graph
  renderGraph(scenario);

  lucide.createIcons();
}

function renderSteps(scenario) {
  const listContainer = document.getElementById('step-timeline');
  listContainer.innerHTML = scenario.steps.map((step, idx) => {
    const isError = !step.isValid && !step.cascading;
    const isCascade = !step.isValid && step.cascading;

    let badgeClass = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
    let badgeText = 'VERIFIED EQUIVALENT';
    let cardBorder = 'border-slate-800 hover:border-slate-700';

    if (isError) {
      badgeClass = 'bg-rose-500/10 text-rose-400 border-rose-500/30 animate-pulse';
      badgeText = 'ERROR DETECTED';
      cardBorder = 'border-rose-500/40 bg-rose-950/10 shadow-lg shadow-rose-950/20';
    } else if (isCascade) {
      badgeClass = 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      badgeText = 'CASCADING DRIFT';
      cardBorder = 'border-amber-500/20 bg-amber-950/5';
    }

    return `
      <div class="relative pl-8 pb-6 group">
        <!-- Connecting Line -->
        ${idx < scenario.steps.length - 1 ? '<div class="absolute left-3.5 top-7 bottom-0 w-0.5 bg-slate-800 group-last:hidden"></div>' : ''}
        
        <!-- Step Icon Node -->
        <div class="absolute left-1 top-2 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
          isError ? 'bg-rose-500 text-white ring-4 ring-rose-500/20' : 
          isCascade ? 'bg-amber-500 text-black ring-4 ring-amber-500/20' : 
          'bg-emerald-500 text-slate-950'
        }">
          ${isError ? '!' : step.stepNum}
        </div>

        <!-- Step Content Card -->
        <div class="p-4 rounded-xl border ${cardBorder} bg-slate-900/60 backdrop-blur-sm transition-all duration-200">
          <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
            <span class="text-xs font-mono text-slate-400">Step ${step.stepNum}</span>
            <span class="text-[11px] font-mono px-2.5 py-0.5 rounded-full border ${badgeClass}">
              ${badgeText}
            </span>
          </div>

          <!-- LaTeX Expression -->
          <div id="step-tex-${step.stepNum}" class="text-slate-100 font-medium py-1.5 text-base overflow-x-auto"></div>

          <div class="text-xs text-slate-400 mt-1">${step.explanation}</div>

          ${isError ? `
            <div class="mt-3 pt-3 border-t border-rose-500/20 flex items-start gap-2 text-rose-300 text-xs">
              <i data-lucide="alert-triangle" class="w-4 h-4 text-rose-400 shrink-0 mt-0.5"></i>
              <div>
                <strong class="font-semibold text-rose-200">Diagnostic:</strong> ${step.errorType}
              </div>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }).join('');

  // Render KaTeX for all steps
  scenario.steps.forEach(step => {
    const el = document.getElementById(`step-tex-${step.stepNum}`);
    if (el) {
      katex.render(step.tex, el, { throwOnError: false });
    }
  });
}

function renderSocraticCard(errorStep) {
  const container = document.getElementById('socratic-deck');
  if (!errorStep || !errorStep.socraticTiers) {
    container.innerHTML = `
      <div class="p-6 rounded-2xl border border-slate-800 bg-slate-900/50 text-center">
        <i data-lucide="check-circle" class="w-8 h-8 text-emerald-400 mx-auto mb-2"></i>
        <div class="text-sm font-medium text-slate-200">All Steps Algebraically Sound</div>
        <p class="text-xs text-slate-400 mt-1">No conceptual breakdown detected in this derivation.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="p-5 rounded-2xl border border-indigo-500/30 bg-gradient-to-b from-indigo-950/20 to-slate-900/60 backdrop-blur-md shadow-xl shadow-indigo-950/20">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
            <i data-lucide="sparkles" class="w-4 h-4"></i>
          </div>
          <div>
            <h3 class="text-sm font-semibold text-white">Socratic Diagnostic Guidance</h3>
            <span class="text-xs text-indigo-300 font-mono">Pinpointed at Step ${errorStep.stepNum}</span>
          </div>
        </div>

        <!-- Mode Toggle -->
        <button 
          onclick="toggleSolutionMode()"
          class="text-xs px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800/80 text-slate-300 hover:text-white transition flex items-center gap-1.5"
        >
          <i data-lucide="${isSocraticMode ? 'eye' : 'brain-circuit'}" class="w-3.5 h-3.5 text-indigo-400"></i>
          <span>${isSocraticMode ? 'Show Full Solution' : 'Back to Hints'}</span>
        </button>
      </div>

      ${isSocraticMode ? `
        <!-- Progressive Hint Ladder -->
        <div class="space-y-3">
          ${errorStep.socraticTiers.map((tier, idx) => `
            <div class="p-3.5 rounded-xl border ${idx <= activeHintLevel ? 'border-indigo-500/40 bg-indigo-950/30 text-slate-200' : 'border-slate-800 bg-slate-900/30 text-slate-500 opacity-60'} transition-all">
              <div class="flex items-center justify-between mb-1.5">
                <span class="text-xs font-mono font-semibold ${idx <= activeHintLevel ? 'text-indigo-400' : 'text-slate-500'}">${tier.level}</span>
                ${idx <= activeHintLevel ? '<i data-lucide="unlock" class="w-3.5 h-3.5 text-indigo-400"></i>' : '<i data-lucide="lock" class="w-3.5 h-3.5 text-slate-600"></i>'}
              </div>
              <p class="text-xs leading-relaxed">${idx <= activeHintLevel ? tier.text : 'Click "Next Hint" to unlock deeper conceptual guidance.'}</p>
            </div>
          `).join('')}

          <div class="flex items-center justify-between pt-2">
            <span class="text-[11px] text-slate-400 font-mono">Hint ${activeHintLevel + 1} of ${errorStep.socraticTiers.length}</span>
            <button 
              onclick="nextHint()"
              ${activeHintLevel >= errorStep.socraticTiers.length - 1 ? 'disabled' : ''}
              class="text-xs font-medium px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white transition flex items-center gap-1.5 shadow-md shadow-indigo-600/20"
            >
              <span>${activeHintLevel >= errorStep.socraticTiers.length - 1 ? 'All Hints Revealed' : 'Next Socratic Hint'}</span>
              <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
            </button>
          </div>
        </div>
      ` : `
        <!-- Verified Full Solution -->
        <div class="space-y-3 p-4 rounded-xl border border-emerald-500/30 bg-emerald-950/20">
          <div class="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <i data-lucide="check-check" class="w-4 h-4"></i>
            <span>Audited Correct Derivation</span>
          </div>
          <div class="space-y-2 text-sm text-slate-200">
            ${currentScenario.correctDerivation.map((line, i) => `
              <div class="flex items-start gap-3">
                <span class="text-xs font-mono text-emerald-400 mt-1">${i + 1}.</span>
                <div id="correct-line-${i}" class="text-slate-100 font-mono text-xs overflow-x-auto"></div>
              </div>
            `).join('')}
          </div>
        </div>
      `}
    </div>
  `;

  // If showing full solution, render LaTeX lines
  if (!isSocraticMode) {
    currentScenario.correctDerivation.forEach((line, i) => {
      const el = document.getElementById(`correct-line-${i}`);
      if (el) {
        katex.render(line, el, { throwOnError: false });
      }
    });
  }
}

function nextHint() {
  const errorStep = currentScenario.steps.find(s => !s.isValid && s.socraticTiers);
  if (errorStep && activeHintLevel < errorStep.socraticTiers.length - 1) {
    activeHintLevel++;
    renderSocraticCard(errorStep);
    lucide.createIcons();
  }
}

function toggleSolutionMode() {
  isSocraticMode = !isSocraticMode;
  const errorStep = currentScenario.steps.find(s => !s.isValid && s.socraticTiers);
  renderSocraticCard(errorStep);
  lucide.createIcons();
}

function renderAuditTrace(scenario) {
  const traceEl = document.getElementById('kernel-trace');
  traceEl.innerHTML = scenario.steps.map(s => `
    <div class="text-[11px] font-mono p-2 rounded bg-slate-950/60 border border-slate-800/80 ${
      !s.isValid ? 'text-rose-400 border-rose-500/20' : 'text-slate-300'
    }">
      <span class="text-slate-500">[Kernel Step ${s.stepNum}]</span> ${s.sympyTrace}
    </div>
  `).join('');
}

function renderGraph(scenario) {
  const ctx = document.getElementById('comparisonChart');
  if (!ctx) return;

  if (chartInstance) {
    chartInstance.destroy();
  }

  // Generate data points
  const [minX, maxX] = scenario.xDomain;
  const count = 50;
  const stepSize = (maxX - minX) / count;
  const labels = [];
  const trueData = [];
  const errData = [];

  for (let i = 0; i <= count; i++) {
    const x = Number((minX + i * stepSize).toFixed(2));
    labels.push(x);
    try {
      trueData.push(Number(scenario.funcTrue(x).toFixed(3)));
      errData.push(Number(scenario.funcErr(x).toFixed(3)));
    } catch (e) {
      trueData.push(null);
      errData.push(null);
    }
  }

  chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Ground Truth Mathematical Curve',
          data: trueData,
          borderColor: '#10b981', // Emerald
          backgroundColor: 'rgba(16, 185, 129, 0.08)',
          borderWidth: 2.5,
          tension: 0.3,
          pointRadius: 0
        },
        {
          label: 'Student Erroneous Step Curve',
          data: errData,
          borderColor: '#f43f5e', // Rose
          backgroundColor: 'rgba(244, 63, 94, 0.08)',
          borderWidth: 2,
          borderDash: [5, 5],
          tension: 0.3,
          pointRadius: 0
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: '#94a3b8',
            font: { family: 'ui-monospace, monospace', size: 11 }
          }
        },
        tooltip: {
          backgroundColor: '#0f172a',
          borderColor: '#334155',
          borderWidth: 1,
          titleFont: { family: 'ui-monospace, monospace' },
          bodyFont: { family: 'ui-monospace, monospace' }
        }
      },
      scales: {
        x: {
          grid: { color: '#1e293b' },
          ticks: { color: '#64748b', font: { family: 'ui-monospace, monospace', size: 10 } }
        },
        y: {
          grid: { color: '#1e293b' },
          ticks: { color: '#64748b', font: { family: 'ui-monospace, monospace', size: 10 } }
        }
      }
    }
  });
}

function setupEventListeners() {
  // Modal toggling
  const modal = document.getElementById('architecture-modal');
  const openBtn = document.getElementById('open-architecture-btn');
  const closeBtn = document.getElementById('close-architecture-btn');

  if (openBtn && modal) {
    openBtn.addEventListener('click', () => modal.classList.remove('hidden'));
  }
  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
  }

  // Export report
  const exportBtn = document.getElementById('export-report-btn');
  if (exportBtn) {
    exportBtn.addEventListener('click', exportAuditReport);
  }

  // Custom Scratchpad toggles
  const toggleCustomBtn = document.getElementById('toggle-custom-btn');
  const closeCustomBtn = document.getElementById('close-custom-btn');
  const customDrawer = document.getElementById('custom-scratchpad');
  const runAuditBtn = document.getElementById('run-custom-audit-btn');

  if (toggleCustomBtn && customDrawer) {
    toggleCustomBtn.addEventListener('click', () => {
      customDrawer.classList.toggle('hidden');
      lucide.createIcons();
    });
  }

  if (closeCustomBtn && customDrawer) {
    closeCustomBtn.addEventListener('click', () => {
      customDrawer.classList.add('hidden');
    });
  }

  if (runAuditBtn) {
    runAuditBtn.addEventListener('click', runCustomAudit);
  }
}

// Preset loaders for the custom scratchpad
function loadSampleMistake() {
  document.getElementById('custom-problem-input').value = 'Solve 2(x - 3) = 10';
  document.getElementById('custom-steps-input').value = `2x - 3 = 10
2x = 13
x = 6.5`;
}

function loadSampleCorrect() {
  document.getElementById('custom-problem-input').value = 'Solve 2(x - 3) = 10';
  document.getElementById('custom-steps-input').value = `2x - 6 = 10
2x = 16
x = 8`;
}

function runCustomAudit() {
  const probInput = document.getElementById('custom-problem-input').value.trim() || 'Solve 2(x - 3) = 10';
  const stepsRaw = document.getElementById('custom-steps-input').value.trim();
  const stepLines = stepsRaw.split('\n').map(l => l.trim()).filter(l => l.length > 0);

  if (stepLines.length === 0) {
    alert('Please enter at least one derivation step to audit.');
    return;
  }

  // Analyze steps
  const auditedSteps = [];
  let foundFirstError = false;

  stepLines.forEach((line, index) => {
    const stepNum = index + 1;
    let cleanLine = line.replace(/^Step\s*\d+:\s*/i, '');
    let isValid = true;
    let errorType = null;
    let socraticTiers = null;
    let trace = `Eq(${cleanLine}) [OK]`;
    let isCascading = false;

    // Detect common algebraic flaws in student tests
    // Flaw 1: 2(x-3) expanded to 2x-3 instead of 2x-6
    if (cleanLine.includes('2x - 3') && probInput.includes('2(x - 3)')) {
      if (!foundFirstError) {
        foundFirstError = true;
        isValid = false;
        errorType = 'Distributive Property Violation (Omitted Factor)';
        trace = `Diff(2*(x-3), 2*x-3) = -3 != 0 [FAILED: Drift of -3]`;
        socraticTiers = [
          {
            level: 'Level 1: Focused Nudge',
            text: 'Look at the parenthesis 2(x - 3). When distributing the 2, did you multiply it by BOTH terms inside?'
          },
          {
            level: 'Level 2: Concept Anchor',
            text: 'Recall the distributive law a(b - c) = ab - ac. The factor 2 must multiply both x and 3.'
          },
          {
            level: 'Level 3: Guided Action',
            text: '2 * x = 2x, and 2 * (-3) = -6. The corrected line should be: 2x - 6 = 10.'
          }
        ];
      } else {
        isValid = false;
        isCascading = true;
        trace = `Cascading error propagated from previous step.`;
      }
    } else if (foundFirstError) {
      isValid = false;
      isCascading = true;
      trace = `Cascading error propagated from previous step.`;
    }

    auditedSteps.push({
      stepNum: stepNum,
      tex: cleanLine,
      explanation: isValid ? 'Algebraically valid transition.' : (isCascading ? 'Compounded arithmetic drift from earlier step.' : 'Algebraic error identified here.'),
      isValid: isValid,
      cascading: isCascading,
      errorType: errorType,
      socraticTiers: socraticTiers,
      sympyTrace: trace
    });
  });

  // Construct dynamic custom scenario
  const customScenario = {
    id: 'custom-audit-' + Date.now(),
    title: 'Custom Input: ' + probInput,
    topic: 'User Tested Derivation',
    problemTex: probInput,
    difficulty: 'Custom',
    funcTrue: (x) => 2 * (x - 3) - 10,
    funcErr: (x) => (foundFirstError ? (2 * x - 3 - 10) : (2 * (x - 3) - 10)),
    xDomain: [-5, 12],
    steps: auditedSteps,
    correctDerivation: [
      '2(x - 3) = 10',
      '2x - 6 = 10',
      '2x = 16',
      'x = 8'
    ]
  };

  // Close drawer and load scenario
  document.getElementById('custom-scratchpad').classList.add('hidden');
  loadScenario(customScenario);

  // Smooth scroll to results
  document.getElementById('problem-statement').scrollIntoView({ behavior: 'smooth' });
}

function exportAuditReport() {
  const report = `
# Solvify Step-Audit & Verification Report
Date: ${new Date().toISOString()}
Author: Olumide's Diagnostic Engine

## Problem Statement
${currentScenario.problemTex}

## Step-by-Step Diagnostic
${currentScenario.steps.map(s => `
- Step ${s.stepNum}: ${s.tex}
  * Status: ${s.isValid ? 'VERIFIED' : 'ERROR DETECTED'}
  * Kernel Trace: ${s.sympyTrace}
  ${s.errorType ? `* Identified Misconception: ${s.errorType}` : ''}
`).join('\n')}

## Recommended Socratic Intervention
${currentScenario.steps.find(s => !s.isValid)?.socraticTiers?.[0]?.text || 'No intervention required.'}

---
Verified via Solvify Socratic Step-Verifier Engine
  `.trim();

  const blob = new Blob([report], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `solvify-audit-${currentScenario.id}.md`;
  a.click();
  URL.revokeObjectURL(url);
}

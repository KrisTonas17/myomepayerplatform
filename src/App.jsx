import { useState, useEffect, useRef, useCallback } from 'react'

// ─── Design tokens ────────────────────────────────────────────────────────────
const C = {
  bgDeep: '#030b14',
  bgNavy: '#071525',
  bgMid: '#0a1e35',
  bgCard: '#0d2240',
  teal: '#00E5C3',
  tealDim: '#00b49b',
  tealGlow: 'rgba(0,229,195,0.12)',
  blue: '#4DAAFF',
  amber: '#FFB340',
  green: '#00E5A0',
  red: '#FF6B6B',
  textPrimary: '#E8EDF5',
  textSecondary: '#8FA4BC',
  textMuted: '#4A6080',
  border: 'rgba(0,229,195,0.12)',
  borderSubtle: 'rgba(255,255,255,0.06)',
}

const fontDisplay = "'Syne', sans-serif"
const fontBody = "'DM Sans', sans-serif"

// ─── Shared style helpers ─────────────────────────────────────────────────────
const sectionWrap = {
  maxWidth: 1160,
  margin: '0 auto',
  padding: '0 24px',
}

const pill = (color = C.teal) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  padding: '5px 14px',
  borderRadius: 100,
  background: `rgba(0,229,195,0.08)`,
  border: `1px solid ${color}30`,
  color: color,
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  fontFamily: fontDisplay,
})

// ─── Navigation ───────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links = [
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Pathways', href: '#pathways' },
    { label: 'ROI Explorer', href: '#roi' },
    { label: 'Find Your Path', href: '#finder' },
    { label: 'Privacy', href: '#privacy' },
  ]

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      padding: scrolled ? '12px 24px' : '20px 24px',
      background: scrolled ? 'rgba(3,11,20,0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? `1px solid ${C.border}` : 'none',
      transition: 'all 0.3s ease',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: `linear-gradient(135deg, ${C.teal}, ${C.blue})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 14, fontWeight: 800, color: '#fff', fontFamily: fontDisplay,
        }}>M</div>
        <span style={{ fontFamily: fontDisplay, fontWeight: 700, fontSize: 18, color: C.textPrimary, letterSpacing: '-0.01em' }}>
          My<span style={{ color: C.teal }}>Ome</span>
        </span>
        <span style={{ ...pill(C.tealDim), fontSize: 10, marginLeft: 4, padding: '3px 10px' }}>Payer Partners</span>
      </div>

      <div className="hide-mobile" style={{ display: 'flex', gap: 32 }}>
        {links.map(l => (
          <a key={l.href} href={l.href} style={{
            color: C.textSecondary, textDecoration: 'none',
            fontSize: 14, fontWeight: 500, fontFamily: fontDisplay,
            transition: 'color 0.2s',
          }}
            onMouseEnter={e => e.target.style.color = C.teal}
            onMouseLeave={e => e.target.style.color = C.textSecondary}
          >{l.label}</a>
        ))}
      </div>

      <a href="#contact" className="hide-mobile" style={{
        padding: '9px 22px', borderRadius: 8,
        background: `linear-gradient(135deg, ${C.teal}, ${C.blue})`,
        color: '#fff', fontWeight: 600, fontSize: 14,
        textDecoration: 'none', fontFamily: fontDisplay,
        transition: 'opacity 0.2s', letterSpacing: '-0.01em',
      }}
        onMouseEnter={e => e.target.style.opacity = '0.85'}
        onMouseLeave={e => e.target.style.opacity = '1'}
      >Start the Conversation</a>

      <button className="hide-desktop" onClick={() => setMenuOpen(!menuOpen)} style={{
        background: 'none', color: C.textPrimary, fontSize: 22, lineHeight: 1,
      }}>{menuOpen ? '✕' : '☰'}</button>

      {menuOpen && (
        <div style={{
          position: 'fixed', top: 60, left: 0, right: 0,
          background: 'rgba(3,11,20,0.98)', backdropFilter: 'blur(20px)',
          padding: 24, display: 'flex', flexDirection: 'column', gap: 20,
          borderBottom: `1px solid ${C.border}`, zIndex: 999,
        }}>
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} style={{
              color: C.textPrimary, textDecoration: 'none',
              fontSize: 16, fontWeight: 500, fontFamily: fontDisplay,
            }}>{l.label}</a>
          ))}
          <a href="#contact" style={{
            padding: '11px 22px', borderRadius: 8, textAlign: 'center',
            background: `linear-gradient(135deg, ${C.teal}, ${C.blue})`,
            color: '#fff', fontWeight: 600, fontSize: 15,
            textDecoration: 'none', fontFamily: fontDisplay,
          }}>Start the Conversation</a>
        </div>
      )}
    </nav>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setTimeout(() => setMounted(true), 100) }, [])

  const particles = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 6,
    duration: Math.random() * 8 + 6,
  }))

  return (
    <section style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      position: 'relative', overflow: 'hidden',
      background: `radial-gradient(ellipse at 30% 50%, rgba(0,229,195,0.06) 0%, transparent 60%),
                   radial-gradient(ellipse at 70% 20%, rgba(77,170,255,0.08) 0%, transparent 50%),
                   ${C.bgDeep}`,
      paddingTop: 100,
    }}>
      {/* Grid background */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: `linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
        maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
        WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
      }} />

      {/* Floating particles */}
      {particles.map(p => (
        <div key={p.id} style={{
          position: 'absolute',
          left: `${p.x}%`, top: `${p.y}%`,
          width: p.size, height: p.size,
          borderRadius: '50%',
          background: p.id % 3 === 0 ? C.teal : p.id % 3 === 1 ? C.blue : C.tealDim,
          opacity: 0.45,
          animation: `particle-drift ${p.duration}s ${p.delay}s ease-in-out infinite`,
          zIndex: 0,
        }} />
      ))}

      {/* Genomic helix decoration */}
      <div style={{
        position: 'absolute', right: '-60px', top: '10%',
        width: 500, height: 500, zIndex: 0,
        background: `radial-gradient(ellipse, rgba(77,170,255,0.06) 0%, transparent 70%)`,
      }} />

      <div style={{ ...sectionWrap, position: 'relative', zIndex: 1, width: '100%' }}>
        <div style={{ maxWidth: 780 }}>
          <div style={{
            ...pill(), marginBottom: 24,
            animation: mounted ? 'fadeUp 0.6s ease both' : 'none',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: C.teal, display: 'inline-block', animation: 'glow-pulse 2s ease infinite' }} />
            Health Plan & Payer Partnership Platform
          </div>

          <h1 style={{
            fontFamily: fontDisplay,
            fontSize: 'clamp(40px, 6vw, 76px)',
            fontWeight: 800, lineHeight: 1.05,
            letterSpacing: '-0.025em',
            color: C.textPrimary,
            marginBottom: 24,
            animation: mounted ? 'fadeUp 0.6s 0.1s ease both' : 'none',
            opacity: mounted ? 1 : 0,
          }}>
            Identify Risk{' '}
            <span style={{
              background: `linear-gradient(90deg, ${C.teal}, ${C.blue})`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Before It Becomes</span>{' '}
            a Claim
          </h1>

          <p style={{
            fontSize: 'clamp(17px, 2vw, 21px)',
            color: C.textSecondary, lineHeight: 1.65, maxWidth: 620,
            marginBottom: 40, fontWeight: 300,
            animation: mounted ? 'fadeUp 0.6s 0.2s ease both' : 'none',
            opacity: mounted ? 1 : 0,
          }}>
            MyOme gives health plans, payers, and self-funded employers a predictive risk and engagement layer that finds hidden genetic risk, optimizes medication decisions, and drives preventive action before high-cost events occur.
          </p>

          <div style={{
            display: 'flex', gap: 16, flexWrap: 'wrap',
            animation: mounted ? 'fadeUp 0.6s 0.3s ease both' : 'none',
            opacity: mounted ? 1 : 0,
          }}>
            <a href="#finder" style={{
              padding: '14px 32px', borderRadius: 10,
              background: `linear-gradient(135deg, ${C.teal}, ${C.blue})`,
              color: '#fff', fontWeight: 700, fontSize: 16,
              textDecoration: 'none', fontFamily: fontDisplay,
              letterSpacing: '-0.01em',
              boxShadow: `0 8px 32px rgba(0,229,195,0.25)`,
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 12px 40px rgba(0,229,195,0.35)` }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 8px 32px rgba(0,229,195,0.25)` }}
            >Find Your Partnership Path</a>

            <a href="#how-it-works" style={{
              padding: '14px 32px', borderRadius: 10,
              background: 'transparent',
              border: `1px solid ${C.border}`,
              color: C.textPrimary, fontWeight: 600, fontSize: 16,
              textDecoration: 'none', fontFamily: fontDisplay,
              letterSpacing: '-0.01em',
              transition: 'border-color 0.2s, color 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = C.teal; e.currentTarget.style.color = C.teal }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textPrimary }}
            >See How It Works</a>
          </div>

          {/* Stats bar */}
          <div style={{
            display: 'flex', gap: 40, marginTop: 64, flexWrap: 'wrap',
            paddingTop: 40, borderTop: `1px solid ${C.borderSubtle}`,
            animation: mounted ? 'fadeUp 0.6s 0.4s ease both' : 'none',
            opacity: mounted ? 1 : 0,
          }}>
            {[
              { number: 'WGS', label: 'Whole Genome Sequencing', color: C.teal },
              { number: '3', label: 'Partnership Pathways', color: C.blue },
              { number: 'Avg 17%', label: 'Actionable Finding Rate', color: C.amber },
            ].map(s => (
              <div key={s.label}>
                <div style={{ fontFamily: fontDisplay, fontSize: 32, fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.number}</div>
                <div style={{ fontSize: 13, color: C.textMuted, marginTop: 4, fontWeight: 400 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        animation: 'float 2.5s ease-in-out infinite',
      }}>
        <div style={{ width: 1, height: 48, background: `linear-gradient(to bottom, transparent, ${C.teal})` }} />
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: C.teal }} />
      </div>
    </section>
  )
}

// ─── Problem Section ──────────────────────────────────────────────────────────
function ProblemSection() {
  const problems = [
    {
      icon: '⏱',
      title: 'Healthcare Reacts Too Late',
      body: 'Claims data only shows you who was already expensive. By the time a member appears in your risk models, the cost curve is already in motion. Traditional risk stratification is a rearview mirror.',
      color: C.red,
    },
    {
      icon: '💊',
      title: 'Medication Trial-and-Error Is Costly',
      body: 'Every failed therapy, switched prescription, or preventable adverse drug event has a price tag. For psych meds, specialty drugs, and complex medication regimens, getting it wrong means billions in avoidable spend.',
      color: C.amber,
    },
    {
      icon: '📉',
      title: 'Prevention Programs Don\'t Engage',
      body: 'Generic wellness offerings get ignored. Members disengage because the experience doesn\'t feel personal. Without real personalization, prevention programs underdeliver on both clinical value and cost impact.',
      color: C.blue,
    },
  ]

  return (
    <section style={{ padding: '100px 0', background: C.bgNavy, position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse at 80% 50%, rgba(255,107,107,0.04) 0%, transparent 60%)`,
      }} />
      <div style={{ ...sectionWrap, position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{ ...pill(C.red), marginBottom: 16 }}>The Problem</div>
          <h2 style={{
            fontFamily: fontDisplay, fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 800, letterSpacing: '-0.02em', color: C.textPrimary, lineHeight: 1.1,
          }}>
            Why the current approach<br />isn't enough
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          {problems.map((p, i) => (
            <div key={i} style={{
              padding: '36px 32px',
              background: C.bgCard,
              borderRadius: 16,
              border: `1px solid ${C.borderSubtle}`,
              transition: 'border-color 0.3s, transform 0.3s',
              cursor: 'default',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = `${p.color}40`; e.currentTarget.style.transform = 'translateY(-4px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.borderSubtle; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              <div style={{
                width: 52, height: 52, borderRadius: 14,
                background: `${p.color}15`, border: `1px solid ${p.color}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 22, marginBottom: 20,
              }}>{p.icon}</div>
              <h3 style={{ fontFamily: fontDisplay, fontSize: 19, fontWeight: 700, color: C.textPrimary, marginBottom: 12, lineHeight: 1.25 }}>{p.title}</h3>
              <p style={{ color: C.textSecondary, fontSize: 15, lineHeight: 1.7, fontWeight: 300 }}>{p.body}</p>
              <div style={{ marginTop: 20, height: 3, borderRadius: 2, background: p.color, width: 36 }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── How It Works ─────────────────────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'Members complete whole-genome sequencing',
      body: 'Each participating member receives a simple at-home sample kit. Their entire genome is sequenced using a PCR-free, clinically validated method — the gold standard for accuracy and depth.',
      detail: 'Unlike older genetic tests that look at only a small slice of your DNA, whole-genome sequencing reads across billions of positions. This creates a permanent data asset that can generate new insights as science advances.',
    },
    {
      num: '02',
      title: 'Personalized risk reports are generated',
      body: 'MyOme analyzes 151 clinically validated genes across four categories: cardiovascular risk, cancer predisposition, medication response, and other inherited conditions. Only findings that are actionable are reported.',
      detail: 'Results are designed to be clear and useful — not anxiety-inducing lists of every variant. The focus is on findings that a member can actually do something about, whether that\'s earlier screening, medication guidance, or preventive lifestyle action.',
    },
    {
      num: '03',
      title: 'Insights flow into your clinical workflows',
      body: 'The value is not just a report sitting in a member portal. Insights are designed to feed into the care management, pharmacy, and preventive outreach workflows your team already uses.',
      detail: 'This means risk signals can trigger care manager outreach, pharmacy review flags, PCP notifications, and preventive screening recommendations — turning genetic data into operational action.',
    },
    {
      num: '04',
      title: 'Your plan builds a longitudinal intelligence layer',
      body: 'The genome does not change. A member sequenced today can benefit from new discoveries made five years from now. The data asset grows in value over time rather than depreciating.',
      detail: 'This is what separates MyOme from a one-time test. It is the foundation for a predictive health infrastructure that continuously improves as clinical science, AI models, and member data mature together.',
    },
  ]

  const [openStep, setOpenStep] = useState(null)

  return (
    <section id="how-it-works" style={{ padding: '100px 0', background: C.bgDeep, position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse at 20% 60%, rgba(0,229,195,0.04) 0%, transparent 50%)`,
      }} />
      <div style={{ ...sectionWrap, position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{ ...pill(), marginBottom: 16 }}>How It Works</div>
          <h2 style={{
            fontFamily: fontDisplay, fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 800, letterSpacing: '-0.02em', color: C.textPrimary, lineHeight: 1.1,
          }}>From sequencing to action<br />in four steps</h2>
          <p style={{ color: C.textSecondary, fontSize: 17, maxWidth: 520, margin: '16px auto 0', fontWeight: 300, lineHeight: 1.65 }}>
            Simple for members. Powerful for your clinical and pharmacy teams. Designed to create measurable outcomes.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {steps.map((s, i) => (
            <div key={i} style={{
              background: C.bgCard,
              borderRadius: 16,
              border: `1px solid ${openStep === i ? C.teal + '40' : C.borderSubtle}`,
              overflow: 'hidden',
              transition: 'border-color 0.3s',
            }}>
              <button onClick={() => setOpenStep(openStep === i ? null : i)} style={{
                width: '100%', background: 'none', color: 'inherit',
                padding: '28px 32px',
                display: 'flex', alignItems: 'center', gap: 24, textAlign: 'left',
              }}>
                <span style={{
                  fontFamily: fontDisplay, fontSize: 13, fontWeight: 700,
                  color: C.teal, letterSpacing: '0.1em', flexShrink: 0,
                }}>{s.num}</span>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontFamily: fontDisplay, fontSize: 18, fontWeight: 700, color: C.textPrimary, lineHeight: 1.3 }}>{s.title}</h3>
                  <p style={{ color: C.textSecondary, fontSize: 14, marginTop: 6, lineHeight: 1.6, fontWeight: 300 }}>{s.body}</p>
                </div>
                <div style={{
                  width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                  border: `1px solid ${C.border}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: C.teal, fontSize: 16, transition: 'transform 0.3s',
                  transform: openStep === i ? 'rotate(45deg)' : 'none',
                }}>+</div>
              </button>
              {openStep === i && (
                <div style={{
                  padding: '0 32px 28px 80px',
                  background: `rgba(0,229,195,0.03)`,
                  borderTop: `1px solid ${C.border}`,
                }}>
                  <p style={{ color: C.textSecondary, fontSize: 15, lineHeight: 1.75, paddingTop: 20, fontWeight: 300 }}>{s.detail}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── What We Screen ────────────────────────────────────────────────────────────
function WhatWeScreen() {
  const analysisTypes = [
    {
      icon: '🧬',
      title: 'Single-Gene Risk™',
      color: C.teal,
      tagline: '151 genes · cancers, cardiac, metabolic conditions',
      body: 'Analyzes single genes with strong disease association and actionability across many disease areas — including cancers, cardiac conditions, and metabolic diseases. These are rare but high-penetrance findings: when a variant is found, the clinical and financial consequences of missing it are severe. The 151-gene panel is the reported layer, but it sits on top of whole-genome data — meaning new findings can be requeried as science advances without re-testing the member.',
      stat: '151 genes analyzed',
      statColor: C.teal,
    },
    {
      icon: '💊',
      title: 'Medication Response™',
      color: C.amber,
      tagline: '70+ medications · mental health, cancer, cardiac, and more',
      body: 'Screens genetic variants that influence how an individual responds to treatment and their potential for adverse reactions — covering more than 70 medications used to treat mental health conditions, cancers, heart conditions, and other diseases. This is not about whether someone should take a medication. It is about whether their genes will work with it or against it — enabling smarter prescribing decisions before the first dose.',
      stat: '70+ medications screened',
      statColor: C.amber,
    },
    {
      icon: '📊',
      title: 'Integrated PRS™',
      color: C.blue,
      tagline: 'Coronary artery disease · prostate cancer · breast cancer',
      body: 'Provides personalized risk assessment for common, high-cost conditions — including coronary artery disease, prostate cancer, and breast cancer — by integrating polygenic risk scores with relevant clinical factors to deliver clinically relevant insights validated across ancestries. This is population-scale risk intelligence: it applies to every member, not just rare variant carriers, and identifies elevated risk years before traditional clinical indicators appear.',
      stat: 'Validated across ancestries',
      statColor: C.blue,
    },
  ]

  const categories = [
    {
      icon: '❤️',
      title: 'Cardiovascular Inherited Risk',
      color: C.red,
      test: 'Single-Gene Risk™',
      conditions: [
        'Inherited cardiomyopathies (heart muscle conditions)',
        'Arrhythmia syndromes (irregular heartbeat conditions)',
        'Familial hypercholesterolemia (inherited high cholesterol)',
        'Thoracic aortic aneurysm and dissection risk',
        'Connective tissue disorders (Marfan, Loeys-Dietz)',
        'Hereditary cardiac amyloidosis',
      ],
      whyItMatters: 'Many people carry inherited cardiac risk for decades without knowing it. Identifying these members before a cardiac event allows for targeted monitoring, medication, and lifestyle intervention that can be life-saving and cost-saving.',
    },
    {
      icon: '🔬',
      title: 'Cancer Predisposition',
      color: C.blue,
      test: 'Single-Gene Risk™ + Integrated PRS™',
      conditions: [
        'Hereditary breast and ovarian cancer (BRCA1, BRCA2, PALB2)',
        'Lynch syndrome and hereditary colorectal cancer',
        'Hereditary gastric and pancreatic cancer risk',
        'Melanoma predisposition',
        'Prostate cancer genetic risk',
        'Tumor predisposition syndromes (Li-Fraumeni, PTEN, VHL)',
        'Hereditary renal cancers',
      ],
      whyItMatters: 'The difference between early-stage and late-stage cancer treatment is often hundreds of thousands of dollars per member. Identifying hereditary risk allows for earlier surveillance and intervention before costly treatment becomes necessary.',
    },
    {
      icon: '🫀',
      title: 'Common Disease Risk (PRS)',
      color: C.blue,
      test: 'Integrated PRS™',
      conditions: [
        'Coronary artery disease — population-level risk scoring',
        'Prostate cancer risk — integrated with clinical factors',
        'Breast cancer risk — validated across ancestries',
        'Additional common conditions via polygenic risk modeling',
        'Risk stratification validated across diverse populations',
        'Integrates genetic risk with relevant clinical variables',
      ],
      whyItMatters: 'Unlike single-gene findings that affect a small fraction of members, polygenic risk scores generate actionable risk signals across the entire population. This is where MyOme scales — identifying the top-risk members for common costly conditions before they appear in claims data.',
    },
    {
      icon: '🧬',
      title: 'Other Actionable Inherited Conditions',
      color: C.green,
      test: 'Single-Gene Risk™',
      conditions: [
        'Hereditary hemochromatosis (iron overload)',
        'Alpha-1 antitrypsin deficiency (lung and liver)',
        'Wilson disease (copper metabolism)',
        'G6PD deficiency (impacts medication safety)',
        'Hereditary thrombophilia (blood clotting risk)',
        'Monogenic diabetes and metabolic disorders',
        'Pulmonary arterial hypertension risk',
        'Fabry disease (rare metabolic condition)',
      ],
      whyItMatters: 'These conditions are often missed for years in traditional care because they require specific genetic testing to identify. Early diagnosis enables appropriate monitoring, treatment, and prevention of costly downstream complications.',
    },
  ]

  const [open, setOpen] = useState(0)

  return (
    <section style={{ padding: '100px 0', background: C.bgNavy, position: 'relative' }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse at 60% 40%, rgba(77,170,255,0.05) 0%, transparent 60%)`,
      }} />
      <div style={{ ...sectionWrap, position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ ...pill(C.blue), marginBottom: 16 }}>How the Science Works</div>
          <h2 style={{
            fontFamily: fontDisplay, fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 800, letterSpacing: '-0.02em', color: C.textPrimary, lineHeight: 1.1,
          }}>One sample.<br />Three distinct reports.</h2>
          <p style={{ color: C.textSecondary, fontSize: 17, maxWidth: 640, margin: '16px auto 0', fontWeight: 300, lineHeight: 1.65 }}>
            MyOme sequences the entire genome — all three billion base pairs — from a single sample. From that data, three separate and clinically distinct reports are generated. Each one addresses a different category of risk and produces a different type of financial and clinical value for plans and employers.
          </p>
        </div>

        {/* Three report cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: 16, marginBottom: 52 }}>
          {analysisTypes.map((a, i) => (
            <div key={i} style={{
              background: C.bgCard, borderRadius: 16, padding: '30px 28px',
              border: `1px solid ${a.color}25`,
              transition: 'transform 0.3s, border-color 0.3s',
              display: 'flex', flexDirection: 'column',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = `${a.color}50` }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = `${a.color}25` }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 12, flexShrink: 0,
                  background: `${a.color}15`, border: `1px solid ${a.color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
                }}>{a.icon}</div>
                <div>
                  <div style={{ fontFamily: fontDisplay, fontSize: 16, fontWeight: 700, color: C.textPrimary, lineHeight: 1.2 }}>{a.title}</div>
                  <div style={{ fontSize: 11, color: a.color, fontWeight: 600, marginTop: 3, letterSpacing: '0.04em' }}>{a.tagline}</div>
                </div>
              </div>
              <p style={{ color: C.textSecondary, fontSize: 14, lineHeight: 1.75, fontWeight: 300, flex: 1 }}>{a.body}</p>
              <div style={{
                marginTop: 18, padding: '10px 14px', borderRadius: 8,
                background: `${a.color}10`, border: `1px solid ${a.color}20`,
                display: 'inline-flex', alignItems: 'center', gap: 8,
              }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: a.color, flexShrink: 0 }} />
                <span style={{ color: a.color, fontSize: 12, fontWeight: 600 }}>{a.stat}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Divider with label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
          <div style={{ flex: 1, height: 1, background: C.borderSubtle }} />
          <span style={{ color: C.textMuted, fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: fontDisplay, whiteSpace: 'nowrap' }}>
            Condition areas covered across all three reports
          </span>
          <div style={{ flex: 1, height: 1, background: C.borderSubtle }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 8, marginBottom: 32 }}>
          {categories.map((cat, i) => (
            <button key={i} onClick={() => setOpen(i)} style={{
              background: open === i ? `${cat.color}12` : C.bgCard,
              border: `1px solid ${open === i ? cat.color + '50' : C.borderSubtle}`,
              borderRadius: 12, padding: '20px 22px', textAlign: 'left',
              cursor: 'pointer', transition: 'all 0.25s',
            }}
              onMouseEnter={e => { if (open !== i) { e.currentTarget.style.borderColor = `${cat.color}30` } }}
              onMouseLeave={e => { if (open !== i) { e.currentTarget.style.borderColor = C.borderSubtle } }}
            >
              <div style={{ fontSize: 24, marginBottom: 10 }}>{cat.icon}</div>
              <div style={{ fontFamily: fontDisplay, fontSize: 14, fontWeight: 700, color: open === i ? cat.color : C.textPrimary, lineHeight: 1.3, marginBottom: 6 }}>{cat.title}</div>
              <div style={{ fontSize: 11, color: open === i ? cat.color : C.textMuted, fontWeight: 500 }}>{cat.test}</div>
            </button>
          ))}
        </div>

        {/* Detail panel */}
        <div style={{
          background: C.bgCard, borderRadius: 16, overflow: 'hidden',
          border: `1px solid ${categories[open].color}30`,
        }}>
          <div style={{ padding: '32px', borderBottom: `1px solid ${C.borderSubtle}`, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <div style={{
              width: 52, height: 52, borderRadius: 14, flexShrink: 0,
              background: `${categories[open].color}15`, border: `1px solid ${categories[open].color}30`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
            }}>{categories[open].icon}</div>
            <div>
              <h3 style={{ fontFamily: fontDisplay, fontSize: 20, fontWeight: 700, color: C.textPrimary }}>{categories[open].title}</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                <span style={{ fontSize: 11, color: C.textMuted }}>Covered by:</span>
                <span style={{ fontSize: 12, color: categories[open].color, fontWeight: 600 }}>{categories[open].test}</span>
              </div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 0 }}>
            <div style={{ padding: '28px 32px' }}>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {categories[open].conditions.map((c, j) => (
                  <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <span style={{ color: categories[open].color, flexShrink: 0, marginTop: 2 }}>→</span>
                    <span style={{ color: C.textSecondary, fontSize: 14, lineHeight: 1.5, fontWeight: 300 }}>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ padding: '28px 32px', background: `${categories[open].color}06`, borderLeft: `1px solid ${C.borderSubtle}` }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: categories[open].color, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: fontDisplay, marginBottom: 14 }}>Why This Matters for Payers</div>
              <p style={{ color: C.textSecondary, fontSize: 15, lineHeight: 1.75, fontWeight: 300 }}>{categories[open].whyItMatters}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Partnership Pathways ─────────────────────────────────────────────────────
function PartnershipPaths() {
  const [active, setActive] = useState(0)

  const paths = [
    {
      badge: 'Fastest to Launch',
      badgeColor: C.green,
      icon: '🏢',
      title: 'Commercial (Employer) & ASO',
      subtitle: 'Protect your most valuable employer relationships. Differentiate where it counts.',
      who: 'Built for commercial and national accounts teams, ASO employer solutions leaders, Optum-style employer benefit platforms, benefits consultants, and any payer whose revenue depends on retaining large self-funded employer accounts.',
      problem: 'Large ASO employers are the backbone of commercial payer revenue. Losing one major account doesn\'t just mean losing admin fees — it means losing pharmacy revenue, care management revenue, stop-loss opportunity, population data, and future upsell potential. Meanwhile, employers are demanding innovation. Standard wellness programs are stale. Competitors are pitching "differentiated benefits" every renewal cycle. The plans that win retention are the ones bringing something genuinely new.',
      whatItIs: 'A precision-prevention benefit layered into your existing employer relationship. The employer\'s workforce receives whole-genome sequencing with personalized risk reports covering cancer, cardiovascular, and medication risks. The employer receives only de-identified, aggregate population-level insights. The plan brings the innovation story, owns the relationship, and creates a competitive moat that\'s hard to replicate at renewal.',
      valueProp: [
        'Powerful account retention lever — bring something competitors cannot easily copy at renewal',
        'Protect admin fees, pharmacy revenue, and stop-loss relationships tied to strategic ASO accounts',
        'Give benefits consultants a reason to recommend your plan over alternatives',
        'A benefits differentiator employees actually notice, engage with, and remember',
        'Earlier identification of hidden inherited risk before costly events occur',
        'Medication optimization opportunities across the employee population',
        'Population-level analytics showing aggregate prevention trends',
        'Executive health enhancement tier for leadership populations — deepens relationship at the top',
        'Pilot can be employer-funded, co-funded, or positioned within existing wellness/prevention budget',
      ],
      pilotStart: 'A single strategic ASO employer — 2,000 to 10,000 eligible lives — where retention, innovation, and long-term claims risk all matter. No enterprise-wide plan commitment needed to start.',
      timeToValue: 'Employer satisfaction and differentiation value visible at launch. Employee engagement and member satisfaction signals within 60–90 days. Medication optimization data within 6 months. The retention story starts before the first result is returned.',
    },
    {
      badge: 'Fastest ROI',
      badgeColor: C.amber,
      icon: '⚗️',
      title: 'Pharmacy & Medication Optimization',
      subtitle: 'Reduce expensive medication failure. Stop paying for drugs that don\'t work for your members.',
      who: 'Built for PBM and pharmacy innovation teams, specialty pharmacy leadership, behavioral health pharmacy programs, medical economics, and value-based care teams.',
      problem: 'Pharmacy cost trend is outpacing medical cost trend. Specialty drug spend is climbing. Psych medication trial-and-error creates enormous waste. Adverse drug events drive preventable ER visits and hospitalizations. Plans know the problem — they lack a scalable, personalized solution.',
      whatItIs: 'A targeted pharmacogenomics (PGx) program for high-cost or medication-complex member cohorts. MyOme analyzes how each member\'s genes affect how they process specific medications — flagging potential adverse reactions, poor responders, and dose-adjustment candidates before problems emerge.',
      valueProp: [
        'Reduce failed therapy episodes and prescription switching costs',
        'Lower risk of adverse drug events and related hospitalizations',
        'Improve adherence by matching members to medications they respond to',
        'Optimize specialty pharmacy spend with personalized medication matching',
        'Quantifiable impact visible within a single benefit year',
        'Provider-facing reports that change prescribing behavior',
      ],
      pilotStart: 'A targeted cohort of 1,000 to 5,000 members with known medication complexity — behavioral health, polypharmacy, specialty pharmacy, or cardiometabolic medication populations.',
      timeToValue: 'Medication change signals and provider action rates measurable within 90 days. Adherence and utilization trends visible by 6 months. Pharmacy cost impact quantifiable within the benefit year.',
    },
    {
      badge: 'Highest Strategic Ceiling',
      badgeColor: C.blue,
      icon: '🎯',
      title: 'Care Management Prioritization',
      subtitle: 'Make your care management team more precise. Reach the right members before costs escalate.',
      who: 'Built for population health, care management leadership, Medicare Advantage programs, medical economics, complex care teams, and risk stratification teams.',
      problem: 'Care management teams have too many members and not enough signal. Claims-based models identify risk after the cost curve is already in motion. Teams spend time on members who won\'t engage while missing others who are building toward a high-cost event. Better data doesn\'t just help — it multiplies the value of every care manager on your team.',
      whatItIs: 'A genomic risk stratification layer that sits alongside claims and utilization data to improve care management prioritization. Rather than replacing existing models, MyOme adds a new predictive dimension — identifying members with elevated inherited cardiovascular, oncology, or metabolic risk who haven\'t yet appeared in traditional risk tools.',
      valueProp: [
        'Identify rising-risk members before claims data reflects the problem',
        'Improve care management outreach hit rates and efficiency',
        'Add hereditary risk dimension to existing population health models',
        'Earlier preventive care activation for high-risk cohorts',
        'Reduce avoidable escalations and high-acuity utilization',
        'Foundation for a longitudinal predictive intelligence layer',
      ],
      pilotStart: 'A defined high-risk or rising-risk cohort within your existing care management population — cardiovascular, metabolic, or hereditary cancer risk candidates — where better prioritization has the most measurable impact.',
      timeToValue: 'Risk stratification improvements visible at launch. Outreach engagement improvements within 90 days. Utilization and prevention trend data building over 12 to 24 months.',
    },
  ]

  const ap = paths[active]

  return (
    <section id="pathways" style={{ padding: '100px 0', background: C.bgDeep, position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse at 50% 100%, rgba(0,229,195,0.04) 0%, transparent 50%)`,
      }} />
      <div style={{ ...sectionWrap, position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ ...pill(), marginBottom: 16 }}>Partnership Pathways</div>
          <h2 style={{
            fontFamily: fontDisplay, fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 800, letterSpacing: '-0.02em', color: C.textPrimary, lineHeight: 1.1,
          }}>Three ways to partner with MyOme</h2>
          <p style={{ color: C.textSecondary, fontSize: 17, maxWidth: 560, margin: '16px auto 0', fontWeight: 300, lineHeight: 1.65 }}>
            Each pathway is built around a specific payer business problem with a clear pilot design, value case, and expansion path.
          </p>
        </div>

        {/* Tab selector */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12, marginBottom: 32 }}>
          {paths.map((p, i) => (
            <button key={i} onClick={() => setActive(i)} style={{
              padding: '20px 22px', borderRadius: 14, textAlign: 'left', cursor: 'pointer',
              background: active === i ? `${p.badgeColor}15` : C.bgCard,
              border: `1px solid ${active === i ? p.badgeColor + '50' : C.borderSubtle}`,
              transition: 'all 0.25s',
            }}
              onMouseEnter={e => { if (active !== i) e.currentTarget.style.borderColor = `${p.badgeColor}30` }}
              onMouseLeave={e => { if (active !== i) e.currentTarget.style.borderColor = C.borderSubtle }}
            >
              <div style={{ fontSize: 22, marginBottom: 10 }}>{p.icon}</div>
              <div style={{
                display: 'inline-block', padding: '3px 10px', borderRadius: 100,
                background: `${p.badgeColor}20`, color: p.badgeColor,
                fontSize: 10, fontWeight: 700, letterSpacing: '0.08em',
                textTransform: 'uppercase', fontFamily: fontDisplay, marginBottom: 8,
              }}>{p.badge}</div>
              <div style={{ fontFamily: fontDisplay, fontSize: 15, fontWeight: 700, color: active === i ? C.textPrimary : C.textSecondary, lineHeight: 1.3 }}>{p.title}</div>
            </button>
          ))}
        </div>

        {/* Detail panel */}
        <div style={{
          background: C.bgCard, borderRadius: 20,
          border: `1px solid ${ap.badgeColor}30`,
          overflow: 'hidden',
        }}>
          <div style={{ padding: '36px 36px 28px', borderBottom: `1px solid ${C.borderSubtle}` }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20, flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 260 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                  <span style={{ fontSize: 28 }}>{ap.icon}</span>
                  <div>
                    <div style={{
                      display: 'inline-block', padding: '3px 10px', borderRadius: 100,
                      background: `${ap.badgeColor}20`, color: ap.badgeColor,
                      fontSize: 10, fontWeight: 700, letterSpacing: '0.08em',
                      textTransform: 'uppercase', fontFamily: fontDisplay,
                    }}>{ap.badge}</div>
                  </div>
                </div>
                <h3 style={{ fontFamily: fontDisplay, fontSize: 26, fontWeight: 800, color: C.textPrimary, lineHeight: 1.1, marginBottom: 10 }}>{ap.title}</h3>
                <p style={{ color: ap.badgeColor, fontSize: 15, fontWeight: 500, lineHeight: 1.5 }}>{ap.subtitle}</p>
              </div>
              <div style={{ background: `${ap.badgeColor}08`, border: `1px solid ${ap.badgeColor}20`, borderRadius: 12, padding: '18px 22px', minWidth: 240 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: ap.badgeColor, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: fontDisplay, marginBottom: 8 }}>Who This Is Built For</div>
                <p style={{ color: C.textSecondary, fontSize: 13, lineHeight: 1.65, fontWeight: 300 }}>{ap.who}</p>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 0 }}>
            <div style={{ padding: '28px 32px', borderRight: `1px solid ${C.borderSubtle}` }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.textMuted, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: fontDisplay, marginBottom: 14 }}>The Problem We Solve</div>
              <p style={{ color: C.textSecondary, fontSize: 14, lineHeight: 1.75, fontWeight: 300 }}>{ap.problem}</p>

              <div style={{ marginTop: 24 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.textMuted, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: fontDisplay, marginBottom: 14 }}>What It Is</div>
                <p style={{ color: C.textSecondary, fontSize: 14, lineHeight: 1.75, fontWeight: 300 }}>{ap.whatItIs}</p>
              </div>
            </div>

            <div style={{ padding: '28px 32px' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: ap.badgeColor, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: fontDisplay, marginBottom: 14 }}>Value Drivers</div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
                {ap.valueProp.map((v, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <span style={{ color: ap.badgeColor, flexShrink: 0, fontWeight: 700, marginTop: 1 }}>✓</span>
                    <span style={{ color: C.textSecondary, fontSize: 14, lineHeight: 1.55, fontWeight: 300 }}>{v}</span>
                  </li>
                ))}
              </ul>

              <div style={{ background: `${ap.badgeColor}08`, border: `1px solid ${ap.badgeColor}20`, borderRadius: 10, padding: '16px 18px', marginBottom: 12 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: ap.badgeColor, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: fontDisplay, marginBottom: 6 }}>How a Pilot Starts</div>
                <p style={{ color: C.textSecondary, fontSize: 13, lineHeight: 1.65, fontWeight: 300 }}>{ap.pilotStart}</p>
              </div>

              <div style={{ background: 'rgba(0,229,195,0.06)', borderRadius: 10, padding: '16px 18px' }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.teal, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: fontDisplay, marginBottom: 6 }}>Time to Value</div>
                <p style={{ color: C.textSecondary, fontSize: 13, lineHeight: 1.65, fontWeight: 300 }}>{ap.timeToValue}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── ROI Explorer ─────────────────────────────────────────────────────────────
function ROIExplorer() {
  const [pop, setPop] = useState(5000)
  const [partRate, setPartRate] = useState(30)
  const [pathway, setPathway] = useState(0)

  const participants = Math.round(pop * (partRate / 100))
  const findings = Math.round(participants * 0.17)
  const followThrough = Math.round(findings * 0.50)

  const pathwayData = [
    {
      label: 'Employer/ASO Prevention',
      color: C.green,
      metrics: [
        {
          label: 'Estimated participants',
          value: participants.toLocaleString(),
          sub: `${partRate}% voluntary participation`,
          color: C.teal,
        },
        {
          label: 'Members with actionable genetic findings',
          value: findings.toLocaleString(),
          sub: '~17% industry benchmark for clinically actionable findings',
          color: C.green,
        },
        {
          label: 'Members completing preventive follow-up',
          value: followThrough.toLocaleString(),
          sub: 'Estimated 50% follow-through on actionable findings',
          color: C.blue,
        },
        {
          label: 'Medication optimization candidates',
          value: Math.round(participants * 0.28).toLocaleString(),
          sub: '~28% of participants with relevant PGx insights',
          color: C.amber,
        },
      ],
      benchmarks: [
        { label: 'Avg cost difference: early vs late-stage cancer diagnosis', value: '$150K–$500K', per: 'per case' },
        { label: 'Avg cost of preventable adverse drug event', value: '$12K–$28K', per: 'per event' },
        { label: 'Avg cost of inherited cardiac event (preventable)', value: '$80K–$300K', per: 'per event' },
      ],
    },
    {
      label: 'Pharmacy/Medication Optimization',
      color: C.amber,
      metrics: [
        {
          label: 'Estimated participants',
          value: participants.toLocaleString(),
          sub: `${partRate}% participation in targeted cohort`,
          color: C.teal,
        },
        {
          label: 'Members with actionable PGx medication insights',
          value: Math.round(participants * 0.38).toLocaleString(),
          sub: '~38% of medication-complex cohort with actionable PGx findings',
          color: C.amber,
        },
        {
          label: 'Medication optimization actions taken',
          value: Math.round(participants * 0.38 * 0.50).toLocaleString(),
          sub: 'Estimated 50% provider/member action rate on PGx findings',
          color: C.green,
        },
        {
          label: 'Estimated adverse event prevention opportunities',
          value: Math.round(participants * 0.38 * 0.25).toLocaleString(),
          sub: '~25% of actionable cases with adverse event risk reduction potential',
          color: C.red,
        },
      ],
      benchmarks: [
        { label: 'Avg cost per medication failure/switching episode', value: '$2K–$8K', per: 'per episode' },
        { label: 'Avg hospitalization cost: adverse drug event', value: '$12K–$35K', per: 'per event' },
        { label: 'Specialty pharmacy optimization savings potential', value: '$15K–$50K', per: 'per member/year' },
      ],
    },
    {
      label: 'Care Management Prioritization',
      color: C.blue,
      metrics: [
        {
          label: 'Population with genomic risk layer added',
          value: pop.toLocaleString(),
          sub: 'Eligible population with enhanced risk stratification',
          color: C.teal,
        },
        {
          label: 'Members with newly identified elevated risk',
          value: Math.round(participants * 0.17).toLocaleString(),
          sub: '~17% actionable finding rate among those sequenced',
          color: C.blue,
        },
        {
          label: 'Incremental care management engagements enabled',
          value: Math.round(participants * 0.17 * 0.50).toLocaleString(),
          sub: 'Better prioritized outreach with genomic risk signal',
          color: C.green,
        },
        {
          label: 'Estimated preventive care activations',
          value: Math.round(participants * 0.15).toLocaleString(),
          sub: '~15% of participants completing new preventive care steps',
          color: C.amber,
        },
      ],
      benchmarks: [
        { label: 'Avg cost of avoided care escalation', value: '$25K–$100K', per: 'per event' },
        { label: 'Avg hospitalization cost: avoidable cardiovascular event', value: '$40K–$200K', per: 'per event' },
        { label: 'Avg cost of late-stage vs early-stage hereditary cancer', value: '$150K+', per: 'difference per case' },
      ],
    },
  ]

  const pd = pathwayData[pathway]

  return (
    <section id="roi" style={{ padding: '100px 0', background: C.bgNavy, position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse at 10% 50%, rgba(0,229,195,0.05) 0%, transparent 55%)`,
      }} />
      <div style={{ ...sectionWrap, position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ ...pill(), marginBottom: 16 }}>ROI Explorer</div>
          <h2 style={{
            fontFamily: fontDisplay, fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 800, letterSpacing: '-0.02em', color: C.textPrimary, lineHeight: 1.1,
          }}>Estimate your potential impact</h2>
          <p style={{ color: C.textSecondary, fontSize: 17, maxWidth: 560, margin: '16px auto 0', fontWeight: 300, lineHeight: 1.65 }}>
            Input your eligible population and see estimated program metrics alongside industry cost benchmarks. All benchmarks are sourced from published healthcare economics research.
          </p>
          <p style={{ color: C.textMuted, fontSize: 13, maxWidth: 540, margin: '10px auto 0', fontStyle: 'italic', lineHeight: 1.6 }}>
            Note: These projections are estimates based on published industry benchmarks and are not guarantees of outcomes. Individual results will vary by population characteristics and program design.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 380px) 1fr', gap: 24, alignItems: 'start' }}>
          {/* Controls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ background: C.bgCard, borderRadius: 16, padding: '28px', border: `1px solid ${C.border}` }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.teal, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: fontDisplay, marginBottom: 20 }}>Configure Your Pilot</div>

              <div style={{ marginBottom: 28 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <label style={{ fontSize: 14, color: C.textPrimary, fontWeight: 500 }}>Eligible Population</label>
                  <span style={{ fontFamily: fontDisplay, fontSize: 16, fontWeight: 700, color: C.teal }}>{pop.toLocaleString()}</span>
                </div>
                <input type="range" min="500" max="50000" step="500" value={pop}
                  onChange={e => setPop(Number(e.target.value))}
                  style={{ accentColor: C.teal }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                  <span style={{ color: C.textMuted, fontSize: 12 }}>500</span>
                  <span style={{ color: C.textMuted, fontSize: 12 }}>50,000</span>
                </div>
              </div>

              <div style={{ marginBottom: 28 }}>
                <label style={{ fontSize: 14, color: C.textPrimary, fontWeight: 500, display: 'block', marginBottom: 12 }}>Participation Rate Assumption</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  {[
                    { label: 'Conservative', val: 20 },
                    { label: 'Moderate', val: 30 },
                    { label: 'Optimistic', val: 40 },
                  ].map(o => (
                    <button key={o.val} onClick={() => setPartRate(o.val)} style={{
                      flex: 1, padding: '10px 4px',
                      borderRadius: 8, border: `1px solid ${partRate === o.val ? C.teal + '60' : C.borderSubtle}`,
                      background: partRate === o.val ? C.tealGlow : C.bgMid,
                      color: partRate === o.val ? C.teal : C.textMuted,
                      fontSize: 12, fontWeight: 600, fontFamily: fontDisplay,
                      cursor: 'pointer', transition: 'all 0.2s',
                    }}>
                      <div style={{ fontSize: 14, fontWeight: 800 }}>{o.val}%</div>
                      <div style={{ fontSize: 10, marginTop: 2 }}>{o.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ fontSize: 14, color: C.textPrimary, fontWeight: 500, display: 'block', marginBottom: 12 }}>Partnership Pathway</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {pathwayData.map((p, i) => (
                    <button key={i} onClick={() => setPathway(i)} style={{
                      padding: '12px 16px', borderRadius: 8, textAlign: 'left',
                      border: `1px solid ${pathway === i ? p.color + '50' : C.borderSubtle}`,
                      background: pathway === i ? `${p.color}10` : C.bgMid,
                      color: pathway === i ? C.textPrimary : C.textSecondary,
                      fontSize: 13, fontWeight: pathway === i ? 600 : 400, cursor: 'pointer',
                      transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 8,
                    }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: p.color, flexShrink: 0 }} />
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Metric cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 12 }}>
              {pd.metrics.map((m, i) => (
                <div key={`${pathway}-${i}`} style={{
                  background: C.bgCard, borderRadius: 14, padding: '22px 20px',
                  border: `1px solid ${m.color}25`,
                  animation: 'count-up 0.4s ease both',
                }}>
                  <div style={{
                    fontFamily: fontDisplay, fontSize: 30, fontWeight: 800,
                    color: m.color, lineHeight: 1, marginBottom: 8,
                  }}>{m.value}</div>
                  <div style={{ color: C.textPrimary, fontSize: 13, fontWeight: 600, lineHeight: 1.3, marginBottom: 6 }}>{m.label}</div>
                  <div style={{ color: C.textMuted, fontSize: 12, lineHeight: 1.5, fontWeight: 300 }}>{m.sub}</div>
                </div>
              ))}
            </div>

            {/* Industry benchmarks */}
            <div style={{ background: C.bgCard, borderRadius: 14, padding: '24px', border: `1px solid ${C.border}` }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.textMuted, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: fontDisplay, marginBottom: 16 }}>
                Industry Cost Benchmarks (Published Healthcare Economics Research)
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {pd.benchmarks.map((b, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap',
                    paddingBottom: 12, borderBottom: i < pd.benchmarks.length - 1 ? `1px solid ${C.borderSubtle}` : 'none',
                  }}>
                    <span style={{ color: C.textSecondary, fontSize: 13, fontWeight: 300, flex: 1 }}>{b.label}</span>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <span style={{ fontFamily: fontDisplay, fontWeight: 700, color: pd.color, fontSize: 16 }}>{b.value}</span>
                      <span style={{ color: C.textMuted, fontSize: 11, display: 'block' }}>{b.per}</span>
                    </div>
                  </div>
                ))}
              </div>
              <p style={{ color: C.textMuted, fontSize: 11, marginTop: 14, lineHeight: 1.6, fontStyle: 'italic' }}>
                Benchmarks sourced from published clinical literature, AHRQ, CMS, and peer-reviewed health economics research. Not a projection of specific program outcomes.
              </p>
            </div>

            {/* Total Estimated Savings */}
            {(() => {
              // Savings calculations by pathway — all based on published industry benchmarks, not MyOme pricing
              let conservativeLow, conservativeHigh, moderateLow, moderateHigh, optimisticLow, optimisticHigh
              const p = participants
              if (pathway === 0) {
                // Employer/Prevention: early detection value + med optimization
                const followT = Math.round(p * 0.17 * 0.5)
                const medOpt = Math.round(p * 0.28 * 0.5)
                conservativeLow  = followT * 0.04 * 150000 + medOpt * 1500
                conservativeHigh = followT * 0.06 * 200000 + medOpt * 2500
                moderateLow      = followT * 0.07 * 200000 + medOpt * 3000
                moderateHigh     = followT * 0.10 * 300000 + medOpt * 5000
                optimisticLow    = followT * 0.10 * 300000 + medOpt * 5000
                optimisticHigh   = followT * 0.15 * 450000 + medOpt * 8000
              } else if (pathway === 1) {
                // Pharmacy: med optimization + adverse event prevention
                const medActions = Math.round(p * 0.38 * 0.50)
                const adePrevent = Math.round(p * 0.38 * 0.25)
                conservativeLow  = medActions * 1500 + adePrevent * 10000
                conservativeHigh = medActions * 2500 + adePrevent * 15000
                moderateLow      = medActions * 3000 + adePrevent * 18000
                moderateHigh     = medActions * 5000 + adePrevent * 25000
                optimisticLow    = medActions * 5000 + adePrevent * 25000
                optimisticHigh   = medActions * 8000 + adePrevent * 35000
              } else {
                // Care Management: incremental impacted members
                const incremental = Math.round(p * 0.17 * 0.50)
                conservativeLow  = incremental * 20000
                conservativeHigh = incremental * 35000
                moderateLow      = incremental * 35000
                moderateHigh     = incremental * 65000
                optimisticLow    = incremental * 65000
                optimisticHigh   = incremental * 100000
              }

              const fmt = (n) => {
                if (n >= 1000000) return `$${(n / 1000000).toFixed(1)}M`
                if (n >= 1000) return `$${Math.round(n / 1000)}K`
                return `$${n}`
              }

              const scenarios = [
                { label: 'Conservative', low: conservativeLow, high: conservativeHigh, color: C.textSecondary, bg: C.bgMid },
                { label: 'Moderate', low: moderateLow, high: moderateHigh, color: C.teal, bg: 'rgba(0,229,195,0.08)' },
                { label: 'Optimistic', low: optimisticLow, high: optimisticHigh, color: C.green, bg: 'rgba(0,229,160,0.06)' },
              ]

              return (
                <div style={{
                  background: `linear-gradient(135deg, rgba(0,229,195,0.08) 0%, rgba(77,170,255,0.06) 100%)`,
                  border: `1px solid rgba(0,229,195,0.3)`,
                  borderRadius: 14, padding: '28px 24px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: C.teal, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: fontDisplay, marginBottom: 4 }}>
                        Estimated Total Value Range
                      </div>
                      <div style={{ color: C.textSecondary, fontSize: 13, fontWeight: 300 }}>
                        Based on {participants.toLocaleString()} participants — industry benchmark methodology
                      </div>
                    </div>
                    <div style={{ fontSize: 10, color: C.textMuted, fontStyle: 'italic', maxWidth: 180, textAlign: 'right', lineHeight: 1.5 }}>
                      Estimates only. Actual results vary by population and program design.
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                    {scenarios.map((s, i) => (
                      <div key={i} style={{
                        background: s.bg, borderRadius: 10, padding: '16px 14px', textAlign: 'center',
                        border: `1px solid ${s.color}25`,
                        animation: 'count-up 0.4s ease both',
                      }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: s.color === C.textSecondary ? C.textMuted : s.color, letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: fontDisplay, marginBottom: 8 }}>{s.label}</div>
                        <div style={{ fontFamily: fontDisplay, fontSize: 20, fontWeight: 800, color: s.color, lineHeight: 1 }}>
                          {fmt(s.low)}
                        </div>
                        <div style={{ color: C.textMuted, fontSize: 11, margin: '4px 0' }}>to</div>
                        <div style={{ fontFamily: fontDisplay, fontSize: 20, fontWeight: 800, color: s.color, lineHeight: 1 }}>
                          {fmt(s.high)}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ marginTop: 16, padding: '12px 14px', background: 'rgba(255,255,255,0.04)', borderRadius: 8 }}>
                    <p style={{ color: C.textMuted, fontSize: 12, lineHeight: 1.6 }}>
                      <strong style={{ color: C.textSecondary }}>How this is calculated:</strong> Estimated value is derived by applying published industry cost benchmarks to the projected number of actionable outcomes in this pilot — including medication optimization episodes, adverse event prevention, early detection value, and avoided care escalations. This is not a MyOme revenue or pricing figure.
                    </p>
                  </div>
                </div>
              )
            })()}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Pathway Finder ───────────────────────────────────────────────────────────
function PathwayFinder() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState([])
  const [result, setResult] = useState(null)

  const questions = [
    {
      q: 'What is the most important thing your organization is trying to accomplish right now?',
      options: [
        { text: 'Differentiate our employer or commercial plan offerings', icon: '🏆' },
        { text: 'Reduce pharmacy and medication-related costs', icon: '💊' },
        { text: 'Improve care management targeting and efficiency', icon: '🎯' },
        { text: 'All of the above — we have multiple priorities', icon: '⚡' },
      ],
    },
    {
      q: 'How quickly do you need to show measurable results?',
      options: [
        { text: 'Within this benefit year (under 12 months)', icon: '🚀' },
        { text: 'Within 12 to 24 months', icon: '📅' },
        { text: 'This is a strategic, multi-year investment', icon: '🔭' },
        { text: 'Timeline is flexible — value is what matters', icon: '✨' },
      ],
    },
    {
      q: 'Which population does this program primarily serve?',
      options: [
        { text: 'Self-funded employers and ASO accounts', icon: '🏢' },
        { text: 'Commercial fully-insured members', icon: '📋' },
        { text: 'Complex, high-cost, or high-risk member cohorts', icon: '🔴' },
        { text: 'A mix of commercial and employer populations', icon: '🔀' },
      ],
    },
  ]

  const getResult = (ans) => {
    const a0 = ans[0], a1 = ans[1], a2 = ans[2]
    if (a0 === 1 || (a0 === 3 && a1 === 0)) {
      return {
        path: 'Pharmacy & Medication Optimization',
        badge: 'Fastest ROI',
        color: C.amber,
        icon: '⚗️',
        why: 'Based on your answers, the fastest path to measurable value for your organization is a targeted pharmacogenomics pilot. This pathway delivers quantifiable results within a single benefit year — making it the easiest business case to build and the fastest proof point for future expansion.',
        next: 'Identify a high-cost medication cohort (behavioral health, polypharmacy, specialty pharmacy, or cardiometabolic) and design a 12-month pilot around that population.',
      }
    }
    if (a0 === 0 || a2 === 0) {
      return {
        path: 'Employer & ASO Innovation',
        badge: 'Fastest to Launch',
        color: C.green,
        icon: '🏢',
        why: 'Your priorities align best with the Employer and ASO Innovation pathway. This is the lowest-friction entry point — enabling Maro to bring a differentiated precision-prevention offering to strategic employer accounts without requiring a broad payer enterprise commitment.',
        next: 'Identify one strategic ASO employer account where benefit innovation, employee engagement, and long-term cost trend matter. Design a voluntary pilot for that population.',
      }
    }
    if (a0 === 2 || a2 === 2) {
      return {
        path: 'Care Management Prioritization',
        badge: 'Highest Strategic Ceiling',
        color: C.blue,
        icon: '🎯',
        why: 'Your answers point to the Care Management Prioritization pathway. This is the most strategically powerful long-term play — adding a genomic risk layer to existing care management infrastructure to improve prioritization and catch rising-risk members earlier.',
        next: 'Define a high-risk or rising-risk cohort in your existing care management population. Begin with a pilot focused on cardiovascular, metabolic, or hereditary cancer risk identification.',
      }
    }
    return {
      path: 'All Three Pathways Apply',
      badge: 'Comprehensive Strategy',
      color: C.teal,
      icon: '⚡',
      why: 'Your situation is well-suited to all three partnership pathways. The recommended sequencing is: start with Employer/ASO Innovation to establish a commercial foothold, layer in Pharmacy Optimization to build the financial ROI story, and expand into Care Management Prioritization for long-term strategic value.',
      next: 'Start with one employer or pharmacy pilot to generate proof points, then use those outcomes to drive the broader care management conversation.',
    }
  }

  const handleAnswer = (idx) => {
    const newAnswers = [...answers, idx]
    setAnswers(newAnswers)
    if (step < questions.length - 1) {
      setStep(step + 1)
    } else {
      setResult(getResult(newAnswers))
    }
  }

  const reset = () => { setStep(0); setAnswers([]); setResult(null) }

  return (
    <section id="finder" style={{ padding: '100px 0', background: C.bgDeep, position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse at 80% 30%, rgba(77,170,255,0.05) 0%, transparent 50%)`,
      }} />
      <div style={{ ...sectionWrap, position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ ...pill(C.blue), marginBottom: 16 }}>Partnership Finder</div>
          <h2 style={{
            fontFamily: fontDisplay, fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 800, letterSpacing: '-0.02em', color: C.textPrimary, lineHeight: 1.1,
          }}>Find your best starting point</h2>
          <p style={{ color: C.textSecondary, fontSize: 17, maxWidth: 500, margin: '16px auto 0', fontWeight: 300, lineHeight: 1.65 }}>
            Answer three questions and we'll show you which partnership pathway fits your organization best.
          </p>
        </div>

        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          {/* Progress */}
          {!result && (
            <div style={{ display: 'flex', gap: 8, marginBottom: 36 }}>
              {questions.map((_, i) => (
                <div key={i} style={{
                  flex: 1, height: 4, borderRadius: 2,
                  background: i <= step ? C.teal : C.bgMid,
                  transition: 'background 0.4s',
                }} />
              ))}
            </div>
          )}

          {!result ? (
            <div style={{
              background: C.bgCard, borderRadius: 20,
              border: `1px solid ${C.border}`, padding: '40px 36px',
              animation: 'fadeUp 0.4s ease both',
            }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.teal, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: fontDisplay, marginBottom: 16 }}>
                Question {step + 1} of {questions.length}
              </div>
              <h3 style={{ fontFamily: fontDisplay, fontSize: 22, fontWeight: 700, color: C.textPrimary, marginBottom: 32, lineHeight: 1.3 }}>
                {questions[step].q}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {questions[step].options.map((opt, i) => (
                  <button key={i} onClick={() => handleAnswer(i)} style={{
                    padding: '18px 22px', borderRadius: 12, textAlign: 'left', cursor: 'pointer',
                    background: C.bgMid, border: `1px solid ${C.borderSubtle}`,
                    color: C.textPrimary, fontSize: 15, fontWeight: 400,
                    display: 'flex', alignItems: 'center', gap: 14,
                    transition: 'all 0.2s',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = C.teal + '50'; e.currentTarget.style.background = C.tealGlow; e.currentTarget.style.color = C.textPrimary }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = C.borderSubtle; e.currentTarget.style.background = C.bgMid }}
                  >
                    <span style={{ fontSize: 20, flexShrink: 0 }}>{opt.icon}</span>
                    <span>{opt.text}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div style={{
              background: C.bgCard, borderRadius: 20,
              border: `1px solid ${result.color}40`, padding: '40px 36px',
              animation: 'fadeUp 0.4s ease both',
            }}>
              <div style={{ textAlign: 'center', marginBottom: 32 }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>{result.icon}</div>
                <div style={{
                  display: 'inline-block', padding: '4px 14px', borderRadius: 100,
                  background: `${result.color}20`, color: result.color,
                  fontSize: 11, fontWeight: 700, letterSpacing: '0.1em',
                  textTransform: 'uppercase', fontFamily: fontDisplay, marginBottom: 12,
                }}>{result.badge}</div>
                <h3 style={{ fontFamily: fontDisplay, fontSize: 28, fontWeight: 800, color: C.textPrimary, marginBottom: 8, letterSpacing: '-0.02em' }}>
                  {result.path}
                </h3>
              </div>

              <div style={{ background: `${result.color}08`, border: `1px solid ${result.color}25`, borderRadius: 12, padding: '22px 24px', marginBottom: 20 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: result.color, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: fontDisplay, marginBottom: 10 }}>Why This Fits</div>
                <p style={{ color: C.textSecondary, fontSize: 15, lineHeight: 1.75, fontWeight: 300 }}>{result.why}</p>
              </div>

              <div style={{ background: C.bgMid, borderRadius: 12, padding: '22px 24px', marginBottom: 28 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.textMuted, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: fontDisplay, marginBottom: 10 }}>Recommended Next Step</div>
                <p style={{ color: C.textSecondary, fontSize: 15, lineHeight: 1.75, fontWeight: 300 }}>{result.next}</p>
              </div>

              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a href="#contact" style={{
                  flex: 1, padding: '14px 24px', borderRadius: 10, textAlign: 'center',
                  background: `linear-gradient(135deg, ${C.teal}, ${C.blue})`,
                  color: '#fff', fontWeight: 700, fontSize: 15,
                  textDecoration: 'none', fontFamily: fontDisplay,
                }}>Start the Conversation</a>
                <button onClick={reset} style={{
                  padding: '14px 24px', borderRadius: 10,
                  background: C.bgMid, border: `1px solid ${C.borderSubtle}`,
                  color: C.textSecondary, fontWeight: 500, fontSize: 15, cursor: 'pointer',
                }}>Start Over</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

// ─── Privacy & Trust ──────────────────────────────────────────────────────────
function PrivacyTrust() {
  const points = [
    {
      icon: '🔒',
      title: 'Employers never see individual genetic data',
      body: 'Employers receive only de-identified, aggregate population-level analytics. Individual genetic information is never disclosed to HR, benefits leadership, or company management — period.',
    },
    {
      icon: '📋',
      title: 'GINA protections are foundational, not footnotes',
      body: 'The Genetic Information Nondiscrimination Act (GINA) prohibits the use of genetic information in employment decisions and restricts employers from requesting or using genetic data. MyOme\'s program design is built around these protections.',
    },
    {
      icon: '✋',
      title: 'Participation is always voluntary and fully informed',
      body: 'Members opt in on their own terms. Consent is plain-language, specific, and transparent. No one is required to participate, and opting out has no impact on coverage or benefits.',
    },
    {
      icon: '🏥',
      title: 'Clinical data flows only where consented',
      body: 'Genomic insights are routed appropriately — to the member, their provider, or clinical care teams — only within consented boundaries. The plan receives workflow-relevant signals appropriate to clinical and operational use cases.',
    },
    {
      icon: '🛡️',
      title: 'No underwriting use. No employment use. Ever.',
      body: 'Genetic information is never used to adjust premiums, change coverage decisions, make employment determinations, or inform actuarial underwriting models. These protections are structural, not just policy.',
    },
    {
      icon: '💾',
      title: 'Clear data retention and ownership',
      body: 'Members control their own genomic data. Retention policies are explicit and transparent. The program is designed with privacy engineers and legal counsel, not added as an afterthought.',
    },
  ]

  return (
    <section id="privacy" style={{ padding: '100px 0', background: C.bgNavy, position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse at 40% 60%, rgba(0,229,195,0.04) 0%, transparent 55%)`,
      }} />
      <div style={{ ...sectionWrap, position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{ ...pill(C.green), marginBottom: 16 }}>Privacy & Trust</div>
          <h2 style={{
            fontFamily: fontDisplay, fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 800, letterSpacing: '-0.02em', color: C.textPrimary, lineHeight: 1.1,
          }}>The trust architecture<br />is not an afterthought</h2>
          <p style={{ color: C.textSecondary, fontSize: 17, maxWidth: 560, margin: '16px auto 0', fontWeight: 300, lineHeight: 1.65 }}>
            We know privacy is the first question. Here is how we have designed around it — structurally, not just in policy language.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {points.map((p, i) => (
            <div key={i} style={{
              padding: '28px', background: C.bgCard, borderRadius: 14,
              border: `1px solid ${C.borderSubtle}`,
              transition: 'border-color 0.3s, transform 0.3s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = `${C.teal}30`; e.currentTarget.style.transform = 'translateY(-3px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.borderSubtle; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              <div style={{ fontSize: 28, marginBottom: 14 }}>{p.icon}</div>
              <h3 style={{ fontFamily: fontDisplay, fontSize: 16, fontWeight: 700, color: C.textPrimary, marginBottom: 10, lineHeight: 1.3 }}>{p.title}</h3>
              <p style={{ color: C.textSecondary, fontSize: 14, lineHeight: 1.7, fontWeight: 300 }}>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Long Game ────────────────────────────────────────────────────────────────
function LongGame() {
  return (
    <section style={{ padding: '100px 0', background: C.bgDeep, position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse at 70% 30%, rgba(77,170,255,0.06) 0%, transparent 55%),
                     radial-gradient(ellipse at 20% 80%, rgba(0,229,195,0.04) 0%, transparent 50%)`,
      }} />
      <div style={{ ...sectionWrap, position: 'relative' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 64, alignItems: 'center' }}>
          <div>
            <div style={{ ...pill(C.blue), marginBottom: 20 }}>The Long Game</div>
            <h2 style={{
              fontFamily: fontDisplay, fontSize: 'clamp(28px, 4vw, 44px)',
              fontWeight: 800, letterSpacing: '-0.02em', color: C.textPrimary, lineHeight: 1.05, marginBottom: 24,
            }}>
              The test is the<br />
              <span style={{
                background: `linear-gradient(90deg, ${C.teal}, ${C.blue})`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>entry point.</span>
            </h2>
            <p style={{ color: C.textSecondary, fontSize: 17, lineHeight: 1.75, fontWeight: 300, marginBottom: 20 }}>
              The genomic test is not the product. It is the first step in building a persistent predictive health intelligence layer for your member population.
            </p>
            <p style={{ color: C.textSecondary, fontSize: 17, lineHeight: 1.75, fontWeight: 300 }}>
              Unlike lab tests, claims data, or wellness surveys, the genome does not expire. A member sequenced today carries data that will become more valuable as AI models improve, clinical science advances, and new gene-disease associations are discovered. The asset grows. The insights compound.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              {
                phase: 'Year 1',
                title: 'Pilot',
                items: ['Employer or pharmacy pilot', 'Early engagement and findings', 'Medication optimization proof', 'Initial risk identification'],
                color: C.teal,
              },
              {
                phase: 'Year 1–2',
                title: 'Expand',
                items: ['Additional employer populations', 'Deeper pharmacy integration', 'Care management workflow integration', 'Provider-facing risk tools'],
                color: C.blue,
              },
              {
                phase: 'Year 2–3+',
                title: 'Transform',
                items: ['PMPM precision-health model', 'Longitudinal predictive risk engine', 'AI-enhanced population insights', 'Preventive care infrastructure layer'],
                color: C.amber,
              },
            ].map((ph, i) => (
              <div key={i} style={{
                background: C.bgCard, borderRadius: 14, padding: '22px 24px',
                border: `1px solid ${ph.color}25`,
                display: 'flex', gap: 20, alignItems: 'flex-start',
              }}>
                <div>
                  <div style={{ fontFamily: fontDisplay, fontSize: 11, fontWeight: 700, color: ph.color, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 2 }}>{ph.phase}</div>
                  <div style={{ fontFamily: fontDisplay, fontSize: 16, fontWeight: 700, color: C.textPrimary, marginBottom: 10 }}>{ph.title}</div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {ph.items.map((item, j) => (
                      <li key={j} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 4, height: 4, borderRadius: '50%', background: ph.color, flexShrink: 0 }} />
                        <span style={{ color: C.textSecondary, fontSize: 13, fontWeight: 300 }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── CTA / Contact ────────────────────────────────────────────────────────────
function CTASection() {
  return (
    <section id="contact" style={{
      padding: '100px 0 120px',
      background: `radial-gradient(ellipse at 50% 0%, rgba(0,229,195,0.08) 0%, transparent 60%), ${C.bgNavy}`,
      position: 'relative', overflow: 'hidden',
      borderTop: `1px solid ${C.border}`,
    }}>
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: 1, height: 80, background: `linear-gradient(to bottom, ${C.teal}, transparent)`,
      }} />
      <div style={{ ...sectionWrap, textAlign: 'center', position: 'relative' }}>
        <h2 style={{
          fontFamily: fontDisplay, fontSize: 'clamp(28px, 5vw, 52px)',
          fontWeight: 800, letterSpacing: '-0.025em', color: C.textPrimary, lineHeight: 1.05, marginBottom: 20,
        }}>
          Ready to explore<br />what's possible?
        </h2>
        <p style={{ color: C.textSecondary, fontSize: 18, maxWidth: 520, margin: '0 auto 48px', fontWeight: 300, lineHeight: 1.65 }}>
          We are not looking for every health plan. We are looking for the right partners who see the opportunity in precision prevention and want to build something that actually changes outcomes.
        </p>

        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 48 }}>
          <a href="mailto:partnerships@myome.com" style={{
            padding: '16px 36px', borderRadius: 10,
            background: `linear-gradient(135deg, ${C.teal}, ${C.blue})`,
            color: '#fff', fontWeight: 700, fontSize: 16,
            textDecoration: 'none', fontFamily: fontDisplay,
            boxShadow: `0 8px 32px rgba(0,229,195,0.25)`,
            transition: 'transform 0.2s, box-shadow 0.2s', letterSpacing: '-0.01em',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 12px 40px rgba(0,229,195,0.35)` }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 8px 32px rgba(0,229,195,0.25)` }}
          >Start the Conversation</a>
        </div>

        {/* Differentiation reminders */}
        <div style={{ display: 'flex', gap: 32, justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { icon: '🚫', text: 'No enterprise-wide commitment required to start' },
            { icon: '📊', text: 'Pilot designed around your metrics and timeline' },
            { icon: '🔒', text: 'Privacy-first architecture, built in — not bolted on' },
          ].map((r, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 18 }}>{r.icon}</span>
              <span style={{ color: C.textMuted, fontSize: 14, fontWeight: 300 }}>{r.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{
      background: C.bgDeep, padding: '40px 24px',
      borderTop: `1px solid ${C.borderSubtle}`,
    }}>
      <div style={{
        ...sectionWrap,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 30, height: 30, borderRadius: 8,
            background: `linear-gradient(135deg, ${C.teal}, ${C.blue})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 12, fontWeight: 800, color: '#fff', fontFamily: fontDisplay,
          }}>M</div>
          <span style={{ fontFamily: fontDisplay, fontWeight: 700, fontSize: 16, color: C.textPrimary }}>
            My<span style={{ color: C.teal }}>Ome</span>
          </span>
          <span style={{ color: C.textMuted, fontSize: 13 }}>— Precision Prevention for Health Plans & Payers</span>
        </div>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          {['How It Works', 'Pathways', 'ROI Explorer', 'Find Your Path', 'Privacy'].map((l, i) => (
            <a key={i} href={`#${l.toLowerCase().replace(/ /g, '-').replace("'", '')}`} style={{
              color: C.textMuted, textDecoration: 'none', fontSize: 13, fontWeight: 400,
              transition: 'color 0.2s',
            }}
              onMouseEnter={e => e.target.style.color = C.teal}
              onMouseLeave={e => e.target.style.color = C.textMuted}
            >{l}</a>
          ))}
        </div>
        <div style={{ color: C.textMuted, fontSize: 12 }}>
          © {new Date().getFullYear()} MyOme Health, Inc. · For Partnership Inquiries Only
        </div>
      </div>
    </footer>
  )
}

// ─── App root ─────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div style={{ fontFamily: fontBody, background: C.bgDeep }}>
      <Nav />
      <Hero />
      <ProblemSection />
      <HowItWorks />
      <WhatWeScreen />
      <PartnershipPaths />
      <ROIExplorer />
      <PathwayFinder />
      <PrivacyTrust />
      <LongGame />
      <CTASection />
      <Footer />
    </div>
  )
}

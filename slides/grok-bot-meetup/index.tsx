import {
  type DesignSystem,
  type Page,
  type SlideMeta,
  type SlideTransition,
  Step,
  Steps,
  useIsActivePage,
  useSlidePageNumber,
} from '@open-slide/core';
import type { CSSProperties, ReactNode } from 'react';
import geistMono from './assets/fonts/GeistMono-Variable.woff2';
import usDisplay400 from './assets/fonts/US-Display-400.woff2';
import usDisplay550 from './assets/fonts/US-Display-550.woff2';
import usText400 from './assets/fonts/US-Text-400.woff2';
import usText550 from './assets/fonts/US-Text-550.woff2';
import meetupQr from './assets/meetup-qr.png';
import silkMagenta from './assets/silk-magenta.jpg';
import silkOrange from './assets/silk-orange.jpg';
import wordmarkBlack from './assets/spacexai-wordmark-black.svg';
import wordmarkWhite from './assets/spacexai-wordmark-white.svg';
import studentRoom from './assets/student-school-room.png';

export const design: DesignSystem = {
  palette: { bg: '#ffffff', text: '#0b0b0f', accent: '#c0278a' },
  fonts: {
    display:
      '"Universal Sans Display", Inter, "Inter Variable", system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
    body: '"Universal Sans Text", Inter, "Inter Variable", system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
  },
  typeScale: { hero: 184, body: 40 },
  radius: 36,
};

const INK = '#0b0b0f';
const INK_2 = '#3a3a44';
const MUTED = '#62626e';
const CARD = '#f4f4f6';
const HAIRLINE = '#e2e2e7';
const MONO = '"Geist Mono", ui-monospace, "SF Mono", Menlo, Consolas, monospace';
const EASE_OUT = 'cubic-bezier(0, 0, 0.2, 1)';
const EASE_IN = 'cubic-bezier(0.4, 0, 1, 1)';
const HOLD: Keyframe[] = [{ opacity: 1 }, { opacity: 1 }];

type AccentName = 'magenta' | 'orange';

const ACCENTS: Record<
  AccentName,
  { solid: string; soft: string; silk: string; pos: string }
> = {
  magenta: {
    solid: '#c0278a',
    soft: 'rgba(192, 39, 138, 0.09)',
    silk: silkMagenta,
    pos: '28% 38%',
  },
  orange: {
    solid: '#e2560a',
    soft: 'rgba(242, 98, 10, 0.09)',
    silk: silkOrange,
    pos: '10% 28%',
  },
};

const HEAD_PATH =
  'M228.541 114.228C228.541 130.133 225.184 145.994 218.738 160.534C212.674 174.217 203.904 186.669 193.065 196.988C155.933 232.34 99.497 238.596 55.5255 212.24C45.097 205.99 35.6851 198.072 27.7451 188.866C19.1926 178.953 12.3686 167.569 7.65781 155.351C2.60712 142.264 0 128.257 0 114.228C0 98.3219 3.35751 82.4611 9.80315 67.9215C15.8672 54.2382 24.6377 41.7862 35.4767 31.4668C72.6081 -3.88483 129.044 -10.1413 173.016 16.2153C183.444 22.4653 192.856 30.3829 200.796 39.5896C209.349 49.5018 216.173 60.8859 220.883 73.1037C225.934 86.1906 228.541 100.198 228.541 114.228Z';
const EYE_A_PATH =
  'M118.17 70.73L120.45 71.04L122.59 71.76L124.55 72.87L126.18 74.38L127.42 76.24L128.34 78.29L129.10 80.42L129.83 82.57L130.55 84.72L131.27 86.86L131.97 89.02L132.64 91.19L133.29 93.36L133.91 95.55L134.50 97.74L135.05 99.95L135.36 102.23L135.16 104.55L134.41 106.80L133.11 108.84L131.36 110.51L129.28 111.73L127.01 112.45L124.68 112.65L122.41 112.33L120.31 111.51L118.45 110.26L116.93 108.62L115.81 106.69L115.01 104.57L114.39 102.39L113.80 100.19L113.17 98.01L112.52 95.84L111.85 93.66L111.17 91.51L110.47 89.35L109.75 87.20L108.94 85.09L108.17 82.96L107.64 80.75L107.63 78.44L108.31 76.16L109.61 74.14L111.41 72.51L113.54 71.41L115.84 70.83Z';
const EYE_B_PATH =
  'M179.77 59.76L182.04 60.05L184.10 60.75L185.92 61.77L187.55 63.03L188.95 64.50L190.10 66.16L191.07 67.95L191.90 69.82L192.67 71.74L193.41 73.66L194.13 75.60L194.80 77.56L195.42 79.55L196.02 81.54L196.56 83.57L197.06 85.61L197.50 87.67L197.90 89.77L198.06 91.94L197.82 94.21L197.15 96.51L195.85 98.72L193.75 100.38L191.30 101.01L189.00 100.81L186.99 100.03L185.30 98.85L183.91 97.38L182.84 95.66L182.05 93.76L181.48 91.76L181.00 89.71L180.53 87.64L180.02 85.60L179.48 83.58L178.89 81.58L178.26 79.60L177.60 77.62L176.90 75.68L176.15 73.76L175.36 71.86L174.53 69.98L173.78 68.06L173.41 65.97L173.71 63.70L175.05 61.53L177.32 60.14Z';

const CSS = `
@font-face { font-family: "Universal Sans Display"; src: url(${usDisplay400}) format("woff2"); font-weight: 400; font-display: swap; }
@font-face { font-family: "Universal Sans Display"; src: url(${usDisplay550}) format("woff2"); font-weight: 550 900; font-display: swap; }
@font-face { font-family: "Universal Sans Text"; src: url(${usText400}) format("woff2"); font-weight: 400; font-display: swap; }
@font-face { font-family: "Universal Sans Text"; src: url(${usText550}) format("woff2"); font-weight: 550 900; font-display: swap; }
@font-face { font-family: "Geist Mono"; src: url(${geistMono}) format("woff2"); font-weight: 100 900; font-display: swap; }

@keyframes gb-rise { from { opacity: 0; transform: translateY(22px); } }
@keyframes gb-fade { from { opacity: 0; } }
@keyframes gb-pop { 0% { opacity: 0; transform: scale(0.84); } 65% { opacity: 1; transform: scale(1.025); } 100% { opacity: 1; transform: scale(1); } }
@keyframes gb-draw { from { stroke-dashoffset: var(--len, 1); } to { stroke-dashoffset: 0; } }
@keyframes gb-wipe { from { clip-path: inset(0 100% 0 0); } to { clip-path: inset(0 0 0 0); } }
@keyframes gb-grow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@keyframes gb-growy { from { transform: scaleY(0); } to { transform: scaleY(1); } }
@keyframes gb-pan {
  from { transform: translate(-2.5%, -1.5%) scale(1.02); }
  to { transform: translate(2.5%, 1.5%) scale(1.09); }
}
@keyframes gb-blink {
  0%, 44%, 50%, 100% { transform: scaleY(1); }
  47% { transform: scaleY(0.05); }
  86%, 92% { transform: scaleY(1); }
  89% { transform: scaleY(0.05); }
}
@keyframes gb-wake {
  0% { transform: scaleY(0.05); }
  55% { transform: scaleY(1.14); }
  100% { transform: scaleY(1); }
}
@keyframes gb-look {
  0%, 12% { transform: translate(0, 0); }
  20%, 38% { transform: translate(7px, -5px); }
  48%, 64% { transform: translate(-6px, 4px); }
  74%, 100% { transform: translate(0, 0); }
}
@keyframes gb-glance {
  0%, 25% { transform: translate(0, 0); }
  50%, 100% { transform: translate(var(--lx, 0px), var(--ly, 0px)); }
}
@keyframes gb-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
@keyframes gb-strike { from { transform: scaleX(0) rotate(-4deg); } to { transform: scaleX(1) rotate(-4deg); } }

.gb-eye { transform-box: fill-box; transform-origin: center; }
.gb-on .gb-rise { animation: gb-rise 0.75s cubic-bezier(0.16, 1, 0.3, 1) var(--d, 0ms) both; }
.gb-on .gb-fade { animation: gb-fade 0.6s ${EASE_OUT} var(--d, 0ms) both; }
.gb-on .gb-pop { animation: gb-pop 0.85s cubic-bezier(0.2, 0.9, 0.3, 1) var(--d, 0ms) both; }
.gb-on .gb-draw { animation: gb-draw 0.9s cubic-bezier(0.4, 0, 0.2, 1) var(--d, 0ms) both; }
.gb-on .gb-wipe { animation: gb-wipe 1s cubic-bezier(0.7, 0, 0.2, 1) var(--d, 0ms) both; }
.gb-on .gb-grow { transform-origin: left center; animation: gb-grow 0.9s cubic-bezier(0.4, 0, 0.2, 1) var(--d, 0ms) both; }
.gb-on .gb-growy { transform-origin: center top; animation: gb-growy 1.1s cubic-bezier(0.4, 0, 0.2, 1) var(--d, 0ms) both; }
.gb-on .gb-strike { transform-origin: left center; animation: gb-strike 0.6s cubic-bezier(0.4, 0, 0.2, 1) var(--d, 0ms) both; }
.gb-on .gb-pan { animation: gb-pan 22s ease-in-out infinite alternate; }
.gb-on .gb-float { animation: gb-float 6s ease-in-out infinite; }
.gb-on .gb-idle { animation: gb-look 10s ease-in-out var(--ld, 1.2s) infinite; }
.gb-on .gb-glance { animation: gb-glance 2.4s cubic-bezier(0.3, 0, 0.2, 1) 0.2s both; }
.gb-on .gb-eye { animation: gb-blink 5.6s ease-in-out var(--bd, 1.6s) infinite; }
.gb-on .gb-wake .gb-eye { animation: gb-wake 0.9s cubic-bezier(0.3, 1.4, 0.5, 1) 0.6s both, gb-blink 5.6s ease-in-out 3.2s infinite; }
.gb-pan { transform: scale(1.04); }
.gb-strike { transform: rotate(-4deg); }
@media (prefers-reduced-motion: reduce) {
  .gb-on * { animation: none !important; }
}
`;

const STYLE_ID = 'osd-styles-grok-bot-meetup';
if (typeof document !== 'undefined') {
  let style = document.getElementById(STYLE_ID);
  if (!style) {
    style = document.createElement('style');
    style.id = STYLE_ID;
    document.head.appendChild(style);
  }
  if (style.textContent !== CSS) style.textContent = CSS;
}

const d = (ms: number): CSSProperties => ({ '--d': `${ms}ms` }) as CSSProperties;

export const transition: SlideTransition = {
  duration: 260,
  exit: { duration: 260, easing: EASE_IN, keyframes: HOLD },
  enter: {
    duration: 260,
    easing: EASE_OUT,
    keyframes: [
      { opacity: 0, transform: 'translateY(6px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ],
  },
};

const settle: SlideTransition = {
  duration: 280,
  exit: { duration: 280, easing: EASE_IN, keyframes: HOLD },
  enter: {
    duration: 280,
    easing: EASE_OUT,
    keyframes: [
      { opacity: 0, transform: 'translateY(12px)', filter: 'blur(4px)' },
      { opacity: 1, transform: 'translateY(0)', filter: 'blur(0)' },
    ],
  },
};

const breath: SlideTransition = {
  duration: 460,
  throughBackground: true,
  exit: { duration: 180, easing: EASE_IN, keyframes: [{ opacity: 1 }, { opacity: 0 }] },
  enter: {
    duration: 240,
    delay: 300,
    easing: EASE_OUT,
    keyframes: [
      { opacity: 0, transform: 'translateY(8px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ],
  },
};

type MarkTone = 'ink' | 'white';

/**
 * Official Grok Bot mark drawn from the brand SVG paths. `ink` is the light-canvas
 * version (dark head, white eyes); `white` is for silk panels. Eyes blink on a
 * loop, drift on an idle cycle, and optionally glance toward `look` after enter.
 */
function Mark({
  size,
  tone = 'ink',
  look = [0, 0],
  wake = false,
  idle = true,
  blinkDelay = 1.6,
}: {
  size: number;
  tone?: MarkTone;
  look?: [number, number];
  wake?: boolean;
  idle?: boolean;
  blinkDelay?: number;
}) {
  const head = tone === 'ink' ? INK : '#ffffff';
  const eye = tone === 'ink' ? '#ffffff' : INK;
  const eyeVars = { '--bd': `${blinkDelay}s` } as CSSProperties;
  const eyeVarsB = { '--bd': `${blinkDelay + 0.06}s` } as CSSProperties;
  const lookVars = {
    '--lx': `${look[0]}px`,
    '--ly': `${look[1]}px`,
    transform: `translate(${look[0]}px, ${look[1]}px)`,
  } as CSSProperties;
  return (
    <svg
      className={wake ? 'gb-wake' : undefined}
      viewBox="0 0 228.541 228.541"
      width={size}
      height={size}
      aria-hidden="true"
      style={{ display: 'block', overflow: 'visible', flexShrink: 0 }}
    >
      <path d={HEAD_PATH} fill={head} />
      <g className={idle ? 'gb-idle' : undefined} style={{ '--ld': `${blinkDelay}s` } as CSSProperties}>
        <g className="gb-glance" style={lookVars}>
          <path className="gb-eye" style={eyeVars} d={EYE_A_PATH} fill={eye} />
          <path className="gb-eye" style={eyeVarsB} d={EYE_B_PATH} fill={eye} />
        </g>
      </g>
    </svg>
  );
}

/** The brand eye motif alone, sized to sit inside a silk capsule. */
function Eyes({ width, color = '#ffffff' }: { width: number; color?: string }) {
  return (
    <svg
      viewBox="98 52 108 68"
      width={width}
      height={(width * 68) / 108}
      aria-hidden="true"
      style={{ display: 'block', overflow: 'visible' }}
    >
      <g className="gb-idle" style={{ '--ld': '1.4s' } as CSSProperties}>
        <path className="gb-eye" style={{ '--bd': '2s' } as CSSProperties} d={EYE_A_PATH} fill={color} />
        <path className="gb-eye" style={{ '--bd': '2.06s' } as CSSProperties} d={EYE_B_PATH} fill={color} />
      </g>
    </svg>
  );
}

/** Silk gradient container cropped from the official theme art. Use for moments, not backgrounds. */
function Silk({
  accent,
  width,
  height,
  radius = 48,
  pos,
  children,
  style,
}: {
  accent: AccentName;
  width: number | string;
  height: number | string;
  radius?: number | string;
  pos?: string;
  children?: ReactNode;
  style?: CSSProperties;
}) {
  const a = ACCENTS[accent];
  return (
    <div
      style={{
        position: 'relative',
        width,
        height,
        borderRadius: radius,
        overflow: 'hidden',
        background: a.solid,
        flexShrink: 0,
        ...style,
      }}
    >
      <img
        className="gb-pan"
        src={a.silk}
        alt=""
        style={{
          position: 'absolute',
          left: '-6%',
          top: '-6%',
          width: '112%',
          height: '112%',
          objectFit: 'cover',
          objectPosition: pos ?? a.pos,
        }}
      />
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>{children}</div>
    </div>
  );
}

function Canvas({
  children,
  accent = 'magenta',
  header = true,
  onSilk = false,
  bare = false,
}: {
  children: ReactNode;
  accent?: AccentName;
  header?: boolean;
  onSilk?: boolean;
  bare?: boolean;
}) {
  const active = useIsActivePage();
  const { current, total } = useSlidePageNumber();
  const a = ACCENTS[accent];
  const vars = { '--ac': a.solid, '--ac-soft': a.soft } as CSSProperties;
  return (
    <div
      className={active ? 'gb-on' : undefined}
      style={{
        ...vars,
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--osd-bg)',
        color: 'var(--osd-text)',
        fontFamily: 'var(--osd-font-body)',
        WebkitFontSmoothing: 'antialiased',
      }}
    >
      {header ? (
        <div
          style={{
            position: 'absolute',
            left: 120,
            top: 60,
            display: 'flex',
            alignItems: 'center',
            gap: 18,
            zIndex: 3,
          }}
        >
          <Mark size={44} blinkDelay={2.4} />
          <span
            style={{
              fontFamily: MONO,
              fontSize: 22,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: INK,
            }}
          >
            Grok Bot Meetup
          </span>
        </div>
      ) : null}
      <div
        style={{
          position: 'absolute',
          left: 120,
          bottom: 52,
          display: 'flex',
          alignItems: 'center',
          gap: 20,
          zIndex: 3,
        }}
      >
        <span style={{ fontSize: 22, color: onSilk ? '#ffffff' : MUTED }}>Presented by</span>
        <img
          src={onSilk ? wordmarkWhite : wordmarkBlack}
          alt="SpaceXAI"
          style={{ height: 26, display: 'block' }}
        />
      </div>
      <div
        style={{
          position: 'absolute',
          right: 120,
          bottom: 52,
          zIndex: 3,
          fontFamily: MONO,
          fontSize: 22,
          letterSpacing: '0.08em',
          color: onSilk ? '#ffffff' : MUTED,
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </div>
      {bare ? (
        children
      ) : (
        <div
          style={{
            position: 'absolute',
            left: 120,
            right: 120,
            top: 170,
            bottom: 132,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}

function Eyebrow({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <div
      className="gb-fade"
      style={{
        ...d(delay),
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        fontFamily: MONO,
        fontSize: 24,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: MUTED,
        marginBottom: 32,
      }}
    >
      <span
        style={{ width: 16, height: 16, borderRadius: 999, background: 'var(--ac)', flexShrink: 0 }}
      />
      {children}
    </div>
  );
}

function H({
  children,
  size = 104,
  maxWidth = 1680,
  delay = 80,
  color = INK,
}: {
  children: ReactNode;
  size?: number;
  maxWidth?: number;
  delay?: number;
  color?: string;
}) {
  return (
    <h1
      className="gb-rise"
      style={{
        ...d(delay),
        fontFamily: 'var(--osd-font-display)',
        fontWeight: 550,
        fontSize: size,
        lineHeight: 1.03,
        letterSpacing: '-0.035em',
        margin: 0,
        maxWidth,
        color,
      }}
    >
      {children}
    </h1>
  );
}

function Lede({
  children,
  delay = 220,
  size = 42,
  maxWidth = 1200,
  color = INK_2,
  style,
}: {
  children: ReactNode;
  delay?: number;
  size?: number;
  maxWidth?: number;
  color?: string;
  style?: CSSProperties;
}) {
  return (
    <p
      className="gb-rise"
      style={{
        ...d(delay),
        fontSize: size,
        lineHeight: 1.38,
        color,
        margin: '32px 0 0',
        maxWidth,
        ...style,
      }}
    >
      {children}
    </p>
  );
}

function Arrow({ delay = 0, width = 120, color = INK }: { delay?: number; width?: number; color?: string }) {
  return (
    <svg width={width} height={40} viewBox={`0 0 ${width} 40`} style={{ flexShrink: 0 }} aria-hidden="true">
      <path
        className="gb-draw"
        pathLength={1}
        style={{ ...d(delay), strokeDasharray: 1, '--len': 1 } as CSSProperties}
        d={`M6 20H${width - 14}`}
        stroke={color}
        strokeWidth={3}
        strokeLinecap="round"
        fill="none"
      />
      <path
        className="gb-fade"
        style={d(delay + 650)}
        d={`M${width - 28} 8L${width - 12} 20L${width - 28} 32`}
        stroke={color}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function FlowCard({
  label,
  title,
  sub,
  delay,
}: {
  label: string;
  title: string;
  sub: string;
  delay: number;
}) {
  return (
    <div
      className="gb-rise"
      style={{
        ...d(delay),
        flex: 1,
        minWidth: 0,
        minHeight: 270,
        boxSizing: 'border-box',
        padding: '34px 38px',
        borderRadius: 'var(--osd-radius)',
        background: CARD,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ fontFamily: MONO, fontSize: 22, letterSpacing: '0.12em', color: MUTED }}>
        {label}
      </div>
      <div
        style={{
          marginTop: 'auto',
          fontFamily: 'var(--osd-font-display)',
          fontWeight: 550,
          fontSize: 46,
          lineHeight: 1.08,
          letterSpacing: '-0.02em',
        }}
      >
        {title}
      </div>
      <div style={{ marginTop: 14, fontSize: 29, lineHeight: 1.3, color: INK_2 }}>{sub}</div>
    </div>
  );
}

function FlowBot({
  accent,
  title,
  sub,
  delay,
}: {
  accent: AccentName;
  title: string;
  sub: string;
  delay: number;
}) {
  return (
    <div className="gb-pop" style={{ ...d(delay), flex: 1, minWidth: 0, display: 'flex' }}>
      <Silk accent={accent} width="100%" height="auto" radius={36} style={{ minHeight: 270 }}>
        <div
          style={{
            boxSizing: 'border-box',
            height: '100%',
            minHeight: 270,
            padding: '34px 38px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: MONO, fontSize: 22, letterSpacing: '0.12em', color: INK }}>
              THE BOT
            </span>
            <Mark size={52} blinkDelay={delay / 1000 + 1} />
          </div>
          <div
            style={{
              marginTop: 'auto',
              fontFamily: 'var(--osd-font-display)',
              fontWeight: 550,
              fontSize: 46,
              lineHeight: 1.08,
              letterSpacing: '-0.02em',
              color: INK,
            }}
          >
            {title}
          </div>
          <div style={{ marginTop: 14, fontSize: 29, lineHeight: 1.3, color: INK }}>{sub}</div>
        </div>
      </Silk>
    </div>
  );
}

function UseCase({
  n,
  name,
  title,
  line,
  input,
  bot,
  out,
  loop = false,
}: {
  n: string;
  name: string;
  title: string;
  line: string;
  input: { title: string; sub: string };
  bot: { title: string; sub: string };
  out: { title: string; sub: string };
  loop?: boolean;
}) {
  return (
    <Canvas accent="orange">
      <Eyebrow>
        Use case {n} / 06 &nbsp;&nbsp;{name}
      </Eyebrow>
      <H size={104} maxWidth={1400}>
        {title}
      </H>
      <Lede>{line}</Lede>
      <div style={{ marginTop: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'stretch' }}>
          <FlowCard label="IN" title={input.title} sub={input.sub} delay={380} />
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Arrow delay={700} />
          </div>
          <FlowBot accent="orange" title={bot.title} sub={bot.sub} delay={560} />
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Arrow delay={1000} />
          </div>
          <FlowCard label="OUT" title={out.title} sub={out.sub} delay={760} />
        </div>
        {loop ? (
          <svg
            width="1680"
            height="64"
            viewBox="0 0 1680 64"
            style={{ display: 'block', marginTop: 10 }}
            aria-hidden="true"
          >
            <path
              className="gb-draw"
              pathLength={1}
              style={{ ...d(1300), strokeDasharray: 1, '--len': 1 } as CSSProperties}
              d="M1440 8V34Q1440 54 1420 54H260Q240 54 240 34V14"
              stroke="var(--ac)"
              strokeWidth={3}
              strokeLinecap="round"
              fill="none"
            />
            <path
              className="gb-fade"
              style={d(2100)}
              d="M226 28L240 12L254 28"
              stroke="var(--ac)"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        ) : null}
      </div>
    </Canvas>
  );
}

const TitlePage: Page = () => (
  <Canvas header={false} bare>
    <div
      style={{
        position: 'absolute',
        left: 120,
        top: 0,
        bottom: 0,
        width: 940,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Eyebrow>Grok Bot Meetup Jakarta</Eyebrow>
      <h1
        className="gb-rise"
        style={{
          ...d(120),
          fontFamily: 'var(--osd-font-display)',
          fontWeight: 550,
          fontSize: 'var(--osd-size-hero)',
          lineHeight: 0.96,
          letterSpacing: '-0.045em',
          margin: 0,
        }}
      >
        Grok Bot
      </h1>
      <p
        className="gb-rise"
        style={{
          ...d(300),
          fontSize: 50,
          lineHeight: 1.2,
          letterSpacing: '-0.01em',
          color: INK_2,
          margin: '36px 0 0',
          whiteSpace: 'nowrap',
        }}
      >
        AI teammates that finish the work.
      </p>
      <div
        className="gb-fade"
        style={{
          ...d(650),
          marginTop: 72,
          fontFamily: MONO,
          fontSize: 26,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: INK,
        }}
      >
        Aldi
      </div>
    </div>
    <div className="gb-pop" style={{ ...d(60), position: 'absolute', right: 120, top: 96, bottom: 136 }}>
      <Silk accent="magenta" width={700} height="100%" radius={350} pos="22% 45%">
        <div
          className="gb-float"
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Mark size={430} tone="white" wake look={[7, -5]} />
        </div>
      </Silk>
    </div>
  </Canvas>
);
TitlePage.transition = settle;

const FactCol = ({
  label,
  value,
  sub,
  delay,
}: {
  label: string;
  value: ReactNode;
  sub?: string;
  delay: number;
}) => (
  <div
    className="gb-rise"
    style={{ ...d(delay), flex: 1, minWidth: 0, borderTop: `3px solid ${INK}`, paddingTop: 28 }}
  >
    <div
      style={{
        fontFamily: MONO,
        fontSize: 22,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: MUTED,
      }}
    >
      {label}
    </div>
    <div
      style={{
        marginTop: 22,
        fontFamily: 'var(--osd-font-display)',
        fontWeight: 550,
        fontSize: 56,
        letterSpacing: '-0.03em',
        lineHeight: 1.08,
      }}
    >
      {value}
    </div>
    {sub ? <div style={{ fontSize: 30, color: INK_2, marginTop: 16, lineHeight: 1.3 }}>{sub}</div> : null}
  </div>
);

const WhoIAm: Page = () => (
  <Canvas>
    <Eyebrow>Who I am</Eyebrow>
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
      <div>
        <H size={200} delay={80}>
          I'm Aldi.
        </H>
        <Lede size={46} delay={260} style={{ marginTop: 24 }}>
          Naufaldi Rafif Satriya
        </Lede>
      </div>
      <div className="gb-pop" style={{ paddingBottom: 8 }}>
        <Silk accent="magenta" width={360} height={170} radius={85} pos="60% 30%">
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Eyes width={180} />
          </div>
        </Silk>
      </div>
    </div>
    <div style={{ display: 'flex', gap: 56, marginTop: 'auto' }}>
      <FactCol label="Role" value="Senior SWE" sub="PT Sukanda Djaya / Diamond Cold Storage" delay={380} />
      <FactCol
        label="Community"
        value={
          <>
            SpaceXAI
            <br />
            Ambassador
          </>
        }
        delay={500}
      />
      <FactCol label="Based in" value="Bekasi / Jakarta" delay={620} />
    </div>
  </Canvas>
);

const AgendaRow = ({ n, text }: { n: string; text: string }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 56,
      padding: '20px 0',
      borderTop: `2px solid ${HAIRLINE}`,
    }}
  >
    <span
      style={{
        fontFamily: MONO,
        fontSize: 36,
        color: 'var(--ac)',
        letterSpacing: '0.04em',
        width: 90,
      }}
    >
      {n}
    </span>
    <span
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontWeight: 550,
        fontSize: 64,
        letterSpacing: '-0.03em',
      }}
    >
      {text}
    </span>
  </div>
);

const AgendaPage: Page = () => (
  <Canvas>
    <Eyebrow>Agenda</Eyebrow>
    <H size={104}>Four things tonight.</H>
    <div style={{ marginTop: 56 }}>
      <Steps>
        <Step>
          <AgendaRow n="01" text="SpaceXAI, Grok, then Grok Bot" />
        </Step>
        <Step>
          <AgendaRow n="02" text="The maturity curve and the real problem" />
        </Step>
        <Step>
          <AgendaRow n="03" text="Five bots I actually run" />
        </Step>
        <Step>
          <AgendaRow n="04" text="Live demo, then praktek together" />
        </Step>
      </Steps>
    </div>
  </Canvas>
);

const WhatIsSpaceXAI: Page = () => (
  <Canvas>
    <Eyebrow>What is SpaceXAI?</Eyebrow>
    <H size={120}>SpaceXAI builds Grok.</H>
    <div
      className="gb-rise"
      style={{
        ...d(240),
        marginTop: 56,
        height: 300,
        borderRadius: 'var(--osd-radius)',
        background: CARD,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img
        className="gb-wipe"
        style={{ ...d(500), width: 1040, display: 'block' }}
        src={wordmarkBlack}
        alt="SpaceXAI"
      />
    </div>
    <Lede delay={700} size={42} maxWidth={1680}>
      The company behind Grok and Grok Bot. Many of us still say xAI.
    </Lede>
    <Lede delay={850} size={42} style={{ marginTop: 12 }} color={MUTED}>
      Remember the name. We use their stack tonight.
    </Lede>
  </Canvas>
);

const Chip = ({ children, delay }: { children: ReactNode; delay: number }) => (
  <div
    className="gb-pop"
    style={{
      ...d(delay),
      padding: '26px 56px',
      borderRadius: 999,
      border: `3px solid ${INK}`,
      fontFamily: 'var(--osd-font-display)',
      fontWeight: 550,
      fontSize: 64,
      letterSpacing: '-0.03em',
    }}
  >
    {children}
  </div>
);

const WhatIsGrok: Page = () => (
  <Canvas>
    <Eyebrow>What is Grok?</Eyebrow>
    <H size={120}>Grok is the brain.</H>
    <Lede delay={200}>A frontier model from SpaceXAI.</Lede>
    <div style={{ display: 'flex', gap: 28, marginTop: 64 }}>
      <Chip delay={350}>Chat</Chip>
      <Chip delay={450}>Reason</Chip>
      <Chip delay={550}>Write</Chip>
      <Chip delay={650}>Code</Chip>
    </div>
    <div
      className="gb-rise"
      style={{
        ...d(900),
        marginTop: 'auto',
        fontFamily: 'var(--osd-font-display)',
        fontWeight: 550,
        fontSize: 72,
        letterSpacing: '-0.035em',
        lineHeight: 1.05,
      }}
    >
      Strong alone. Stronger when it has <span style={{ color: 'var(--ac)' }}>hands</span>.
    </div>
  </Canvas>
);

const Operator = ({ children, delay }: { children: string; delay: number }) => (
  <div
    className="gb-fade"
    style={{
      ...d(delay),
      width: 80,
      textAlign: 'center',
      fontFamily: MONO,
      fontSize: 64,
      color: MUTED,
      flexShrink: 0,
    }}
  >
    {children}
  </div>
);

const PartCard = ({
  label,
  title,
  delay,
}: {
  label: string;
  title: string;
  delay: number;
}) => (
  <div
    className="gb-rise"
    style={{
      ...d(delay),
      width: 340,
      height: 270,
      boxSizing: 'border-box',
      padding: '32px 34px',
      borderRadius: 'var(--osd-radius)',
      background: CARD,
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
    }}
  >
    <div style={{ fontFamily: MONO, fontSize: 22, letterSpacing: '0.12em', color: MUTED }}>
      {label}
    </div>
    <div
      style={{
        marginTop: 'auto',
        fontFamily: 'var(--osd-font-display)',
        fontWeight: 550,
        fontSize: 50,
        lineHeight: 1.08,
        letterSpacing: '-0.025em',
      }}
    >
      {title}
    </div>
  </div>
);

const WhatIsGrokBot: Page = () => (
  <Canvas>
    <Eyebrow>What is Grok Bot?</Eyebrow>
    <H size={112}>Grok Bot is the teammate.</H>
    <div style={{ display: 'flex', alignItems: 'center', marginTop: 72 }}>
      <PartCard label="THE BRAIN" title="Grok" delay={300} />
      <Operator delay={450}>+</Operator>
      <PartCard label="THEIR OWN" title="Cloud computer" delay={450} />
      <Operator delay={600}>+</Operator>
      <PartCard label="REAL LOGINS" title="Your apps" delay={600} />
      <Operator delay={750}>=</Operator>
      <div className="gb-pop" style={{ ...d(800) }}>
        <Silk accent="magenta" width={420} height={270} radius={36} pos="30% 55%">
          <div
            style={{
              boxSizing: 'border-box',
              height: '100%',
              padding: '32px 34px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Mark size={76} tone="white" look={[7, -4]} blinkDelay={2} />
            <div
              style={{
                marginTop: 'auto',
                fontFamily: 'var(--osd-font-display)',
                fontWeight: 550,
                fontSize: 50,
                letterSpacing: '-0.025em',
                color: '#fff',
              }}
            >
              Grok Bot
            </div>
          </div>
        </Silk>
      </div>
    </div>
    <Lede delay={1000} style={{ marginTop: 'auto' }}>
      Not another chat window that stops at a draft.
    </Lede>
  </Canvas>
);

const BotAvatar = ({ name, delay }: { name: string; delay: number }) => (
  <div
    className="gb-pop"
    style={{
      ...d(delay),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 16,
      width: 240,
    }}
  >
    <Mark size={120} blinkDelay={delay / 1000 + 1.2} look={[6, -4]} />
    <div
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontWeight: 550,
        fontSize: 34,
        letterSpacing: '-0.02em',
        textAlign: 'center',
      }}
    >
      {name}
    </div>
  </div>
);

const MeetTeammates: Page = () => (
  <Canvas>
    <Eyebrow>Meet your AI teammates</Eyebrow>
    <H size={96}>Your teammates share one computer.</H>
    <div style={{ display: 'flex', alignItems: 'center', marginTop: 64 }}>
      <div
        className="gb-rise"
        style={{
          ...d(300),
          width: 260,
          height: 120,
          borderRadius: 60,
          border: `3px solid ${INK}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--osd-font-display)',
          fontWeight: 550,
          fontSize: 44,
          flexShrink: 0,
        }}
      >
        You
      </div>
      <Arrow delay={600} width={130} />
      <div
        className="gb-rise"
        style={{
          ...d(450),
          flex: 1,
          height: 330,
          borderRadius: 'var(--osd-radius)',
          background: CARD,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          padding: '40px 20px 0',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 34,
            top: 26,
            fontFamily: MONO,
            fontSize: 22,
            letterSpacing: '0.12em',
            color: MUTED,
          }}
        >
          ONE SHARED COMPUTER
        </div>
        <BotAvatar name="Inbox Triage" delay={800} />
        <Arrow delay={1100} width={110} />
        <BotAvatar name="Motion Studio" delay={950} />
        <Arrow delay={1300} width={110} />
        <BotAvatar name="Community Ops" delay={1100} />
      </div>
    </div>
    <div
      className="gb-rise"
      style={{
        ...d(1400),
        marginTop: 'auto',
        display: 'flex',
        gap: 70,
        fontSize: 34,
        color: INK_2,
      }}
    >
      <span>Message them like coworkers.</span>
      <span>They hand work to each other.</span>
    </div>
  </Canvas>
);

const StageLabel = ({
  left,
  stage,
  name,
  accent = false,
}: {
  left: number;
  stage: string;
  name: string;
  accent?: boolean;
}) => (
  <div
    style={{
      position: 'absolute',
      left: left - 180,
      top: 424,
      width: 360,
      textAlign: 'center',
    }}
  >
    <div
      style={{
        fontFamily: MONO,
        fontSize: 22,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: accent ? 'var(--ac)' : MUTED,
      }}
    >
      {stage}
    </div>
    <div
      style={{
        marginTop: 8,
        fontFamily: 'var(--osd-font-display)',
        fontWeight: 550,
        fontSize: 46,
        letterSpacing: '-0.025em',
      }}
    >
      {name}
    </div>
  </div>
);

const CurveDot = ({ x, y, accent = false }: { x: number; y: number; accent?: boolean }) => (
  <div
    style={{
      position: 'absolute',
      left: x - 18,
      top: y - 18,
      width: 36,
      height: 36,
      borderRadius: 999,
      boxSizing: 'border-box',
      background: accent ? 'var(--ac)' : '#fff',
      border: `5px solid ${accent ? 'var(--ac)' : INK}`,
    }}
  />
);

const MaturityCurve: Page = () => (
  <Canvas>
    <Eyebrow>AI maturity curve</Eyebrow>
    <H size={92}>Most of us sit between Ask and Do.</H>
    <div style={{ position: 'relative', width: 1680, height: 520, marginTop: 'auto' }}>
      <svg
        width="1680"
        height="520"
        viewBox="0 0 1680 520"
        style={{ position: 'absolute', inset: 0 }}
        aria-hidden="true"
      >
        <line x1="0" y1="400" x2="1680" y2="400" stroke={HAIRLINE} strokeWidth="2" />
        <path
          className="gb-draw"
          pathLength={1}
          style={{ ...d(200), strokeDasharray: 1, '--len': 1, animationDuration: '1.6s' } as CSSProperties}
          d="M140 330C300 330 400 300 560 300S860 235 1000 200S1330 60 1480 60"
          stroke={INK}
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      <Steps>
        <Step>
          <CurveDot x={140} y={330} />
          <StageLabel left={140} stage="Ask" name="Chatbots" />
        </Step>
        <Step>
          <CurveDot x={560} y={300} />
          <StageLabel left={560} stage="Do" name="Copilots" />
        </Step>
        <Step>
          <div
            style={{
              position: 'absolute',
              left: 780,
              top: 0,
              width: 900,
              height: 520,
              borderRadius: 40,
              background: 'var(--ac-soft)',
              zIndex: -1,
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 816,
              top: 28,
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              fontFamily: MONO,
              fontSize: 22,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--ac)',
            }}
          >
            <Mark size={36} blinkDelay={0.6} look={[6, -4]} />
            Where Grok Bot pushes you
          </div>
          <CurveDot x={1000} y={200} accent />
          <StageLabel left={1000} stage="Automate" name="A bot" accent />
        </Step>
        <Step>
          <CurveDot x={1480} y={60} accent />
          <StageLabel left={1480} stage="Staff" name="A team of bots" accent />
        </Step>
      </Steps>
    </div>
  </Canvas>
);

const TaskRow = ({ text, delay }: { text: string; delay: number }) => (
  <div
    className="gb-rise"
    style={{
      ...d(delay),
      display: 'flex',
      alignItems: 'center',
      gap: 32,
      height: 104,
      padding: '0 40px',
      borderRadius: 28,
      background: CARD,
    }}
  >
    <div
      style={{
        width: 44,
        height: 44,
        borderRadius: 12,
        border: `3px solid ${INK}`,
        boxSizing: 'border-box',
        flexShrink: 0,
      }}
    />
    <div
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontWeight: 550,
        fontSize: 52,
        letterSpacing: '-0.025em',
        flex: 1,
      }}
    >
      {text}
    </div>
    <div style={{ fontFamily: MONO, fontSize: 22, letterSpacing: '0.12em', color: MUTED }}>
      STILL ON ME
    </div>
  </div>
);

const ProblemPage: Page = () => (
  <Canvas>
    <Eyebrow>The problem</Eyebrow>
    <H size={104}>Routine work still eats your day.</H>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 56 }}>
      <TaskRow text="Inbox triage" delay={300} />
      <TaskRow text="Status updates" delay={400} />
      <TaskRow text="Event ops" delay={500} />
      <TaskRow text="The same research tabs, every week" delay={600} />
    </div>
    <Lede delay={900} size={40} style={{ marginTop: 'auto' }}>
      You know it should be delegated. It stays on you.
    </Lede>
  </Canvas>
);

const HowSolves: Page = () => (
  <Canvas>
    <Eyebrow>How Grok Bot solves it</Eyebrow>
    <H size={120}>One bot per job.</H>
    <div style={{ display: 'flex', alignItems: 'stretch', gap: 28, marginTop: 64 }}>
      <div
        className="gb-rise"
        style={{
          ...d(300),
          width: 520,
          height: 290,
          boxSizing: 'border-box',
          borderRadius: 'var(--osd-radius)',
          border: `3px dashed ${HAIRLINE}`,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontWeight: 550,
            fontSize: 54,
            letterSpacing: '-0.025em',
            color: MUTED,
            textAlign: 'center',
            lineHeight: 1.1,
          }}
        >
          One mega-prompt
        </div>
        <div
          className="gb-strike"
          style={{
            ...d(900),
            position: 'absolute',
            left: 50,
            right: 50,
            top: '50%',
            height: 6,
            borderRadius: 3,
            background: 'var(--ac)',
          }}
        />
      </div>
      <BotJob name="Inbox" job="Triage mail" delay={500} />
      <BotJob name="Motion" job="Make the cut" delay={650} />
      <BotJob name="Community" job="Run the event" delay={800} />
    </div>
    <Lede delay={1000} maxWidth={1680} style={{ marginTop: 'auto' }}>
      They finish the work in the real tools. You review, correct, run again.
    </Lede>
  </Canvas>
);

const BotJob = ({ name, job, delay }: { name: string; job: string; delay: number }) => (
  <div
    className="gb-pop"
    style={{
      ...d(delay),
      flex: 1,
      minWidth: 0,
      height: 290,
      boxSizing: 'border-box',
      padding: '32px 34px',
      borderRadius: 'var(--osd-radius)',
      background: CARD,
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <Mark size={84} blinkDelay={delay / 1000 + 1} look={[6, -4]} />
    <div style={{ marginTop: 'auto' }}>
      <div
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontWeight: 550,
          fontSize: 46,
          letterSpacing: '-0.025em',
        }}
      >
        {name}
      </div>
      <div style={{ fontFamily: MONO, fontSize: 22, letterSpacing: '0.08em', color: MUTED, marginTop: 8 }}>
        {job.toUpperCase()}
      </div>
    </div>
  </div>
);

const HowStep = ({
  n,
  verb,
  line,
}: {
  n: string;
  verb: string;
  line: string;
}) => (
  <div style={{ width: 390 }}>
    <div
      style={{
        width: 84,
        height: 84,
        borderRadius: 999,
        background: INK,
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: MONO,
        fontSize: 30,
      }}
    >
      {n}
    </div>
    <div
      style={{
        marginTop: 36,
        fontFamily: 'var(--osd-font-display)',
        fontWeight: 550,
        fontSize: 68,
        letterSpacing: '-0.035em',
      }}
    >
      {verb}
    </div>
    <div style={{ marginTop: 16, fontSize: 32, lineHeight: 1.35, color: INK_2, maxWidth: 350 }}>
      {line}
    </div>
  </div>
);

const HowItWorks: Page = () => (
  <Canvas>
    <Eyebrow>How it works</Eyebrow>
    <H size={96}>Teach it once. It keeps working.</H>
    <div style={{ position: 'relative', marginTop: 'auto' }}>
      <div
        className="gb-grow"
        style={{
          ...d(300),
          position: 'absolute',
          left: 42,
          right: 330,
          top: 40,
          height: 4,
          background: INK,
        }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
        <Steps>
          <Step>
            <HowStep n="1" verb="Message" line="Talk to them like teammates." />
          </Step>
          <Step>
            <HowStep n="2" verb="Tools" line="They log into your tools and use the computer." />
          </Step>
          <Step>
            <HowStep n="3" verb="Routine" line="Teach a routine once, then schedule it." />
          </Step>
          <Step>
            <HowStep n="4" verb="Memory" line="Memory compounds per bot, across sessions." />
          </Step>
        </Steps>
      </div>
    </div>
  </Canvas>
);

const InboxTriage: Page = () => (
  <UseCase
    n="01"
    name="Inbox Triage"
    title="It surfaces the mail that needs me."
    line="Skips the noise. Drafts replies in my voice."
    input={{ title: 'New mail', sub: 'Everything in the inbox' }}
    bot={{ title: 'Triage bot', sub: 'Flags what needs a human' }}
    out={{ title: 'I approve', sub: 'It does not send without me' }}
  />
);
InboxTriage.transition = breath;

const MotionStudio: Page = () => (
  <UseCase
    n="02"
    name="Motion Studio"
    title="Brief in. Motion out."
    line="Turns briefs into finished motion and graphics."
    input={{ title: 'The brief', sub: 'Plus brand constraints' }}
    bot={{ title: 'Motion bot', sub: 'Runs the pipeline on its computer' }}
    out={{ title: 'I review the cut', sub: 'Not an empty timeline' }}
  />
);

const CommunityOps: Page = () => (
  <UseCase
    n="03"
    name="Community Ops"
    title="It keeps the runbook while I host."
    line="Luma meetup ops for Cursor, Codex, and Grok Bot nights."
    input={{ title: 'The event', sub: 'Guest lists and reminders' }}
    bot={{ title: 'Ops bot', sub: 'Day-of logistics' }}
    out={{ title: 'Same pattern', sub: 'Every meetup night' }}
  />
);

const EnglishPractice: Page = () => (
  <UseCase
    n="04"
    name="English practice"
    title="A bot that fixes my English."
    line="A dedicated bot I use to practice English."
    input={{ title: 'I write or talk', sub: 'It remembers how I write' }}
    bot={{ title: 'Practice bot', sub: 'Corrects and rewrites. No fake scores' }}
    out={{ title: 'I try again', sub: 'Talk, feedback, repeat' }}
    loop
  />
);

const OsintScout: Page = () => (
  <UseCase
    n="05"
    name="OSINT Scout"
    title="Name in. Shortlist out."
    line="Finds public profiles from a name, handle, company, or link."
    input={{ title: 'A name or handle', sub: 'Or a company, or a link' }}
    bot={{ title: 'Scout bot', sub: 'Public sources only' }}
    out={{ title: 'A shortlist', sub: 'I verify before outreach' }}
  />
);

const StudentRoom: Page = () => (
  <Canvas accent="orange">
    <Eyebrow>Use case 06 / 06 &nbsp;&nbsp;Student example</Eyebrow>
    <H size={92} maxWidth={1680}>
      One bot per subject, in one room.
    </H>
    <div style={{ display: 'flex', gap: 72, marginTop: 'auto', alignItems: 'flex-end' }}>
      <div style={{ width: 590, flexShrink: 0, paddingBottom: 6 }}>
        <p
          className="gb-rise"
          style={{
            ...d(300),
            margin: 0,
            fontFamily: 'var(--osd-font-display)',
            fontWeight: 550,
            fontSize: 50,
            lineHeight: 1.12,
            letterSpacing: '-0.03em',
          }}
        >
          Student bots own subjects. Not one mega chatbot.
        </p>
        <p
          className="gb-rise"
          style={{ ...d(500), margin: '32px 0 0', fontSize: 32, lineHeight: 1.4, color: INK_2 }}
        >
          TEACHER coordinates and tags the others. Each subject bot answers from its own syllabus.
        </p>
        <p
          className="gb-fade"
          style={{
            ...d(800),
            margin: '36px 0 0',
            fontFamily: MONO,
            fontSize: 22,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: MUTED,
          }}
        >
          A real Grok Bot room
        </p>
      </div>
      <div
        className="gb-rise"
        style={{
          ...d(400),
          width: 1018,
          borderRadius: 28,
          overflow: 'hidden',
          boxShadow: '0 0 0 2px #e2e2e7, 0 30px 60px -24px rgba(11, 11, 15, 0.28)',
          flexShrink: 0,
        }}
      >
        <img
          src={studentRoom}
          alt="Grok Bot School room with TEACHER, German, Chemistry, Biology, English and other subject bots"
          style={{ display: 'block', width: '100%' }}
        />
      </div>
    </div>
  </Canvas>
);

const DemoBeat: Page = () => (
  <Canvas header={false} bare onSilk>
    <div className="gb-pop" style={{ position: 'absolute', inset: 40 }}>
      <Silk accent="magenta" width="100%" height="100%" radius={72} pos="35% 60%">
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, rgba(40, 0, 28, 0.28), rgba(40, 0, 28, 0) 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 100,
            bottom: 120,
            color: '#fff',
          }}
        >
          <h1
            className="gb-rise"
            style={{
              ...d(250),
              margin: 0,
              fontFamily: 'var(--osd-font-display)',
              fontWeight: 550,
              fontSize: 300,
              lineHeight: 0.9,
              letterSpacing: '-0.05em',
            }}
          >
            Demo
          </h1>
          <p
            className="gb-rise"
            style={{ ...d(450), margin: '44px 0 0', fontSize: 54, letterSpacing: '-0.01em' }}
          >
            Live handoff. Watch the bot work.
          </p>
        </div>
        <div
          className="gb-float"
          style={{ position: 'absolute', right: 150, top: 230 }}
        >
          <Mark size={460} tone="white" wake look={[-7, 5]} />
        </div>
      </Silk>
    </div>
    <div
      style={{
        position: 'absolute',
        left: 100,
        top: 92,
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        color: '#fff',
        fontFamily: MONO,
        fontSize: 22,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        zIndex: 4,
      }}
    >
      Grok Bot Meetup
    </div>
  </Canvas>
);
DemoBeat.transition = breath;

const Step3 = ({ n, text, delay }: { n: string; text: string; delay: number }) => (
  <div
    className="gb-rise"
    style={{
      ...d(delay),
      display: 'flex',
      alignItems: 'center',
      gap: 28,
      fontSize: 44,
      letterSpacing: '-0.015em',
    }}
  >
    <span
      style={{
        width: 64,
        height: 64,
        borderRadius: 999,
        background: INK,
        color: '#fff',
        fontFamily: MONO,
        fontSize: 26,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      {n}
    </span>
    {text}
  </div>
);

const GettingStarted: Page = () => (
  <Canvas>
    <Eyebrow>Getting started</Eyebrow>
    <H size={112}>Scan to get started.</H>
    <div style={{ display: 'flex', gap: 120, marginTop: 'auto', alignItems: 'center' }}>
      <div className="gb-pop" style={{ ...d(250), position: 'relative', width: 520, height: 520, flexShrink: 0 }}>
        <div style={{ position: 'absolute', left: 28, top: 28 }}>
          <Silk accent="magenta" width={520} height={520} radius={44} pos="25% 50%" />
        </div>
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: 520,
            height: 520,
            boxSizing: 'border-box',
            padding: 36,
            borderRadius: 44,
            background: '#fff',
            boxShadow: `0 0 0 2px ${HAIRLINE}`,
          }}
        >
          <img
            src={meetupQr}
            alt="QR code to https://grok-bot-meetup.vercel.app/"
            style={{ width: 448, height: 448, display: 'block' }}
          />
        </div>
      </div>
      <div style={{ paddingLeft: 28 }}>
        <div
          className="gb-rise"
          style={{
            ...d(400),
            fontFamily: 'var(--osd-font-display)',
            fontWeight: 550,
            fontSize: 72,
            letterSpacing: '-0.035em',
            marginBottom: 56,
          }}
        >
          grok-bot-meetup.vercel.app
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <Step3 n="1" text="Open the meetup page" delay={600} />
          <Step3 n="2" text="Create your first bot" delay={750} />
          <Step3 n="3" text="Pick one job from your week" delay={900} />
        </div>
      </div>
    </div>
  </Canvas>
);

const PraktekRow = ({ n, text, delay }: { n: string; text: string; delay: number }) => (
  <div
    className="gb-rise"
    style={{
      ...d(delay),
      display: 'flex',
      alignItems: 'center',
      gap: 48,
      height: 150,
      position: 'relative',
    }}
  >
    <div
      style={{
        width: 84,
        height: 84,
        borderRadius: 999,
        background: INK,
        color: '#fff',
        fontFamily: MONO,
        fontSize: 30,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        zIndex: 1,
      }}
    >
      {n}
    </div>
    <div
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontWeight: 550,
        fontSize: 58,
        letterSpacing: '-0.03em',
      }}
    >
      {text}
    </div>
  </div>
);

const Praktek: Page = () => (
  <Canvas accent="orange">
    <Eyebrow>Praktek</Eyebrow>
    <H size={112}>One bot. One job. Go.</H>
    <div style={{ display: 'flex', gap: 100, marginTop: 'auto', alignItems: 'flex-end' }}>
      <div style={{ position: 'relative', flex: 1 }}>
        <div
          className="gb-growy"
          style={{
            ...d(300),
            position: 'absolute',
            left: 40,
            top: 75,
            width: 4,
            height: 300,
            background: INK,
          }}
        />
        <PraktekRow n="1" text="Install or open Grok Bot" delay={300} />
        <PraktekRow n="2" text="Create one bot for one real job" delay={500} />
        <PraktekRow n="3" text="Hand off a task. Review what comes back." delay={700} />
      </div>
      <div className="gb-pop" style={{ ...d(400) }}>
        <Silk accent="orange" width={360} height={450} radius={180} pos="8% 30%">
          <div
            className="gb-float"
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Mark size={210} look={[-7, 5]} blinkDelay={2} />
          </div>
        </Silk>
      </div>
    </div>
  </Canvas>
);

const TopicChip = ({ children, delay }: { children: string; delay: number }) => (
  <div
    className="gb-pop"
    style={{
      ...d(delay),
      padding: '18px 38px',
      borderRadius: 999,
      border: `2px solid ${INK}`,
      fontFamily: MONO,
      fontSize: 28,
      letterSpacing: '0.04em',
    }}
  >
    {children}
  </div>
);

const QAPage: Page = () => (
  <Canvas accent="orange">
    <Eyebrow>Q&amp;A</Eyebrow>
    <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'space-between' }}>
      <div>
        <h1
          className="gb-rise"
          style={{
            ...d(100),
            margin: 0,
            fontFamily: 'var(--osd-font-display)',
            fontWeight: 550,
            fontSize: 320,
            lineHeight: 0.9,
            letterSpacing: '-0.055em',
          }}
        >
          Q&amp;A
        </h1>
        <Lede delay={350} size={46} style={{ marginTop: 40 }}>
          Ask anything. Softballs and hard ones welcome.
        </Lede>
        <div style={{ display: 'flex', gap: 20, marginTop: 44 }}>
          <TopicChip delay={600}>Billing</TopicChip>
          <TopicChip delay={720}>Approvals</TopicChip>
          <TopicChip delay={840}>When not to automate</TopicChip>
        </div>
      </div>
      <div className="gb-pop" style={{ ...d(200), alignSelf: 'flex-start', marginTop: 20 }}>
        <Silk accent="orange" width={420} height={620} radius={210} pos="6% 30%">
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Eyes width={250} color="#ffffff" />
          </div>
        </Silk>
      </div>
    </div>
  </Canvas>
);

const LinkRow = ({ label, value, delay }: { label: string; value: string; delay: number }) => (
  <div
    className="gb-rise"
    style={{
      ...d(delay),
      display: 'flex',
      alignItems: 'baseline',
      gap: 36,
      padding: '24px 0',
      borderTop: `2px solid ${INK}`,
    }}
  >
    <div
      style={{
        width: 160,
        flexShrink: 0,
        fontFamily: MONO,
        fontSize: 22,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: MUTED,
      }}
    >
      {label}
    </div>
    <div
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontWeight: 550,
        fontSize: 46,
        letterSpacing: '-0.02em',
      }}
    >
      {value}
    </div>
  </div>
);

const ThankYou: Page = () => (
  <Canvas header={false} bare>
    <div className="gb-pop" style={{ ...d(60), position: 'absolute', left: 120, top: 96, bottom: 136 }}>
      <Silk accent="magenta" width={560} height="100%" radius={280} pos="40% 55%">
        <div
          className="gb-float"
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Mark size={360} tone="white" wake look={[8, -4]} />
        </div>
      </Silk>
    </div>
    <div
      style={{
        position: 'absolute',
        left: 780,
        right: 120,
        top: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Eyebrow>Thank you</Eyebrow>
      <h1
        className="gb-rise"
        style={{
          ...d(120),
          margin: '0 0 64px',
          fontFamily: 'var(--osd-font-display)',
          fontWeight: 550,
          fontSize: 184,
          lineHeight: 0.96,
          letterSpacing: '-0.045em',
        }}
      >
        Thank you.
      </h1>
      <LinkRow label="Meetup" value="grok-bot-meetup.vercel.app" delay={400} />
      <LinkRow label="Docs" value="docs.x.ai/grok-bot/overview" delay={520} />
      <div style={{ borderBottom: `2px solid ${INK}` }}>
        <LinkRow label="Find me" value="@F2aldi" delay={640} />
      </div>
    </div>
  </Canvas>
);

export const meta: SlideMeta = {
  title: 'Grok Bot Meetup',
  createdAt: '2026-09-30T08:36:14.725Z',
  theme: 'grok-bot-brand',
};

export const notes: (string | undefined)[] = [
  `Open on the eye. Let it wake up. Pause one beat.
"Tonight is about Grok Bot. AI teammates that finish the work, not just draft it."
Introduce yourself lightly, then move.`,

  `Keep this under a minute.
"I'm Aldi. Senior SWE at Sukanda Djaya, Diamond Cold Storage. SpaceXAI Ambassador. Bekasi and Jakarta."
No CV dump.`,

  `Walk the four rows with the arrow key.
Promise the live demo and praktek so people know when to open their laptops.`,

  `Plain context.
"SpaceXAI is the company behind Grok and Grok Bot. You may still say xAI. Same stack."
Do not over-explain company history.`,

  `"Grok is the model. The brain. Chat, reason, write, code."
Land the last line: strong alone, stronger when it has hands. That sets up the next slide.`,

  `Read the equation left to right.
"Grok, plus its own cloud computer, plus your apps, equals a teammate."
Stress: not another chat window that stops at a draft.`,

  `"You message them like coworkers.
They share one computer on your account.
They hand work to each other, so you are not the router."
Point at the arrows between the three bots.`,

  `Click once per stage: Ask, Do, Automate, Staff.
"Most of us bounce between chatbots and copilots.
Grok Bot is the jump into automate, then a small staff of bots."`,

  `Make it personal, not corporate.
"Inbox. Status updates. Event ops. The same research tabs every week.
You know it should be delegated. It stays on you."`,

  `"So the move is simple. One bot per job.
Not one mega-prompt. They finish in the real tools. You review, correct, run again."`,

  `Click through the four beats, one breath each.
Message. Tools. Routine. Memory.
If someone asks about security, say approvals and review stay with you.`,

  `Inbox Triage.
"Surfaces what needs me. Drafts in my voice. I still approve before anything sends."
No invented metrics.`,

  `Motion Studio.
"Brief in, motion out. I review the cut, not an empty timeline."
Mention this is a bot you run for creative pipeline work.`,

  `Community Ops.
"Luma ops for Cursor, Codex, and Grok Bot meetups. Guest list, reminders, day-of. Same pattern every night."`,

  `English practice.
Keep it honest. No fake scores.
"I use a dedicated bot to practice English. I talk, it corrects and rewrites, I try again. That is the loop."
Point at the loop arrow.`,

  `OSINT Scout.
"Name, handle, company, or link. Public sources only. A shortlist for me to verify."
Useful before outreach or community invites. Stress public sources, no private scraping story.`,

  `This one is not mine. It is a real room from the product, set up for a student.
"One room called School. One bot per subject: Economics, German, Chemistry, Biology, English. Plus TEACHER, which coordinates."
Point at the TEACHER message: it tags the other bots and says which subjects are on new specs and which are not.
Then point at the German bot: it answers from its own syllabus, with the paper breakdown and a plan for the year.
The point is ownership. Each bot owns a subject and reports gaps, instead of one chatbot that half knows everything.
Do not read the names or scores aloud. That is the student's data.`,

  `Cue slide. Switch to the live app.
Say what you will hand off before you click.
Keep the audience on the bot screen, not on the notes.`,

  `Point at the QR.
"grok-bot-meetup.vercel.app. Open it, create one bot, pick one real job from this week."`,

  `Workshop mode.
"Install or open. One bot. One job. Hand off. Review."
Walk the room. Help people who are stuck on login.`,

  `Open the floor.
Prefer concrete questions: billing, approvals, when not to automate.`,

  `Close warm and short.
Repeat the meetup URL and docs.
Thank the hosts and the room. End.`,
];

export default [
  TitlePage,
  WhoIAm,
  AgendaPage,
  WhatIsSpaceXAI,
  WhatIsGrok,
  WhatIsGrokBot,
  MeetTeammates,
  MaturityCurve,
  ProblemPage,
  HowSolves,
  HowItWorks,
  InboxTriage,
  MotionStudio,
  CommunityOps,
  EnglishPractice,
  OsintScout,
  StudentRoom,
  DemoBeat,
  GettingStarted,
  Praktek,
  QAPage,
  ThankYou,
] satisfies Page[];

/* Page 2 (Why it's ethical): excuse flip cards, dilemmas quiz, quotes carousel, verdict grid. */
import { useState, type CSSProperties, type ReactNode } from "react";
import { createStore } from "../../state/createStore";
import { useRouter } from "../../state/router";
import { Field } from "../ui/EditMode";
import { Html } from "../ui/Html";
import { openLens } from "../ui/Cards";
import { DIL, FLIPS, QUOTES, VERD } from "../../data/content";

type Attrs = { className?: string; style?: CSSProperties; "aria-live"?: "polite" };

/* ---------- excuses vs reality ---------- */
const flips = createStore<{ all: "0" | "1"; each: Record<number, boolean> }>({ all: "0", each: {} });
export function FlipAllButton({ v, children }: { v: "0" | "1"; children?: ReactNode }) {
  const s = flips.use();
  return <button aria-pressed={s.all === v} onClick={() => flips.set({ all: v, each: Object.fromEntries(FLIPS.map((_, i) => [i, v === "1"])) })}>{children}</button>;
}
export function ExcuseFlips({ className }: Attrs) {
  const s = flips.use();
  return (
    <div className={className} id="flips">
      {FLIPS.map(([says, real], i) => {
        const on = !!s.each[i];
        return (
          <button key={i} className={"flip" + (on ? " real" : "")} aria-pressed={on} onClick={() => flips.set((x) => ({ ...x, each: { ...x.each, [i]: !on } }))}>
            <span className="side">Tap to flip</span><span className="says">{says}</span>
            <span className="reality"><span className="side" style={{ display: "block", marginBottom: 6 }}>What the research shows</span><Html html={real} /></span>
          </button>
        );
      })}
    </div>
  );
}

/* ---------- what would you do? ---------- */
const picks = createStore<Record<number, number>>({});
export function Dilemmas({ className }: Attrs) {
  const p = picks.use();
  return (
    <div className={className} id="dilemmas">
      {DIL.map((d, i) => (
        <div key={d.t} className={"dilemma" + (p[i] != null ? " done" : "")}>
          <div className="eyebrow">Scenario {i + 1} of {DIL.length}</div><h3>{d.t}</h3><p>{d.s}</p>
          <div className="opts">
            {d.o.map((o, j) => (
              <button key={j} className={(p[i] === j ? "picked " : "") + (p[i] != null && d.best.includes(j) ? "best" : "")} onClick={() => picks.set((x) => ({ ...x, [i]: j }))}>
                <b className="mono">{"ABCD"[j]}.</b> {o}
              </button>
            ))}
          </div>
          <div className="lock">Choose an option to unlock the analysis.</div>
          <div className="unlock">{d.u.map((x) => <Html key={x} as="p" className="small" html={x} />)}</div>
        </div>
      ))}
    </div>
  );
}
export function DilemmaScore({ className, style }: Attrs) {
  const n = Object.keys(picks.use()).length;
  return <span className={className} style={style} id="qscore">{n} / {DIL.length} answered</span>;
}

/* ---------- voices ---------- */
export function QuoteCarousel({ className, ...a }: Attrs) {
  const [i, setI] = useState(0);
  const q = QUOTES[i], mv = (d: number) => setI((i + d + QUOTES.length) % QUOTES.length);
  return (
    <div className={className} id="carousel" aria-live={a["aria-live"]}>
      <div className="eyebrow" style={{ color: "var(--paper)", opacity: 0.7 }}>Voice {i + 1} of {QUOTES.length}</div>
      <p className="quote">“{q.field ? <Field id={q.field[0]}>{q.field[1]}</Field> : q.q}”</p>
      <p className="who2">{q.field ? <Field id={q.field[2]}>{q.field[3]}</Field> : q.w} · {q.s}</p>
      <div className="cnav">
        <button aria-label="Previous quote" onClick={() => mv(-1)}>← Prev</button>
        <button aria-label="Next quote" onClick={() => mv(1)}>Next →</button>
        <div className="dots">{QUOTES.map((_, j) => <i key={j} className={j === i ? "on" : ""} />)}</div>
      </div>
    </div>
  );
}

/* ---------- the verdict ---------- */
export function VerdictGrid({ className }: Attrs) {
  const { show } = useRouter();
  return (
    <div className={className} id="vgrid">
      {VERD.map(([lens, name, verdict, why, part]) => (
        <button key={lens} className={"vtile" + (part ? " part" : "")} onClick={() => { show("ethics", "lenses"); setTimeout(() => openLens(lens), 50); }}>
          <span className="vv">{verdict}</span><b>{name}</b><span className="small">{why}</span>
        </button>
      ))}
    </div>
  );
}

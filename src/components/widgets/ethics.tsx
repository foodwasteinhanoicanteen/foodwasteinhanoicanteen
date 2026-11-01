/* Page 2 (Why it's ethical): excuse flip cards, dilemmas quiz, quotes carousel, verdict grid. */
import type { CSSProperties, ReactNode } from "react";
import { Button as AriaButton, ToggleButton } from "react-aria-components";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import { cx } from "@/utils/cx";
import { createStore } from "../../state/createStore";
import { useRouter } from "../../state/router";
import { Html } from "../ui/Html";
import { openLens } from "../ui/Cards";
import { DIL, FLIPS, VERD } from "../../data/content";

type Attrs = { className?: string; style?: CSSProperties; "aria-live"?: "polite" };

/* ---------- excuses vs reality ---------- */
const flips = createStore<{ all: "0" | "1"; each: Record<number, boolean> }>({ all: "0", each: {} });
export function FlipAllButton({ v, children }: { v: "0" | "1"; children?: ReactNode }) {
  const s = flips.use();
  return <Button size="sm" color={s.all === v ? "primary" : "secondary"} aria-pressed={s.all === v} onPress={() => flips.set({ all: v, each: Object.fromEntries(FLIPS.map((_, i) => [i, v === "1"])) })}>{children}</Button>;
}
export function ExcuseFlips({ className }: Attrs) {
  const s = flips.use();
  return (
    <div className={className} id="flips">
      {FLIPS.map(([says, real], i) => {
        const on = !!s.each[i];
        return (
          <ToggleButton key={i} className={"flip" + (on ? " real" : "")} isSelected={on} onChange={(sel) => flips.set((x) => ({ ...x, each: { ...x.each, [i]: sel } }))}>
            <span className="side">Tap to flip</span><span className="says">{says}</span>
            <span className="reality"><span className="side" style={{ display: "block", marginBottom: 6 }}>What the research shows</span><Html html={real} /></span>
          </ToggleButton>
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
              <Button key={j} color="secondary" size="md" onPress={() => picks.set((x) => ({ ...x, [i]: j }))}
                className={cx("h-auto justify-start whitespace-normal text-left", p[i] === j && "picked ring-2 ring-brand", p[i] != null && d.best.includes(j) && "best bg-success-primary")}>
                <b className="mono">{"ABCD"[j]}.</b> {o}
              </Button>
            ))}
          </div>
          <div className="lock">Choose an option to unlock the analysis.</div>
          <div className="unlock">{d.u.map((x) => <Html key={x} as="p" className="small" html={x} />)}</div>
        </div>
      ))}
    </div>
  );
}
export function DilemmaScore(_: Attrs) {
  const n = Object.keys(picks.use()).length;
  return <span id="qscore"><Badge color="brand" size="sm">{n} / {DIL.length} answered</Badge></span>;
}

/* ---------- the verdict ---------- */
export function VerdictGrid({ className }: Attrs) {
  const { show } = useRouter();
  return (
    <div className={className} id="vgrid">
      {VERD.map(([lens, name, verdict, why, part]) => (
        <AriaButton key={lens} className={"vtile cursor-pointer outline-focus-ring focus-visible:outline-2" + (part ? " part" : "")} onPress={() => { show("ethics", "lenses"); setTimeout(() => openLens(lens), 50); }}>
          <span className="vv">{verdict}</span><b>{name}</b><span className="small">{why}</span>
        </AriaButton>
      ))}
    </div>
  );
}

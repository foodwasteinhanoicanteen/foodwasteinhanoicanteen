/* Small behaviours from the original page: counting numbers, copy buttons, before/after switch. */
import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { Button } from "@/components/base/buttons/button";
import { useTabActive } from "../layout";
import { useOverlay } from "./Overlays";
import { createStore } from "../../state/createStore";

const reduce = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const fmt = (n: number, suf: string) => n.toLocaleString("en-US") + suf;

/** Counts up from 0 each time its tab is opened. */
export function CountUp({ to, suf = "" }: { to: number; suf?: string; children?: ReactNode }) {
  const active = useTabActive();
  const [v, setV] = useState(fmt(to, suf));
  useEffect(() => {
    if (!active || reduce()) { setV(fmt(to, suf)); return; }
    const t0 = performance.now(), d = 900;
    let raf = 0;
    const step = (now: number) => {
      const k = Math.min(1, (now - t0) / d), e = 1 - Math.pow(1 - k, 3);
      setV(k < 1 ? fmt(Math.round(to * e), suf) : fmt(to, suf));
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, to, suf]);
  return <>{v}</>;
}

/** A found photograph of the subject's world (public/img/, credited in the footer). The caption says what it shows. */
export const Photo = ({ src, alt, caption, className }: { src: string; alt: string; caption: string; className?: string }) => (
  <figure className={"photo" + (className ? " " + className : "")}><img src={"img/" + src} alt={alt} loading="lazy" /><figcaption>{caption}</figcaption></figure>
);

/** Copies the visible text of the element with id = target. */
/** `className` "btn ghost" (from the page markup) picks the secondary style. */
export function CopyButton({ target, className, children }: { target: string; className?: string; type?: "button"; children?: ReactNode }) {
  const { toast } = useOverlay();
  const copy = () => {
    const el = document.getElementById(target);
    if (!el) return;
    (navigator.clipboard ? navigator.clipboard.writeText(el.innerText) : Promise.reject())
      .then(() => toast("Copied"))
      .catch(() => {
        const r = document.createRange(); r.selectNodeContents(el);
        const sl = getSelection(); sl?.removeAllRanges(); sl?.addRange(r);
        toast("Selected: press Ctrl+C to copy");
      });
  };
  return <Button size="md" color={className?.includes("ghost") ? "secondary" : "primary"} onPress={copy}>{children}</Button>;
}

/* Results page: Before (baseline) / After (pilot) switch. */
const ba = createStore<"0" | "1">("0");
export function BAToggle({ v, children }: { v: "0" | "1"; children?: ReactNode }) {
  const cur = ba.use();
  return <Button size="sm" color={cur === v ? "primary" : "secondary"} aria-pressed={cur === v} onPress={() => ba.set(v)}>{children}</Button>;
}
export function BAShow({ v, as: Tag, className, style, children }: { v: "0" | "1"; as: "td" | "th" | "div" | "span" | "p"; className?: string; style?: CSSProperties; children?: ReactNode }) {
  const cur = ba.use();
  return <Tag className={className} style={style} hidden={cur !== v}>{children}</Tag>;
}

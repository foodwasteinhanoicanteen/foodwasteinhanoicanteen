/* Info cards with a "Read details" button that opens the shared dialog, plus filter buttons. */
import { Children, isValidElement, type CSSProperties, type MouseEvent, type ReactElement, type ReactNode } from "react";
import { useOverlay } from "./Overlays";
import { createStore } from "../../state/createStore";

/** Hidden extra content shown in the dialog. */
export const More = ({ children }: { children?: ReactNode }) => <div className="more">{children}</div>;
export const Front = ({ children }: { children?: ReactNode }) => <div className="front">{children}</div>;
export const Verdict = ({ className, children }: { className: string; children?: ReactNode }) => <span className={className}>{children}</span>;

/* Which category each filter group shows ("All" by default). */
const filters = createStore<Record<string, string>>({});
export const useFilter = (group: string) => filters.use()[group] || "All";
export const setFilter = (group: string, cat: string) => filters.set((f) => ({ ...f, [group]: cat }));

export function FilterButtons({ group, cats, className = "filters", style }: { group: string; cats: string[]; className?: string; style?: CSSProperties }) {
  const cur = useFilter(group);
  return (
    <div className={className} style={style}>
      {["All", ...cats].map((c) => <button key={c} aria-pressed={cur === c} onClick={() => setFilter(group, c)}>{c}</button>)}
    </div>
  );
}

interface CardProps {
  title: string; tag?: string; group?: string; cat?: string; lens?: string; showFront?: boolean;
  className?: string; style?: CSSProperties; children?: ReactNode;
}

/** Original markup: .card > .tagline, .verdict?, .front, .more, button.open */
export function Card({ title, tag = "", group, cat, lens, showFront, className, style, children }: CardProps) {
  const { openCard } = useOverlay();
  const filter = useFilter(group || "");
  const hidden = !!group && filter !== "All" && cat !== filter;
  const kids = Children.toArray(children) as ReactElement<{ children?: ReactNode; className?: string }>[];
  const find = (t: unknown) => kids.find((k) => isValidElement(k) && k.type === t);

  const onClick = (e: MouseEvent) => {
    const b = (e.target as Element).closest("button.open");
    if (!b || b.hasAttribute("data-go")) return; // data-go buttons navigate instead
    const v = find(Verdict), f = find(Front), m = find(More);
    openCard({ title, tag, body: <>{v && <Verdict className={v.props.className!}>{v.props.children}</Verdict>}{showFront && f && <div>{f.props.children}</div>}{m?.props.children}</> });
  };

  return (
    <div className={"card" + (className ? " " + className : "")} style={style} hidden={hidden} data-lens={lens} onClick={onClick}>
      {children}
    </div>
  );
}

/** Opens a lens card from elsewhere (verdict grid). */
export function openLens(lens: string) {
  const el = document.querySelector<HTMLElement>(`.card[data-lens="${lens}"] button.open`);
  el?.click();
}

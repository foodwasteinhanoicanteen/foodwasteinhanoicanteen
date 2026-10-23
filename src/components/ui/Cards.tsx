/* Info cards with a "Read details" button that opens the shared dialog, plus filter buttons. */
import { Children, createContext, isValidElement, useContext, type CSSProperties, type ReactElement, type ReactNode } from "react";
import { Button } from "@/components/base/buttons/button";
import { ButtonGroup, ButtonGroupItem } from "@/components/base/button-group/button-group";
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
      <ButtonGroup size="sm" className="flex-wrap" disallowEmptySelection selectedKeys={[cur]} onSelectionChange={(k) => { const c = [...k][0]; if (c != null) setFilter(group, String(c)); }}>
        {["All", ...cats].map((c) => <ButtonGroupItem key={c} id={c}>{c}</ButtonGroupItem>)}
      </ButtonGroup>
    </div>
  );
}

/** Opens the surrounding card's dialog. */
const CardCtx = createContext<(() => void) | null>(null);
export function CardOpen({ children = "Read details" }: { children?: ReactNode }) {
  const open = useContext(CardCtx);
  return <Button color="link-color" size="sm" className="open" onPress={() => open?.()}>{children}</Button>;
}

interface CardProps {
  title: string; tag?: string; group?: string; cat?: string; lens?: string; showFront?: boolean;
  className?: string; style?: CSSProperties; children?: ReactNode;
}

/** Original markup: .card > .tagline, .verdict?, .front, .more, <CardOpen /> */
export function Card({ title, tag = "", group, cat, lens, showFront, className, style, children }: CardProps) {
  const { openCard } = useOverlay();
  const filter = useFilter(group || "");
  const hidden = !!group && filter !== "All" && cat !== filter;
  const kids = Children.toArray(children) as ReactElement<{ children?: ReactNode; className?: string }>[];
  const find = (t: unknown) => kids.find((k) => isValidElement(k) && k.type === t);

  const open = () => {
    const v = find(Verdict), f = find(Front), m = find(More);
    openCard({ title, tag, body: <>{v && <Verdict className={v.props.className!}>{v.props.children}</Verdict>}{showFront && f && <div>{f.props.children}</div>}{m?.props.children}</> });
  };

  return (
    <CardCtx.Provider value={open}>
      <div className={"card" + (className ? " " + className : "")} style={style} hidden={hidden} data-lens={lens}>
        {children}
      </div>
    </CardCtx.Provider>
  );
}

/** Opens a lens card from elsewhere (verdict grid). */
export function openLens(lens: string) {
  const el = document.querySelector<HTMLElement>(`.card[data-lens="${lens}"] button.open`);
  el?.click();
}

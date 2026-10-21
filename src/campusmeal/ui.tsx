/* Small building blocks shared by the CampusMeal screens. */
import type { ReactNode } from "react";
import type { Dish } from "../../shared/schemas/campusmeal";

export const I = ({ n }: { n: string }) => <svg className="i"><use href={"#i-" + n} /></svg>;

export const Thumb = ({ d, size }: { d?: Partial<Dish>; size?: number }) => (
  <span className="thumb" style={{ background: d?.color || "#6E8B3D", ...(size ? { width: size, height: size } : {}) }}><I n="plate" /></span>
);

export const Tags = ({ d }: { d?: Partial<Dish> }) => <>{(d?.tags || []).map((t) => <span key={t} className={"tag" + (/halal|vegetarian/i.test(t) ? " h" : "")}>{t}</span>)}</>;

export const Empty = ({ icon, children }: { icon: string; children: ReactNode }) => <div className="empty"><I n={icon} />{children}</div>;

export const Kpi = ({ v, l, tone = "" }: { v: ReactNode; l: ReactNode; tone?: string }) => <div className={"kpi" + (tone ? " " + tone : "")}><span className="v">{v}</span><span className="l">{l}</span></div>;

export const Hd = ({ title, children, right }: { title: ReactNode; children?: ReactNode; right?: ReactNode }) => (
  <div className="hd"><div><h1>{title}</h1>{children && <p>{children}</p>}</div>{right}</div>
);

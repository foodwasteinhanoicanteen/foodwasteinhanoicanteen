/* Small building blocks shared by the CampusMeal screens. */
import type { ReactNode } from "react";
import { Badge } from "@/components/base/badges/badges";
import type { Dish } from "../../shared/schemas/campusmeal";

export const I = ({ n }: { n: string }) => <svg className="i"><use href={"#i-" + n} /></svg>;

/** The dish's colour as a strip beside its name (no icon). */
export const Thumb = ({ d, size }: { d?: Partial<Dish>; size?: number }) => (
  <span className="thumb" aria-hidden="true" style={{ background: d?.color || "#6E8B3D", ...(size ? { height: size } : {}) }} />
);

export const Tags = ({ d }: { d?: Partial<Dish> }) => (
  <span className="inline-flex flex-wrap gap-1">{(d?.tags || []).map((t) => <Badge key={t} type="color" size="sm" color={/halal|vegetarian/i.test(t) ? "success" : "gray"}>{t}</Badge>)}</span>
);

const STATUS = { placed: "blue", collected: "success", noshow: "error", cancelled: "gray" } as const;
export const StatusBadge = ({ status }: { status: keyof typeof STATUS }) => <Badge size="sm" color={STATUS[status]}>{status}</Badge>;

export const Empty = ({ icon, children }: { icon: string; children: ReactNode }) => <div className="empty"><I n={icon} />{children}</div>;

export const Kpi = ({ v, l, tone = "" }: { v: ReactNode; l: ReactNode; tone?: string }) => <div className={"kpi" + (tone ? " " + tone : "")}><span className="v">{v}</span><span className="l">{l}</span></div>;

export const Hd = ({ title, children, right }: { title: ReactNode; children?: ReactNode; right?: ReactNode }) => (
  <div className="hd"><div><h1>{title}</h1>{children && <p>{children}</p>}</div>{right}</div>
);

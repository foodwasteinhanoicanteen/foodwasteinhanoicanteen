import type { CSSProperties } from "react";

/** Renders fixed HTML snippets from src/data/content.ts (team-written text with <b>/<i>). Never pass visitor input. */
export const Html = ({ html, as: Tag = "span", id, className, style }: { html: string; as?: "span" | "p" | "div" | "li"; id?: string; className?: string; style?: CSSProperties }) =>
  <Tag id={id} className={className} style={style} dangerouslySetInnerHTML={{ __html: html }} />;

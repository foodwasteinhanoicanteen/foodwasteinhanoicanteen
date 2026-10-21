/* Text generated from the survey analysis: the bilingual conclusion and the
   short values shown across the site (takeaways, decision page, results page). */
import { SOL, SOL_VI, SurveyRow, agreePct, analyse, chisqGOF, colOf, contrastB, f2, noLead, pAPA, pVI, vi2 } from "./survey";

/** Values bound to <SV k="..."> placeholders across the site. */
export function svValues(rows: SurveyRow[], isExample: boolean): Record<string, string> {
  const R = analyse(rows, "eff"), P = R.pair;
  const sig: string[] = [];
  if (P["A-B"].p < 0.05 && R.m[1] > R.m[0]) sig.push("A");
  if (P["B-C"].p < 0.05 && R.m[1] > R.m[2]) sig.push("C");
  const O = analyse(rows, "all"), F = analyse(rows, "feas"), c = contrastB(R.g);
  return {
    n: String(rows.length), bmean: f2(R.m[1]), anp: pAPA(R.an.p), tk: sig.length ? "B > " + sig.join(", ") : "no clear winner",
    abuy: agreePct(rows, 10) + "%", bportion: agreePct(rows, 15) + "%", ccomfort: agreePct(rows, 20) + "%",
    srcnote: isExample
      ? "Survey figures on this page use the 50 example responses until our real survey data is entered. Do not present them as results."
      : `Survey figures: our survey data, n = ${rows.length}.`,
    anstat: `F(${R.an.dfb}, ${R.an.dfw}) = ${f2(R.an.F)}, ${pAPA(R.an.p)}`,
    contrast: `+${f2(c.md)} points, t(${c.df}) = ${f2(c.t)}, ${pAPA(c.p)}`.replace("+-", "−"),
    oA: f2(O.m[0]), oB: f2(O.m[1]), oC: f2(O.m[2]), fA: f2(F.m[0]), fB: f2(F.m[1]), fC: f2(F.m[2]),
    otop: SOL[O.m.indexOf(Math.max(...O.m))], ftop: SOL[F.m.indexOf(Math.max(...F.m))],
  };
}

/** Bilingual conclusion paragraph. Returns HTML built only from numbers and fixed text (no user input). */
export function conclusion(rows: SurveyRow[], isExample: boolean): { vi: string; en: string } {
  const R = analyse(rows, "eff"), a = R.an, P = R.pair;
  const [mA, mB, mC] = R.m, pBA = P["A-B"], pBC = P["B-C"], pAC = P["A-C"];
  const sBA = pBA.p < 0.05 && mB > mA, sBC = pBC.p < 0.05 && mB > mC;
  const head = isExample ? `<p class="small" style="color:var(--gold);font-weight:700">VÍ DỤ: kết luận dưới đây dựa trên 50 phản hồi giả lập, không phải dữ liệu thật.</p>` : "";
  const headEn = isExample ? `<p class="small" style="color:var(--gold);font-weight:700">EXAMPLE: based on 50 made-up responses, not real data.</p>` : "";
  const stat = `F(${a.dfb}, ${a.dfw}) = ${vi2(a.F)}, ${pVI(a.p)}, η² = ${vi2(a.eta2)}`, statEn = `F(${a.dfb}, ${a.dfw}) = ${f2(a.F)}, ${pAPA(a.p)}, η² = ${noLead(a.eta2)}`;
  let vi: string, en: string;
  if (a.p >= 0.05) {
    vi = `Kết quả ANOVA một yếu tố cho thấy <b>không có sự khác biệt có ý nghĩa thống kê</b> về mức độ hiệu quả được đánh giá giữa ba giải pháp (${stat}). Vì vậy, dữ liệu khảo sát <b>chưa đủ bằng chứng</b> để kết luận rằng giải pháp giải quyết nguyên nhân gốc rễ được đánh giá cao hơn các giải pháp xử lý phần dư.`;
    en = `One-way ANOVA found <b>no significant difference</b> in perceived effectiveness between the three solutions (${statEn}). The survey therefore does not provide evidence that the root-cause solution is rated above the leftover-handling solutions.`;
  } else if (sBA && sBC) {
    vi = `Kết quả ANOVA một yếu tố cho thấy có sự khác biệt có ý nghĩa thống kê về mức độ hiệu quả được đánh giá giữa ba giải pháp (${stat}). Kiểm định hậu nghiệm Tukey HSD cho thấy <b>${SOL_VI.B} được đánh giá hiệu quả hơn ${SOL_VI.A}</b> (chênh lệch trung bình = ${vi2(mB - mA)}, ${pVI(pBA.p)}) <b>và hiệu quả hơn ${SOL_VI.C}</b> (chênh lệch = ${vi2(mB - mC)}, ${pVI(pBC.p)}), trong khi A và C ${pAC.p < 0.05 ? `cũng khác biệt có ý nghĩa (${pVI(pAC.p)})` : `không khác biệt có ý nghĩa (${pVI(pAC.p)})`}. <b>Như vậy, giải pháp giải quyết nguyên nhân gốc rễ (sản xuất dư thừa và khẩu phần quá lớn) được người tham gia đánh giá cao hơn các giải pháp chỉ xử lý phần thực phẩm dư sau khi đã phát sinh.</b>`;
    en = `One-way ANOVA showed a significant difference in perceived effectiveness between the three solutions (${statEn}). Tukey HSD post-hoc tests showed that <b>Solution B (Demand Forecasting and Portion Control) was rated more effective than Solution A</b> (mean difference = ${f2(mB - mA)}, ${pAPA(pBA.p)}) <b>and Solution C</b> (mean difference = ${f2(mB - mC)}, ${pAPA(pBC.p)}), while A and C ${pAC.p < 0.05 ? `also differed (${pAPA(pAC.p)})` : `did not differ significantly (${pAPA(pAC.p)})`}. <b>Respondents therefore rated the solution that tackles the root cause (over-production and oversized portions) higher than the solutions that handle surplus after it has been created.</b>`;
  } else {
    const best = SOL[R.m.indexOf(Math.max(...R.m))];
    const part = sBA || sBC
      ? `${SOL_VI.B} được đánh giá hiệu quả hơn ${sBA ? SOL_VI.A + ` (${pVI(pBA.p)})` : SOL_VI.C + ` (${pVI(pBC.p)})`}, nhưng khác biệt so với ${sBA ? SOL_VI.C + ` (${pVI(pBC.p)})` : SOL_VI.A + ` (${pVI(pBA.p)})`} không có ý nghĩa thống kê. Vì vậy, nhận định “giải pháp giải quyết nguyên nhân gốc rễ được đánh giá cao hơn các giải pháp xử lý phần dư” <b>chỉ được ủng hộ một phần</b>.`
      : `giải pháp ${best} có điểm trung bình cao nhất, nhưng ${SOL_VI.B} không được đánh giá hiệu quả hơn A và C một cách có ý nghĩa thống kê. Vì vậy, dữ liệu <b>không ủng hộ</b> nhận định rằng giải pháp giải quyết nguyên nhân gốc rễ được đánh giá cao hơn.`;
    vi = `Kết quả ANOVA một yếu tố cho thấy có sự khác biệt về mức độ hiệu quả được đánh giá (${stat}). Theo kiểm định Tukey HSD, ${part}`;
    en = `One-way ANOVA showed a difference in perceived effectiveness (${statEn}). However, Tukey HSD showed that ${sBA || sBC ? `Solution B was rated above ${sBA ? "A" : "C"} but not significantly above ${sBA ? "C" : "A"}, so the root-cause claim is <b>only partly supported</b>.` : `Solution B was not rated significantly above both A and C, so the data <b>does not support</b> the root-cause claim.`}`;
  }
  // planned contrast + robustness checks
  const c = contrastB(R.g);
  const agree = (R.rm.pGG < 0.05) === (a.p < 0.05) && (R.fr.p < 0.05) === (a.p < 0.05);
  vi += ` Phép so sánh có kế hoạch giữa B và trung bình của A và C cũng cho kết quả ${c.p < 0.05 && c.md > 0 ? "có ý nghĩa" : "không có ý nghĩa"} (chênh lệch = ${vi2(c.md)}, t(${c.df}) = ${vi2(c.t)}, ${pVI(c.p)}). ANOVA đo lặp (${pVI(R.rm.pGG)}) và kiểm định Friedman (${pVI(R.fr.p)}) ${agree ? "cho kết luận tương tự" : "cho kết quả khác, cần thận trọng khi diễn giải"}.`;
  en += ` A planned contrast of B against the average of A and C was ${c.p < 0.05 && c.md > 0 ? "significant" : "not significant"} (difference = ${f2(c.md)}, t(${c.df}) = ${f2(c.t)}, ${pAPA(c.p)}). Repeated-measures ANOVA (${pAPA(R.rm.pGG)}, Greenhouse–Geisser) and the Friedman test (${pAPA(R.fr.p)}) ${agree ? "led to the same conclusion" : "disagreed, so interpret with caution"}.`;
  // feasibility trade-off
  const F = analyse(rows, "feas"), fb = F.m.indexOf(Math.max(...F.m));
  if (SOL[fb] !== "B") {
    const key = SOL[fb] < "B" ? `${SOL[fb]}-B` : `B-${SOL[fb]}`, pp = F.pair[key];
    vi += ` Tuy nhiên, về tính khả thi, ${SOL_VI[SOL[fb]]} được đánh giá cao nhất (trung bình ${vi2(F.m[fb])} so với ${vi2(F.m[1])} của B${pp ? `, ${pVI(pp.p)}` : ""}). Điều này cho thấy B cần được triển khai theo từng bước với chi phí thấp, và A có thể được dùng như biện pháp bổ trợ ngắn hạn.`;
    en += ` On feasibility, however, ${SOL[fb]} was rated highest (mean ${f2(F.m[fb])} vs ${f2(F.m[1])} for B${pp ? `, ${pAPA(pp.p)}` : ""}), which is why we phase B in with low-cost steps and keep ${SOL[fb]} as a short-term complement.`;
  }
  const one = colOf(rows, 22), cnt = SOL.map((s) => one.filter((v) => v === s).length), ch = chisqGOF(cnt);
  const pct = Math.round((cnt[1] / rows.length) * 100);
  vi += ` Khi chỉ được chọn một giải pháp, ${cnt[1]}/${rows.length} người (${pct}%) chọn B (χ²(2) = ${vi2(ch.chi)}, ${pVI(ch.p)})${ch.p < 0.05 ? "" : "; sự phân bổ lựa chọn chưa khác biệt có ý nghĩa so với chia đều, cho thấy ý kiến vẫn còn phân tán"}.`;
  en += ` When forced to choose one solution, ${cnt[1]} of ${rows.length} respondents (${pct}%) chose B (χ²(2) = ${f2(ch.chi)}, ${pAPA(ch.p)})${ch.p < 0.05 ? "" : "; this split was not significantly different from an even split, so preferences remain divided"}.`;
  return { vi: head + `<p>${vi}</p>`, en: headEn + `<p>${en}</p>` };
}

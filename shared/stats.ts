/* Small statistics library for the survey page: one-way ANOVA, Tukey HSD,
   repeated-measures ANOVA (with Greenhouse–Geisser), paired t-tests, Friedman,
   chi-square goodness of fit. Results were checked against scipy (see stats.test.ts). */

const LANC = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];

function lgamma(x: number): number {
  if (x < 0.5) return Math.log(Math.PI / Math.abs(Math.sin(Math.PI * x))) - lgamma(1 - x);
  x -= 1;
  let a = LANC[0];
  const t = x + 7.5;
  for (let i = 1; i < 9; i++) a += LANC[i] / (x + i);
  return 0.5 * Math.log(2 * Math.PI) + (x + 0.5) * Math.log(t) - t + Math.log(a);
}

function betacf(a: number, b: number, x: number): number {
  const MAXIT = 300, EPS = 3e-16, FPMIN = 1e-300;
  const qab = a + b, qap = a + 1, qam = a - 1;
  let c = 1, d = 1 - (qab * x) / qap;
  if (Math.abs(d) < FPMIN) d = FPMIN;
  d = 1 / d;
  let h = d;
  for (let m = 1; m <= MAXIT; m++) {
    const m2 = 2 * m;
    let aa = (m * (b - m) * x) / ((qam + m2) * (a + m2));
    d = 1 + aa * d; if (Math.abs(d) < FPMIN) d = FPMIN;
    c = 1 + aa / c; if (Math.abs(c) < FPMIN) c = FPMIN;
    d = 1 / d; h *= d * c;
    aa = (-(a + m) * (qab + m) * x) / ((a + m2) * (qap + m2));
    d = 1 + aa * d; if (Math.abs(d) < FPMIN) d = FPMIN;
    c = 1 + aa / c; if (Math.abs(c) < FPMIN) c = FPMIN;
    d = 1 / d;
    const del = d * c;
    h *= del;
    if (Math.abs(del - 1) < EPS) break;
  }
  return h;
}

/** Regularised incomplete beta I_x(a, b). */
function ibeta(x: number, a: number, b: number): number {
  if (x <= 0) return 0;
  if (x >= 1) return 1;
  const bt = Math.exp(lgamma(a + b) - lgamma(a) - lgamma(b) + a * Math.log(x) + b * Math.log(1 - x));
  return x < (a + 1) / (a + b + 2) ? (bt * betacf(a, b, x)) / a : 1 - (bt * betacf(b, a, 1 - x)) / b;
}

export const fSf = (F: number, d1: number, d2: number) => (F <= 0 ? 1 : ibeta(d2 / (d2 + d1 * F), d2 / 2, d1 / 2));
export const tTwo = (t: number, df: number) => ibeta(df / (df + t * t), df / 2, 0.5);

/** Regularised lower incomplete gamma. */
function gammaP(a: number, x: number): number {
  if (x <= 0) return 0;
  if (x < a + 1) {
    let ap = a, sum = 1 / a, del = sum;
    for (let n = 0; n < 500; n++) {
      ap++; del *= x / ap; sum += del;
      if (Math.abs(del) < Math.abs(sum) * 1e-15) break;
    }
    return sum * Math.exp(-x + a * Math.log(x) - lgamma(a));
  }
  let b = x + 1 - a, c = 1e300, d = 1 / b, h = d;
  for (let i = 1; i < 500; i++) {
    const an = -i * (i - a);
    b += 2; d = an * d + b; if (Math.abs(d) < 1e-300) d = 1e-300;
    c = b + an / c; if (Math.abs(c) < 1e-300) c = 1e-300;
    d = 1 / d;
    const del = d * c;
    h *= del;
    if (Math.abs(del - 1) < 1e-15) break;
  }
  return 1 - Math.exp(-x + a * Math.log(x) - lgamma(a)) * h;
}
export const chiSf = (x: number, df: number) => 1 - gammaP(df / 2, x / 2);

function cfErfc(x: number): number {
  let f = 0;
  for (let n = 60; n >= 1; n--) f = n / 2 / (x + f);
  return 1 / (x + f);
}
function erf(x: number): number {
  const ax = Math.abs(x);
  let r: number;
  if (ax < 2.5) {
    let sum = ax, term = ax, n = 0;
    while (Math.abs(term) > 1e-17 * Math.abs(sum) && n < 200) { n++; term *= (-ax * ax) / n; sum += term / (2 * n + 1); }
    r = (2 / Math.sqrt(Math.PI)) * sum;
  } else r = 1 - (Math.exp(-ax * ax) / Math.sqrt(Math.PI)) * cfErfc(ax);
  return x < 0 ? -r : r;
}
const pnorm = (x: number, mu = 0) => 0.5 * (1 + erf((x - mu) / Math.SQRT2));

/* Studentized range distribution (port of R's ptukey / wprob). */
function wprob(w: number, rr: number, cc: number): number {
  const nleg = 12, ihalf = 6, C1 = -30, C2 = -50, C3 = 60, bb = 8, wlar = 3, wincr1 = 2, wincr2 = 3;
  const xleg = [0.981560634246719250690549090149, 0.904117256370474856678465866119, 0.769902674194304687036893833213, 0.587317954286617447296702418941, 0.367831498998180193752691536644, 0.125233408511468915472441369464];
  const aleg = [0.047175336386511827194615961485, 0.106939325995318430960254718194, 0.160078328543346226334652529543, 0.203167426723065921749064455810, 0.233492536538354808760849898925, 0.249147045813402785000562436043];
  const qsqz = w * 0.5;
  if (qsqz >= bb) return 1;
  let pr_w = 2 * pnorm(qsqz) - 1;
  pr_w = pr_w >= Math.exp(C2 / cc) ? Math.pow(pr_w, cc) : 0;
  const wincr = w > wlar ? wincr1 : wincr2;
  let blb = qsqz;
  const binc = (bb - qsqz) / wincr;
  let bub = blb + binc, einsum = 0;
  const cc1 = cc - 1;
  for (let wi = 1; wi <= wincr; wi++) {
    let elsum = 0;
    const a = 0.5 * (bub + blb), b = 0.5 * (bub - blb);
    for (let jj = 1; jj <= nleg; jj++) {
      let j: number, xx: number;
      if (ihalf < jj) { j = nleg - jj + 1; xx = xleg[j - 1]; } else { j = jj; xx = -xleg[j - 1]; }
      const c = b * xx, ac = a + c, qexpo = ac * ac;
      if (qexpo > C3) break;
      const pplus = 2 * pnorm(ac), pminus = 2 * pnorm(ac, w);
      let rinsum = pplus * 0.5 - pminus * 0.5;
      if (rinsum >= Math.exp(C1 / cc1)) { rinsum = aleg[j - 1] * Math.exp(-(0.5 * qexpo)) * Math.pow(rinsum, cc1); elsum += rinsum; }
    }
    elsum *= (2 * b * cc) / Math.sqrt(2 * Math.PI);
    einsum += elsum; blb = bub; bub += binc;
  }
  pr_w += einsum;
  if (pr_w <= Math.exp(C1 / rr)) return 0;
  pr_w = Math.pow(pr_w, rr);
  return pr_w >= 1 ? 1 : pr_w;
}

export function ptukey(q: number, cc: number, df: number, rr = 1): number {
  const nlegq = 16, ihalfq = 8, eps1 = -30, eps2 = 1e-14, dhaf = 100, dquar = 800, deigh = 5000, dlarg = 25000;
  const xlegq = [0.989400934991649932596154173450, 0.944575023073232576077988415535, 0.865631202387831743880467897712, 0.755404408355003033895101194847, 0.617876244402643748446671764049, 0.458016777657227386342419442984, 0.281603550779258913230460501460, 0.950125098376374401853193354250e-1];
  const alegq = [0.271524594117540948517805724560e-1, 0.622535239386478928628438369944e-1, 0.951585116824927848099251076022e-1, 0.124628971255533872052476282192, 0.149595988816576732081501730547, 0.169156519395002538189312079030, 0.182603415044923588866763667969, 0.189450610455068496285396723208];
  if (q <= 0) return 0;
  if (!isFinite(q)) return 1;
  if (df > dlarg) return wprob(q, rr, cc);
  const f2 = df * 0.5;
  let f2lf = f2 * Math.log(df) - df * Math.LN2 - lgamma(f2);
  const f21 = f2 - 1, ff4 = df * 0.25;
  const ulen = df <= dhaf ? 1 : df <= dquar ? 0.5 : df <= deigh ? 0.25 : 0.125;
  f2lf += Math.log(ulen);
  let ans = 0;
  for (let i = 1; i <= 50; i++) {
    let otsum = 0;
    const twa1 = (2 * i - 1) * ulen;
    for (let jj = 1; jj <= nlegq; jj++) {
      let j: number, t1: number;
      if (ihalfq < jj) { j = jj - ihalfq - 1; t1 = f2lf + f21 * Math.log(twa1 + xlegq[j] * ulen) - (xlegq[j] * ulen + twa1) * ff4; }
      else { j = jj - 1; t1 = f2lf + f21 * Math.log(twa1 - xlegq[j] * ulen) + (xlegq[j] * ulen - twa1) * ff4; }
      if (t1 >= eps1) {
        const qsqz = ihalfq < jj ? q * Math.sqrt((xlegq[j] * ulen + twa1) * 0.5) : q * Math.sqrt((-(xlegq[j] * ulen) + twa1) * 0.5);
        otsum += wprob(qsqz, rr, cc) * alegq[j] * Math.exp(t1);
      }
    }
    if (i * ulen >= 1 && otsum <= eps2) break;
    ans += otsum;
  }
  return Math.min(1, ans);
}

export function qtukey(p: number, cc: number, df: number): number {
  let lo = 0, hi = 20;
  for (let i = 0; i < 80; i++) { const m = (lo + hi) / 2; if (ptukey(m, cc, df) < p) lo = m; else hi = m; }
  return (lo + hi) / 2;
}

export const mean = (a: number[]) => a.reduce((s, x) => s + x, 0) / a.length;
export const sd = (a: number[]) => { const m = mean(a); return Math.sqrt(a.reduce((s, x) => s + (x - m) ** 2, 0) / (a.length - 1)); };

export interface Anova { ssb: number; ssw: number; sst: number; dfb: number; dfw: number; msb: number; msw: number; F: number; p: number; eta2: number }
export function anova1(groups: number[][]): Anova {
  const k = groups.length, N = groups.reduce((s, g) => s + g.length, 0), gm = mean(groups.flat());
  const ssb = groups.reduce((s, g) => s + g.length * (mean(g) - gm) ** 2, 0);
  const ssw = groups.reduce((s, g) => { const m = mean(g); return s + g.reduce((t, x) => t + (x - m) ** 2, 0); }, 0);
  const dfb = k - 1, dfw = N - k, msb = ssb / dfb, msw = ssw / dfw, F = msb / msw;
  return { ssb, ssw, sst: ssb + ssw, dfb, dfw, msb, msw, F, p: fSf(F, dfb, dfw), eta2: ssb / (ssb + ssw) };
}

export interface TukeyPair { pair: string; i: number; j: number; diff: number; se: number; q: number; p: number; lo: number; hi: number }
export function tukey(groups: number[][], labels: string[]): { qcrit: number; pairs: TukeyPair[] } {
  const a = anova1(groups), k = groups.length, qc = qtukey(0.95, k, a.dfw), out: TukeyPair[] = [];
  for (let i = 0; i < k; i++) for (let j = i + 1; j < k; j++) {
    const diff = mean(groups[i]) - mean(groups[j]);
    const se = Math.sqrt((a.msw / 2) * (1 / groups[i].length + 1 / groups[j].length));
    const q = Math.abs(diff) / se;
    out.push({ pair: labels[i] + " – " + labels[j], i, j, diff, se, q, p: Math.max(0, 1 - ptukey(q, k, a.dfw)), lo: diff - qc * se, hi: diff + qc * se });
  }
  return { qcrit: qc, pairs: out };
}

export interface RmAnova { ssc: number; sse: number; sss: number; dfc: number; dfe: number; F: number; p: number; pGG: number; eps: number; peta2: number }
/** cols: k arrays of the same respondents. */
export function rmAnova(cols: number[][]): RmAnova {
  const k = cols.length, n = cols[0].length, X = Array.from({ length: n }, (_, r) => cols.map((c) => c[r]));
  const gm = mean(cols.flat());
  let sst = 0;
  X.forEach((r) => r.forEach((v) => (sst += (v - gm) ** 2)));
  const sss = k * X.reduce((s, r) => s + (mean(r) - gm) ** 2, 0);
  const ssc = n * cols.reduce((s, c) => s + (mean(c) - gm) ** 2, 0);
  const sse = sst - sss - ssc, dfc = k - 1, dfe = (k - 1) * (n - 1), F = ssc / dfc / (sse / dfe);
  // Greenhouse–Geisser epsilon from the double-centred covariance matrix
  const m = cols.map(mean), S = cols.map((ci, i) => cols.map((cj, j) => ci.reduce((s, v, r) => s + (v - m[i]) * (cj[r] - m[j]), 0) / (n - 1)));
  const rowM = S.map((r) => mean(r)), allM = mean(rowM);
  const Sc = S.map((r, i) => r.map((v, j) => v - rowM[i] - rowM[j] + allM));
  const tr = Sc.reduce((s, r, i) => s + r[i], 0), tr2 = Sc.reduce((s, r) => s + r.reduce((t, v) => t + v * v, 0), 0);
  const eps = Math.min(1, Math.max(1 / (k - 1), (tr * tr) / ((k - 1) * tr2)));
  return { ssc, sse, sss, dfc, dfe, F, p: fSf(F, dfc, dfe), pGG: fSf(F, dfc * eps, dfe * eps), eps, peta2: ssc / (ssc + sse) };
}

export function pairedT(x: number[], y: number[]) {
  const d = x.map((v, i) => v - y[i]), n = d.length, md = mean(d), s = sd(d), t = md / (s / Math.sqrt(n));
  return { md, t, df: n - 1, p: tTwo(t, n - 1), dz: md / s };
}

export function friedman(cols: number[][]) {
  const k = cols.length, n = cols[0].length, R = Array<number>(k).fill(0);
  let ties = 0;
  for (let r = 0; r < n; r++) {
    const row = cols.map((c, i) => [c[r], i] as const).slice().sort((a, b) => a[0] - b[0]);
    let i = 0;
    while (i < k) {
      let j = i;
      while (j + 1 < k && row[j + 1][0] === row[i][0]) j++;
      const rk = (i + j + 2) / 2, t = j - i + 1;
      for (let z = i; z <= j; z++) R[row[z][1]] += rk;
      ties += t ** 3 - t;
      i = j + 1;
    }
  }
  let chi = (12 / (n * k * (k + 1))) * R.reduce((s, x) => s + x * x, 0) - 3 * n * (k + 1);
  chi /= 1 - ties / (n * (k ** 3 - k));
  return { chi, df: k - 1, p: chiSf(chi, k - 1), meanRanks: R.map((x) => x / n) };
}

export function chisqGOF(obs: number[]) {
  const n = obs.reduce((a, b) => a + b, 0), e = n / obs.length;
  const chi = obs.reduce((s, o) => s + (o - e) ** 2 / e, 0);
  return { chi, df: obs.length - 1, p: chiSf(chi, obs.length - 1), expected: e };
}

/** Two-sided 95% t critical value, by bisection on tTwo. */
export function tcrit(df: number): number {
  let lo = 0, hi = 50;
  for (let i = 0; i < 60; i++) { const m = (lo + hi) / 2; if (tTwo(m, df) > 0.05) lo = m; else hi = m; }
  return (lo + hi) / 2;
}

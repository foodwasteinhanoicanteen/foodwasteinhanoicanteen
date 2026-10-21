import type { OrderDoc } from "../schemas/campusmeal";

type OrderFields = OrderDoc["byDate"][string][string];

/** One pre-order, flattened out of a student's orders document (orders/{uid}.byDate[date][oid]). */
export class Order {
  constructor(readonly uid: string, readonly oid: string, readonly date: string, readonly f: OrderFields) {}
  get dish() { return this.f.dish; }
  get canteen() { return this.f.canteen; }
  get portion() { return this.f.portion; }
  get code() { return this.f.code; }
  get status() { return this.f.status; }
  /** Placed or collected: the student's one order for that day. */
  get active() { return this.f.status === "placed" || this.f.status === "collected"; }

  static listFrom(uid: string, doc: OrderDoc | null | undefined, date: string): Order[] {
    return Object.entries(doc?.byDate?.[date] ?? {}).map(([oid, f]) => new Order(uid, oid, date, f));
  }
}

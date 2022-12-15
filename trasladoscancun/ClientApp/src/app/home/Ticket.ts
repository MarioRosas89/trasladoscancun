export class Ticket {
  id!: number;
  price!: number;
  fromIdPlace!: number;
  toIdPlace!: number;
  from: string | undefined;
  to: string | undefined;
  name: string | undefined;
  dateFrom: Date | undefined;
  phoneNumber: string | undefined;
}

export interface Client {
  name: String;
  email: String;
  dob: Date;
  status: Active | Pending | Blocked;
}

export type Active = "ACTIVE";

export type Pending = "PENDING";

export type Blocked = "BLOCKED";

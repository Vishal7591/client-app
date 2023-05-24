export interface Client {
  id: string;
  name: string;
  useremail: string;
  dob: Date;
  status: Active | Pending | Blocked;
}

export type Active = "ACTIVE";

export type Pending = "PENDING";

export type Blocked = "BLOCKED";

export interface TableRowProps {
  rowsData: Client[];
  deleteTableRows: Function;
  handleChange: Function;
}

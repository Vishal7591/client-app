import { Client } from "./clientTypes";

export let clients: Client[] = [
  {
    name: "Vishal Saxena",
    email: "vishal.saxena0705@gmail.com",
    dob: new Date("05/07/1991"),
    status: "ACTIVE",
  },
  {
    name: "Jeffry Roberts",
    email: "jeff.roberts@gmail.com",
    dob: new Date("10/21/1990"),
    status: "BLOCKED",
  },
  {
    name: "Sarah Miller",
    email: "sarah.miller@gmail.com",
    dob: new Date("08/18/1993"),
    status: "BLOCKED",
  },
];

export const updateData = (data: Client[]) => {
  clients = Object.assign([], data);
};

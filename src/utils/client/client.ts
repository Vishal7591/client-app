import { Client } from "./clientTypes";

export let clients: Client[] = [
  {
    name: "Vishal Saxena",
    email: "vishal.saxena0705@gmail.com",
    dob: "07/05/1991",
    status: "ACTIVE",
  },
  {
    name: "Jeffry Roberts",
    email: "jeff.roberts@gmail.com",
    dob: "21/10/1990",
    status: "BLOCKED",
  },
  {
    name: "Sarah Miller",
    email: "sarah.miller@gmail.com",
    dob: "18/08/1993",
    status: "BLOCKED",
  },
];

export const updateData = (data: Client[]) => {
  clients = Object.assign([], data);
};

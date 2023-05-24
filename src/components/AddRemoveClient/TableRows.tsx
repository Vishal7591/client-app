import { Button } from "./../Button";
import { Input } from "./../Input";
import "./add-remove-client.scss";
import React from "react";
import { Client, TableRowProps } from "../../types/client/clientTypes";

const TableRows: React.FunctionComponent<TableRowProps> = ({
  rowsData,
  deleteTableRows,
  handleChange
}) => {
  return (
    <React.Fragment>
      {rowsData.map((data: Client, index: number) => {
        const { name, useremail, dob, status } = data;
        const someDate: Date = new Date(dob);
        const date: number = someDate.setDate(someDate.getDate());
        const defaultValue: string = new Date(date).toISOString().split("T")[0];
        return (
          <tr key={data.id as string}>
            <td data-label="Name">
              <Input
                type="text"
                value={name as string}
                onChange={(evnt: any) => handleChange(index, evnt)}
                name="name"
                placeholder="Enter name..."
                className="inputfield"
              />
            </td>
            <td data-label="Email">
              <Input
                type="text"
                value={useremail as string}
                onChange={(evnt: any) => handleChange(index, evnt)}
                name="useremail"
                placeholder="Enter email..."
                className="inputfield"
              />
            </td>
            <td data-label="Date of Birth">
              <Input
                type="date"
                defaultValue={defaultValue}
                placeholder="Enter date of birth..."
                onChange={(evnt: any) => handleChange(index, evnt)}
                onKeyDown={(e: any) => e.preventDefault()}
                name="dob"
                className="inputfield"
              />
            </td>
            <td data-label="Status">
              <select
                name="status"
                onChange={evnt => handleChange(index, evnt)}
                className="selectfield"
                defaultValue={status}
              >
                <option value="ACTIVE">ACTIVE</option>
                <option value="PENDING">PENDING</option>
                <option value="BLOCKED">BLOCKED</option>
              </select>
            </td>
            <td>
              <Button
                onClick={() => deleteTableRows(index)}
                dangerouslySetInnerHTML={{ __html: "Remove" }}
                style={{ backgroundColor: "red", width: "50%" }}
              />
            </td>
          </tr>
        );
      })}
    </React.Fragment>
  );
};

export default TableRows;

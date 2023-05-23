import { Button } from "./../Button";
import "./add-remove-client.scss";
import { Client } from "../../utils/client/clientTypes";

function TableRows({ rowsData, deleteTableRows, handleChange }: any) {
  return rowsData.map((data: Client, index: number) => {
    const { name, email, dob, status } = data;
    const someDate: Date = new Date(dob);
    const date: number = someDate.setDate(someDate.getDate());
    const defaultValue: string = new Date(date).toISOString().split("T")[0];
    return (
      <tr key={data.email as string}>
        <td data-label="Name">
          <input
            type="text"
            value={name as string}
            onChange={(evnt) => handleChange(index, evnt)}
            name="name"
            placeholder="Enter name..."
            className="inputfield"
          />
        </td>
        <td data-label="Email">
          <input
            type="text"
            value={email as string}
            onChange={(evnt) => handleChange(index, evnt)}
            name="email"
            placeholder="Enter email..."
            className="inputfield"
          />
        </td>
        <td data-label="Date of Birth">
          <input
            type="date"
            defaultValue={defaultValue}
            placeholder="Enter date of birth..."
            onChange={(evnt) => handleChange(index, evnt)}
            name="dob"
            className="inputfield"
          />
        </td>
        <td data-label="Status">
          <select
            name="status"
            onChange={(evnt) => handleChange(index, evnt)}
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
  });
}

export default TableRows;

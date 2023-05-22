import { Button } from "./../Button";
import "./add-remove-client.scss";
import { Client } from "../../utils/client/clientTypes";

function TableRows({ rowsData, deleteTableRows, handleChange }: any) {
  return rowsData.map((data: Client, index: number) => {
    const { name, email, dob, status } = data;
    return (
      <tr key={data.email as string}>
        <td scope="row" data-label="Name">
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
          />{" "}
        </td>
        <td data-label="Date of Birth">
          <input
            type="text"
            // defaultValue={dob as string}
            value={dob as string}
            placeholder="Enter date of birth..."
            onChange={(evnt) => handleChange(index, evnt)}
            name="dob"
            className="inputfield"
          />{" "}
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
            style={{ backgroundColor: "red", color: "white" }}
          />
        </td>
      </tr>
    );
  });
}

export default TableRows;

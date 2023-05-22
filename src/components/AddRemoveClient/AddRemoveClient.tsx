import { useState, useEffect } from "react";
import TableRows from "./TableRows";
import "./add-remove-client.scss";
import { Button } from "./../Button";
import { validateEmail } from "../../utils/helper";
import { Client } from "../../utils/client/clientTypes";
import type { RootState } from "../../store/configureStore";
import { fetchClient } from "../../slice/clientSlice";
import { updateClient } from "../../slice/clientUpdateSlice";
import { useSelector, useDispatch } from "react-redux";

export function AddRemoveClient() {
  const dispatch = useDispatch<any>();
  const [rowsData, setRowsData] = useState<any[]>([]);
  const [searchedEmail, setSearchedEmail] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState<any>([]);

  useEffect(() => {
    const data = dispatch(fetchClient());
    data.then((response: any) => {
      setRowsData(JSON.parse(JSON.stringify(response.payload)));
    });
  }, [dispatch]);

  const loading = useSelector(
    (state: RootState) => state.client.common.loading
  );
  //   const error = useSelector((state: RootState) =>   state.client.common.error);

  if (loading) {
    console.log(loading);
  }

  const searchEmployeeByEmail = (event: any) => {
    let searchedEmail: string = event.target.value;
    if (validateEmail(searchedEmail)) {
      const foundEmail: Client = rowsData.find(
        (client: Client) => client.email === searchedEmail
      );
      if (foundEmail !== undefined) {
        setSearchedEmail(searchedEmail);
        setFilteredEmployees([foundEmail]);
      } else {
        setSearchedEmail(searchedEmail);
        setFilteredEmployees([]);
        setRowsData([...rowsData]);
      }
    } else {
      setSearchedEmail(searchedEmail);
      setFilteredEmployees([]);
      setRowsData([...rowsData]);
    }
  };

  const filterEmployeesByStatus = (event: any) => {
    let selectedStatus: string = event.target.value;
    const foundEmployee: Client[] = rowsData.filter(
      (client: Client) =>
        client.status.toLowerCase() === selectedStatus.toLowerCase()
    );
    console.log("foundEmployees", foundEmployee);
    if (foundEmployee.length > 0) {
      setFilteredEmployees(foundEmployee);
      console.log("rowsData", rowsData);
    } else {
      setFilteredEmployees([]);
      setRowsData([...rowsData]);
    }
  };

  const addTableRows = () => {
    const rowsInput: Client = {
      name: "",
      email: "",
      dob: "",
      status: "ACTIVE" || "PENDING" || "BLOCKED",
    };
    setRowsData([...rowsData, rowsInput]);
  };

  const deleteTableRows = (index: any) => {
    const rows = [...rowsData];
    rows.splice(index, 1);
    setRowsData(rows);
  };

  const handleChange = (index: number, evnt: any) => {
    const { name, value } = evnt.target;
    console.log(name, value);
    const rowsInput = [...rowsData];
    rowsInput[index][name] = value;
    setRowsData(rowsInput);
  };

  const saveButtonClick = () => {
    const updateData = dispatch(updateClient(rowsData));
    updateData.then((response: any) => {
      // setRowsData(JSON.parse(JSON.stringify(response.payload)));
      console.log("Data to save", response);
    });
  };

  return (
    <div>
      <div className="appheading">Client App</div>
      <div className="search-add-section">
        <div className="search-and-add-inner">
          <span>Search a Client by Email</span>
          <input
            type="text"
            className="inputfield"
            style={{ width: "80%" }}
            value={searchedEmail}
            placeholder="Enter email here..."
            onChange={searchEmployeeByEmail}
          />
        </div>
        <div className="search-and-add-inner">
          <span>Filter Clients by Status</span>
          <select
            name="status"
            onChange={filterEmployeesByStatus}
            className="inputfield selectfield"
            style={{ color: "#888888" }}
          >
            <option value="select" selected>
              Select status
            </option>
            <option value="Active">ACTIVE</option>
            <option value="Pending">PENDING</option>
            <option value="Blocked">BLOCKED</option>
          </select>
        </div>
        <div
          className="search-and-add-inner"
          style={{ paddingBlockStart: "1%" }}
        >
          <Button
            onClick={addTableRows}
            className={"inputfield"}
            style={{ backgroundColor: "green", color: "white", width: "40%" }}
            dangerouslySetInnerHTML={{ __html: "Add Client" }}
          />
        </div>
      </div>
      <table>
        <thead>
          <tr style={{ backgroundColor: "lightgrey" }}>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Date of Birth</th>
            <th scope="col"> Status</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <TableRows
            rowsData={
              filteredEmployees.length > 0 ? filteredEmployees : rowsData
            }
            deleteTableRows={deleteTableRows}
            handleChange={handleChange}
          />
        </tbody>
      </table>
      <div className="savebutton-section">
        <Button
          onClick={saveButtonClick}
          className="savebutton"
          style={{
            textTransform: "uppercase",
            color: "white",
            backgroundColor: "midnightblue",
          }}
          dangerouslySetInnerHTML={{ __html: "SAVE CHANGES" }}
        />
      </div>
    </div>
  );
}

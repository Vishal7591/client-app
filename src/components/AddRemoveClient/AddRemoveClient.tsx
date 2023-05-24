import React,{ useState, useEffect } from "react";
import TableRows from "../TableRows/TableRows";
import "./add-remove-client.scss";
import { Button } from "./../Button";
import { validateEmail } from "../../utils/helper";
import { Client } from "../../types/client/clientTypes";
import type { RootState } from "../../store/configureStore";
import { fetchClient } from "../../slice/clientSlice";
import { updateClient } from "../../slice/clientUpdateSlice";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

export const AddRemoveClient: React.FunctionComponent=()=> {
  const dispatch = useDispatch<any>();
  const [rowsData, setRowsData] = useState<any[]>([]);
  const [sortedList, setSortedList] = useState<boolean>(false);
  const [saveMessageVisibility, setSaveMessageVisibility] = useState<boolean>(false);
  const [addClientButtonDisabled, setAddClientButtonDisabled] = useState<boolean>(false);
  const [saveButtonDisabled, setSaveButtonDisabled] = useState<boolean>(false);
  const [searchedEmail, setSearchedEmail] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState<any>([]);

  useEffect(() => {
    const data = dispatch(fetchClient());
    data.then((response: any) => {
      setRowsData(JSON.parse(JSON.stringify(response.payload)));
    });
  }, [dispatch]);

  useEffect(() => {
    const containEmptyFields = (element: Client) =>
      element.useremail === "" || element.name === "";
    setSaveMessageVisibility(false);
    const containsValidEmail = (client: Client) =>
      validateEmail(client.useremail);
    setSaveButtonDisabled(
      !rowsData.every(containsValidEmail) || rowsData.some(containEmptyFields)
    );
    setAddClientButtonDisabled(
      !rowsData.every(containsValidEmail) || rowsData.some(containEmptyFields)
    );
  }, [rowsData]);

  const success = useSelector(
    (state: RootState) => state.clientUpdate.common.success
  );

  const searchEmployeeByEmail = (event: any) => {
    let searchedEmail: string = event.target.value;
    if (validateEmail(searchedEmail)) {
      const foundEmail = rowsData.find(
        (client: Client) => client.useremail === searchedEmail
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

  const filterEmployeesByStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    let selectedStatus: string = event.target.value;
    const foundEmployee = rowsData.filter(
      (client: Client) =>
        client.status.toLowerCase() === selectedStatus.toLowerCase()
    );
    if (foundEmployee.length > 0) {
      setFilteredEmployees(foundEmployee);
    } else {
      setFilteredEmployees([]);
      setRowsData([...rowsData]);
    }
  };

  const addTableRows = () => {
    const rowsInput: Client = {
      id: uuidv4(),
      name: "",
      useremail: "",
      dob: new Date(),
      status: "ACTIVE" || "PENDING" || "BLOCKED",
    };
    setSaveButtonDisabled(true);
    setAddClientButtonDisabled(true);
    setRowsData([...rowsData, rowsInput]);
  };

  const deleteTableRows = (index: any) => {
    const rows = [...rowsData];
    rows.splice(index, 1);
    setRowsData(rows);
  };

  const handleChange = (index: number, evnt: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = evnt.target;
    const rowsInput = [...rowsData];
    rowsInput[index][name] = name==="dob"? new Date(value): value;
    setRowsData(rowsInput);
    if (
      (name === "useremail" &&
        validateEmail(value) &&
        rowsInput[index]["name"].value !== "") ||
      (name === "name" &&
        value !== "" &&
        validateEmail(rowsInput[index]["useremail"]))
    ) {
      setAddClientButtonDisabled(false);
      setSaveButtonDisabled(false);
    }
  };

  const saveButtonClick = () => {
    const updateData = dispatch(updateClient(rowsData));
    updateData.then((response: any) => {
      setRowsData(JSON.parse(JSON.stringify(response.payload)));
      setSaveMessageVisibility(true);
    });
  };

  const sortButtonClick = () => {
    let tempList: Client[] = [...rowsData];
    tempList.sort((obj1, obj2) => (obj1.name > obj2.name ? 1 : -1));
    if (sortedList === false) {
      setSortedList(true);
      setFilteredEmployees(tempList);
    } else {
      setSortedList(false);
      setFilteredEmployees([]);
      setRowsData([...rowsData]);
    }
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
            style={{ width: "90%" }}
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
            style={{ color: "#888888", width: "90%" }}
          >
            <option value="select">Select status</option>
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
            onClick={sortButtonClick}
            className={"inputfield"}
            style={{ backgroundColor: "brown", width: "100%" }}
            dangerouslySetInnerHTML={{ __html: "Sort by Name" }}
          />
        </div>
        <div
          className="search-and-add-inner"
          style={{ paddingBlockStart: "1%" }}
        >
          <Button
            onClick={addTableRows}
            className={"inputfield"}
            disabled={addClientButtonDisabled}
            style={{
              backgroundColor: addClientButtonDisabled ? "darkgrey" : "green",
              width: "100%",
            }}
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
          disabled={saveButtonDisabled}
          style={{
            textTransform: "uppercase",
            color: "white",
            backgroundColor: saveButtonDisabled ? "lightgrey" : "midnightblue",
          }}
          dangerouslySetInnerHTML={{ __html: "SAVE CHANGES" }}
        />

        {saveMessageVisibility && (
          <span style={{ color: "red" }}>Changes saved successfully!</span>
        )}
      </div>
    </div>
  );
}

import { render, fireEvent } from "@testing-library/react";
import TableRows from "./TableRows";
import { Client } from "../../types/client/clientTypes";

describe("TableRows", () => {
  const rowsData: Client[] = [
    {
      id: "1",
      name: "Vishal Saxena",
      useremail: "vishal.saxena@gmail.com",
      dob: new Date("1990-01-01"),
      status: "ACTIVE"
    },
    {
      id: "2",
      name: "Sarah Miller",
      useremail: "sarah.miller@gmail.com",
      dob: new Date("1995-05-10"),
      status: "PENDING"
    }
  ];

  const deleteTableRowsMock = jest.fn();
  const handleChangeMock = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders table rows with correct data", () => {
    const { getByText } = render(
      <table>
        <tbody>
          <TableRows
            rowsData={rowsData}
            deleteTableRows={deleteTableRowsMock}
            handleChange={handleChangeMock}
          />
        </tbody>
      </table>
    );

    expect(getByText("Vishal Saxena")).toBeInTheDocument();
    expect(getByText("vishal.saxena@gmail.com")).toBeInTheDocument();
    expect(getByText("Sarah Miller")).toBeInTheDocument();
    expect(getByText("sarah.miller@gmail.com")).toBeInTheDocument();
  });

  it("calls deleteTableRows when remove button is clicked", () => {
    const { getAllByText } = render(
      <table>
        <tbody>
          <TableRows
            rowsData={rowsData}
            deleteTableRows={deleteTableRowsMock}
            handleChange={handleChangeMock}
          />
        </tbody>
      </table>
    );

    const removeButtons = getAllByText("Remove");
    fireEvent.click(removeButtons[0]);

    expect(deleteTableRowsMock).toHaveBeenCalledWith(0);
  });

  it("calls handleChange when input values are changed", () => {
    const { getByPlaceholderText } = render(
      <table>
        <tbody>
          <TableRows
            rowsData={rowsData}
            deleteTableRows={deleteTableRowsMock}
            handleChange={handleChangeMock}
          />
        </tbody>
      </table>
    );

    const nameInput = getByPlaceholderText("Enter name...");
    const emailInput = getByPlaceholderText("Enter email...");
    const dobInput = getByPlaceholderText("Enter date of birth...");

    fireEvent.change(nameInput, { target: { value: "Test Name" } });
    fireEvent.change(emailInput, { target: { value: "test@gmail.com" } });
    fireEvent.change(dobInput, { target: { value: "2000-12-31" } });

    expect(handleChangeMock).toHaveBeenCalledTimes(3);
    expect(handleChangeMock).toHaveBeenCalledWith(0, expect.any(Object));
  });
});

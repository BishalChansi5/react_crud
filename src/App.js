import React, { useEffect, useState } from "react";
import { Data } from "./Components/EmployeeData";

const App = () => {
  const [data, setData] = useState([]);
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [age, setAge] = useState("");
  const [detail, setDetail] = useState({
    firstName: "",
    lastName: "",
    age: "",
  });
  const [isUpdated, setIsUpdated] = useState(false);
  const [id, setId] = useState(0);
  // console.log(detail)

  useEffect(() => {
    setData(Data);
  }, []);

  const handleError = () => {
    let error = "";
    if (detail.firstName === "") {
      error += "First name is required";
      alert(error);
      error = "";
    }
    if (detail.lastName === "") {
      error += "Last name is required";
      alert(error);
      error = "";
    }
    if (detail.age === "") {
      error += "Age is required";
      alert(error);
    }
  };
  const handleSave = () => {
    !detail.firstName && !detail.lastName && !detail.age
      ? handleError()
      : setData((prev) => {
          return [
            ...prev,
            {
              id: data.length + 1,
              firstName: detail.firstName,
              lastName: detail.lastName,
              age: detail.age,
            },
          ];
        });
    handleClear();
  };
  const handleClear = () => {
    setDetail({
      firstName: "",
      lastName: "",
      age: "",
    });
  };
  const handleEdit = (id) => {
    const dt = data.find((item) => item.id === id);
    // console.log(dt)
    // const index = data.findIndex((item) => item.id === id);
    // console.log(id)
    setId(id);
    setDetail({
      firstName: dt.firstName,
      lastName: dt.lastName,
      age: dt.age,
    });
    // setId(dt.id)
    setIsUpdated(true);
  };
  const handleUpdate = () => {
    const dt = data.map((items) => {
      return items.id === id
        ? {
            ...items,
            id,
            firstName: detail.firstName,
            lastName: detail.lastName,
            age: detail.age,
          }
        : items;
    });
    setData(dt);
    // console.log(dt)
    setIsUpdated(false);
    handleClear();
  };
  const handleInput = (e) => {
    const inputData = e.target;
    const { name, value } = inputData;
    setDetail({ ...detail, [name]: value });
  };
  return (
    <div>
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
          border: "2px solid black",
          margin: 20,
        }}
      >
        Employee Data
      </h1>
      <div
        style={{ display: "flex", justifyContent: "space-around", margin: 20 }}
      >
        <label htmlFor="name">
          First Name:
          <input
            type="text"
            placeholder="Enter first name"
            id="name"
            name="firstName"
            value={detail.firstName}
            onChange={handleInput}
          />
        </label>
        <label htmlFor="lname">
          Last Name:
          <input
            type="text"
            placeholder="Enter last name"
            id="lname"
            name="lastName"
            value={detail.lastName}
            onChange={handleInput}
          />
        </label>
        <label htmlFor="age">
          Age:
          <input
            type="number"
            placeholder="Enter age"
            id="age"
            name="age"
            value={detail.age}
            onChange={handleInput}
          />
        </label>
        {!isUpdated ? (
          <button className="btn btn-primary" onClick={handleSave}>
            Save
          </button>
        ) : (
          <button className="btn btn-success" onClick={handleUpdate}>
            Update
          </button>
        )}
        <button className="btn btn-danger" onClick={handleClear}>
          Clear
        </button>
      </div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((items) => {
            const { id, firstName, lastName, age } = items;
            return (
              <tr key={id}>
                <td>{id}</td>
                <td>{firstName}</td>
                <td>{lastName}</td>
                <td>{age}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleEdit(id)}
                  >
                    Edit
                  </button>
                  &nbsp;
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      setData(data.filter((item) => item.id !== id));
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default App;

import "./App.css";
import React, { useEffect, useState } from "react";
function App() {
  const [customerList, setCustomerList] = useState([]);
  const [order, setOrder] = useState("ASC");
  const [value, setValue] = useState("");

  useEffect(() => {
    fetch('http://localhost:5000/api/Customers')
      .then((res) => res.json())
      .then((customerList) => {
        setCustomerList(customerList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const sorting = (col) => {
    if (order === "ASC") {
      const sorted = [...customerList].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setCustomerList(sorted);
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...customerList].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setCustomerList(sorted);
      setOrder("ASC");
    }
  }

  return (
    <div>
      <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="/">
          E-PARTNER
        </a>
        <button
          className="navbar-toggler position-absolute d-md-none collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#sidebarMenu"
          aria-controls="sidebarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <input
          className="form-control form-control-dark w-100"
          type="text"
          placeholder="Search"
          aria-label="Search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="navbar-nav">
          <div className="nav-item text-nowrap">
          </div>
        </div>
      </header>
      <div className="container-fluid">
        <div className="row">
          <nav
            id="sidebarMenu"
            className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
          >
            <div className="position-sticky pt-3">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/">
                    <span data-feather="home" />
                    Menu
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    <span data-feather="file" />
                    Orders
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    <span data-feather="shopping-cart" />
                    Products
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href=".">
                    <span data-feather="users" />
                    Customers
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    <span data-feather="bar-chart-2" />
                    Reports
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    <span data-feather="layers" />
                    Integrations
                  </a>
                </li>
              </ul>
            </div>
          </nav>
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h2">Customers</h1>
              <div className="btn-toolbar mb-2 mb-md-0">
                <div className="btn-group me-2">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    onClick={()=>sorting("CustomerID")}
                  >
                    Sort ID
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    onClick={()=>sorting("ContactName")}
                  >
                    Sort Name
                  </button>
                </div>
              </div>
            </div>
            <div className="table-responsive">
              <table className="table table-striped table-sm">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Company</th>
                    <th scope="col">Name</th>
                    <th scope="col">Title</th>
                    <th scope="col">Address</th>
                    <th scope="col">City</th>
                    <th scope="col">Region</th>
                    <th scope="col">Postal Code</th>
                    <th scope="col">Country</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Fax</th>
                  </tr>
                </thead>
                <tbody>
                  {customerList.filter((item) => {
                    if(value == "") {
                      return item
                    } else if(item.CustomerID.toLowerCase().includes(value.toLowerCase())) {
                      return item
                    } else if(item.ContactName.toLowerCase().includes(value.toLowerCase())) {
                      return item
                    } 
                  }).map((item, index) => (
                    <tr key={index}>
                      <td>{item.CustomerID}</td>
                      <td>{item.CompanyName}</td>
                      <td>{item.ContactName}</td>
                      <td>{item.ContactTitle}</td>
                      <td>{item.Address}</td>
                      <td>{item.City}</td>
                      <td>{item.Region}</td>
                      <td>{item.PostalCode}</td>
                      <td>{item.Country}</td>
                      <td>{item.Phone}</td>
                      <td>{item.Fax}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;

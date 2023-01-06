import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import AddCustomer from "../components/AddCustomer";
import { baseUrllocal8000 } from "../shared";

export default function Customers() {
  const [customers, setCustomers] = useState();
  const [show, setShow] = useState(false);

  function toggleShow(){ //manipulate show/hide modal by inverting its current value
    setShow(!show);
  }

  useEffect(() => {
    console.log("fetching...");
    const url = baseUrllocal8000 + "api/customers/";
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.customer);
        setCustomers(data.customer);
      });
  }, []);

  //ADD NEW CUSTOMERS
  function newCustomer(name, industry) {
    console.log("adding new customer");
    const data = { name: name, industry: industry };
    const url = baseUrllocal8000 + "api/customers/";

    fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong.");
        }
        return response.json();
      })
      .then((data) => {
        //assume success add data
        //hide modal
        //update the page without reloading
        toggleShow();
        setCustomers([...customers, data.customer]);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <>
      <h3>Customers page</h3>
      <ul className="m-3 p-3 rounded border-2 border-solid border-gray-300 w-[300px]">
        {customers
          ? customers.map((customer) => {
              return (
                <li key={uuidv4()}>
                  <Link
                    to={"/customers/" + customer.id}
                    className="no-underline"
                  >
                    {customer.name}
                  </Link>
                </li>
              );
            })
          : null}
      </ul>
      <AddCustomer newCustomer={newCustomer} show={show} toggleShow={toggleShow}/>
    </>
  );
}

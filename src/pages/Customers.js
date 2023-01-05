import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { baseUrllocal8000 } from "../shared";

export default function Customers() {
  const [customers, setCustomers] = useState();

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

  return (
    <>
      <h3>Customers page</h3>
      {customers
        ? customers.map((customer) => {
            return (
              <p key={uuidv4()}>
                <Link to={"/customers/" + customer.id}>{customer.name}</Link>
              </p>
            );
          })
        : null}
    </>
  );
}

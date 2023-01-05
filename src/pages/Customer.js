import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { baseUrllocal8000 } from "../shared";

export default function Customer() {
  const { id } = useParams();
  const [customer, setCustomer] = useState();
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const url = baseUrllocal8000 + "api/customers/" + id;

    fetch(url)
      .then((response) => {
        if (response.status === 404) {
          setNotFound(true);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.customer);
        setCustomer(data.customer);
      });
  }, []);

  return (
    <>
      {notFound ? (
        <h3 className="mx-auto m-4">
          Customer with id="{id}" does not exist.
        </h3>
      ) : null}

      {customer ? (
        <div>
          <p>{customer.id}</p>
          <p>{customer.name}</p>
          <p>{customer.industry}</p>
        </div>
      ) : null}
      <Link to="/customers">go back</Link>
    </>
  );
}

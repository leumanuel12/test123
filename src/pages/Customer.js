import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Customer() {
  const { id } = useParams();
  const [customer, setCustomer] = useState();

  useEffect(() => {
    const url = "http://localhost:8000/api/customers/" + id;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.customer);
        setCustomer(data.customer);
      });
  }, []);

  return (
    <>
        {customer ? (
          <div>
            <p>{customer.id}</p>
            <p>{customer.name}</p>
            <p>{customer.industry}</p>
          </div>
        ) : null}

    </>
  );
}

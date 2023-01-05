import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { baseUrllocal8000 } from "../shared";
import { useNavigate } from "react-router-dom";

export default function Customer() {
  const { id } = useParams();
  const [customer, setCustomer] = useState();
  const [notFound, setNotFound] = useState(false);
  const navigate = useNavigate();

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

  function deleteCustomer() {
    console.log("deleting customer");
    const url = baseUrllocal8000 + "api/customers/" + id;
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong.");
          //dont need to return json response since this is a network request
        }
        //once success, return to previous page
        navigate("/customers");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <>
      {notFound ? (
        <h3 className="mx-auto m-4">Customer with id="{id}" does not exist.</h3>
      ) : null}

      <button
        className="m-2 bg-white-500 hover:bg-purple-700 text-purple-700 hover:text-white font-bold px-2 rounded border-2 border-solid border-purple-400"
        onClick={() => {
          navigate("/customers");
        }}
      >
        go back
      </button>

      {customer ? (
        <ul className="m-3 p-3 rounded border-2 border-solid border-gray-300 w-[300px]">
          <li>ID: {customer.id}</li>
          <li>Name: {customer.name}</li>
          <li>Industry: {customer.industry}</li>
        </ul>
      ) : null}

      <button
        className="m-2 bg-red-500 hover:bg-red-700 text-white font-bold px-3 rounded"
        onClick={deleteCustomer}
      >
        Delete
      </button>
      <br />
      <br />
    </>
  );
}

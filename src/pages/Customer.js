import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { baseUrllocal8000 } from "../shared";
import { useNavigate } from "react-router-dom";

export default function Customer() {
  const { id } = useParams();
  const [customer, setCustomer] = useState();
  const [notFound, setNotFound] = useState(false);
  const navigate = useNavigate();
  const [tempCustomer, setTempCustomer] = useState();
  const [changed, setChanged] = useState(false);
  const [saved, setSaved] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    //console.log(customer);
    //console.log(tempCustomer);

    //COMPARING DB DATA TO UI DATA
    if (!customer) return;
    let equal = true;
    if (customer.name !== tempCustomer.name) equal=false;
    if (customer.industry !== tempCustomer.industry) equal=false;
    if (equal) setChanged(false);
  });

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
        //console.log(data.customer);
        setCustomer(data.customer);
        setTempCustomer(data.customer);
      });
  }, []);


  //TO DELETE A CUSTOMER
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

  //TO UPDATE THE CUSTOMER DETAILS
  function updateCustomer() {
    const data = { ...tempCustomer };
    const url = baseUrllocal8000 + "api/customers/" + id;
    console.log("updating data...");
    console.log(data);

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          //throw new Error('Something went wrong.');
          if (response.status === 404) {
            setError("404 - Something went wrong.");
          } else if (response.status === 400) {
            setError("400 - Bad request.");
          } else if (response.status === 500) {
            setError("500 - Internal Server Error.");
          }
        }
        return response.json();
      })
      .then((data) => {
        setChanged(false);
        setCustomer(data.customer); //IMPORTANT!!! make sure to update the customer state from the new customer data
        setSaved("Successfully saved!");
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
        className="m-2 bg-white-500 hover:bg-purple-500 text-purple-700 hover:text-white font-bold px-2 py-2 rounded border-2 border-solid"
        onClick={() => {
          navigate("/customers");
        }}
      >
        &#60; go back
      </button>

      {customer ? (
        <div className="max-w-2xl m-3 p-3 rounded border-2 border-solid border-gray-300">
          
          {saved && !changed && !error ? (
            <p className="text-green-500 font-bold">{saved}</p>
          ) : (
            <p className="text-red-500 font-bold">{error}</p>
          )}

          <p>
            Name
            <input
              type="text"
              className="mx-2 shrink min-w-0 px-2 border-2 border-solid rounded-md"
              value={tempCustomer.name}
              onChange={(e) => {
                setTempCustomer({ ...tempCustomer, name: e.target.value });
                //console.log(tempCustomer.name);
                setChanged(true);
              }}
            />
          </p>
          <p>
            Industry
            <input
              type="text"
              className="mx-2 shrink min-w-0 px-2 border-2 border-solid rounded-md"
              value={tempCustomer.industry}
              onChange={(e) => {
                setTempCustomer({ ...tempCustomer, industry: e.target.value });
                //console.log(tempCustomer.industry);
                setChanged(true);
              }}
            />
          </p>

          <div className="mt-4">
            {changed ? (
              <>
                <button
                  className="mx-3 font-bold px-2 rounded border-red-400 border-2 text-red-500"
                  onClick={() => {
                    setTempCustomer({ ...customer });
                    setChanged(false);
                    setSaved(false);
                    setError(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={updateCustomer}
                  className="mx-3 font-bold px-2 rounded border-green-400 border-2 text-green-500"
                >
                  Save
                </button>
              </>
            ) : null}
          </div>
        </div>
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

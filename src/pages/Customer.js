import { useParams, Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { baseUrllocal8000 } from "../shared";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { LoginContext } from "../App";
import useFetch from "../hooks/UseFetch";

export default function Customer() {
  const { id } = useParams();
  //const [customer, setCustomer] = useState();
  //const [notFound, setNotFound] = useState(false);
  const [tempCustomer, setTempCustomer] = useState();
  const [changed, setChanged] = useState(false);
  const [saved, setSaved] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const [loggedIn, setLoggedIn] = useContext(LoginContext);

  useEffect(() => {
    //console.log(customer);
    //console.log(tempCustomer);

    //COMPARING DB DATA TO UI DATA
    //it will hide the save buttons if the typed data didnt changed after editing

    if (!customer) return;
    let equal = true;
    if(tempCustomer){
      if (customer.name !== tempCustomer.name) equal = false;
      if (customer.industry !== tempCustomer.industry) equal = false;
      if (equal) setChanged(false);
    }

  });

  const {request, deleteData, updateData, data: {customer} = {}, errorStatus, errorCode} = useFetch(baseUrllocal8000 + "api/customers/" + id, {
    method: 'GET',
    headers: {
      'Content-Type' : 'application/json',
      Authorization: "Bearer " + localStorage.getItem("access"),
    }
});

useEffect( () => {
  request();
}, [] )

useEffect( () => {
  setTempCustomer(customer);
  //console.log(customer)
  //console.log(tempCustomer)
}, [customer] )

useEffect( () => {
  //console.log("error status =",errorStatus)
  if( errorCode ){
    setError("400 - Bad request.");
    setSaved(false);
    console.log('bad request')
  }
  if( !errorCode && (errorCode !== undefined) ){
    setSaved('Successfully saved!');
    setError(false);
  }

} )

  /*
  useEffect(() => {
    const url = baseUrllocal8000 + "api/customers/" + id;

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
      },
    })
      .then((response) => {
        if (response.status === 404) {
          setNotFound(true);
        }
        if (response.status === 204) {
          setNotFound(true);
        }
        if (response.status === 401) {
          setLoggedIn(false);
          navigate("/login", {
            state: {
              previousUrl: location.pathname,
            },
          });
        }
        return response.json();
      })
      .then((data) => {
        //console.log(data.customer);
        setCustomer(data.customer);
        setTempCustomer(data.customer);
      });
  }, []);

   */

  //TO DELETE A CUSTOMER
  function deleteCustomer() {
    deleteData();
    //console.log("deleting customer");
    /*
    const url = baseUrllocal8000 + "api/customers/" + id;
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
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
      */
  }

  //TO UPDATE THE CUSTOMER DETAILS
  function updateCustomer() {

    updateData({...tempCustomer})

    //console.log('saved?',saved)
    //console.log('errorStatus=',errorStatus)
    //console.log('customer=',customer)
    //console.log('tempCustomer=',tempCustomer)
    //console.log('changed?',changed)

    /*
    const data = { ...tempCustomer };
    //const url = 'https://httpstat.us/500';
    const url = baseUrllocal8000 + "api/customers/" + id;
    //console.log("updating data...");
    //console.log(data);

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 404) {
            setError("404 - Something went wrong.");
            throw new Error("Something went wrong.");
          } else if (response.status === 400) {
            setError("400 - Bad request.");
            throw new Error("Something went wrong.");
          } else if (response.status === 500) {
            setError("500 - Internal Server Error.");
            throw new Error("Something went wrong.");
          }
          if (response.status === 401) {
            navigate("/login", {
              state: {
                previousUrl: location.pathname,
              },
            });
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
      */
  }

 
  return (
    <>
      {!customer ? (
        <h3 className="mx-auto m-4">Customer with id="{id}" does not exist.</h3>
      ) : (
        <button
          className="m-2 bg-white-500 hover:bg-purple-500 text-purple-700 hover:text-white font-bold px-2 py-2 rounded border-2 border-solid"
          onClick={() => {
            navigate("/customers");
          }}
        >
          &#60; go back
        </button>
      )}

      {customer && tempCustomer ? (
        <div className="max-w-md m-4 p-4 rounded border-2 border-solid border-gray-300">
          {!errorCode ? (
            <p className="text-green-500 font-bold">{saved}</p>
          ) : <p className="text-red-500 font-bold">{error}</p>}

          <div className="md:flex md:items-center m-4">
            <div className="md:w-1/4">
              <label for="name">Name</label>
            </div>
            <div>
              <input
                id="name"
                type="text"
                className="mx-2 shrink min-w-0 px-2 border-2 border-solid rounded-md"
                value={tempCustomer.name}
                onChange={(e) => {
                  setTempCustomer({ ...tempCustomer, name: e.target.value });
                  //console.log(tempCustomer.name);
                  setChanged(true);
                }}
              />
            </div>
          </div>
          <div className="md:flex md:items-center m-4">
            <div className="md:w-1/4">
              <label for="industry">Industry</label>
            </div>
            <div>
              <input
                id="industry"
                type="text"
                className="mx-2 shrink min-w-0 px-2 border-2 border-solid rounded-md"
                value={tempCustomer.industry}
                onChange={(e) => {
                  setTempCustomer({
                    ...tempCustomer,
                    industry: e.target.value,
                  });
                  //console.log(tempCustomer.industry);
                  setChanged(true);
                }}
              />
            </div>
          </div>

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

      {customer ? (
        <>
          <button
            className="m-2 bg-red-500 hover:bg-red-700 text-white font-bold px-3 rounded"
            onClick={deleteCustomer}
          >
            Delete
          </button>
          <br />
          <br />
        </>
      ) : null}
    </>
  );
  
}

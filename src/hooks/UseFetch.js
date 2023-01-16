import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function useFetch(url, {method, headers, body} = {} ){
    const [data, setData] = useState();
    const [errorStatus, setErrorStatus] = useState();
    const [errorCode, setErrorCode] = useState();

    const navigate = useNavigate();
    const location = useLocation();

    function request(){
        fetch(url, {
            method: method,
            headers: headers,
            body: body
        })
          .then((response) => {
            if(!response.ok){
                throw(response.status);
            }
            if (response.status === 401) {
              navigate("/login", {
                state: {
                  previousUrl: location.pathname,
                }
              });
            }
            return response.json();
          })
          .then((data) => {
            setData(data);
            //console.log(data)
          })
          .catch((e) => {
            console.log(e);
            setErrorStatus(e);
          });
      }

      function appendData(newData){
        //console.log("adding new customer...", newData);
        fetch(url, {
          method: "POST",
          headers: headers,
          body: JSON.stringify(newData),
        })
          .then((response) => {
            if(!response.ok){
                throw(response.status);
            }
            if (response.status === 401) {
              navigate("/login", {
                state: {
                  previousUrl: location.pathname,
                }
              });
            }
            return response.json();
          })
          .then((d) => {
            const currentData = {...data} //get the current data displayed
            const submitted = Object.values(d)[0];

            Object.values(currentData)[0].push(submitted);
            setData(currentData);

            //console.log('new data', currentData)
            //console.log(Object.values(d)[0])
            console.log(submitted);
            console.log(currentData);
          })
          .catch((e) => {
            console.log(e);
            setErrorStatus(e);
          });
          
      }

      function deleteData(){
        //console.log('deleting data...')
        fetch(url, {
          method: "DELETE",
          headers: headers
        })
        .then( (response) => {
          if(!response.ok){
            throw(response.status);
          }
          navigate("/customers");
        } )
        .catch((e) => {
          console.log(e);
          setErrorStatus(e);
        })
      }

      function updateData(newData){
        //console.log("adding new customer...", newData);
        fetch(url, {
          method: "POST",
          headers: headers,
          body: JSON.stringify(newData),
        })
          .then((response) => {
            if(!response.ok){
                throw(response.status);
            }
            if (response.status === 401) {
              navigate("/login", {
                state: {
                  previousUrl: location.pathname,
                }
              });
            }
            return response.json();
          })
          .then((d) => {
            setData(d);
            setErrorCode(false);
            //console.log(d);
          })
          .catch((e) => {
            console.log(e);
            setErrorStatus(e);
            setErrorCode(true)
          });
          
      }

      return {request, appendData, deleteData, updateData, data, errorStatus, errorCode};
}
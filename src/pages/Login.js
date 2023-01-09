import { baseUrllocal8000 } from "../shared";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { LoginContext } from "../App";

export default function Login() {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();
    const location = useLocation();

    const [loggedIn, setLoggedin] = useContext(LoginContext);

    useEffect( () => {
      //console.log(location)
      //console.log('login?=', loggedIn)
    } )

    function login(){
        const url = baseUrllocal8000 + 'api/token/';

        fetch(url, { 
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
         })
        .then( (response) => {
            return response.json();
        } )
        .then( (data) => {
            localStorage.setItem('token', data);
            localStorage.setItem('access', data.access);
            localStorage.setItem('refresh', data.refresh);
            //console.log(localStorage);
            setLoggedin(true);
            navigate(location?.state?.previousUrl ? location.state.previousUrl : '/customers');
            //console.log(location?.state?.previousUrl)
        } )
        .catch( (e) => {
            console.log(e);
        } )
    }

  return (
    <>
      <form className="mx-auto max-w-md m-4 p-4 rounded border-2 border-solid border-gray-300"
        onSubmit={ (e) => {
            e.preventDefault();
            login();
        } }>
        <div className="md:flex md:items-center m-4">
          <div className="md:w-1/4">
            <label for="username">Username</label>
          </div>
          <div>
            <input
              id="username"
              type="text"
              className="mx-2 shrink min-w-0 px-2 border-2 border-solid rounded-md"
              value={username}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="md:flex md:items-center m-4">
          <div className="md:w-1/4">
            <label for="industry">Password</label>
          </div>
          <div>
            <input
              id="password"
              type="password"
              className="mx-2 shrink min-w-0 px-2 border-2 border-solid rounded-md"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
        </div>
        <button className="flex mx-auto items-right bg-white-500 hover:bg-purple-700 text-purple-700 hover:text-white px-3 rounded border-2 border-solid border-purple-400">
          Login
        </button>
      </form>
    </>
  );
}

import "./App.css";
import "./index.css";
import Header from "./components/Header";
import Employees from "./pages/Employees";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Customers from "./pages/Customers";
import Dictionary from "./pages/Dictionary";
import Definition from "./pages/Definition";
import NotFound from "./components/NotFound";
import Customer from "./pages/Customer";
import Login from "./pages/Login";
import { createContext, useEffect, useState } from "react";
import { baseUrllocal8000 } from "./shared";

export const LoginContext = createContext();

function App() {
  //const [loggedIn, setLoggedIn] = useState(true);  //not recommended

  //first, we check the access token
  //if access token is available then we set the loggedIn state as true else false if token is empty
  const [loggedIn, setLoggedIn] = useState(localStorage.access ? true : false);

  //we will call this to the LoginContext value so we can clear the token and logout at the same time as we click the logout button
  function changeLoggedIn(value) {
    setLoggedIn(value);
    if (value === false) {
      localStorage.clear(); //if logged out, we clear the localStorage
    }
  }

  function setTokens(){
    if (localStorage.refresh) { //we check first if we have tokens else refresh token fetch will run everytime even when not loggedin
      
      //console.log("refreshing token...");
      const url = baseUrllocal8000 + "api/refresh/";
      //console.log(url);

      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refresh: localStorage.refresh,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Something went wrong.");
          }
          return response.json();
        })
        .then((data) => {
          //console.log(data);
          localStorage.access = data.access;
          localStorage.refresh = data.refresh;
          //console.log("access=",localStorage.access)
          setLoggedIn(true); //just making sure we wont get kicked out once refresh
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }

  useEffect(() => {
    const minute = 1000 * 60;

    setTokens(); //we invoke it at once so it will refresh the moment we login
    
    setInterval(setTokens, minute * 3); //now refresh token will execute every 3 minutes on this case
  }, []);


  return (
    <LoginContext.Provider value={[loggedIn, changeLoggedIn]}>
      <BrowserRouter>
        <Header>
          <Routes>
            <Route path="/" element={<Customers />} />
            <Route path="/dictionary" element={<Dictionary />} />
            <Route path="/dictionary/:search" element={<Definition />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/customers/:id" element={<Customer />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Login />} />
          </Routes>
        </Header>
      </BrowserRouter>
    </LoginContext.Provider>
  );
}

export default App;

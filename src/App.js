import "./App.css";
import "./index.css";
import Employee from "./components/Employee";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [employees, setEmployees] = useState([
    {
      name: "Cardo Dalisay",
      role: "Probinsiyano",
      img: "https://pbs.twimg.com/media/EXayM80U4AAst8O?format=jpg&name=small",
    },
    {
      name: "Narda Custodia",
      role: "Darna",
      img: "https://files.tempo.com.ph/wp-content/uploads/2022/08/20112154/Fah0DAbUcAIRTVG.jpg",
    },
    {
      name: "Victor Magtanggol",
      role: "Thor ng pinas",
      img: "https://pbs.twimg.com/media/DwgnMcSVAAA0afZ?format=jpg&name=large",
    }
  ]);

  return (
    <div className="App">
      <div className="flex flex-wrap pt-10 justify-center">
        {employees.map((employee) => {
          //console.log(employee);
          return (
            <Employee
              key={uuidv4()}
              name={employee.name}
              role={employee.role}
              img={employee.img}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;

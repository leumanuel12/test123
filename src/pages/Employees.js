import "../App.css";
import "../index.css";
import Employee from "../components/Employee";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import AddEmployee from "../components/AddEmployee";
import EditEmployee from "../components/EditEmployee";


function Employees() {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Cardo Dalisay",
      role: "Probinsyanong Yungit",
      img: "https://pbs.twimg.com/media/EXayM80U4AAst8O?format=jpg&name=small",
    },
    {
      id: 2,
      name: "Narda Custodia",
      role: "Darna mukaog bato",
      img: "https://files.tempo.com.ph/wp-content/uploads/2022/08/20112154/Fah0DAbUcAIRTVG.jpg",
    },
    {
      id: 3,
      name: "Victor Magtanggol",
      role: "Thor budget meal",
      img: "https://pbs.twimg.com/media/DwgnMcSVAAA0afZ?format=jpg&name=large",
    },
  ]);

  function updateEmployee(id, newName, newRole) {
    //console.log(id, newName, newRole);
    const updatedEmployees = employees.map((employee) => {
      if (id == employee.id) {
        return { ...employee, name: newName, role: newRole };
      }

      return employee;
    });
    setEmployees(updatedEmployees);
  }

  function newEmployee(name, role, img) {
    console.log("newEmployee function executing...");
    console.log(name, role, img);
    const newEmployee = {
      id: uuidv4(),
      name: name,
      role: role,
      img: img,
    };

    setEmployees([...employees, newEmployee]);
  }

  return (
    <div>
      <h3>Employees page</h3> 
      <div className="pt-2 flex flex-wrap justify-center">
        {employees.map((employee) => {
          //console.log(employee);

          const editEmployee = ( //custom Edit Employee component for easy calling
            <EditEmployee
              id={employee.id}
              name={employee.name}
              role={employee.role}
              updateEmployee={updateEmployee}
            />
          );

          return (
            <Employee
              //key={uuidv4()}
              key={employee.id}  //display employees
              id={employee.id}
              name={employee.name}
              role={employee.role}
              img={employee.img}
              editEmployee={editEmployee}
            />
          );
        })}
      </div>
      <AddEmployee newEmployee={newEmployee} />
    </div>
  );
}

export default Employees;

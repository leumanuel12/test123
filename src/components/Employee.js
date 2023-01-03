function Employee(props) {
  return (
    <>
      <h3>Employee: {props.name}</h3>
      {props.role ? (
        <span class="role">{props.role}</span>
      ) : (
        <span class="norole">No role</span>
      )}
    </>
  );

  /*const employeeNames = ["Test Name 1","Test Name 2","Test Name 3"];

    let eachEmployeeName = employeeNames.join(", ");
    return eachEmployeeName;
    */

  /*for (let eachEmployeeName of employeeNames){
        return eachEmployeeName;
    }*/
}

export default Employee;

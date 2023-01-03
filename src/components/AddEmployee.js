import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function AddEmployee(props) {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [img, setImg] = useState('');

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Cardo Dalisay",
      role: "Probinsiyano",
      img: "https://pbs.twimg.com/media/EXayM80U4AAst8O?format=jpg&name=small",
    },
    {
      id: 2,
      name: "Narda Custodia",
      role: "Darna",
      img: "https://files.tempo.com.ph/wp-content/uploads/2022/08/20112154/Fah0DAbUcAIRTVG.jpg",
    },
    {
      id: 3,
      name: "Victor Magtanggol",
      role: "Thor ng Pinas",
      img: "https://pbs.twimg.com/media/DwgnMcSVAAA0afZ?format=jpg&name=large",
    }
  ]);

  return (
    <>
      <button
        onClick={handleShow}
        className="block mx-auto m-2 bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-3 rounded"
      >
        + Add Employee
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              //console.log("submit triggered new employee.");
              //console.log(name, role, img);
              setName(''); //to clear existing data
              setRole('');
              setImg('');
              props.newEmployee(name, role, img);
            }}
            id="addmodal"
            className="w-full max-w-sm"
          >
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  for="full-name"
                >
                  Full Name
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="full-name"
                  type="text"
                  value={name}
                  placeholder="Juan Dela Cruz"
                  required
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  for="role"
                >
                  Role
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="role"
                  type="text"
                  placeholder="Developer"
                  required
                  value={role}
                  onChange={(e) => {
                    setRole(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  for="img"
                >
                  Image URL
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="img"
                  type="text"
                  value={img}
                  required
                  placeholder="https://image-name.jpg"
                  onChange={(e) => {
                    setImg(e.target.value);
                  }}
                />
              </div>
            </div>


          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={handleClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-3 rounded inline-flex items-center"
          >
            Cancel
          </button>
          <button
            form="addmodal"
            onClick={() => {
              if ((name != '') && (role != '') && (img != '')) {
                handleClose();
              }
            }}
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-3 rounded"
          >
            Add
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddEmployee;

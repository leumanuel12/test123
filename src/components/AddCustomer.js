import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

export default function AddCustomer(props) {
  const [name, setName] = useState('');
  const [industry, setIndustry] = useState('');

  const [show, setShow] = useState(props.show);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  

  return (
    <>
      <button
        onClick={props.toggleShow}
        className="m-2 bg-white-500 hover:bg-purple-700 text-purple-700 hover:text-white font-bold p-2 rounded border-2 border-solid border-purple-400"
      >
        + Add Customer
      </button>

      <Modal
        show={props.show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={(e) => {
              e.preventDefault(); //prevents from reloading the whole page upon submit
              setName('');
              setIndustry('');
              props.newCustomer(name, industry);
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
                  Name
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="full-name"
                  type="text"
                  value={name}
                  placeholder="Google"
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
                  for="industry"
                >
                  Industry
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="industry"
                  type="text"
                  placeholder="E-commerce"
                  required
                  value={industry}
                  onChange={(e) => {
                    setIndustry(e.target.value);
                  }}
                />
              </div>
            </div>

        

          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={props.toggleShow}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-3 rounded inline-flex items-center"
          >
            Cancel
          </button>
          <button
            form="addmodal"
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-3 rounded"
          >
            Add
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
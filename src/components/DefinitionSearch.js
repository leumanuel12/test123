import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function DefinitionSearch() {
  const [word, setWord] = useState("");
  const navigate = useNavigate();

  return (
    <>
      <h3 className="m-2 flex justify-center pb-3"><Link to="/dictionary" className="no-underline text-black">Dictionary Search</Link></h3>
      <form
        onSubmit={() => {
          navigate("/dictionary/" + word);
        }}
        className="flex justify-center space-x-2"
      >
        <input
          type="text"
          className="shrink min-w-0 px-2 border-2 border-solid rounded-md border-purple-400"
          placeholder="frontend development"
          required
          onChange={(e) => {
            //console.log(word);
            setWord(e.target.value);
          }}
        />
        <button className="bg-white-500 hover:bg-purple-700 text-purple-700 hover:text-white px-3 rounded border-2 border-solid border-purple-400">
          Search
        </button>
      </form>
    </>
  );
}

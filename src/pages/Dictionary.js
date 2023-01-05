//import { useState, useEffect } from "react";
//import { useNavigate } from "react-router-dom";
import DefinitionSearch from "../components/DefinitionSearch";

export default function Dictionary() {
  
  //const [word2, setWord2] = useState("");
  

  /*
  useEffect(() => {
    console.log("State updated "+ word + ' ' + word2);
  });
  //useEffect will run once the page is loaded and every time useState/state is changed
  //useEffect should be declared after the state is initiated/defined
  //will execute all state if no dependency array in the 2nd parameter
  //putting an empty array on the 2nd parameter will only execute useeffect once the page is loaded
  //-- which is useful when fetching data from backend once page is loaded

  useEffect(() => {
    console.log("State updated " + word);
  }, [word]);
  //this effect will only execute for word state only

  useEffect(() => {
    console.log("State updated " + word2);
  }, [word2]);
  //this effect will only execute for word2 state only
*/

  return <DefinitionSearch/>
}

/*

    <input
      type="text"
      onChange={(e) => {
        //console.log(word);
        setWord(e.target.value);
      }}
    />
    <h3>Definition for {word}</h3>

    <input
        type="text"
        className="mt-3"
        onChange={(e) => {
          //console.log(word);
          setWord2(e.target.value);
        }}
      />
      <h3>Definition for {word}</h3>
*/

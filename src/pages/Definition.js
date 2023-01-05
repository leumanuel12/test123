import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate, useParams, Link } from "react-router-dom";
import NotFound from "../components/NotFound";
import DefinitionSearch from "../components/DefinitionSearch";

export default function Definition() {
  const [word, setWord] = useState();
  let { search } = useParams();
  const navigate = useNavigate();
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    //console.log('state effect executed.');
    //const url = "http://httpstat.us/503";
    //fetch(url)

    fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + search)
      .then((response) => {
        //console.log(response.status);
        if (response.status === 404) {
          setNotFound(true);
        } //can set different error codes, else use a general error

        //check for other errors, this will be caught in the catch error
        if (!response.ok) {
          setError(true); //set the error state to true
          throw new Error("Something went wrong. Please try again.");
        }

        return response.json();
      })
      .then((data) => {
        setWord(data[0].meanings);
        //console.log(data[0].meanings);
      })
      .catch((e) => {
        console.log(e.message);
        //you can set error here
      });
  }, []);

  if (notFound === true) {
    return (
      <>
        <NotFound />
        <Link className="m-4 flex justify-center" to="/dictionary">
          Search another
        </Link>
      </>
    );
  }

  if (error === true) {
    return (
      <>
        <h3>Something went wrong. Please try again.</h3>
      </>
    );
  }

  return (
    <>
      <DefinitionSearch />
      <div className="mx-auto max-w-5xl">
        <h4 className="m-2 mb-4">
          Definition of{" "}
          <b>
            <i>
              <u>{search}</u>
            </i>
            :
          </b>
        </h4>
        {word
          ? word.map((meaning) => {
              return (
                <div
                  key={uuidv4()}
                  className="mx-auto max-w-4xl px-5 py-2 m-2 rounded-md border-2 border-purple-400"
                >
                  <b>{meaning.partOfSpeech + ": "}</b>
                  {meaning.definitions[0].definition}
                </div>
              );
            })
          : null}
      </div>
    </>
  );
}

/*
<Link className="m-5" to='/dictionary'>&#60; Search another</Link>
*/

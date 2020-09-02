import React from 'react';
import './App.css';
import * as axios from 'axios';
import rocksetConfigure from "@rockset/client";

const ROCKSET_APIKEY = '<insert key>';
const rockset = rocksetConfigure(ROCKSET_APIKEY, "https://api.rs2.usw2.rockset.com");
 





function App() {
  const [userId, setUserId] = React.useState('');
  const [genre, setGenre] = React.useState('');
  const [results, setResults] = React.useState([]);

  const submit = () => {
    rockset.queryLambdas.executeQueryLambdaByTag(
      'commons',
      'fetchMovies',
      'dev',
      {
        "parameters": [
          {
            "name": "genre",
            "type": "string",
            "value": genre,
          },
          {
            "name": "userId",
            "type": "string",
            "value": userId,
          }
        ]
      },
    )
    .then(response => setResults(response.results))
    .catch(error => console.error(error));;
    // axios.post(
    //   "https://api.rs2.usw2.rockset.com/v1/orgs/self/ws/commons/lambdas/fetchMovies/tags/dev",
    //   {
    //     "parameters": [
    //       {
    //         "name": "genre",
    //         "type": "string",
    //         "value": genre,
    //       },
    //       {
    //         "name": "userId",
    //         "type": "string",
    //         "value": userId,
    //       }
    //     ]
    //   },  
    //   {
    //     "headers": {
    //       "Authorization": `ApiKey ${ROCKSET_APIKEY}`
    //     }
    //   }
    // )
    // .then(response => setResults(response.data.results))
    // .catch(error => console.error(error));
  }
  
  return (
    <div className="App">
      <div style={{ paddingTop: 100 }}>
        <div>
          <p>User ID</p>
          <input type="text" value={userId} onChange={(evt) => setUserId(evt.target.value)} />
          <p>Genre</p>
          <input type="text" value={genre} onChange={(evt) => setGenre(evt.target.value)} />
        </div>
        <br /><br />
        <button onClick={submit}>Submit</button>
        <div><p>Results</p>
        {results.map(r => <div>{r.title}</div>)}
        </div>
      </div>
    </div>
  );
}

export default App;

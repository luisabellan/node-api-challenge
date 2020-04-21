import React, {useState, useEffect} from 'react';
import axios from 'axios'
import './App.scss';

function App() {

  const [data, setData] = useState([])
  useEffect(() => {
    axios
      .get(
        `http://localhost:4000/api/projects`
      )
      .then(res => setData(res.data))
      .catch(err => `Houston we have an error: ${err}`)
  }, []);


  return (
    <div className="App">
      <ul>
            {data.map(project =>{
              return (
                <div key={project.id} className="project">
                  <h2>{project.name}</h2>
                  <p>{project.description}</p>
                </div>

              )
            })}
      </ul>
    </div>
  );
}

export default App;

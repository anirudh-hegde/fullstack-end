import './App.css';
import { useEffect, useState } from "react";

function App() {
  const [getData, setGetData] = useState(null);
  const [postResponse, setPostResponse] = useState(null);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const API_BASE = process.env.REACT_APP_API_URL;

  // GET request
  useEffect(() => {
    fetch(`${API_BASE}/get-response`)
      .then(res => res.json())
      .then(data => setGetData(data.message))
      .catch(err => console.error("GET Error:", err));
  }, [API_BASE]);

  // POST request
  const sendPostRequest = () => {
    fetch(`${API_BASE}/send-data`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Cache-Control": "no-cache" },
      body: JSON.stringify({ name, age: Number(age) }) // dynamic body
    })
      .then(res => res.json())
      .then(data => setPostResponse(data.message))
      .catch(err => console.error("POST Error:", err));
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>React + Flask Demo</h1>

      <p><strong>GET Response:</strong> {getData || "Loading..."}</p>

      <div style={{ margin: "20px" }}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={e => setAge(e.target.value)}
        />
      </div>

      <button onClick={sendPostRequest}>Send POST Request</button>

      {postResponse && <p><strong>POST Response:</strong> {postResponse}</p>}
    </div>
  );
}

export default App;

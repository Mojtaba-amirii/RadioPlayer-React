import React, { useState } from "react";
import { useEffect } from "react";

function getRadioPlayerData() {
  return fetch("https://api.sr.se/api/v2/channels?format=json&size=4").then(
    (response) => response.json()
  );
}

function App() {
  const [channels, setChannels] = useState([]);
  useEffect(() => {
    getRadioPlayerData().then((data) => setChannels(data.channels));
  }, []);
  return (
    <div>
      {channels.map((channel, index) => (
        <div
          key={index}
          className="flex flex-row items-center bg-blue-400 border m-40 "
        >
          <div>
            <img src={channel.image} alt={channel.name} />
          </div>
          <div className="flex flex-col text-9xl text-gray-700 gap-20 m-10">
            <h1>{channel.name}</h1>
            <audio controls>
              <source src={channel.liveaudio.url} type="audio/mpeg" />
            </audio>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;

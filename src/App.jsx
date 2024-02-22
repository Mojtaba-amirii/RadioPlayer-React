import React, { useState } from "react";
import { useEffect } from "react";

async function getRadioPlayerData() {
  const response = await fetch(
    "https://api.sr.se/api/v2/channels?format=json&size=4"
  );
  return await response.json();
}

function App() {
  const [channels, setChannels] = useState([]);
  useEffect(() => {
    getRadioPlayerData().then((data) => setChannels(data.channels));
  }, []);
  return (
    <div className=" flex flex-col items-center justify-center w-full h-full gap-6">
      {channels.map((channel, index) => (
        <div key={index} className=" flex flex-row">
          <div>
            <img className="w-32" src={channel.image} alt={channel.name} />
          </div>
          <div
            className="flex flex-col text-3xl text-gray-700 gap-4 p-2 "
            style={{ backgroundColor: `#${channel.color}` }}
          >
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

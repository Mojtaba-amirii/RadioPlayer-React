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
    <div className=" flex flex-col items-center justify-center w-full sm:w-1/2 mx-auto xl:w-1/3 2xl:w-1/5 h-full gap-6 p-4">
      {channels.map((channel, index) => (
        <div key={index} className=" flex flex-row">
          <div className=" w-1/4">
            <img
              className="w-full h-full"
              src={channel.image}
              alt={channel.name}
            />
          </div>
          <div
            className=" w-3/4 flex flex-col text-3xl text-gray-700 gap-4 p-2 "
            style={{ backgroundColor: `#${channel.color}` }}
          >
            <h1>{channel.name}</h1>
            <audio controls className="w-auto">
              <source src={channel.liveaudio.url} type="audio/mpeg" />
            </audio>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;

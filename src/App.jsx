import React, { useState, useEffect, useRef } from "react";

async function getRadioPlayerData() {
  try {
    const response = await fetch(
      "https://api.sr.se/api/v2/channels?format=json&size=4"
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data.channels;
  } catch (err) {
    console.error("Failed to fetch radio channels:", err);
    return [];
  }
}

function App() {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeChannel, setActiveChannel] = useState(null);
  const audioRefs = useRef([]);

  useEffect(() => {
    let isMounted = true;

    getRadioPlayerData()
      .then((data) => {
        if (isMounted) {
          setChannels(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handlePlay = (index) => {
    audioRefs.current.forEach((audio, i) => {
      if (audio && i !== index) {
        audio.pause();
      }
    });

    setActiveChannel(index);
  };

  return (
    <section className="container h-full flex flex-col items-center justify-center mx-auto gap-6 p-4">
      <h1 className="text-2xl font-bold text-gray-600">Radio Sweden</h1>

      {loading ? (
        <div className="flex items-center justify-center space-x-2">
          <div className="w-6 h-6 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          <p className="text-gray-600">Loading channels...</p>
        </div>
      ) : error ? (
        <p className="text-red-500 font-semibold">
          Failed to load channels: {error}
        </p>
      ) : (
        channels.map((channel, index) => (
          <div
            key={channel.id}
            className={`max-w-xl flex flex-row rounded-lg overflow-hidden ${activeChannel === index ? "shadow-lg scale-105 duration-300" : ""}`}
          >
            <div className="w-1/4">
              <img
                className="w-full h-full aspect-ratio-16/9 object-fill"
                src={channel.image}
                alt={channel.name}
              />
            </div>
            <div
              className="w-3/4 flex flex-col text-3xl text-gray-700 gap-y-4 py-2 px-4"
              style={{ backgroundColor: `#${channel.color}` }}
            >
              <h2 className="text-xl font-semibold">{channel.name}</h2>
              <audio
                ref={(el) => (audioRefs.current[index] = el)}
                controls
                className="w-auto"
                onPlay={() => handlePlay(index)}
              >
                <source src={channel.liveaudio.url} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          </div>
        ))
      )}
    </section>
  );
}

export default App;

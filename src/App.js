import React from "react";
import YoutubeData from "./statistic/YoutubeData";
import wave from "./statistic/image/wave.png";

function App() {
  return (
    <div className="App">
      <YoutubeData />
      <img src={wave} className="wave_img" alt="wave" />
    </div>
  );
}

export default App;

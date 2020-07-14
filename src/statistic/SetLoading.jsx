import React from "react";
import { BallSpinFadeLoader } from "react-pure-loaders";

function SetLoading({ loading }) {
  return (
    <div className="container_loading">
      <BallSpinFadeLoader color={"#6a5fae"} loading={loading} />
    </div>
  );
}

export default SetLoading;

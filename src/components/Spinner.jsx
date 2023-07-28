import React from "react";
import { TailSpin } from "react-loader-spinner";

const Spinner = ({ height = "80", width = "80" }) => {
  return (
    <TailSpin
      height={height}
      width={width}
      color="#72A9B0"
      ariaLabel="tail-spin-loading"
      radius="1"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  );
};

export default Spinner;

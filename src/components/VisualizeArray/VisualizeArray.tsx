import React from "react";
import "./VisualizeArray.css";

function VisualizeArray({ height }) {
  return <div className="array-col" style={{ height: `${height}px` }}></div>;
}

export default VisualizeArray;

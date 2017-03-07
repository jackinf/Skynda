import React from "react";

export default function renderImage({input}, title, fallbackLabel) {
  return (<span>
    <label className="label-info">{title}:</label>&nbsp;
    {input.value
      ? <img src={input.value} width={300}/>
      : <label>{fallbackLabel || "NONE"}</label>}
  </span>);
}

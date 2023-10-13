import React, { Fragment } from "react";
import ProtobufPart from "./ProtobufPart";
import { Table } from "semantic-ui-react";
import { bufferToPrettyHex } from "./hexUtils";

function ProtobufDisplay(props) {
  const { value } = props;

  const parts = value.parts.map((part, i) => {
  return i === 0 ? <ProtobufPart key={i} part={part} /> : null;
}).filter(x => x);



return (
  <Fragment>
    {parts}
  </Fragment>
);
}

export default ProtobufDisplay;

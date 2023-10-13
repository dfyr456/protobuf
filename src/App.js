import React, { Fragment, useState, useEffect } from "react";

import { useLocation } from "react-router-dom";
import { parseInput } from "./hexUtils";
import "./App.css";
import ProtobufDisplay from "./ProtobufDisplay";
import { decodeProto } from "./protobufDecoder";

function App() {
  const [hexBuffer, setHexBuffer] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/") {
      const newHex = decodeURI(location.pathname.substr(1));

      // Parsing and decoding
      const buffer = parseInput(newHex);

      setHexBuffer(buffer);
    }
  }, [location.pathname]);

  const result = hexBuffer ? (
    <ProtobufDisplay value={decodeProto(hexBuffer)} />
  ) : null;

  return <Fragment>{result}</Fragment>;
}

export default App;

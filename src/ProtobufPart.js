import React from "react";

import { decodeProto, TYPES } from "./protobufDecoder";
import { decodeStringOrBytes, decodeVarintParts } from "./protobufPartDecoder";
import ProtobufDisplay from "./ProtobufDisplay";

function ProtobufVarintPart(props) {
  const { value } = props;
  const decoded = decodeVarintParts(value);
  // this is what we are looking for:
  return decoded
    .map((d, i) => {
      return i === 0 ? d.value : null;
    })
    .filter(x => x);
}

function getProtobufPart(part) {
  // eslint-disable-next-line
  switch (part.type) {
    case TYPES.VARINT:
      return [<ProtobufVarintPart value={part.value} />];
    case TYPES.LENDELIM:
      // TODO: Support repeated field

      let decoded = decodeProto(part.value);

      if (part.value.length > 0 && decoded.leftOver.length === 0) {
        return [<ProtobufDisplay value={decoded} />];
      } else {
        decoded = decodeStringOrBytes(part.value);
        return "";
      }
  }
}

function ProtobufPart(props) {
  const { part } = props;

  const [contents] = getProtobufPart(part);

  return contents;
}

export default ProtobufPart;

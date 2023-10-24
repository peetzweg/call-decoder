import rawMeta from "./polkadot-metadata";
import { metadata } from "@polkadot-api/substrate-bindings";

const getV14 = (rawMeta: string) => {
  const decodedMeta = metadata.dec(rawMeta);
  if (decodedMeta.metadata.tag !== "v14") throw null;
  return decodedMeta.metadata.value;
};

const v14 = getV14(rawMeta);

export { v14 as metadata };

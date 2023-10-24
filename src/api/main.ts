import { getLookupFn } from "@polkadot-api/substrate-codegen";

import { Hex, metadata, Struct, u8 } from "@polkadot-api/substrate-bindings";

import rawMeta from "./polkadot-metadata";

const getV14 = (rawMeta: string) => {
  const decodedMeta = metadata.dec(rawMeta);
  if (decodedMeta.metadata.tag !== "v14") throw null;
  return decodedMeta.metadata.value;
};

const v14 = getV14(rawMeta);
const getType = getLookupFn(v14.lookup);

const genericCallDecoder = Struct({
  module: u8,
  method: u8,
  args: Hex(Infinity),
}).dec;

function decode({ module, method }: CallData) {
  const pallet = v14.pallets.find((p) => p.index === module);
  if (!pallet) throw new Error(`No pallet with index ${module}`);

  const palletCalls = getType(pallet.calls as number);

  // is `calls` not always an enum in the metadata?
  if (palletCalls.type !== "enum") throw null;

  const [methodName, methodData] = Object.entries(palletCalls.value).find(
    ([, methodData]) => {
      return methodData.idx === method;
    }
  )!;

  console.log(methodData);
  return {
    methodName: methodName,
    palletName: pallet?.name ?? "",
    args: methodData,
  };
}

export type CallData = ReturnType<typeof genericCallDecoder>;

export { v14 as metadata, genericCallDecoder, getType, decode };

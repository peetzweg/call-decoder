import {
  getLookupFn,
  getDynamicBuilder,
} from "@polkadot-api/substrate-codegen";
import { metadata } from "./metadata";
import { Hex, Struct, u8 } from "@polkadot-api/substrate-bindings";
import { stringRecordMap } from "./helpers";

const getType = getLookupFn(metadata.lookup);

const genericCallDecoder = Struct({
  module: u8,
  method: u8,
  inputData: Hex(Infinity),
}).dec;

const dynamicBuilder = getDynamicBuilder(metadata);

function decode({ module, method, inputData }: CallData) {
  const pallet = metadata.pallets.find((p) => p.index === module);
  if (!pallet) throw new Error(`No pallet with index ${module}`);

  const palletCalls = getType(pallet.calls as number);

  // is `calls` not always an enum in the metadata?
  if (palletCalls.type !== "enum") throw null;

  const [methodName, args] = Object.entries(palletCalls.value).find(
    ([, args]) => {
      return args.idx === method;
    }
  )!;

  if (args.type !== "struct" && args.type !== "primitive") throw null;

  const argsCodec =
    args.type === "primitive"
      ? Struct({})
      : Struct(
          stringRecordMap(args.value, (value) =>
            dynamicBuilder.buildDefinition(value.id)
          )
        );

  return {
    args,
    inputData: argsCodec.dec(inputData) as Record<string, unknown>,
    methodName,
    palletName: pallet?.name ?? "",
  };
}

export type CallData = ReturnType<typeof genericCallDecoder>;

export { genericCallDecoder, getType, decode };

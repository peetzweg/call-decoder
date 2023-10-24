import { StringRecord } from "@polkadot-api/substrate-bindings";

const stringRecordMap = <Input, Output>(
  input: StringRecord<Input>,
  mapper: (value: Input, key: string, obj: StringRecord<Input>) => Output
): StringRecord<Output> =>
  Object.fromEntries(
    Object.entries(input).map(([key, value]) => [
      key,
      mapper(value, key, input),
    ])
  ) as StringRecord<Output>;

export { stringRecordMap };

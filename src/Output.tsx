import { CallData, decode } from "./api/main";

type Props = {
  callData?: CallData;
};

export function Output({ callData }: Props) {
  if (!callData) return null;
  const { methodName, palletName } = decode(callData);
  return (
    <div className="output">
      <span>{`${palletName}:${methodName}`}</span>
    </div>
  );
}

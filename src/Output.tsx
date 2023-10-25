import { CallData, decode } from "./api/main";

type Props = {
  callData?: CallData;
};
export function Output({ callData }: Props) {
  if (!callData) return null;
  const { methodName, palletName, inputData } = decode(callData);

  return (
    <div className="output">
      <span>{`${palletName}:${methodName}`}</span>
      {Object.keys(inputData).map((paramName) => {
        return <div key={paramName}>{paramName}</div>;
      })}
    </div>
  );
}

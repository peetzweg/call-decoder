import { useState } from "react";
import { fromHex } from "@polkadot-api/utils";
import "./App.css";
import { genericCallDecoder, CallData } from "./api/main.ts";
import { Output } from "./Output.tsx";

// const calls = {
//   democracy_delegate:
//     "0x0e0a00606e90cd442a59c7f919a6327f89ba74822b1cde3a900b81ec7541a7f12919480000000000000000000000000000000000",
//   balances_transfer:
//     "0x050700606e90cd442a59c7f919a6327f89ba74822b1cde3a900b81ec7541a7f129194800",
// };

function App() {
  const [hex, setHex] = useState("");
  const [callData, setCallData] = useState<CallData>();

  return (
    <>
      <h1>Call decoder</h1>
      <form action="">
        <textarea
          name="call-data"
          id="call-data"
          cols={130}
          rows={10}
          value={hex}
          onChange={(e) => {
            const value = e.target.value;
            setHex(value);
            const bytes = fromHex(value);
            const decoded = genericCallDecoder(bytes);
            setCallData(decoded);
          }}
        ></textarea>
      </form>
      <Output callData={callData} />
    </>
  );
}

export default App;

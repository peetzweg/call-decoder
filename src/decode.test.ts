// const calls = {
//   democracy_delegate:
//     "0x0e0a00606e90cd442a59c7f919a6327f89ba74822b1cde3a900b81ec7541a7f12919480000000000000000000000000000000000",
//   balances_transfer:
//     "0x050700606e90cd442a59c7f919a6327f89ba74822b1cde3a900b81ec7541a7f129194800",
// };
import { expect, test } from "vitest";
import { decode, genericCallDecoder } from "./api/main";

test("decoding", () => {
  console.log("hello world");

  const genericCall = genericCallDecoder(
    "0x050700606e90cd442a59c7f919a6327f89ba74822b1cde3a900b81ec7541a7f129194800"
  );
  expect(decode(genericCall)).not.throw();
});

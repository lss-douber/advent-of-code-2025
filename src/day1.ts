import { readFileFromPath } from "./utils/functions";

type TDialRotation = `${"L" | "R"}${number}`;

const input: TDialRotation[] = (await readFileFromPath("./src/inputs/day1.txt"))
  .replaceAll("\r\n", "\n")
  .split("\n") as TDialRotation[];
const dial = Array.from({ length: 100 }).map((_, idx) => idx);

class Dialer {
  public arr: number[];
  public position: number;

  public constructor(arr: number[], position: number) {
    this.arr = arr;
    this.position = position;
  }

  dial(rotation: TDialRotation) {
    const rotationNumber = rotation.startsWith("L")
      ? -+rotation.slice(1)
      : +rotation.slice(1);

    const diff = this.position + rotationNumber;

    if (diff < 0) {
      return new Dialer(
        this.arr,
        this.arr[
          (this.arr.length + (diff % this.arr.length)) % this.arr.length
        ]!
      );
    }

    return new Dialer(this.arr, this.arr[(diff % this.arr.length) as number]!);
  }
}

const dialer = new Dialer(dial, 50);
const zeros: number[] = [];

input.reduce<Dialer>((acc, curr, idx) => {
  acc.position === 0 && zeros.push(acc.position);
  return acc.dial(curr);
}, dialer);

console.log(zeros.length);

import { readFileFromPath } from "./utils/functions";

type TDialRotation = `${"L" | "R"}${number}`;

const input: TDialRotation[] = (
  await readFileFromPath("./src/inputs/day1.txt")
).split("\r\n") as TDialRotation[];
const dial = Array.from({ length: 100 }).map((_, idx) => idx);

class Dialer {
  public arr: number[];
  public position: number;

  public constructor(arr: number[], position?: number) {
    this.arr = arr;
    this.position = typeof position === "number" ? position : 50;
  }

  dial(rotation: TDialRotation) {
    const rotationNumber = rotation.startsWith("L")
      ? -+rotation.slice(1)
      : +rotation.slice(1);

    console.log({ rotationNumber });
    console.log({ position: this.position });

    const diff = this.position + rotationNumber;

    // if the diff is within the arr range
    if (diff >= 0 && diff < this.arr.length) {
      return new Dialer(this.arr, this.arr[diff]);
    }

    if (diff < 0) {
      return new Dialer(this.arr, this.arr[this.arr.length % diff]);
    }

    if (diff > this.arr.length) {
      return new Dialer(this.arr, this.arr[diff % this.arr.length]);
    }

    return new Dialer(this.arr, this.arr[diff]);
  }
}

const dialer = new Dialer(dial);

["R48", "R2", "R29", "L38", "L3"].reduce<Dialer>((acc, curr, idx) => {
  // console.log(acc.position);
  // console.log({idx});

  console.log({ curr });

  console.log(acc.position);

  return acc.dial(curr);
}, dialer);

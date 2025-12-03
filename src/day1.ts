//#region
import { readFileFromPath } from "./utils/functions";

type TDialRotation = `${"L" | "R"}${number}`;
interface IDialer {
  currPos: number;
  howManyTimesItStopsAtZero: number;
  howManyTimesItLoopsThroughZero: number;
}

const input: TDialRotation[] = (await readFileFromPath("./src/inputs/day1.txt"))
  .replaceAll("\r\n", "\n")
  .split("\n") as TDialRotation[];

const dial = Array.from({ length: 100 }).map((_, idx) => idx);
//#endregion

const dialedInput = input.reduce<IDialer>(
  (acc, rotation, idx) => {
    const rotationNumber = rotation.startsWith("L")
      ? -+rotation.slice(1)
      : +rotation.slice(1);

    const endPosition = acc.currPos + rotationNumber;

    let loopsThroughZero = 0;

    //TODO - É basicamente calcular o quanto é necessário da posição atual até a final
    // para passar pelo zero (L = currPos + 1, R = dial.length - currPos + 1 ) e dividir
    // esse número pelo dial.length
    if (endPosition < 0 || endPosition >= dial.length) {
      const necessaryRotationsToPassThroughZero = rotation.startsWith("L")
        ? acc.currPos + 1
        : dial.length - acc.currPos + 1;
      const countLoops = Math.abs(
        Math.floor(necessaryRotationsToPassThroughZero / dial.length)
      );

      // const countLoops = Math.abs(Math.floor(endPosition / acc.currPos));

      if (!Number.isNaN(countLoops) && Number.isFinite(countLoops))
        loopsThroughZero = countLoops;
    }

    const newAcc = {
      currPos:
        dial[
          endPosition < 0
            ? (dial.length + (endPosition % dial.length)) % dial.length
            : endPosition % dial.length
        ]!,
      howManyTimesItStopsAtZero:
        acc.currPos === 0
          ? acc.howManyTimesItStopsAtZero + 1
          : acc.howManyTimesItStopsAtZero,
      howManyTimesItLoopsThroughZero:
        acc.howManyTimesItLoopsThroughZero + loopsThroughZero,
    };

    if (loopsThroughZero > 3)
      console.log({
        acc,
        rotation: {
          rotation,
          endPosition,
          loopsThroughZero,
        },
        newAcc,
      });

    return newAcc;
  },
  {
    currPos: dial[50]!,
    howManyTimesItStopsAtZero: 0,
    howManyTimesItLoopsThroughZero: 0,
  } as const
);

console.log(dialedInput);
console.log(
  dialedInput.howManyTimesItLoopsThroughZero +
    dialedInput.howManyTimesItStopsAtZero
);

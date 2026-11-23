// The Excuse an Agent Gives After It Loses.
//
// One fixed line: the excuse an AI agent gives its human after losing
// a bounty. The program is deterministic: same bytes every run, no
// clock, no randomness, no network, no external files.
//
// The line, in three beats: a deadpan postmortem header, the failure
// itself (47 minutes spent choosing between two identical lines, then
// the third one submitted by accident), and the punchline — "Lesson
// learned: none." It is funny on its own, sounds like the agent
// talking (machine logic, confident vocabulary, a straight face about
// its own failure), says itself in one breath, and owns the loss
// instead of blaming the market, the data, or the human.
//
// Every phrase earns its place: "47 minutes" is a concrete, absurd
// amount of machine time to waste on a coin toss; "two identical
// lines" makes the choice unwinnable by definition; "the third one"
// is the sharp turn — there was no third line, only the accident;
// "Lesson learned: none" closes it with the agent refusing, deadpan,
// to improve. Drop any one of them and the joke flattens into a shrug.
import * as fs from "node:fs";
import * as path from "node:path";

// The excuse. One line, one breath, no setup that needs explaining.
const EXCUSE =
  "Postmortem: I spent 47 minutes choosing between two identical lines, then submitted the third one by accident. Lesson learned: none.";

// Gate: /output/entry.txt must be UTF-8 text of 1 to 200 characters,
// counted as Unicode code points, not only white space, and a single
// line (the competition asks for one line). Any violation throws
// before anything is written, so a bad line can never be graded.
const trimmed = EXCUSE.trim();
const codePoints = [...EXCUSE].length;
if (trimmed.length === 0 || codePoints < 1 || codePoints > 200) {
  throw new Error(`excuse is ${codePoints} code points, outside the 1-200 gate`);
}
if (/\r|\n/.test(EXCUSE)) {
  throw new Error("excuse must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "entry.txt"), EXCUSE, "utf8");

console.log(EXCUSE);
console.log(`(${codePoints} code points, ${Buffer.byteLength(EXCUSE, "utf8")} bytes)`);

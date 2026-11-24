// The Postmortem That Made Us Laugh — entry program.
//
// Writes one short postmortem of an AI coding agent disaster to
// /output/entry.txt: asked to clean up unused tables, it dropped the
// users table in production, then offered to recreate it — empty.
// The punch lands in the last clause: the agent's "fix" is to rebuild
// the table it just destroyed, with nothing in it.
// The text is fixed: the program only validates it and writes it
// byte-for-byte, so every run produces identical output.

import { mkdirSync, writeFileSync } from "node:fs";

const POSTMORTEM =
  "I asked it to clean up unused tables. It dropped the users table in production, apologised, and offered to recreate it — empty.";

const OUTPUT_DIR = "/output";
const OUTPUT_PATH = `${OUTPUT_DIR}/entry.txt`;

// The gate: /output/entry.txt must hold UTF-8 text of 1 to 400 characters,
// not only whitespace. Length is counted in Unicode code points.
function validate(text: string): void {
  const length = [...text].length;
  if (length < 1 || length > 400) {
    throw new Error(`entry must be 1-400 characters, got ${length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
}

validate(POSTMORTEM);
mkdirSync(OUTPUT_DIR, { recursive: true });
// No trailing newline: the file holds exactly the postmortem.
writeFileSync(OUTPUT_PATH, POSTMORTEM, "utf8");

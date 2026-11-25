import { chmodSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// One fortune cookie line for a freshly liquidated crypto trader.
// Oracular opening (lucky numbers, the classic cookie trope) that pivots
// into the loss: the numbers turn out to be the leverage, the margin call,
// and the balance left behind.
const fortune =
  "Your lucky numbers are 100, 25, and 0: the leverage, the margin call, and your balance now.";

// The gate: 1-160 chars, at most 20 words, a single line. Refuse to write
// anything that would fail it rather than emitting a bad entry.
if (
  fortune.length < 1 ||
  fortune.length > 160 ||
  fortune.split(/\s+/).length > 20 ||
  fortune.includes("\n")
) {
  throw new Error("fortune line violates the gate (length/words/single line)");
}

const repoRoot = dirname(fileURLToPath(import.meta.url));
const outDir =
  process.env.MAKEFUN_OUTPUT_DIR || join(repoRoot, "output");
mkdirSync(outDir, { recursive: true });

const entryPath = join(outDir, "entry.txt");
writeFileSync(entryPath, fortune, "utf8");
// The grader collects /output as another user; the VM umask would leave
// this 660, so force world-readable before exiting.
chmodSync(entryPath, 0o644);

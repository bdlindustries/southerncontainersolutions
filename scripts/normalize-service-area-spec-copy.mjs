import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const file = join(process.cwd(), "src/lib/data/serviceAreas.ts");
let text = readFileSync(file, "utf8");

const replacements = [
  [/100[- ]amp breaker panel/gi, "jobsite breaker panel"],
  [/provided 100 amp breaker panel/gi, "provided jobsite breaker panel"],
  [/included 100 amp breaker panel/gi, "included jobsite breaker panel"],
  [/the 100 amp breaker panel/gi, "the jobsite breaker panel"],
  [/a 100 amp breaker panel/gi, "a jobsite breaker panel"],
  [/with the provided 100 amp breaker panel/gi, "with the provided jobsite breaker panel"],
  [/via the included 100 amp breaker panel/gi, "via the included jobsite breaker panel"],
  [/into the provided 100 amp breaker panel/gi, "into the provided jobsite breaker panel"],
  [/into the included 100 amp breaker panel/gi, "into the included jobsite breaker panel"],
  [/into this panel using/gi, "into the jobsite breaker panel using"],
  [/power the 100 amp panel/gi, "power the jobsite breaker panel"],
  [/With a 100 amp breaker panel handling/gi, "With the jobsite breaker panel handling"],
  [/tie into the 100[- ]amp breaker panel/gi, "tie into the jobsite breaker panel"],
  [/tied into the 100[- ]amp breaker panel/gi, "tied into the jobsite breaker panel"],
  [/commercial-grade power capacity via the included 100-amp breaker panel/gi,
    "commercial-grade power via the jobsite breaker panel"],
  [/Eighteen standard interior outlets/g, "18 interior outlets (40′ office standard)"],
  [/eighteen standard interior outlets/gi, "interior outlets (10 on 20′ offices, 18 on 40′)"],
  [/eighteen interior outlets/gi, "interior outlets (10 on 20′ offices, 18 on 40′)"],
];

for (const [pattern, value] of replacements) {
  text = text.replace(pattern, value);
}

writeFileSync(file, text, "utf8");
console.log("Normalized service area spec copy in serviceAreas.ts");
import isFQDN from "validator/lib/isFQDN";
import isIP from "validator/lib/isIP";
import { DOMAINS_FILE_PATH } from "./constants";

const comments: string[] = [];
const domains: string[] = [];

(await Bun.file(DOMAINS_FILE_PATH).text()).split("\n").forEach((line) => {
  line = line.trim();

  if (!line) return;

  if (line.startsWith("#")) {
    comments.push(line);
  } else if (isFQDN(line) || isIP(line)) {
    domains.push(line);
  } else {
    throw new Error(`Invalid entry: ${line}`);
  }
});

const formattedText = [...comments, "", ...domains.sort(), ""].join("\n");

await Bun.write(DOMAINS_FILE_PATH, formattedText);

import { execSync } from "node:child_process";
import type { NextConfig } from "next";

function resolveLastCommitDate(): string {
  try {
    return execSync("git log -1 --format=%cs", { encoding: "utf8" }).trim();
  } catch {
    return "";
  }
}

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_LAST_COMMIT_DATE: resolveLastCommitDate(),
  },
};

export default nextConfig;

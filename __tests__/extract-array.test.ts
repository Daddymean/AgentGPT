import { extractArray } from "../src/utils/helpers";
import { describe, it, expect, spyOn, beforeEach, afterEach } from "bun:test";

describe("Strings should be extracted from arrays correctly", () => {
  let consoleErrorSpy: any;
  let consoleWarnSpy: any;

  beforeEach(() => {
    consoleErrorSpy = spyOn(console, "error").mockImplementation(() => {});
    consoleWarnSpy = spyOn(console, "warn").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
    consoleWarnSpy.mockRestore();
  });

  it("simple", () => {
    const modelResult = `
  \`\`\`json
[
  "Research and implement natural language processing techniques to improve task creation accuracy.",
  "Develop a machine learning model to predict the most relevant tasks for users based on their past activity.",
  "Integrate with external tools and services to provide users with additional features such as task prioritization and scheduling."
]
\`\`\`
`;
    expect(extractArray(modelResult).length).toBe(3);
    expect(extractArray(modelResult).at(2)).toBe(
      "Integrate with external tools and services to provide users with additional features such as task prioritization and scheduling."
    );
  });

  it("should handle invalid JSON gracefully", () => {
    const invalidJson = '["task 1",]';
    // This matches the regex but fails JSON.parse
    expect(extractArray(invalidJson)).toEqual([]);
  });

  it("should return empty array if no match found", () => {
    const noMatch = "this is just text with no array";
    expect(extractArray(noMatch)).toEqual([]);
  });
});

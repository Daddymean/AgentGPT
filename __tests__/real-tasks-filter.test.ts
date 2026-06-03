import { realTasksFilter } from "../src/utils/helpers";

describe("realTasksFilter", () => {
  it("should return true for valid tasks", () => {
    expect(realTasksFilter("Create a new Next.js project")).toBe(true);
    expect(realTasksFilter("Write tests for the helpers utility")).toBe(true);
    expect(realTasksFilter("Implement a machine learning model")).toBe(true);
    expect(realTasksFilter("Task 1: do something")).toBe(true);
  });

  it("should return false for 'No tasks'-like inputs", () => {
    expect(realTasksFilter("No tasks added")).toBe(false);
    expect(realTasksFilter("No new tasks added")).toBe(false);
    expect(realTasksFilter("No further tasks needed")).toBe(false);
    expect(realTasksFilter("No additional tasks required")).toBe(false);
    expect(realTasksFilter("No extra tasks inputted")).toBe(false);
    expect(realTasksFilter("No other tasks created")).toBe(false);
    expect(realTasksFilter("No task is required")).toBe(false);
    expect(realTasksFilter("no tasks added")).toBe(false);
    expect(realTasksFilter("No tasks added whatsoever")).toBe(false);
  });

  it("should return false for 'Task complete'-like inputs", () => {
    expect(realTasksFilter("Task complete")).toBe(false);
    expect(realTasksFilter("Task completed")).toBe(false);
    expect(realTasksFilter("Task finished")).toBe(false);
    expect(realTasksFilter("Task done")).toBe(false);
    expect(realTasksFilter("Task over")).toBe(false);
    expect(realTasksFilter("Task success")).toBe(false);
    expect(realTasksFilter("task complete")).toBe(false);
    expect(realTasksFilter("Task completed successfully")).toBe(false);
  });

  it("should return false for 'Do nothing'-like and empty inputs", () => {
    expect(realTasksFilter("Do nothing")).toBe(false);
    expect(realTasksFilter("Do nothing here")).toBe(false);
    expect(realTasksFilter("do nothing")).toBe(false);
    expect(realTasksFilter("")).toBe(false);
    expect(realTasksFilter("  ")).toBe(false);
    expect(realTasksFilter("\t")).toBe(false);
    expect(realTasksFilter("\n")).toBe(false);
  });
});

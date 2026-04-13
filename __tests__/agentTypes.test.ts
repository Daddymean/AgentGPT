import {
  isTask,
  getTaskStatus,
  isAction,
  MESSAGE_TYPE_TASK,
  TASK_STATUS_STARTED,
  TASK_STATUS_EXECUTING,
  TASK_STATUS_COMPLETED,
  TASK_STATUS_FINAL,
  MESSAGE_TYPE_GOAL,
} from "../src/types/agentTypes";

describe("agentTypes", () => {
  describe("isTask", () => {
    it("should return true for a valid task", () => {
      const validTask = {
        type: MESSAGE_TYPE_TASK,
        status: TASK_STATUS_STARTED,
        value: "Test Task",
      };
      expect(isTask(validTask)).toBe(true);
    });

    it("should return false for an invalid task", () => {
      const invalidTask = {
        type: MESSAGE_TYPE_GOAL,
        value: "Test Goal",
      };
      expect(isTask(invalidTask)).toBe(false);
    });

    it("should return false for null", () => {
      expect(isTask(null)).toBe(false);
    });

    it("should return false for undefined", () => {
      expect(isTask(undefined)).toBe(false);
    });

    it("should return false for a string", () => {
      expect(isTask("task")).toBe(false);
    });

    it("should return false for a missing status", () => {
      const missingStatus = {
        type: MESSAGE_TYPE_TASK,
        value: "Test Task",
      };
      expect(isTask(missingStatus)).toBe(false);
    });

    it("should return false for a missing value", () => {
      const missingValue = {
        type: MESSAGE_TYPE_TASK,
        status: TASK_STATUS_STARTED,
      };
      expect(isTask(missingValue)).toBe(false);
    });

    it("should return true for an empty string status", () => {
      const emptyStatusTask = {
        type: MESSAGE_TYPE_TASK,
        status: "",
        value: "Test Task",
      };
      expect(isTask(emptyStatusTask)).toBe(true);
    });
  });

  describe("getTaskStatus", () => {
    it("should return the status of a valid task", () => {
      const validTask = {
        type: MESSAGE_TYPE_TASK,
        status: TASK_STATUS_EXECUTING,
        value: "Test Task",
      };
      expect(getTaskStatus(validTask)).toBe(TASK_STATUS_EXECUTING);
    });

    it("should return undefined for an invalid task", () => {
      const invalidTask = {
        type: MESSAGE_TYPE_GOAL,
        value: "Test Goal",
      };
      expect(getTaskStatus(invalidTask)).toBeUndefined();
    });

    it("should return undefined for null", () => {
      expect(getTaskStatus(null)).toBeUndefined();
    });
  });

  describe("isAction", () => {
    it("should return true for a completed task", () => {
      const completedTask = {
        type: MESSAGE_TYPE_TASK,
        status: TASK_STATUS_COMPLETED,
        value: "Test Task",
      };
      expect(isAction(completedTask)).toBe(true);
    });

    it("should return false for a started task", () => {
      const startedTask = {
        type: MESSAGE_TYPE_TASK,
        status: TASK_STATUS_STARTED,
        value: "Test Task",
      };
      expect(isAction(startedTask)).toBe(false);
    });

    it("should return false for a final task", () => {
      const finalTask = {
        type: MESSAGE_TYPE_TASK,
        status: TASK_STATUS_FINAL,
        value: "Test Task",
      };
      expect(isAction(finalTask)).toBe(false);
    });

    it("should return false for an invalid task", () => {
      const invalidTask = {
        type: MESSAGE_TYPE_GOAL,
        value: "Test Goal",
      };
      expect(isAction(invalidTask)).toBe(false);
    });

    it("should return false for null", () => {
      expect(isAction(null)).toBe(false);
    });
  });
});

import { Times } from "moq.ts";

export const called = (callCount: number): Times => (
  new Times(expected => expected === callCount, `Should be called ${callCount} times`)
);

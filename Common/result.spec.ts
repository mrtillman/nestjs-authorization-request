import { Result } from "./result";

describe("Result", () => {
  let result: Result<Boolean>;
  beforeEach(() => {
    result = <any>null;
  });
  it("should succeed", () => {
    result = Result.Ok<Boolean>(true);
    expect(result.DidSucceed).toBe(true);
  });
  it("should fail", () => {
    result = Result.Fail("no luck");
    expect(result.DidFail).toBe(true);
  });
  it("should have value", () => {
    result = Result.Ok<Boolean>(true);
    expect(result.Value).toBe(true);
  });
  it("should have error message", () => {
    const message = "didn't work";
    result = Result.Fail(message);
    expect(result.ErrorMessage).toBe(message);
  });
});
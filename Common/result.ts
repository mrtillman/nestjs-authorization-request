export class Result<T> {
  constructor(DidSucceed: Boolean, ErrorMessage: string = ""){
    this.didSucceed = DidSucceed;
    this.didFail = !DidSucceed;
    this.errorMessage = ErrorMessage;
  }

  private didSucceed: Boolean;
  public get DidSucceed() : Boolean {
    return this.didSucceed;
  }

  private didFail: Boolean;
  public get DidFail() : Boolean {
    return this.didFail;
  }

  private errorMessage: String;
  public get ErrorMessage() : String {
    return this.errorMessage;
  }

  private value: T;
  public get Value() : T {
    return this.value;
  }

  public static Ok<T>(Value: T): Result<T> {
    const result = new Result<T>(true);
    result.value = Value;
    return result;
  }

  public static Fail<T>(ErrorMessage: string): Result<T> {
    return new Result<T>(false, ErrorMessage);
  }
}

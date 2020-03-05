export class Result<T> {
  constructor(DidSucceed: boolean, ErrorMessage: string = ""){
    this.didSucceed = DidSucceed;
    this.didFail = !DidSucceed;
    this.errorMessage = ErrorMessage;
  }

  private didSucceed: boolean;
  public get DidSucceed() : boolean {
    return this.didSucceed;
  }

  private didFail: boolean;
  public get DidFail() : boolean {
    return this.didFail;
  }

  private errorMessage: string;
  public get ErrorMessage() : string {
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

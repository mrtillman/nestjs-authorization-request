export default interface IUseCase<T> {
  execute(): Promise<T>;
}
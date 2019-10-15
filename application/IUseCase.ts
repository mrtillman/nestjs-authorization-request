export default interface IUseCase<T> {
  execute(): T;
}
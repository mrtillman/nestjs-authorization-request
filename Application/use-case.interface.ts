export default interface UseCase<T> {
  execute(): Promise<T>;
}
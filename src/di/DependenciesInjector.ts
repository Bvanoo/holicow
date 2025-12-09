export default interface DependenciesInjector {
  addSingletonClass: <T>(construct: { new (...args: unknown[]): T }, ...args: unknown[]) => void
  addFactoryClass<T>(construct: { new (...args: unknown[]): T }, ...args: unknown[]): void
  inject<T>(classDef: { new (...args: unknown[]): T }): T
  removeClass: <T>(classDef: { new (...args: unknown[]): T }) => boolean
}

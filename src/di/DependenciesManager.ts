import {} from // DuplicatedTypeException,
// NestedContainerException,
// UnknownClassException,
'./DependenciesContainerException'
import type DependenciesInjector from './DependenciesInjector'

// Inner Type
export type ClassDef<T> = { new (...args: unknown[]): T }

export default class DependenciesManager implements DependenciesInjector {
  private DependenciesRegister: Map<string, unknown>

  constructor() {
    this.DependenciesRegister = new Map<string, unknown>()
  }

  public addFactoryClass<T>(construct: ClassDef<T>, ...args: unknown[]) {
    this.checkEntryValidation(construct)
    this.DependenciesRegister.set(construct.name, () => new construct(...args))
  }

  public addSingletonClass<T>(construct: ClassDef<T>, ...args: unknown[]) {
    this.checkEntryValidation(construct)
    this.DependenciesRegister.set(construct.name, new construct(...args))
  }

  private checkEntryValidation<T>(value: ClassDef<T>) {
    if (this.DependenciesRegister.has(value.name))
      console.warn(
        'Attempting to insert an already existing type into the container(' + value.name + ')',
      )
    // throw new DuplicatedTypeException(
    //   'Attempting to insert an already existing type into the container(' + value.name + ')',
    // )

    if (value instanceof DependenciesManager) console.warn('Attempting to create nested container')
    // throw new NestedContainerException(
    //   "Attempting to create nested container"
    // );
  }

  public inject<T>(classDef: ClassDef<T>): T {
    const instance = this.DependenciesRegister.get(classDef.name)
    if (instance === undefined)
      console.warn(
        'The type ' + classDef.name + ' passed as a parameter does not exist in the container ',
      )
    // throw new UnknownClassException(
    //   'The type ' + classDef.name + ' passed as a parameter does not exist in the container ',
    // )
    if (typeof instance == 'function') return instance()
    else return instance as T
  }

  public removeClass<T>(classDef: ClassDef<T>): boolean {
    return this.DependenciesRegister.delete(classDef.name)
  }
}

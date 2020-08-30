import { BehaviorSubject, Observable } from 'rxjs';

export class Store<T> {
  private _state$: BehaviorSubject<T>;

  protected constructor(initialState: T) {
    this._state$ = new BehaviorSubject(initialState);
  }

  getValue(): T {
    return this._state$.getValue();
  }

  getState(): Observable<T> {
    return this._state$.asObservable();
  }

  setState(nextState: T): void {
    this._state$.next(nextState);
  }
}
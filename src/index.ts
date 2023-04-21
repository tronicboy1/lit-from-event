import { LitElement } from "lit";
import { from, fromEvent, map, switchMap } from "rxjs";

/**
 * Use to generate event observables in a LitElement
 *
 * @example
 * @queryFromEvent("audio#river", "play") play$!: Observable<Event>;
 */
export function queryFromEvent<T = Event>(selector: string, event: string) {
  return (proto: Object, name: PropertyKey): any => {
    const descriptor = {
      get(this: LitElement) {
        return from(this.updateComplete).pipe(
          map(() => this.renderRoot.querySelector(selector)),
          switchMap((element) => {
            if (!element) throw ReferenceError("NoElementFound");
            return fromEvent<T>(element!, event);
          })
        );
      },
      enumerable: true,
      configurable: true,
    };
    return Object.defineProperty(proto, name, descriptor);
  };
}

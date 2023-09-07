import { LitElement } from "lit";
import { OperatorFunction, from, fromEvent, map, switchMap } from "rxjs";

/**
 * Use to generate event observables in a LitElement
 *
 * @example
 * @queryFromEvent("audio#river", "play") play$!: Observable<Event>;
 */
export function queryFromEvent<T extends HTMLElement = HTMLElement>(
  selector: string,
  event: string,
  options: { returnElementRef: true }
): any;
export function queryFromEvent<T extends Event = Event>(
  selector: string,
  event: string,
  options: { returnElementRef: false }
): any;
export function queryFromEvent<T extends Event = Event>(selector: string, event: string): any;
export function queryFromEvent<T extends Event | HTMLElement = Event>(
  selector: string,
  event: string,
  options?: { returnElementRef?: boolean }
) {
  return (proto: Object, name: PropertyKey): any => {
    const descriptor = {
      get(this: LitElement) {
        return from(this.updateComplete).pipe(
          map(() => this.renderRoot.querySelector(selector)),
          switchMap((element) => {
            if (!element) throw ReferenceError("NoElementFound: " + selector);
            const operations: OperatorFunction<any, any>[] = [];
            if (options?.returnElementRef) {
              operations.push(map(() => element));
            }
            return operations.reduce((ob, op) => ob.pipe(op), fromEvent<T>(element!, event));
          })
        );
      },
      enumerable: true,
      configurable: true,
    };
    return Object.defineProperty(proto, name, descriptor);
  };
}

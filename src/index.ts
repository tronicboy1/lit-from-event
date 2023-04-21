import { LitElement } from "lit";
import { Observable, from, fromEvent, map, switchMap } from "rxjs";

/**
 * Use to generate event observables in a LitElement
 */
export function fromEventQuery<T = Event>(this: LitElement, selector: string, eventName: string): Observable<T> {
  return from(this.updateComplete).pipe(
    map(() => this.renderRoot.querySelector(selector)),
    switchMap((element) => {
      if (!element) {
        throw ReferenceError("NoElementFound");
      }
      return fromEvent<T>(element, eventName);
    })
  );
}

import { from, fromEvent, map, switchMap } from "rxjs";
/**
 * Use to generate event observables in a LitElement
 */
export function fromEventQuery(selector, eventName) {
    return from(this.updateComplete).pipe(map(() => this.renderRoot.querySelector(selector)), switchMap((element) => {
        if (!element) {
            throw ReferenceError("NoElementFound");
        }
        return fromEvent(element, eventName);
    }));
}

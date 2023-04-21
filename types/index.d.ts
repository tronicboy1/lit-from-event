import { LitElement } from "lit";
import { Observable } from "rxjs";
/**
 * Use to generate event observables in a LitElement
 */
export declare function fromEventQuery<T = Event>(this: LitElement, selector: string, eventName: string): Observable<T>;

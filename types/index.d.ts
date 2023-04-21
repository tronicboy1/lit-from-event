import { LitElement } from "lit";
import { Observable } from "rxjs";
export declare function fromEventQuery<T = Event>(this: LitElement, selector: string, eventName: string): Observable<T>;

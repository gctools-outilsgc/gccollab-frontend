import { Observable } from "rxjs";

export interface IList {
    get(id: string, delay: number): Observable<any>;
    getMany(count: number, delay: number): Observable<any[]>;
}
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Observable } from 'rxjs';

export interface IListService {
  get(id: string, delay: number): Observable<any>;
  getMany(count: number, delay: number): Observable<any[]>;
  dataType: any;
  cardComponent: any;
}

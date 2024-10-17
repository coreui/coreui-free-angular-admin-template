import { map, Observable } from "rxjs";
import { ApiService } from "../../services/api/api.service";

export interface PaginationInterface {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface ApiResourceCollectionResponseInterface<T> {
  code: number;
  message: string;
  content: {
    data: T[];
    pagination: PaginationInterface;
  }
}

export interface ApiResourceResponseInterface<T> {
  code: number;
  message: string;
  content: T
}



export abstract class Resource<T> {

  constructor(
    protected name: string,
    protected apiService: ApiService
  ) {

  }

  public query(params?: any): Observable<ApiResourceCollectionResponseInterface<T>> {
    return this.apiService.get<ApiResourceCollectionResponseInterface<T>>(this.name, params);
  }

  public get(id: number): Observable<T> {
    return this.apiService.get<ApiResourceResponseInterface<T>>(`${this.name}/${id}`).pipe(
      map((response: ApiResourceResponseInterface<T>): T => {
        return response.content;
      })
    )
  }

}

import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GraphqlService {

  constructor(private apollo: Apollo) { }

  getUser(id: number): Observable<any> {
    return this.apollo
      .query({
        query: gql`
          query GetUser($id: ID!) {
            user(id: $id) {
              id
              firstName
              lastName
              email
            }
          }
        `,
        variables: {
          id: id,
        },
      })
      .pipe(map((result: any) => result.data.user));
  }
}

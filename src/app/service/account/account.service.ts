import { Inject, Injectable, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { UserInterface } from '../../types/user/user.types';
import { LocalStorageServiceService } from '../localStorage/local-storage-service.service';
import { AuthServiceService } from '../auth/auth-service.service';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private currentUserSubject: BehaviorSubject<any | null> = new BehaviorSubject<any>(null);
  public currentUser = this.currentUserSubject.asObservable();

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private localStorage: LocalStorageServiceService,
    private apollo: Apollo
  ) {
    if (this.isAuthenticated()) {
      const customerId = this.getCustomerIdFromToken();

      if (customerId) {
        this.getUserData(parseInt(customerId));
      }
    }
  }

  getUserData(id: number): Observable<any> {
    const GET_USER_QUERY = gql`
      query GetUser($id: ID!) {
        getUser(id: $id) {
          id
          firstName
          lastName
          email
        }
      }
    `;


    return this.apollo.query({
      query: GET_USER_QUERY,
      variables: {
        id: id
      }
    }).pipe(map((response: any) => {
      this.currentUserSubject.next(response.data.getUser);

      return this.currentUser;
    }));
  }

  authentification(email: string, password: string): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
      mutation loginCustomer($input: LoginCustomerInput!) {
        loginCustomer(input: $input) {
          token
          user {
            id
            firstName
            lastName
            email
          }
        }
      }
    `,
      variables: {
        input: {
          email: email,
          password: password
        }
      },
    }).pipe(map((response: any) => {
      const token = response?.data?.loginCustomer?.token;
      if (token) {
        this.localStorage.set('token', token);
        this.currentUserSubject.next(response.data.loginCustomer.user);
      }

      return this.currentUser;
    }));

  }

  registration(firstName: string, lastName: string, email: string, password: string): Observable<any> {
    const REGISTER_CUSTOMER_MUTATION = gql`
      mutation RegisterCustomer($input: RegisterCustomerInput!) {
        registerCustomer(input: $input) {
          token
          user {
            id
            firstName
            lastName
            email
          }
        }
      }
      `;
    return this.apollo.mutate({
      mutation: REGISTER_CUSTOMER_MUTATION,
      variables: {
        input: {
          firstName,
          lastName,
          email,
          password
        }
      }
    }).pipe(map((response: any) => {
      const token = response?.data?.registerCustomer?.token;

      if (token) {
        this.localStorage.set('token', token);
        this.currentUserSubject.next(response.data.registerCustomer.user);
      }

      return token;
    }));
  }

  logOut() {
    this.localStorage.remove('token');
    this.apollo.client.resetStore();
  }

  getCurrentUser() {
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    return !!this.localStorage.get('token');
  }

  getToken(): string | null {
    return this.localStorage.get('token');
  }

  decodeToken(token: string | null) {

    if (token && isPlatformBrowser(this.platformId)) {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

      return JSON.parse(atob(base64));
    }

    return null;
  }

  getCustomerIdFromToken(): string | null {
    return this.decodeToken(this.getToken())?.sub;
  }
}

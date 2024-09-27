import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AccountService } from './service/account/account.service';

@NgModule({
    exports: [
        ApolloModule,
        HttpClientModule
    ],
    providers: [{
        provide: APOLLO_OPTIONS,
        useFactory: (httpLink: HttpLink, accountService:AccountService) => ({
            cache: new InMemoryCache(),
            link: httpLink.create({
                uri: 'http://localhost:80/graphql', // Replace with your GraphQL endpoint
            }),
        }),
        deps: [HttpLink],
    },
    ],
})

export class GraphQlModule { }
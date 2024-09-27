import { NgModule } from "@angular/core";
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule, NoopAnimationsModule } from "@angular/platform-browser/animations";
import { AppComponent } from "./app.component";
import { importProvidersFrom } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { LocalStorageServiceService } from "./service/localStorage/local-storage-service.service";
import { GraphQlModule } from "./graphql.module";
import { BrowserModule } from "@angular/platform-browser";
import { AuthInterceptor } from "./service/auth/auth.interceptor";

export function tokenGetter() {
    return localStorage.getItem('token');
}

@NgModule({
    declarations: [
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        HttpClient,
        GraphQlModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule,
    ],
    providers: [
        importProvidersFrom(HttpClientModule),
        LocalStorageServiceService,
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
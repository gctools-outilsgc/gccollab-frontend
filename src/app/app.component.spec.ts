// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { RouterTestingModule } from '@angular/router/testing';
// import { AppComponent } from './app.component';
// import { AuthConfigModule } from './core/auth/auth.module';

// import { HttpClient, HttpClientModule } from '@angular/common/http';
// import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
// import { TranslateService } from '@ngx-translate/core';
// import { TypescriptLoader } from './core/helpers/typescript-loader';

// describe('AppComponent', () => {
//     let component: AppComponent;
//     let fixture: ComponentFixture<AppComponent>;
//     let translateService: TranslateService;
//     beforeEach(async () => {
//       await TestBed.configureTestingModule({
//         declarations: [
//           AppComponent
//         ],
//         imports: [
//           RouterTestingModule,
//           AuthConfigModule,
//           TranslateModule.forRoot({
//             loader: {
//               provide: TranslateLoader,
//               useFactory: (http: HttpClient) => new TypescriptLoader(http, 'translations'),
//               deps: [ HttpClient ]
//             }
//           }),
//           HttpClientModule
//         ],
//         providers: [
//           TranslateService,
//           HttpClient,
//         ]
//       }).compileComponents();
//       translateService = TestBed.inject(TranslateService);
//       fixture = TestBed.createComponent(AppComponent);
//       component = fixture.componentInstance;
//       fixture.detectChanges();
//     });
//     it('should create the app', () => {
//       expect(component).toBeTruthy();
//     });
// });

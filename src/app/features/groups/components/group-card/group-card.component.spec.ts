import { ComponentFixture, TestBed } from '@angular/core/testing';

 import { GroupCardComponent } from './group-card.component';
 import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
 import { HttpClient, HttpClientModule } from '@angular/common/http';
 import { TypescriptLoader } from 'src/app/core/helpers/typescript-loader';

 describe('GroupCardComponent', () => {
   let component: GroupCardComponent;
   let translateService: TranslateService;
   let fixture: ComponentFixture<GroupCardComponent>;

   beforeEach(() => {
     TestBed.configureTestingModule({
       declarations: [GroupCardComponent],
       imports: [
         TranslateModule.forRoot({
           loader: {
             provide: TranslateLoader,
             useFactory: (http: HttpClient) => new TypescriptLoader(http, 'translations'),
             deps: [ HttpClient ]
           }
         }),
         HttpClientModule
       ],
       providers: [ TranslateService, HttpClient ]
     });
   });

   beforeEach(() => {
     translateService = TestBed.inject(TranslateService);
     fixture = TestBed.createComponent(GroupCardComponent);
     component = fixture.componentInstance;
     fixture.detectChanges();
   });

   it('should create', () => {
     expect(component).toBeTruthy();
   });
 });
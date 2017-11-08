import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { MockBackend }     from '@angular/http/testing';
import { Http, BaseRequestOptions }      from '@angular/http';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';

import { AppComponent } from './app.component';

let comp:    AppComponent;
let fixture: ComponentFixture<AppComponent>;
let de:      DebugElement;
let el:      HTMLElement;

describe('AppComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        AppComponent // declare component to test
      ],
      providers: [
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
                  return new Http(backendInstance, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        },
      ],
    });

    fixture = TestBed.createComponent(AppComponent);

    comp = fixture.componentInstance; // AppComponent test instance
  }));


  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it('should display introduction', () => {
    // query for the intro <h1> by CSS element selector
    de = fixture.debugElement.query(By.css('h1'));
    el = de.nativeElement;
    fixture.detectChanges();
    expect(el.textContent).toContain('The names and assignments of the volunteers are:');
  });
  it('should display a volunteer and assignment', () => {
    comp.volunteers = [{name:'Deadpool', assignment:'Mandatory Community Service'}]
    comp.volunteers[0].name =       'Deadpool';
    comp.volunteers[0].assignment = 'Mandatory Community Service';
    de = fixture.debugElement.query(By.css('ul'));
    el = de.nativeElement;

    fixture.detectChanges();
    expect(el.textContent).toContain('Deadpool is doing Mandatory Community Service');
  });

  /* Can be used if loadItems() returns observable to test for http call
  it('should call endpoint and return it\'s result', (done) => {
    backendInstance.connections.subscribe((connection: MockConnection) => {
      let options = new ResponseOptions({
        body: JSON.stringify({ success: true })
      });
      connection.mockRespond(new Response(options));
    });

    comp.loadItems().subscribe((res) => {
      expect(res.json()).toEqual({ success:true });
      done();
    });
  });
  */
});

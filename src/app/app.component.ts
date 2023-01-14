import { Component, VERSION, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  debounceTime,
  map,
  switchMap,
  distinctUntilChanged,distinct,
  filter,
  concatMap,
  toArray,
  fromEvent,
  catchError,
  of,
} from 'rxjs';
import { ajax } from 'rxjs/ajax';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    // const searchInput = document.getElementById('searchEle');
    // const searchInput$ = fromEvent(searchInput, 'keyup');
    // const result = document.getElementById('result');
  }

  showSearch(event: any) {
    const searchString = event.target.value;
    if (searchString.length > 2) {
      //rxjs
      this.httpClient
        .get(`https://api.cdnjs.com/libraries?search=${searchString}`)
        .pipe(distinct())
        .subscribe((searchResult: any) => {
         // console.log(searchResult['results']);

          document.getElementById('result').innerHTML = searchResult['results']
            .map((search) => {
              return `<li class='margintop' style='margin-top: 10px;background:#e0adb0;'>
                            <div>
                                <label><b>Name</b>: </label>
                                <span>${search.name}</span>
                            </div>
                            <div>
                                <label><b>Url:</b></label>                                    
                                <span>${search.latest}</span>
                            </div>
                        </li>`;
            }).join('');
        });
    } else {
      document.getElementById('result').innerHTML = '';
    }
  }
}

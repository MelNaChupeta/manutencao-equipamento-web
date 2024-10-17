import { Injectable } from '@angular/core';
//import { ProgressInterceptor } from '../interceptors/progress.service';
import { BehaviorSubject, Observable, interval } from 'rxjs';
import { map, take, repeat } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  //constructor(private progressInterceptor: ProgressInterceptor) {}
  constructor() {}

  getProgress() {
    //return this.progressInterceptor.progress$;
    return interval(10).pipe( 
        take(100), 
        map(value => value + 1), 
        repeat() 
      );
  }

  private progressSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  show(): void {
    this.progressSubject.next(true);
  }

  hide(): void {
    this.progressSubject.next(false);
  }

  getProgressStatus(): Observable<boolean> {
    return this.progressSubject.asObservable();
  }
}

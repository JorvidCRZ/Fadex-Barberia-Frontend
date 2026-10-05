import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private isLoading = false;
  private loadingCount = 0;
  // private loadingSubject = new BehaviorSubject<boolean>(false);

  // Observable que escuchará nuestro componente de Spinner
  // isLoading$ = this.loadingSubject.asObservable();


  private loadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.loadingSubject.asObservable().pipe( distinctUntilChanged() );

  // show() {
  //   this.loadingCount++;
  //   this.loadingSubject.next(true);
  // }

  // hide() {
  //   this.loadingCount--;
  //   if (this.loadingCount <= 0) {
  //     this.loadingCount = 0;
  //     this.loadingSubject.next(false);
  //   }
  // }


  show() {
    this.loadingCount++;
    // console.log('[LoadingService] show() called. loadingCount:', this.loadingCount);
    if (!this.isLoading) {
      this.isLoading = true;
      setTimeout(() => { this.loadingSubject.next(true); },0);
    }
  }

  hide() {
    this.loadingCount = Math.max(0, this.loadingCount - 1);
    // console.log('[LoadingService] hide() called. loadingCount:', this.loadingCount);
    if (this.loadingCount === 0 && this.isLoading) {
      this.isLoading = false;
      setTimeout(() => { this.loadingSubject.next(false); }, 0);
    }
  }

  reset() {
    this.loadingCount = 0;
    this.isLoading = false;
    this.loadingSubject.next(false);
  }
}
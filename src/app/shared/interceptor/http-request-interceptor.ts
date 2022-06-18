import {
  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LoadingService } from 'src/app/shared/service/loading.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(
    private loadingService: LoadingService,
    private snackBar: MatSnackBar
  ) { 
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingService.setLoading(true, request.url);
    return next.handle(request)
      .pipe(catchError((err) => {
        this.loadingService.setLoading(false, request.url);
        this.openSnackBar();
        return err;
      }))
      .pipe(map<HttpEvent<any>, any>((evt: HttpEvent<any>) => {
        if (evt instanceof HttpResponse) {
          this.loadingService.setLoading(false, request.url);
        }
        return evt;
      }));
  }

  private openSnackBar() {
    this.snackBar.open(
      'Error! Please try again later.', 
      'x', {
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
      panelClass: ['error-bar'],
    });
  }

  
}
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class TrackerggInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const isApiUrl = request.url.startsWith(environment.trackerggApiUrl);
    
    if (isApiUrl) {
      request = request.clone({
        setHeaders: { "TRN-Api-Key": "cfe19ea4-d2a6-4667-b9bd-da5f473c6baf" }
      });

      console.log(request);
    }

    return next.handle(request);
  }
}

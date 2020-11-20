import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth/auth.service';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isApiUrl = request.url.startsWith(environment.apiUrl);
    
    if (this.authService.isLoggedIn() && isApiUrl) {
      const token = localStorage.getItem('token');

      request = request.clone({
        setHeaders: { Authorization: `Bearer ${token.slice(1, token.length - 1)}` }
      });
    }

    return next.handle(request);
  }
}

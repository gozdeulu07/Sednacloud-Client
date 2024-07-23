import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, catchError, of } from 'rxjs';
import { BaseComponent, SpinnerType } from '../../base/base.component';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './custom-toastr.service';
import { UserAuthService } from './models/user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService extends BaseComponent implements HttpInterceptor {

  constructor(
    spinner: NgxSpinnerService,
    private toastrService: CustomToastrService,
    private userAuthService: UserAuthService,
    private router: Router,
  ) {
    super(spinner);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(error => {
      switch (error.status) {
        case HttpStatusCode.Unauthorized:
          this.userAuthService.refreshTokenLogin(localStorage.getItem("refreshToken"), (state) => {
            if (!state) {
              const url = this.router.url;
              if (url == "/hotels") {
                this.toastrService.message("Please login to purchase anything!", "Warning!", {
                  messageType: ToastrMessageType.Warning,
                  position: ToastrPosition.BottomCenter
                });
                this.router.navigate(["login"]);
                this.hideSpinner(SpinnerType.SquareJellyBox);
              } else {
                this.toastrService.message("You are not authorized to perform this action!", "Unauthorized operation!", {
                  messageType: ToastrMessageType.Warning,
                  position: ToastrPosition.BottomCenter
                });

                this.router.navigate(["login"]);
                this.hideSpinner(SpinnerType.SquareJellyBox);
              }
            }
          }).then(data => { });

          break;
        case HttpStatusCode.InternalServerError:
          this.toastrService.message("Can't connect to server!", "Server Error!", {
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.BottomCenter
          });
          this.hideSpinner(SpinnerType.SquareJellyBox);
          break;
        case HttpStatusCode.BadRequest:
          this.toastrService.message("Invalid request made!", "Invalid request!", {
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.BottomCenter
          });
          this.hideSpinner(SpinnerType.SquareJellyBox);
          break;
        case HttpStatusCode.NotFound:
          this.toastrService.message("This page not found!", "Not Found!", {
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.BottomCenter
          });
          this.hideSpinner(SpinnerType.SquareJellyBox);
          break;
        default:
          this.toastrService.message("Unexpected error has occured!", "Error!", {
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.BottomCenter
          });
          this.hideSpinner(SpinnerType.SquareJellyBox);
          break;
      }
      return of(error);
    }));
  }
}

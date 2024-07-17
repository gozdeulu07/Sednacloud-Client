import { inject } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CanActivateFn, Router } from '@angular/router';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../services/common/custom-toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../base/base.component';
import { _isAuthenticated } from '../services/common/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
    const jwtHelper = inject(JwtHelperService);
    const router = inject(Router);
    const toastrService = inject(CustomToastrService);
    const spinner = inject(NgxSpinnerService);

    spinner.show(SpinnerType.BallSpinClockwise);

    if (!_isAuthenticated) {
        router.navigate(["login"], { queryParams: { returnUrl: state.url } });
        toastrService.message("You need to login!", "Unauthorized Access!", {
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.TopRight
        });
    }
    spinner.hide(SpinnerType.BallSpinClockwise);

    return true;
};
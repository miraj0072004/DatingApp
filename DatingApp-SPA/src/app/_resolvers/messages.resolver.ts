
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Message } from '../_models/message';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class MessagesResolver implements Resolve<Message[]> {
/**
 *
 */

 pageNumber = 1;
 pageSize = 5;
 messagesContainer = 'Unread';

constructor(private userService: UserService, private router: Router,
            private alertify: AlertifyService, private authService: AuthService) {


}

resolve(route: ActivatedRouteSnapshot): Observable<Message[]>
{
    return this.userService.getMessages(this.authService.decodedToken.nameid,
                                        this.pageNumber,
                                        this.pageSize,
                                        this.messagesContainer).pipe(
        catchError(error => {
            this.alertify.error('Problem retrieving data');
            this.router.navigate(['/home']);
            return of(null);
        })
    );
}
}
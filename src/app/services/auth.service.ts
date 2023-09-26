import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userName: string = 'test@test.ru';
  password: string = '201120';

  private isAuthSubject = new BehaviorSubject<boolean>(false);

  get isAuthenticated$() {
    return this.isAuthSubject.asObservable();
  }

  login(email: string, password: string): boolean {
    if (email === this.userName && password === this.password) {
      this.isAuthSubject.next(true);
      return true;
    }
    return false;
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthSubject.value;
  }
}

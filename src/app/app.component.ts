import {Component} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(private router: Router) {
    const body = document.querySelector('body');
    router.events.pipe(untilDestroyed(this)).subscribe((val) => {
      if (val instanceof NavigationEnd) {
        body?.scroll(0, 0);
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './services/token-service/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'maharati_admin';

  isLoggedIn = false;
  showAdminBoard = false;
  username?: string;

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.showAdminBoard = user.roles.includes('ROLE_ADMIN');
      this.username = user.username;
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
//   isSigninPage: boolean = false;

//   constructor(private router: Router, private authService: AuthService) {
//     this.router.events.subscribe((event) => {
//       if (event instanceof NavigationEnd) {
//         this.isSigninPage = event.url === '/signin';
//       }
//     });

//     // Subscribe to AuthService login observable (if available)
//     this.authService.loginSuccess$.subscribe(() => {
//       this.isSigninPage = false; // Set to false after successful login
//     });
//   }
// }

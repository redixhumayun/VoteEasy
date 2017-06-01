import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
	template: ``, 
	selector: 'app-callback'
})

export class CallbackComponent {
	constructor(private authService: AuthService) {
		this.authService.handleAuth();
	}
}
import { AuthService } from '../services/auth/auth.service';

export function appInitializer(authService: AuthService) {
    return () => new Promise(resolve => {
        authService.refreshToken()
        .subscribe()
        .add(resolve)
    });
}
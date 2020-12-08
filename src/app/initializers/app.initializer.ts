import { AuthService } from '../services/auth/auth.service';

export function appInitializer(authService: AuthService) {
    return async () => {
        await authService.refreshToken()
        .pipe()
        .toPromise()
    }
}

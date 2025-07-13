import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { SESSION_TOKEN_KEY } from "../components/constants/constant";
import { inject } from "@angular/core";

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  // Implement your authentication logic here
  // For example, check if the user is logged in and has the required roles
  const userToken = sessionStorage.getItem(SESSION_TOKEN_KEY);
  const router = inject(Router);
  if (!userToken) {
    // User is not authenticated, redirect to login or show an error
    router.navigate(['/login']);
    return false;
  } else {
    // User is authenticated, allow access
    return true;
  }
};
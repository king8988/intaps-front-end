import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function aboveZeroValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const amount = control.value;

    if (amount <= 0) {
      return { isZero: true };
    }

    return null;
  };
}

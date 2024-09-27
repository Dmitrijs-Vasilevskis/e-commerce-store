import { AbstractControl, ValidatorFn } from "@angular/forms"

export const regExpPatterns = {
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    phone: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{2,5}$/,
    address: /^[a-zA-Z0-9]/,
}

export const confirmPasswordValidator = (pass1: string, pass2: string): ValidatorFn => {
    return (formGroup: AbstractControl): { [key: string]: any } | null => {
        const password = formGroup.get(pass1);
        const passwordConfirm = formGroup.get(pass2);

        if (passwordConfirm?.errors && !passwordConfirm.errors["passwordMismatch"]) {
            return null;
        }

        if (password?.value !== passwordConfirm?.value) {
            passwordConfirm?.setErrors({ passwordMismatch: true });
            return { passwordMismatch: true };
        } else {
            passwordConfirm?.setErrors(null);
            return null;
        }
    }
}
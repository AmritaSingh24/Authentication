import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";

export const ConfirmedPassword: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
   
    if (!control.parent || !control){
        return null;
    }
    const password = control.parent.get("password");
    const passwordConfirm = control.parent.get("confirmPassword");

    if (!password || !passwordConfirm) {
        return null;
    }
    if (passwordConfirm.value === "") {
        return null;
    }
        
    if (password.value === passwordConfirm.value) {
        return null;
    }
        
    return { passwordsNotMatch: true };
}

import { AbstractControl } from "@angular/forms";

export function firstErrorMessage(control: AbstractControl ) {
    const errors = control.errors
    return errors ? errors[Object.getOwnPropertyNames(errors)[0]].message ?? (control as unknown as {[key:string] : string })['_errorMessage'] : '';
}
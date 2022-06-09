import { AbstractControl, ValidatorFn } from "@angular/forms";

/*
    function to validation
    take only 1 parameter
export function forbiddenWeightValidator(control:AbstractControl):{[key:string]:any} | null{
     const forbidden=/admin/.test(control.value);
     return forbidden?{'forbiddenWeight':{value:control.value}}:null;
}
*/
//factory function 
export function forbiddenWeightValidator(forbiddenWeight:RegExp):ValidatorFn{
    return (control:AbstractControl):{[key:string]:any} | null=>{
        const forbidden=forbiddenWeight.test(control.value);
        return forbidden?{'forbiddenWeight':{value:control.value}}:null;
    }
}
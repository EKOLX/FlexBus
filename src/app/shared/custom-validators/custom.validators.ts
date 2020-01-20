import { ValidatorFn, AbstractControl } from "@angular/forms";

export function slotNumberValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const slotNumber: RegExp = new RegExp("^BUS-[A-Z0-9]{3}-[A-Z0-9]{3}$");
    return slotNumber.test(control.value)
      ? null
      : { wrongFormat: { value: control.value } };
  };
}

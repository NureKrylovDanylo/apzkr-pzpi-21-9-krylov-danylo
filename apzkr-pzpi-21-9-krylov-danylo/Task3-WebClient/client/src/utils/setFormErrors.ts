import { FieldValues, Path, UseFormSetError } from "react-hook-form";

export const setFormErrors = <T extends FieldValues>(setError: UseFormSetError<T>, errorObject: Record<string, any>) => {
    Object.keys(errorObject).forEach((key) => {
        const lowercaseKey = key.charAt(0).toLowerCase() + key.slice(1);
        setError(lowercaseKey as Path<T>, { message: errorObject[key][0] });
      });
};
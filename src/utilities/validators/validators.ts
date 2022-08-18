
export type FieldValidatorType = (value: string) => string | undefined

export const required: FieldValidatorType = (value) => {
    if (value) return undefined;
    return "Field is required"
}

export const maxLengthCreator = (MaxLength: number): FieldValidatorType => value => {
    if (value.length > MaxLength) return `Max length is ${MaxLength} symbols`;

    return undefined
}

export const maxLength = (maxLength) => {
    return (value) => value && value.length > maxLength
        ? `Max length is ${maxLength}`
        : undefined
}

export const required = (value) => (value ? undefined : `Required`)
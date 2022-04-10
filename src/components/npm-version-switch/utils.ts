/**
 * toUpperCase first word
 */
export const toUpperFirstWordCase = ([first, ...rest]: string) => first?.toUpperCase() + rest.join('')

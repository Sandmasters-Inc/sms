
/**
 * 
 * @param {String} text 
 * Returns a string with the first character capitalized.
 */
export const capitalize = text => text.charAt(0).toUpperCase() + text.slice(1)

/**
 * 
 * @param {String} text 
 * Returns a string separated by spaces at each uppercase character.
 */
export const separate = text => text.match(/([A-Z]?[^A-Z]*)/g).slice(0,-1).join(" ")


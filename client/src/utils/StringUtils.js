
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

/**
 * 
 * @param {String} text 
 * Returns a string with the first character capitalized
 * and separated by spaces at each uppercase character.
 */
export const makeLabel = text => {
  let formattedText = capitalize(text)
  return separate(formattedText)
}

/**
 * 
 * @param {Object} obj 
 * Returns a string representation of the object's variable name
 * Usage: 
 *  var color = "green"
 *  console.log(`${getString({color})}`) // logs the string "color" to the console
 */
export const getString = obj => Object.keys(obj)[0]

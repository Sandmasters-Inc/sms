export class Exception {
  constructor(message, name) {
    this.message = message
    this.name = name
  }

  toString() {
    return `${this.name}: ${this.message}`
  }
}
export class UnknownTypeException extends Exception {
  constructor(message) {
    super(message, 'UnknownTypeException')
  }
}

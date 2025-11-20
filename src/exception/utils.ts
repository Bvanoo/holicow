export function showSimpleErrorBox(timestamp: Date, message: string, details: string) {
  alert(
    `ERROR PAYLOAD
      Error timestamp   : ${timestamp}
      Error Message     : ${message}
      Error Details     : ${details}`,
  )
}

export function checkUndefinedAndNullValue(value: unknown): boolean {
  return value === undefined || value === null
}

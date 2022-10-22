
// this class is a middleware for saving into DB or other destination.
export class Logger {
  static log = (p: any) => {
    console.log(p)
  }
  static error = (p: any) => {
    console.error(p)
  }
  static info = (p: any) => {
    console.info(p)
  }
  static warn = (p: any) => {
    console.warn(p)
  }
  static debug = (p: any) => {
    console.debug(p)
  }
  // show msg to snackbar
  static api_error = (p: any) => {}
  // show msg to snackbar
  static data_error = (p: any) => {}
}
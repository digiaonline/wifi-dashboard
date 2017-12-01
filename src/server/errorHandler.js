class ErrorHandler {
  constructor() {

  }

  handleError(error) {
    console.log('An error occurred: ' + JSON.stringify(error));
  }
}

module.exports = ErrorHandler;

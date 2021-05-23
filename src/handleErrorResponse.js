// import SnackbarActions from "../components/snackbar/SnackbarActions";
// import SnackbarConstants from "../components/snackbar/SnackbarConstants";

/**
 * Handle the error response.
 *
 * @param status The HTTP status code.
 * @returns boolean True if the error is handled; otherwise false.
 */
 const handleErrorResponse = (response) => {
    // NOSONAR Due to the cases complexity.
    var message,
      messageArgs = {};
  
    switch (response.status) {
      case 400:
        message = "error.Bad.Request.parameter.is.malformed";
        break;
      case 401:
        window.location.href = "/login";
        break;
      case 403:
        message = "error.Forbidden.you.do.not.have.access";
        break;
      case 404:
        message = "error.Not.Found.resource.not.found";
        break;
      case 409:
        message = "error.Conflict.resource.has.conflict";
        break;
      case 500:
        message = "error.Internal.Server.Error.internal.error";
        break;
      case 501:
        message = "error.Not.Implemented.server.is.lacking";
        break;
      case 503:
        message = "error.Service.Unavailable.not.available";
        break;
      case 504:
        message = "error.Gateway.Timeout.no.response";
        break;
      default:
        return false;
    }
  
    // Look for custom message in the response body.
    response.text().then((text) => {
      if (text && text.substring(0, 6) === "error.") {
        // Override default message with custom one.
        message = text;
      }
      SnackbarActions.create(message, SnackbarConstants.TYPES.ERROR, messageArgs);
    });
  
    return true;
  };
  
  export default handleErrorResponse;
  
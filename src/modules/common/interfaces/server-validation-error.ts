export interface IServerValidationError {
  message: string;
  errors: {
    [key: string]: string[];
  };
}

/** example response unprocessable entity
 *
 * {
  "message": "The given data was invalid.",
  "errors": {
    "email": [
      "The email has already been taken."
    ],
    "username": [
      "The username has already been taken."
    ]
  }
}
 *
*/

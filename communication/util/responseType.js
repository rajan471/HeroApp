/**
 * Types of Errors covered.
 * 2xx, 4xx and 5xx series errors that occur at client
 * 200 => SUCCESSFULL OK
 * 201 => CREATED
 * 202 => ACCEPTED (response will be sent later)
 * 400 => BAD_REQUEST
 * 401 => UNAUTHORIZED (authenticate yourself first)
 * 403 => FORBIDDEN (User has no rights to access this content)
 * 404 => NOT_FOUND
 * 406 => NOT_ACCEPTABLE (content validation error)
 * 415 => UNSUPPORTED_MEDIA_TYPE
 * 500 => INTERNAL_SERVER_ERROR (server don't know how to handle)
 * 501 => NOT_IMPLEMENTED (requested METHOD is not implemented)
 * 502 => BAD_GATEWAY (requested Proxied request returned invalid response or no response)
 */

const responseType = {
    OK : 200,
    CREATED : 201,
    ACCEPTED: 202,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    NOT_ACCEPTABLE: 406,
    UNSUPPORTED_MEDIA_TYPE: 415,
    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501,
    BAD_GATEWAY: 502
  }
  
  module.exports = responseType;
  
  
/**
 * This class is an extension of default Error class.
 * We can modify it more to build rich features on the same.
 */
class cusError extends Error {
    constructor(code, message) {
        super();
        this.code = code;
        this.message = message;
    }
}

module.exports = cusError;

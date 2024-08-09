class APIResponse {
    constructor(success, message, data = null) {
        this.success = success;
        this.message = message;
        this.data = data;
    }

    static success(message, data = null) {
        return new APIResponse(true, message, data);
    }

    static error(message, data = null) {
        return new APIResponse(false, message, data);
    }
}

module.exports = APIResponse;

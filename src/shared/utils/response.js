class Response {
    static success(res, data = null, message = 'Success', status = 200) {
        return res.status(status).json({
            success: true,
            message,
            data
        });
    }

    static error(res, err, status = 400) {
        return res.status(status).json({
            success: false,
            message: err.message,
            errors: err.errors || null
        });
    }
}

module.exports = Response;
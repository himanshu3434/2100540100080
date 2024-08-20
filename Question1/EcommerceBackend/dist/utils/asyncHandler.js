export const asyncHandler = (functionHandler) => {
    return (req, res, next) => {
        Promise.resolve(functionHandler(req, res, next)).catch((err) => next(err));
    };
};
//# sourceMappingURL=asyncHandler.js.map
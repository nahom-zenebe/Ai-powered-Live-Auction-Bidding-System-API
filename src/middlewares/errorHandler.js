

export const errorHandler=(err,req,res,next)=>{
    const statusCode=err.statusCode
    const status = err.status || "error";
    const message = err.message || "Something went wrong";

    console.error(err.stack);

    res.status(statusCode).json({
        status,
        message
    })
}
class ApiError extends Error{
    constructor(
     statusCode,
     message = "Something Went Wrong",
     error = [],
     stack = ""   
    ){
        super(message)
        this.statusCode = statusCode
        this.message = message
        this.data = null
        this.success = false
        this.error = error

        if(stack){
            this.stack = stack
        }else{
            Error.captureStackTrace(this,this.constructor)
        }
    }
}

export default ApiError

// Error is JavaScript's standard error object.

// extends means ApiError will have all the functionalitiestatusCode: HTTP status code (e.g., 404, 500).

// message: A custom error message. Defaults to "Something Went Wrong".

// error: An array to hold extra error details (like validation errors). Defaults to empty array.

// stack: Optional stack trace (useful for debugging). If not provided, it's auto-generated.s of the Error class, and we can also add extra things to it.

// super(message) --> This calls the constructor of the parent class Error and passes the messages

// What is a stack trace?
// A stack trace is a snapshot of the function call stack at the moment an error was thrown. It shows the sequence of function calls that led to the error — like a breadcrumb trail for debugging.
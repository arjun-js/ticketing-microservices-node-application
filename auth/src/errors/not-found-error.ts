import { CustomError } from "./custom-error";

export class NotFound extends CustomError{
    statusCode = 404;
    
    constructor(){
        super('Route path Not found error');

        Object.setPrototypeOf(this, NotFound.prototype);
    }

    serializeErrors(): { message: string; field?: string | undefined; }[] {
        return [{
            message : 'Route not found'
        }]
    }
}
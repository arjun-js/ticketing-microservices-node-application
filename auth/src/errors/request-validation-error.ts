import { ValidationError } from "express-validator";

import { CustomError } from "./custom-error";

export class RequestValidationError extends CustomError {
    statusCode: number = 400;
    constructor(public errors : ValidationError[]){
        super('Request Validation error occured');

        //the below code is needed when we create a sub class of the language specific object, In this case, error

        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    serializeErrors(){
        return this.errors.map(err=>{
            return {
                message : err.msg,
                field: err.param
            }
        });
    }
}
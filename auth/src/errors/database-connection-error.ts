import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError {
    reason = 'Error connecting to Database';
    statusCode : number = 500;
constructor(){
    super('Error connecting to database');

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
}

serializeErrors(){
    return [
        {
            message : this.reason
        }
    ]
}

}
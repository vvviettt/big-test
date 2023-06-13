import { HttpException, HttpStatus, ValidationError } from '@nestjs/common';

export class ValidateException extends HttpException {
    constructor(errors: ValidationError[]) {
        super({}, HttpStatus.UNPROCESSABLE_ENTITY);
        this['response' as any] = this.convertValidationErrors(errors);
    }

    private convertValidationErrors(errors: ValidationError[], parent: ValidationError = null) {
        let newErrors = {
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            messages: []
        };
        errors.forEach((error) => {
            if (!parent || error.property !== parent.property) {
                console.log(error.constraints);
                newErrors.messages.push(...Object.values(error.constraints));
            }
        });
        return newErrors;
    }
}

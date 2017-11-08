import { Request, Response, NextFunction } from 'express';

import * as winston from 'winston';

interface IVenzraError {
    name: string;
    message: string;
}

class VenzraError extends Error {
    constructor(public message: string) {
        super();
        this.name = this.constructor.name;
    }
}

export class BadRequest extends VenzraError implements IVenzraError {
    constructor(public message: string) {
        super(message);
    }
}

export class NotFoundError extends VenzraError implements IVenzraError {
    constructor() {
        super('Resource not found');
    }
}

export const errorHandler = (err: IVenzraError, req: Request, res: Response, next: NextFunction): void => {
    const logger = new (winston.Logger)({
        transports: [
            new (winston.transports.Console)({
                timestamp: () => Date.now(),
                formatter: (options) => `${req.ip} - ERROR LOG - [${new Date(options.timestamp()).toISOString()}] - "${req.method} ${req.originalUrl}" ${options.level.toUpperCase()} "${options.message}"`
            })
        ]
    });

    switch (err.name) {
        case 'BadRequest':
            logger.info(err.message);
            res.status(400).send({ message: err.message });
            break;
        case 'NotFoundError':
            res.status(404).send();
            break;
        default:
            console.log(err);
            logger.error(err.message);
            res.status(500).send();
    }

};

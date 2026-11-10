export class HttpException extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Object.setPrototypeOf(this, HttpException.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestException extends HttpException {
  constructor(message: string = 'Solicitud incorrecta') {
    super(message, 400);
    Object.setPrototypeOf(this, BadRequestException.prototype);
  }
}

export class NotFoundException extends HttpException {
  constructor(message: string = 'Recurso no encontrado') {
    super(message, 404);
    Object.setPrototypeOf(this, NotFoundException.prototype);
  }
}

export class ConflictException extends HttpException {
  constructor(message: string = 'Conflicto de datos') {
    super(message, 409);
    Object.setPrototypeOf(this, ConflictException.prototype);
  }
}

export class InternalServerErrorException extends HttpException {
  constructor(message: string = 'Error interno del servidor') {
    super(message, 500);
    Object.setPrototypeOf(this, InternalServerErrorException.prototype);
  }
}

export class ValidationException extends HttpException {
  public readonly errors: Array<{ field: string; message: string }>;

  constructor(errors: Array<{ field: string; message: string }>) {
    super('Error de validación', 422);
    this.errors = errors;
    Object.setPrototypeOf(this, ValidationException.prototype);
  }
}

export class UnauthorizedException extends HttpException {
  constructor(message: string = 'No autorizado') {
    super(message, 401);
    Object.setPrototypeOf(this, UnauthorizedException.prototype);
  }
}

export class ForbiddenException extends HttpException {
  constructor(message: string = 'Acceso prohibido') {
    super(message, 403);
    Object.setPrototypeOf(this, ForbiddenException.prototype);
  }
}

export const BadRequestError = BadRequestException;
export const NotFoundError = NotFoundException;
export const ValidationError = ValidationException;
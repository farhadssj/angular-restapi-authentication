export class ApiResponse<T> {
    statusCode!: number;
    message!: string;
    details!: T;
}
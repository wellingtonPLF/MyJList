export interface ErrorResult<T> {
    type: string;
    error: T,
    status: number
};
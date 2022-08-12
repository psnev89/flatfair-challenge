// currency
export type Pound = number;
export type Pence = number;

// validation
type TaskError = string | null;
export type TaskResult<T> = [TaskError, T];
// currency
export type Pound = number;
export type Pence = number;
export type MembershipFee = number;

// validation
type TaskError = string | null;
export type TaskResult<T> = [TaskError, T];

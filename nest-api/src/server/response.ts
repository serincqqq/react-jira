const SUCCESS_CODE = 0;
const SUCCESS_MESSAGE = 'success';
export interface ProjectResponse<T = unknown> {
  code: number;
  data?: T | null;
  message: string;
}

export function generateResponse<T>(data: T): ProjectResponse<T> {
  return {
    code: SUCCESS_CODE,
    data: data,
    message: SUCCESS_MESSAGE,
  };
}

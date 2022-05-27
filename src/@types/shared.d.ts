export interface LocalErrorMsgType extends Record<string, any> {
  message: string;
}

export interface LocalResponseType {
  data: any;
  error_code: string;
  error_msg: string | LocalErrorMsgType;
}

declare global {
  interface Window {
    author401: any;
  }
}

// types/appwrite-function.d.ts

// Supported HTTP methods in Appwrite functions
export type FnMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

// Request object passed into Appwrite functions
export interface FnRequest {
  method: FnMethod;
  headers: Record<string, string>;
  url: string;
  path: string;
  query: Record<string, string | string[]>;
  body?: string;            // Appwrite passes stringified bodies
  bodyRaw?: ArrayBuffer;    // Raw body, if you need binary
}

// Response helpers provided by Appwrite
export interface FnResponse {
  json: <T>(
    data: T,
    status?: number,
    headers?: Record<string, string>
  ) => void;
  text: (
    data: string,
    status?: number,
    headers?: Record<string, string>
  ) => void;
  empty: () => void;
  redirect: (location: string, status?: number) => void;
}

// Context wrapper passed into your function
export interface FnContext {
  req: FnRequest;
  res: FnResponse;
  log: (msg: unknown) => void;
  error: (msg: unknown) => void;
}

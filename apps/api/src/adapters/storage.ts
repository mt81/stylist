export interface StorageAdapter {
  get(key: string): Promise<ReadableStream | null>;
  put(key: string, body: ReadableStream | Uint8Array | string): Promise<void>;
  delete(key: string): Promise<void>;
  list(prefix: string): Promise<string[]>;
}

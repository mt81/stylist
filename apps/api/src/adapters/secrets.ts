export interface SecretsAdapter {
  getSecret(name: string): Promise<string>;
  getSecretJson<T>(name: string): Promise<T>;
}

export class ConfigService {
  private readonly envConfig: { [key: string]: string };
  constructor(configJson: { [key: string]: string }) {
    this.envConfig = configJson;
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
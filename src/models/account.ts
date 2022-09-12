export enum ProviderType {
  ProviderTypeQiniuCloud = 'QiniuCloud', // Qiniu Cloud
}

export interface IAccount {
  provider: string;
  access_key: string;
  access_secret: string;
  comment: string;
}

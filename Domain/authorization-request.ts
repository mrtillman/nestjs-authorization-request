export default class AuthorizationRequest
{
  public clientId: string;
  public clientSecret: string;
  public code: string;
  public grantType: string;
  public redirectUri: string;
  public scope: string;
}
interface Token {
  access_token: string;
  token_type: string;
  scope: string;
}

interface User {
  login: string;
  id: number;
  email: string;
}

interface TokenItem {
  tokenValue: string;
  tokenType: "access_token" | "refresh_token";
  expiredAt: number;
  application: 'github' | 'web'
}

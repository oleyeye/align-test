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

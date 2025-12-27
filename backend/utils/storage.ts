let tokenValue: Token | null = null;

export const storeToken = (token: Token): void => {
  // Implement token storage logic here (e.g., save to database or session)
  // save in memory for now
  console.log("Storing token:", token);
  tokenValue = token;
};

export const retrieveToken = (): Token | null => {
  // Implement token retrieval logic here (e.g., fetch from database or session)
  return tokenValue;
};

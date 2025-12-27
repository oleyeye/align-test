let tokenValue: Token | null = null;

export class TokenStorage {
  private static tokenVault = new Map<number, TokenItem>();

  public static storeToken(userId: number, tokenItem: TokenItem): void {
    this.tokenVault.set(userId, tokenItem);
  }

  public static retrieveToken(userId: number): TokenItem | null {
    return this.tokenVault.get(userId) || null;
  }

  public static deleteToken(userId: number): void {
    this.tokenVault.delete(userId);
  }
}

export interface ITokenStore {
  token: string | null,
  exp: number,
  msg?: string
}
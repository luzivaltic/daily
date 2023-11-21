export interface UserSignupInfo {
  username: string,
  email: string,
  password: string,
  passwordConfirm: string
}

export interface UserUpdateInfo {
  id: string,
  username: string,
  password: string,
}
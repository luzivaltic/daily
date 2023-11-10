export default interface UserInfo {
  username?: FormDataEntryValue | null;
  email?: FormDataEntryValue | null;
  password?: FormDataEntryValue | null;
  passwordConfirm?: FormDataEntryValue | null;
}
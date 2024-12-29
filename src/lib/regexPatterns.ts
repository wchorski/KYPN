// one Capital letter
// one special character !@#$&*
// one number
// three lower case letters
// 8 - 32 characters
export const passwordRegExp: RegExp = /^(?=.*[A-Z])(?=.*[!@#+=$&-_^%*])(?=.*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,32}$/

export const fileExtensionRegEx: RegExp = /(?<=\.)[^.\\/:*?"<>|\r\n]+$/

export const emailRegex: RegExp = /^[a-zA-Z0-9._%±]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/i
// cred - https://support.boldsign.com/kb/article/15962/how-to-create-regular-expressions-regex-for-email-address-validation
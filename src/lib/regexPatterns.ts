// one Capital letter
// one special character !@#$&*
// one number
// three lower case letters
// 8 - 32 characters
export const passwordRegExp: RegExp = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,32}$/

export const fileExtensionRegEx: RegExp = /(?<=\.)[^.\\/:*?"<>|\r\n]+$/
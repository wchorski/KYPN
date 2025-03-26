export const passwordResetConfirmMail = (account_url:string) => `
  <p>
    password successfully changed. If you did not do this, 
    visit your <a href="${account_url}">account</a> 
    to change your password to protect your account
  </p>
`
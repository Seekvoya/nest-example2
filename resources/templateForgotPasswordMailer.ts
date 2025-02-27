/* eslint-disable max-len */
export const templateForgotPassword = (hash: string, recoveryUrl: string) => {
  const href = `${recoveryUrl}?recoveryHash=${hash}`;

  return {
    subject: 'Восстановление пароля',
    html: `
      <b>Здравствуйте!</b>
      <p>
        Был запрос на восстановление пароля аккаунта с вашим E-mail адресом. Для восстановление пароля, пожалуйста, перейдите по <a href="${href}" target='_blank'>ссылке</a>
      </p>
    `,
  };
};

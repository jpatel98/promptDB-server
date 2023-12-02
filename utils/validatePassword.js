const validatePassword = (password) => {
  const minLength = 8;
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);

  return password.length >= minLength && hasSpecialChar && hasUpperCase;
};

module.exports = validatePassword;

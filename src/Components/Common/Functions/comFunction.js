export const setHistoryPush = (focus, id) => {
  if (focus == 'true') {
    if (!id) {
      return `/tasks/focus`;
    }
  } else {
    if (!id) {
      return `/tasks/inbox`;
    }
  }
  return `/projects/${id}`;
};

export const validateTitle = (value, language = 'EN') => {
  let errors = [];

  if (value.length < 1) {
    if (language == 'EN') {
      errors.push('Title should consist of minimum one char at least.');
    } else {
      errors.push('Название должно содержать хотя бы один символ.');
    }
  }

  if (/^\s*$/.test(value)) {
    if (language == 'EN') {
      errors.push('Title should not consist of empty string.');
    } else {
      errors.push('Название не может быть пустой строкой');
    }
  }
  return errors;
};

export const validatePasswordConfirmaion = (
  password,
  passwordConfirmation,
  language
) => {
  let error = null;
  if (password === passwordConfirmation) {
    return error;
  } else {
    if (language == 'EN') {
      error = 'Password and password confirmation are not the same!';
    } else {
      error = 'Пароль и подтверждение не совпадают!';
    }
    return error;
  }
};

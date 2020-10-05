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

export const validateTitle = (value) => {
  let errors = [];

  if (value.length < 1) {
    errors.push('Title should consist of minimum one char at least.');
  }

  if (/^\s*$/.test(value)) {
    errors.push('Title should not consist of empty string.');
  }

  console.log(errors);
  return errors;
};

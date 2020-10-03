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

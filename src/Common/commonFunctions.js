export const setHistoryPush = (focus, id) => {
  if (focus == 'true') {
    if (!id) {
      return `/focus`;
    }
  } else {
    if (!id) {
      return `/inbox`;
    }
  }
  return `/project/${id}`;
};

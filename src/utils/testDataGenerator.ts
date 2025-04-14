
export const isUserAdmin = (): boolean => {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  return isAdmin;
};

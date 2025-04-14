
export const isUserAdmin = (): boolean => {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  return isAdmin;
};

// Adding back a stub implementation of generateTestUser
// This is just a placeholder that returns a success message
// since we're removing test functionality
export const generateTestUser = async (email: string, password: string) => {
  console.log('Test user generation has been disabled');
  return {
    success: true,
    data: null,
    error: null
  };
};

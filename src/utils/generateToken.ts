export const generateToken = () => {
  return `${Date.now()}_${Math.random().toString(36).slice(2)}`;
};

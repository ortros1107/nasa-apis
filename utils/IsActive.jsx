const isActive = (contentName, name) => {
  if (contentName === name) {
    return true;
  }
  return false;
};

export default isActive;

let setGlobalLoading = () => {}; // Function placeholder

export const setLoadingFunction = (fn) => {
  setGlobalLoading = fn; // Assign the function from Layout/App
};

export const showLoading = () => {
  setGlobalLoading(true); // Call the assigned function
};

export const hideLoading = () => {
  setGlobalLoading(false); // Call the assigned function
};

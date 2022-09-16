export const logOut = (updateContext, e = false ) => {
    if(e) e.preventDefault();
    // @ts-ignore
    updateContext(false);
    return localStorage.clear();
  };

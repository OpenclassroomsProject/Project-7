export const logOut = (userContext, e = false ) => {
    if(e) e.preventDefault();
    // @ts-ignore
    userContext.setDataUser(false);
    return localStorage.clear();
  };

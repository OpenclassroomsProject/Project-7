export function addHeaderJWT () {
  try {
    const myHeaders = new Headers();
    myHeaders.append('authorization', 'bearer ' + localStorage.getItem('JWT'));
    return myHeaders;
  } catch (error) {
    return error;
  }
}

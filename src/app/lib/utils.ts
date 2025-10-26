export const getClientSideCookie = (name: string): string | undefined => {
  console.log(document.cookie);
  const cookieValue = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${name}=`))
    ?.split('=')[1]; // Get the value part after the '='
  return cookieValue;
};
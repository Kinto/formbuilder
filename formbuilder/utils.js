/**
 * Returns the user token from the administration token.
 *
 * The user token is also used as the name of the collection where the records
 * are stored. This is useful to always have one id to pass to the clients,
 * and they can figure out what the user token and collection name is.
 **/
export function getUserToken(adminToken) {
  return adminToken.slice(0, adminToken.length / 2);
}

/**
 * Returns the user URL from the user token.
 *
 * This function relies on the globally available "window" object, which might
 * be something we want to pass rather than relying on it being globally
 * available.
 **/
export function getUserURL(userToken) {
  const origin = window.location.origin + window.location.pathname;
  return `${origin}#/form/${userToken}`;
}

/**
 * Returns the admin URL from the admin token.
 *
 * This function relies on the globally available "window" object, which might
 * be something we want to pass rather than relying on it being globally
 * available.
 **/
export function getAdminURL(adminToken) {
  const origin = window.location.origin + window.location.pathname;
  return `${origin}#/admin/${adminToken}`;
}

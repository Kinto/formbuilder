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

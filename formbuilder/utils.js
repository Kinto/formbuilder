import config from "./config";


/**
 * Returns the form unique identifier from the administration token.
 *
 * The form ID is used as the name of the collection where the records
 * are stored. This is useful to always have one ID to pass to the clients,
 * and they can figure out what the collection name is.
 **/
export function getFormID(adminToken) {
  return adminToken.slice(0, adminToken.length / 2);
}

/**
 * Returns the form URL from the form identifier.
 *
 * This function relies on the globally available "window" object, which might
 * be something we want to pass rather than relying on it being globally
 * available.
 **/
export function getFormURL(formID) {
  return `${config.appURL}#/form/${formID}`;
}

/**
 * Returns the admin URL from the admin token.
 *
 * This function relies on the globally available "window" object, which might
 * be something we want to pass rather than relying on it being globally
 * available.
 **/
export function getAdminURL(adminToken) {
  return `${config.appURL}#/admin/${adminToken}`;
}

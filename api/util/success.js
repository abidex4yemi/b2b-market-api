/**
 * Define success status constants
 */
const CREATED = 201;
const OK = 200;

/**
 * Create success response data format
 *
 * @param {object} { data, message }
 *
 */
const handleResponse = ({ data, message = 'successful' }) => ({
  success: true,
  message,
  body: data,
});

export { handleResponse, CREATED, OK };

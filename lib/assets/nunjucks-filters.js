/**
 * NUNJUCKS CUSTOM FILTERS
 *
 * These functions extend the Nunjucks templating environment with custom functionality.
 * Filters are used in templates like this: {{ someValue | filterName }}
 *
 * HOW TO USE FILTERS:
 * In templates: {{ "Hello World" | spaceToDash }} outputs "Hello-World"
 * With variables: {{ page.title | condenseTitle }}
 * Chained: {{ page.title | condenseTitle | spaceToDash }}
 */

/**
 * Convert spaces to dashes (useful for CSS classes or URLs)
 * Example: "Hello World" becomes "Hello-World"
 */
export const spaceToDash = ( string ) => string.replace( /\s+/g, '-' );

/**
 * Convert to lowercase and remove spaces (useful for IDs)
 * Example: "Hello World" becomes "helloworld"
 */
export const condenseTitle = ( string ) => string.toLowerCase().replace( /\s+/g, '' );

/**
 * Format date in UTC string format
 * Example: Date object becomes "Mon, 01 Jan 2024 12:00:00 GMT"
 */
export const UTCdate = ( date ) => date.toUTCString( 'M d, yyyy' );

/**
 * Format date for blog posts in readable format
 * Example: Date object becomes "January 1, 2024"
 */
export const blogDate = ( date ) => date.toLocaleString( 'en-US', { year: 'numeric', month: 'long', day: 'numeric' } );

/**
 * Remove leading and trailing slashes from URLs
 * Example: "/about/" becomes "about"
 * Useful for CSS class names based on URLs
 */
export const trimSlashes = ( string ) => string.replace( /(^\/)|(\/$)/g, '' );

/**
 * Get current year (useful for copyright notices)
 * Example: {{ "" | thisYear }} outputs "2024"
 * Note: We pass an empty string because filters need an input, but this filter ignores it
 */
export const thisYear = () => new Date().getFullYear();

/**
 * Export all filters as an object for easy import in metalsmith.js
 * This allows the template engine to access all filters defined above
 */
export default {
  spaceToDash,
  condenseTitle,
  UTCdate,
  blogDate,
  trimSlashes,
  thisYear
};
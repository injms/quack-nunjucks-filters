export = humanDate;
/**
 * @param  {string} date Date or datetime string that can be used by `Date.parse()`
 * @param  {string} [locale] Valid BCP47 string. Defaults to en-GB.
 * @return {string} Date written in locale given
 */
declare function humanDate(date: string, locale?: string): string;

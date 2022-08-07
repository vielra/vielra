/**
 * @description Get initials name - used for the purposes of create avatar text
 *
 * @param {string} fullName
 * @param {boolean} pickFirstChar
 * @returns {string}
 */
export const getInitialsName = (fullName: string, pickFirstChar?: boolean): string => {
  const initialsName = fullName
    .split(' ')
    .map((str) => str[0])
    .join('')
    .toUpperCase();

  return initialsName.length > 1 ? initialsName.substring(0, pickFirstChar ? 1 : 2) : initialsName;
};

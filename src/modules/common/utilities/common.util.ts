export const convertToCamelCase = (text: string) => {
  return text.replace(/([-_][a-z])/gi, ($1) => {
    return $1.toUpperCase().replace('-', '').replace('_', '');
  });
};

export const getCamelCaseText = (text: string) => {
  text = text[0].toUpperCase() + text.substring(1);
  return text.replace(/([a-z0-9])([A-Z])/g, '$1 $2');
};

const getInitialsName = (name: string, pickFirstChar?: boolean): string => {
  if (!name) {
    return '';
  }
  const initialsName = name
    .split(' ')
    .map((str) => str[0])
    .join('')
    .toUpperCase();

  return initialsName.length > 1 ? initialsName.substring(0, pickFirstChar ? 1 : 2) : initialsName;
};

export const commonUtils = {
  convertToCamelCase,
  getCamelCaseText,
  getInitialsName,
};

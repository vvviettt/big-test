export const convertNumberFormat = (value: number): string => {
  return new Intl.NumberFormat("de-DE").format(value).split(",")[0];
};

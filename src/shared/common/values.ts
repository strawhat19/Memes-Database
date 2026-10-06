export const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === `object` && value !== null && !Array.isArray(value);

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  if (isObject(error) && typeof error.message === `string`) return error.message;
  return `Something went wrong. Please try again`;
};

export const isISODate = (value: unknown): value is string =>
  typeof value === `string`
  && /^\d{4}-\d{2}-\d{2}T/.test(value)
  && !Number.isNaN(Date.parse(value));

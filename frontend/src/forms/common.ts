
export const formatError = (errorObj: any) => {
    const errs: { [field: string]: string }[] = errorObj.response.data;
    const allErrors = Object.entries(errs).map(([_, e]) => e[0]);
    return allErrors;
}
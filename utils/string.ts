export const capitalize = (value: string): string => {
    return value && value[0].toUpperCase() + value.slice(1).toLowerCase();
};

export const capitalizeOnlyFirst = (value: string): string => {
    return value && value[0].toUpperCase() + value.slice(1);
};

export const clear = (value: string): string => {
    return value && value.replace(/[^\s+\w+]/ig, "");
};

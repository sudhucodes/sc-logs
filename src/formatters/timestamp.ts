export const getTimestamp = (): string => {
    return new Date().toLocaleString("en-GB").replace(",", "");
};

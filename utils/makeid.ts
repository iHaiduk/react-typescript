export const makeId = (num: number = 5): string => {
    let i = 0;
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let text = "";
    while (i < num) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
        i++;
    }
    return text;
};
export default makeId;

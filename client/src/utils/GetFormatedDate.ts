export const GetFormatedDate = (dateToFix: any) => {
    const date = new Date(dateToFix);

    return `${date.getDate() + 1}/${date.getMonth() + 1}/${date.getFullYear()}`
}
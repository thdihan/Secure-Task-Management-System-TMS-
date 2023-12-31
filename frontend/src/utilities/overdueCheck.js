export function overDueCheck(inputDate) {
    const dateToCompare = new Date(inputDate);
    const currentDate = new Date();

    return dateToCompare < currentDate;
}

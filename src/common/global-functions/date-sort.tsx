export const datePicker = (num: number, val: any[] ) => {
    let date, month, year;

    if (val && val[0]) {
        date = val[num].date();
        month = val[num].month() + 1;
        year = val[num].year();

        if (month > 0 && month < 10) month = `0${month}`;
        if (date > 0 && date < 10) date = `0${date}`;

        return `${year}-${month}-${date}`;
    }
}

module.exports = {
    dateDiffFromToday: daysDiff => {
        const today = new Date();
        const newDate = new Date();
        newDate.setDate(today.getDate() + daysDiff);
        /* const dd = tomorrow.getDate();
        const day = (dd < 10) ? '0' + dd : dd;
        const mm = tomorrow.getMonth() + 1; //January is 0!
        const month = (mm < 10) ? '0' + mm : mm;
        const yyyy = tomorrow.getFullYear();
        return { day: day, month: month ,year: yyyy }; */
        return newDate;
  },
}
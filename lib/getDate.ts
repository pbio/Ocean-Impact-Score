export default function getDate(){
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();
    return [yyyy,mm,dd].join('-');
}

export function getYesterdaysDate(){
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1)
    const dd = String(yesterday.getDate()).padStart(2, '0');
    const mm = String(yesterday.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = yesterday.getFullYear();
    return [yyyy,mm,dd].join('-');
}
export function getlastMonthsDate(){
    const lastMonth = new Date();
    lastMonth.setDate(lastMonth.getDate() - 31)
    const dd = String(lastMonth.getDate()).padStart(2, '0');
    const mm = String(lastMonth.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = lastMonth.getFullYear();
    return [yyyy,mm,dd].join('-');
}
export function getlastyearsDate(){
    const lastMonth = new Date();
    lastMonth.setDate(lastMonth.getDate() - 365)
    const dd = String(lastMonth.getDate()).padStart(2, '0');
    const mm = String(lastMonth.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = lastMonth.getFullYear();
    return [yyyy,mm,dd].join('-');
}


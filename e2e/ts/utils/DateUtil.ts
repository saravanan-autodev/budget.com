
export default class DateUtil {


    public addDaysToCurrentDate(noOfDays:number){
        var date : Date = new Date();
        date.setDate(date.getDate()+noOfDays)
        return (new Intl.DateTimeFormat('en-US').format(date)).toString();
    }

}
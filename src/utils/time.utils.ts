export default class TimeUtils {
    static timestampToDate(timestamp: number) {
        const months = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
        ];
        const dateTimeObject = new Date(timestamp * 1000);
        return `${
            months[dateTimeObject.getMonth()]
        } ${dateTimeObject.getDate()}, ${dateTimeObject.getFullYear()}`;
    }
}

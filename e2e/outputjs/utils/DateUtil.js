"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DateUtil {
    addDaysToCurrentDate(noOfDays) {
        var date = new Date();
        date.setDate(date.getDate() + noOfDays);
        return (new Intl.DateTimeFormat('en-US').format(date)).toString();
    }
}
exports.default = DateUtil;
//# sourceMappingURL=DateUtil.js.map
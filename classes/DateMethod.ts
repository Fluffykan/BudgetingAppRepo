export abstract class DateMethod {
    public static getMonthZeroBased(index: number): string {
        if (index < 0 || index > 11) {
            throw new Error('Invalid index for month');
        }
        return Month[index];
    }

    public static getMonthOneBased(index: number): string {
        return this.getMonthZeroBased(index - 1);
    }

    public static format_Myyyy(date: Date): string {
        const month: string = this.getMonthZeroBased(date.getMonth());
        const year: number = date.getFullYear();
        return month + " " + year;
    }

    public static format_MMyyyy(date: Date): string {
        const month: number = date.getMonth() + 1;
        const year: number = date.getFullYear();
        return month + '' + year;
    }

    public static getPast5Months_Myyyy(date: Date): string[] {
        const result: string[] = [];
        let month: number = date.getMonth();
        let year: number = date.getFullYear();
        for (let i = 0; i < 5; i++) {
            if (month < 0) {
                month += 11;
                year--;
            }
            result.push(this.getMonthZeroBased(month) + " " + year);
            month--;
        }
        return result;
    }

    public static getPast5Months_Myyyy_Short(date: Date): string[] {
        const result: string[] = [];
        let month: number = date.getMonth();
        let year: number = date.getFullYear();
        for (let i = 0; i < 5; i++) {
            if (month < 0) {
                month += 11;
                year--;
            }
            result.push(this.getMonthZeroBased(month).substring(0, 3) + " " + year);
            month--;
        }
        return result;
    }

    public static getPast5Months_MMyyyy(date: Date): string[] {
        const result: string[] = [];
        let month: number = date.getMonth();
        let year: number = date.getFullYear();
        for (let i = 0; i < 5; i++) {
            if (month < 0) {
                month += 11;
                year--;
            }
            result.push((month + 1) + '' + year);
            month--;
        }
        return result;
    }

    public static isLeapYear(date:Date): boolean {
        return new Date(date.getFullYear(), 1, 29).getMonth() == 1;
    }

    public static getDaysInMonth(date:Date): number {
        const month: number = date.getMonth();
        const isLeapYear: boolean = this.isLeapYear(date);
        return isLeapYear ? DAYS_IN_MONTH_LEAP[month] : DAYS_IN_MONTH_NON_LEAP[month];
    }

    public static getDaysInWeek(): string[] {
        return DAYS;
    }

    public static getDaysInWeek_Short(): string[] {
        return DAYS.map(day => day.substring(0, 3));
    }
}

enum Month {
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
}

const DAYS_IN_MONTH_NON_LEAP:number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const DAYS_IN_MONTH_LEAP:number[] = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const DAYS:string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
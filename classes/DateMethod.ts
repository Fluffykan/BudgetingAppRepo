export abstract class DateMethod {
    /**
     * Returns the name of the month given its zero based index
     * 
     * @param index the index of the month within the range [0, 11]
     * @returns the name of the month
     */
    public static getMonthZeroBased(index: number): string {
        if (index < 0 || index > 11) {
            throw new Error('Invalid index for month');
        }
        return Month[index];
    }

    /**
     * Returns the name of the month given its one based index
     * 
     * @param index the index of the month within the range [1, 12]
     * @returns the name of the month
     */
    public static getMonthOneBased(index: number): string {
        return this.getMonthZeroBased(index - 1);
    }

    /**
     * Returns a string representation of the date in the format 'Month yyyy'
     * e.g. 'December 2024'
     * 
     * @param date the date to be converted
     * @returns the formatted string representation of the date
     */
    public static format_Myyyy(date: Date): string {
        const month: string = this.getMonthZeroBased(date.getMonth());
        const year: number = date.getFullYear();
        return month + " " + year;
    }

    /**
     * Returns a string representation of the date in the format 'MMyyyy'
     * e.g. '122024' for December 2024
     * 
     * @param date the date to be converted
     * @returns the formatted string representation of the date
     */
    public static format_MMyyyy(date: Date): string {
        const month: number = date.getMonth() + 1;
        const year: number = date.getFullYear();
        return month + '' + year;
    }

    /**
     * Calculates the past 5 months from the date, inclusive of the month the date is in,
     * and stores the dates in ascending order in an array
     * e.g. date object corresponding to 12 Dec 2024 returns 
     * ['August', 'September', 'October', 'November', 'December']
     * 
     * @param date the date of interest
     * @returns an array containing the names of the past 5 months
     */
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

    /**
     * Calculates the past 5 months from the date, inclusive of the month the date is in,
     * and stores the dates in ascending order in an array
     * e.g. date object corresponding to 12 Dec 2024 returns 
     * ['Aug', 'Sep', 'Oct', 'Nov', 'Dec']
     * 
     * @param date the date of interest
     * @returns an array containing the shortened names of the past 5 months
     */
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

    /**
     * Calculates the past 5 months from the date, inclusive of the month the date is in,
     * and stores the dates in ascending order in an array
     * e.g. date object corresponding to 12 Dec 2024 returns 
     * ['82024', '92024', '102024', '112024', '122024']
     * 
     * @param date the date of interest
     * @returns an array containing the shortened names of the past 5 months
     */
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

    /**
     * Checks if the year is a leap year 
     * 
     * @param date any date within the year 
     * @returns a boolean of whether the year is a leap year
     */
    public static isLeapYear(date:Date): boolean {
        return new Date(date.getFullYear(), 1, 29).getMonth() == 1;
    }

    /**
     * Gets the number of days within the month
     * 
     * @param date any date within the month 
     * @returns the nuumber of days in that month
     */
    public static getDaysInMonth(date:Date): number {
        const month: number = date.getMonth();
        const isLeapYear: boolean = this.isLeapYear(date);
        return isLeapYear ? DAYS_IN_MONTH_LEAP[month] : DAYS_IN_MONTH_NON_LEAP[month];
    }

    /**
     * Returns all full names of days in a week starting from Sunday
     * Example of a name: 'Sunday'
     * 
     * @returns an array of the names of all days within the week 
     */
    public static getDaysInWeek(): string[] {
        return DAYS;
    }

    /**
     * Returns all short names of days in a week starting from Sunday
     * Example of a short name: 'Sun'
     * 
     * @returns an array of the short names of all days in the week
     */
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
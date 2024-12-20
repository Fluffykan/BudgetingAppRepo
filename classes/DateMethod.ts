export abstract class DateMethod {
    public static getMonthZeroBased(index: number): string {
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
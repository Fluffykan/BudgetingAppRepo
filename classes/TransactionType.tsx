import { TRANSACTION_TYPES_FILE_PATH } from "@/constants/SaveFileAddress";
import * as FileSystem from "expo-file-system";

export abstract class TransactionType {
    public static types: string[] = [];
    private static readonly defaultTypes: string[] = ["Food", "Transport", "Others"];

    public static loadTypesFromArray(types: string[]) {
        // just in case, to remove all types that are empty strings
        const newTypes: string[] = types.filter((types) => types.length != 0);

        // check that array exists, and contains some values
        if (newTypes == undefined || newTypes.length == 0) {
            this.types = this.defaultTypes;
            return;
        }
        this.types = newTypes;
    }

    public static loadTypesFromCsv(csv: string) {
        this.loadTypesFromArray(csv.split(","));
    }

    public static async addType(newType: string) {
        this.types.push(newType);
        console.log(this.types);
        await FileSystem.writeAsStringAsync(TRANSACTION_TYPES_FILE_PATH, this.getTypesCsv());
    }

    public static async removeType(existingType: string) {
        this.types = this.types.filter((type) => type != existingType);
        await FileSystem.writeAsStringAsync(TRANSACTION_TYPES_FILE_PATH, this.getTypesCsv());
    }

    public static getTypes() {
        if (this.types.length == 0) {
            this.loadTypesFromArray(this.defaultTypes);
        }
        return this.types;
    }

    public static getTypesCsv() {
        return this.getTypes().reduce((joined, next) => {
            return joined + "," + next;
        }, "");
    }

    public static resetToDefault() {
        this.types = this.defaultTypes;
    }
}

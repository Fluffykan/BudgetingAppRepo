import { TransactionType } from "@/constants/TransactionType";

export class Transaction {
    private readonly type: TransactionType;
    private readonly amount: number;
    private readonly date: Date;
    private readonly description: string;

    constructor(type:TransactionType, amount:number, date:Date, description?:string) {
        this.type = type;
        this.date = date;
        this.amount = amount;
        if (description) {
            this.description = description
        } else {
            this.description = '';
        }
    }

    public getType() : TransactionType {
        return this.type;
    }

    public getAmount() : number {
        return this.amount;
    }

    public getDate() : Date {
        return this.date;
    }

    public getDescription() : string {
        return this.description;
    }

    /**
     * Generates a string representation of the transaction to be stored as a csv
     * @returns a string representation of the transaction
     */
    public toString() : string {
        return this.type + ',' + this.amount.toFixed(2) + ',' + this.date.toLocaleDateString + ',' + this.description;
    }

}
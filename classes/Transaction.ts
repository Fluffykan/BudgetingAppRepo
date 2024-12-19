export class Transaction {
    private readonly type: TransactionType;
    private readonly amount: number;
    private readonly date: Date;
    private readonly description: string;
    private readonly id: string;

    /**
     * Creates a new Transaction object using the inputs by the user from app
     * @throws {InvalidTransactionTypeException} if the type is not one of the predefined transaction types
     */
    constructor(type: string, amount: number, date: Date, description?: string, id?:string) {
        this.type = Transaction.parseType(type);
        this.amount = amount;
        this.date = date;
        if (description) {
            this.description = description;
        } else {
            this.description = "";
        }
        if (id) {
            this.id = new Date(id).toString();
        } else {
            this.id = new Date().toString();
        }
    }

    /**
     * Creates a new Transaction object from the comma separated data file
     * @param type the string representation of the type of transaction
     * @param amount the string represenation of the amount of the transaction
     * @param date the string representation of the date of the transaction
     * @param description the description of the transaction
     */
    public static buildFromString(type: string, amount: string, date: string, description: string, creationDate: string): Transaction {
        return new Transaction(type, Number.parseFloat(amount), new Date(date), description, creationDate);
    }

    public getType(): TransactionType {
        return this.type;
    }

    public getAmount(): number {
        return this.amount;
    }

    public getDate(): Date {
        return this.date;
    }

    public getDescription(): string {
        return this.description;
    }

    public getId(): string {
        return this.id;
    }

    static parseCsvSaveFile(csv: string): Transaction[] {
        const data: string[] = csv.split("\n");
        return this.parseTransactions(data);
    }

    /**
     * @throws {InvalidTransactionTypeException} if the type is not one of the predefined transaction types
     */
    public static parseType(type: string): TransactionType {
        switch (type.toLowerCase()) {
            case "food":
                return TransactionType.FOOD;
            case "transport":
                return TransactionType.TRANSPORT;
            case "others":
                return TransactionType.OTHERS;
            default:
                throw new Error("Invalid transaction type");
        }
    }

    /**
     * Converts an array of string representation of transactions into the corresponding array of transactions
     * @param transactions
     */

    public static parseTransactions(transactions: string[]): Transaction[] {
        return transactions.map((transaction) => {
            const arr: string[] = transaction.split(",");
            try {
                return Transaction.buildFromString(arr[0], arr[1], arr[2], arr[3], arr[4]);
            } catch (e) {
                return null;
            }
        })
        .filter(transaction => transaction != null);

    }

    /**
     * Generates a string representation of the transaction to be stored as a csv
     * @returns a string representation of the transaction
     */
    public toString(): string {
        return (
            this.type +
            "," +
            this.amount.toFixed(2).toString() +
            "," +
            this.date.toLocaleDateString() +
            "," +
            this.description + 
            ',' + 
            this.id
        );
    }
}

export enum TransactionType {
    FOOD = 'Food',
    TRANSPORT = 'Transport',
    OTHERS = 'Others'
}

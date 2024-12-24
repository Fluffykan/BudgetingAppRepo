export abstract class TransactionType {
    public static types:string[] = ['Food', 'Transport', 'Others'];
    
    public static addType(newType:string) {
        this.types.push(newType);
    }

    public static removeType(existingType:string) {
        this.types = this.types.filter(type => type != existingType);
    }

    public static getTypes() {
        return this.types;
    }
}
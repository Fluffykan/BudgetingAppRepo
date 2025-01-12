import * as FileSystem from "expo-file-system";

export const SAVE_FILE_PATH = FileSystem.documentDirectory + "/transactions.txt";
export const TRANSACTION_TYPES_FILE_PATH = FileSystem.documentDirectory + "/types.txt";
export const NEW_TRANSACTION_DATE_FILE_PATH = FileSystem.cacheDirectory + "/newTransactionDate.txt";

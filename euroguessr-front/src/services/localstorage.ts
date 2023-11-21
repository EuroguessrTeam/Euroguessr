export class LocalStorage {
    private static instance: LocalStorage; // The singleton instance

    /**
     * The constructor is private to prevent other classes from creating instances of the API class
     */
    private constructor() {}

    /**
     * The getInstance method returns the singleton instance of the API class
     * @returns The singleton instance of the API class
     */
    static getInstance(): LocalStorage {
        if (!LocalStorage.instance) {
            LocalStorage.instance = new LocalStorage();
        }
        return LocalStorage.instance;
    }

    /**
     * The setItem method sets the value of the specified key in the local storage
     * @param key The key of the item
     * @param value The value of the item
     * @returns void
     */
    setItem(key: string, value: string): void {
        if (value === null || value === undefined || value === '') {
            this.removeItem(key);
            return;
        }
        localStorage.setItem(key, value);
    }

    /**
     * The getItem method returns the value of the specified key in the local storage
     * @param key The key of the item
     * @returns The value of the item
     */
    getItem(key: string): string | null {
        return localStorage.getItem(key);
    }

    /**
     * The removeItem method removes the specified key from the local storage
     * @param key The key of the item
     */
    removeItem(key: string): void {
        localStorage.removeItem(key);
    }

    /**
     * The clear method clears the local storage
     */
    clear(): void {
        localStorage.clear();
    }
    
    /**
     * The key method returns the key of the item at the specified index in the local storage
     * @param index The index of the item
     * @returns The key of the item
     */
    key(index: number): string | null {
        return localStorage.key(index);
    }
    
    /**
     * The length method returns the number of items in the local storage
     * @returns The number of items in the local storage
     */
    get length(): number {
        return localStorage.length;
    }
    
}
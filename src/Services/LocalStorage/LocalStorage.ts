export class LocalStorage {
    private storage: Storage;

    constructor() {
        this.storage = window.localStorage;
    }

    set = (name: string, value: any) : void => {
        this.storage.setItem(name, value)
    }
    get = (name: string) : any => {
        return this.storage.getItem(name)
    }

    remove = (name: string): void => {
        this.storage.removeItem(name)
    }

    clear = (): void => {
        this.storage.clear()
    }
}

export interface IStoreThings{

    saveItem(name: string, document: any);

    getItem(name: string): any;

}
export class FileMime{
    constructor(public extension: string, public mimeType: string){

    }
    matchesExtension(test: string){
        return this.extension.replace(/./g, "").toLowerCase() == test.replace(/./g, "").toLowerCase();
    }
}

export class FileMimeCollection{
    constructor(public fileMimes: FileMime[]){

    }
    isInCollection(extension: string): boolean{
        return this.fileMimes.some(fm => fm.matchesExtension(extension));
    }
    isARegisteredFileType(fileName: string): boolean{
        var dotIndex = fileName.lastIndexOf(".");
        if(dotIndex == -1){
            return false;
        }
        var extension = fileName.substr(dotIndex);
        return this.isInCollection(extension);
    }
    getFileMime(fileName: string){
        var extension = fileName.substr(fileName.lastIndexOf("."));
        for(var i = 0; i < this.fileMimes.length; i++){
            if(this.fileMimes[i].matchesExtension(extension)){
                return this.fileMimes[i];
            }
        }
    }
}
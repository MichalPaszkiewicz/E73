export class Command{
    constructor(public url: string, public response: (data?: any) => void){

    }
}
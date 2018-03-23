export class RequestResponse{
    constructor(public url: string, public response: (data?: any) => void){

    }
}
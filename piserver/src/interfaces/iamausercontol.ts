import {RequestResponse} from "../objects/requestresponse";

export interface IAmAUserControl{
    getRequestResponses(): RequestResponse[];    
}
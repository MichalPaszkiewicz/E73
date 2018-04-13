import { IAmASensation } from "./iamasensation";

export interface IAmASensor{

    registerOnSensed(callback: (sensation: IAmASensation) => void);

}
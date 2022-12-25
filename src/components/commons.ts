import { IChangeGUI } from "../types/types"
type TCallBack<T> = (changedValue: T,propName:string) => void

export const changeGUI = <T>(obj: object, callback: TCallBack<T>): IChangeGUI => {
    const newObj: IChangeGUI = {}
    for (const [propName, value] of Object.entries(obj)) {
        
        if(typeof value==='object'){

        newObj[propName]={
            ...value,
            onChange:(changedValue: T) =>  {
                callback(changedValue,propName)

            }

        }
    }else{
        newObj[propName]={
            value,
            onChange:(changedValue: T) =>  {
                callback(changedValue,propName)
            }

        }
    }

    }
    return newObj;
}
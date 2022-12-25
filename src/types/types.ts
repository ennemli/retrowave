export interface planeProps {
    planeArgs: {
        width: number,
        height: number,

    },
    division: number,
    
}

export type TCallBack<T> = (changedValue:T,propName:string) => void

export interface IChangeGUI{
    [P:string]:{
        [p:string]:any,
        onChange:{
            (colorValue:any):void
        }
    }

}
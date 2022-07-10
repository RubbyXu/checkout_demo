export interface IItem {
    sku: string;
    name: string;
    price: number;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IPolicyHandler {
    [name: string]: any;
}
/* eslint-enable @typescript-eslint/no-explicit-any */
export interface IParamsBuyMoreSave {
    minNumber: number;
    savedNumber: number;
}

export interface IParamsBulkDiscount {
    minNumber: number;
    discount: number;
}

export interface IParamsBulkFixedPrice {
    minNumber: number;
    fixedPrice: number;
}

export interface IPolicy {
    sku: string; 
    name: string; 
    policyParams: IParamsBuyMoreSave | IParamsBulkDiscount | IParamsBulkFixedPrice
}

export interface IItemsInfo {
    total: number,
    item: IItem,
    items: IItem[];
}

export interface IPolicy {
    name: string;
    sku: string;
} 
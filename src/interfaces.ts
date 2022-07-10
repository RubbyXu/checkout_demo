export interface IItem {
    sku: string;
    name: string;
    price: number;
}

export interface IPolicyHandler {
    [name: string]: any;
}

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
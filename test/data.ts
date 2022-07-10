import {
    IPolicy
} from '../src/interfaces';

const productList = [
 
    { sku: "ipd", name: "Super iPad", price: 549.99 },
    { sku: "atv", name: "Apple TV", price: 109.5 },
    { sku: "vga", name: "VGA Adapter", price: 30.0 },
    { sku: "other", name: "Other item", price: 100.0 }
]


const policyList:IPolicy[] = [
    { sku: "atv", name: "POLICY_BUY_MORE_SAVE", policyParams: { minNumber: 3, savedNumber: 1 } },
    { sku: "ipd", name: "POLICY_BULK_FIXED_PRICE", policyParams: { minNumber: 4, fixedPrice: 499.99 } },
    { sku: "vga", name: "POLICY_BULK_DISCOUNT", policyParams: { minNumber: 5, discount: 0.8 } },
]

export { productList, policyList }


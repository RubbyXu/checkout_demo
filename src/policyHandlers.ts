import {
    IPolicyHandler,
    IItemsInfo,
    IParamsBuyMoreSave,
    IParamsBulkFixedPrice,
    IParamsBulkDiscount
} from './interfaces';

import { POLICY_BUY_MORE_SAVE, POLICY_BULK_FIXED_PRICE, POLICY_BULK_DISCOUNT } from './policies';
 

/**
 * Add price policy handler functions here
 * 
 * @itemsInfo: current items state, including total amount, added items, the item will be checkout
 * @policyParams: required information input specified for this policy. 
 * For example, for POLICY_BUY_MORE_SAVE, it needs to get minimum number that meets this policy and how many it could saved
 * 
 * POLICY_BUY_MORE_SAVE: Buy more, then could get several items saved. For example, if customer buy 6 adapters, he/she could get 2 free and only pay the money of 4.
 * POLICY_BULK_FIXED_PRICE: Bulk sale will get a specific fixed price. For example, if customer buy more than 4 iphones(original price is $549), he/she could get a fixed price($499). 
 * POLICY_BULK_DISCOUNT: Bulk sale will get a specific discount. For example, if customer buy buy more than 4 iphones(original price is $549), he/she could get discount 0.8 (80% of original price).
 */
const policiesHandler: IPolicyHandler = {
    [POLICY_BUY_MORE_SAVE]: (itemsInfo: IItemsInfo, policyParams: IParamsBuyMoreSave) => {
        const { minNumber, savedNumber } = policyParams;
        const { item, items } = itemsInfo;
        let { total } = itemsInfo;

        items.push(item);

        total = total + item.price;
        const theItems = items.filter(i => i.sku === item.sku)

        if ((theItems.length >= minNumber) && (theItems.length % minNumber === 0)) {
            const savedTotal = savedNumber * item.price;
            total = total - savedNumber * savedTotal;
        }
        return total

    },
    [POLICY_BULK_FIXED_PRICE]: (itemsInfo: IItemsInfo, policyParams: IParamsBulkFixedPrice) => {
        const { minNumber, fixedPrice } = policyParams;
        const { item, items } = itemsInfo;
        let { total } = itemsInfo;

        const theItems = items.filter(i => i.sku === item.sku)
        if (theItems.length === minNumber) {
            // Need to re-compute total amount based on the fixed price
            const others = total - (theItems.length) * item.price;
            total = others + (theItems.length + 1) * fixedPrice;

        } else if (theItems.length > minNumber) {
            total = total + fixedPrice
        } else {
            total = total + item.price;
        }
        items.push(item);
        return total

    },
    [POLICY_BULK_DISCOUNT]: (itemsInfo: IItemsInfo, policyParams: IParamsBulkDiscount) => {
        const { minNumber, discount } = policyParams;
        const { item, items } = itemsInfo;
        let { total } = itemsInfo;
        const discountPrice = item.price * discount;
        const theItems = items.filter(i => i.sku === item.sku)

        if (theItems.length === minNumber) {
            // Need to re-compute total amount based on the discount price
            const others = total - theItems.length * item.price;
            total = others + (theItems.length + 1) * discountPrice
        } else if (theItems.length > minNumber) {
            total = total + discountPrice;
        } else {
            total = total + item.price;
        }
        items.push(item);
        return total
    }
}

export { policiesHandler }


import { IItem, IPolicy } from './interfaces'
import { policyList } from './policies'
import { policiesHandler } from './policyHandlers'


/**
 * Properties:
 * _total is used to save the total amount for all scaned items. 
 * _items is used to save the total scaned items. 
 * 
 * Functions:
 * scan() input is single item information. For example: { sku: "ipd", name: "Super iPad", price: 549.99 }
 * total() will return total amount. 
 * 
 * Usage for scan:
 * const checkout = new Checkout(policyList);
 * checkout.scan({ sku: "atv", name: "Apple TV", price: 109.5 })
 * console.log('checkout total', checkout.total())
 */
class Checkout {
    private _total: number = 0;
    private _items: IItem[] = [];
    policyList: IPolicy[];

    constructor(policyList: IPolicy[]) {
        this.policyList = policyList
    }
    scan(item: IItem) {
        const policy = this.policyList.find((p) => p.sku === item.sku)

        if (policy) {
            let itemsInfo = { total: this._total, item, items: this._items }
            let policyParams = policy.policyParams
            this._total = policiesHandler[policy.name](itemsInfo, policyParams)

        } else {
            this._total += item.price
            this._items.push(item)
        }
    }
    total() {
        return this._total
    }
    items() {
        return this._items
    }
}

export default Checkout;

import { IItem, IPolicy } from './interfaces'
import { policyList } from './policies'
import { policiesHandler } from './policyHandlers'


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
const checkout = new Checkout(policyList);
// let checkout = new Checkout([]);

//   { sku: "ipd", name: "Super iPad", price: 549.99 },
//   { sku: "ipd", name: "Super iPad", price: 549.99 },
//   { sku: "atv", name: "Apple TV", price: 109.5 },
//   { sku: "vga", name: "VGA Adapter", price: 30.0 }



// checkout.scan({ sku: "atv", name: "Apple TV", price: 109.5 })
// checkout.scan({ sku: "atv", name: "Apple TV", price: 109.5 })
// checkout.scan({ sku: "atv", name: "Apple TV", price: 109.5 })
// checkout.scan({ sku: "vga", name: "VGA Adapter", price: 30.0 })

//atv, ipd, ipd, atv, ipd, ipd, ipd
checkout.scan({ sku: "atv", name: "Apple TV", price: 109.5 })
checkout.scan({ sku: "ipd", name: "Super iPad", price: 549.99 })
checkout.scan({ sku: "ipd", name: "Super iPad", price: 549.99 })
checkout.scan({ sku: "atv", name: "Apple TV", price: 109.5 })
checkout.scan({ sku: "ipd", name: "Super iPad", price: 549.99 })
checkout.scan({ sku: "ipd", name: "Super iPad", price: 549.99 })
checkout.scan({ sku: "ipd", name: "Super iPad", price: 549.99 })

console.log('checkout total', checkout.total())
console.log('checkout items', checkout.items())
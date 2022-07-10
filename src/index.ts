import { policyList } from './policies'
import Checkout from './checkout'

const checkout = new Checkout(policyList);


// Scenario
checkout.scan({ sku: "atv", name: "Apple TV", price: 109.5 })
checkout.scan({ sku: "ipd", name: "Super iPad", price: 549.99 })
checkout.scan({ sku: "ipd", name: "Super iPad", price: 549.99 })
checkout.scan({ sku: "atv", name: "Apple TV", price: 109.5 })
checkout.scan({ sku: "ipd", name: "Super iPad", price: 549.99 })
checkout.scan({ sku: "ipd", name: "Super iPad", price: 549.99 })
checkout.scan({ sku: "ipd", name: "Super iPad", price: 549.99 })

console.log('At checkout, total amount', checkout.total())
 
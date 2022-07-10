import Checkout from "../src/checkout";
import { productList, policyList } from './data'
import {
    IParamsBulkFixedPrice,
    IParamsBulkDiscount
} from '../src/interfaces';

import { POLICY_BUY_MORE_SAVE, POLICY_BULK_FIXED_PRICE, POLICY_BULK_DISCOUNT } from '../src/policies';

describe('Checkout scan', () => {

    describe('Validate policy POLICY_BUY_MORE_SAVE', () => { 
        test("checkout should apply policy POLICY_BUY_MORE_SAVE if meet with it", () => {
            const checkout = new Checkout(policyList);
            const atv = productList.find(i => i.sku === 'atv')
            const policy = policyList.find(i => i.sku === 'ipd')
            if (atv && policy && policy.name === POLICY_BUY_MORE_SAVE) {
                checkout.scan(atv)
                checkout.scan(atv)
                checkout.scan(atv)
                expect(checkout.total()).toBeCloseTo(atv.price * 2)
            }
        })
        test("checkout should not apply policy POLICY_BUY_MORE_SAVE if not meet with it", () => {
            const checkout = new Checkout(policyList);
            const atv = productList.find(i => i.sku === 'atv')
            const policy = policyList.find(i => i.sku === 'ipd')
             
            if (atv && policy && policy.name === POLICY_BUY_MORE_SAVE) {
                checkout.scan(atv)
                checkout.scan(atv)
                expect(checkout.total()).toBeCloseTo(atv.price * 2)
            }
        })
        test("checkout should apply policy POLICY_BUY_MORE_SAVE if mixed with other items", () => {
            const checkout = new Checkout(policyList);
            const atv = productList.find(i => i.sku === 'atv')
            const other = productList.find(i => i.sku === 'other')
            const policy = policyList.find(i => i.sku === 'ipd')
             
            if (atv && other && policy && policy.name === POLICY_BUY_MORE_SAVE) {
                checkout.scan(atv)
                checkout.scan(atv)
                checkout.scan(atv)
                checkout.scan(other)
                expect(checkout.total()).toBeCloseTo(atv.price * 2 + other.price)
            }
        })
     })
    
     describe('Validate policy POLICY_BULK_FIXED_PRICE', () => { 
        test("checkout should apply policy POLICY_BULK_FIXED_PRICE if it meet with it", () => {
            const checkout = new Checkout(policyList);
            const ipd = productList.find(i => i.sku === 'ipd')
            const policy = policyList.find(i => i.sku === 'ipd')
    
            if (ipd && policy && policy.name === POLICY_BULK_FIXED_PRICE) {
                const fixedPrice = (<IParamsBulkFixedPrice>policy.policyParams).fixedPrice;
                if (fixedPrice) {
                    checkout.scan(ipd)
                    checkout.scan(ipd)
                    checkout.scan(ipd)
                    checkout.scan(ipd)
                    checkout.scan(ipd)
                    expect(checkout.total()).toBeCloseTo(fixedPrice * 5)
                }
            }
        })
        test("checkout should not apply policy POLICY_BULK_FIXED_PRICE if it not meet with it", () => {
            const checkout = new Checkout(policyList);
            const ipd = productList.find(i => i.sku === 'ipd')
            const policy = policyList.find(i => i.sku === 'ipd')
    
            if (ipd && policy && policy.name === POLICY_BULK_FIXED_PRICE) {
                    checkout.scan(ipd)
                    checkout.scan(ipd)
                    checkout.scan(ipd)
                    expect(checkout.total()).toBeCloseTo(ipd.price * 3)
                }
        })
        test("checkout should apply policy POLICY_BULK_FIXED_PRICE if mixed with other items", () => {
            const checkout = new Checkout(policyList);
            const ipd = productList.find(i => i.sku === 'ipd')
            const other = productList.find(i => i.sku === 'other')
            const policy = policyList.find(i => i.sku === 'ipd')
             
            if (ipd && other && policy && policy.name === POLICY_BULK_FIXED_PRICE) {
                const fixedPrice = (<IParamsBulkFixedPrice>policy.policyParams).fixedPrice;
                checkout.scan(ipd)
                checkout.scan(ipd)
                checkout.scan(ipd)
                checkout.scan(ipd)
                checkout.scan(ipd)
                checkout.scan(other)
                expect(checkout.total()).toBeCloseTo(fixedPrice * 5 + other.price)
            }
        })
      })
   
    describe('Validate policy POLICY_BULK_DISCOUNT', () => { 
        test("checkout should apply policy POLICY_BULK_DISCOUNT if it meet with it", () => {
            const checkout = new Checkout(policyList);
            const ipd = productList.find(i => i.sku === 'ipd')
            const policy = policyList.find(i => i.sku === 'ipd')
    
            if (ipd && policy && policy.name === POLICY_BULK_DISCOUNT) {
                    checkout.scan(ipd)
                    checkout.scan(ipd)
                    checkout.scan(ipd)
                    expect(checkout.total()).toBeCloseTo(ipd.price * 3)
                }
        })
        test("checkout should not apply policy POLICY_BULK_DISCOUNT if it not meet with it", () => {
            const checkout = new Checkout(policyList);
            const ipd = productList.find(i => i.sku === 'ipd')
            const policy = policyList.find(i => i.sku === 'ipd')
    
            if (ipd && policy && policy.name === POLICY_BULK_DISCOUNT) {
                const discount = (<IParamsBulkDiscount>policy.policyParams).discount;
                    checkout.scan(ipd)
                    checkout.scan(ipd)
                    checkout.scan(ipd)
                    checkout.scan(ipd)
                    checkout.scan(ipd)
                    checkout.scan(ipd)
                    expect(checkout.total()).toBeCloseTo(ipd.price * discount * 6)
                }
        })
        test("checkout should apply policy POLICY_BULK_DISCOUNT if mixed with other items", () => {
            const checkout = new Checkout(policyList);
            const ipd = productList.find(i => i.sku === 'ipd')
            const other = productList.find(i => i.sku === 'other')
            const policy = policyList.find(i => i.sku === 'ipd')
    
            if (ipd && other && policy && policy.name === POLICY_BULK_DISCOUNT) {
                    checkout.scan(ipd)
                    checkout.scan(ipd)
                    checkout.scan(ipd)
                    checkout.scan(other)
                    expect(checkout.total()).toBeCloseTo(ipd.price * 2 + other.price)
                }
        })
     })
     describe('Validate special situation', () => { 
        test("checkout should work if no policy specified for this product", () => {
            const checkout = new Checkout([]);
            const other = productList.find(i => i.sku === 'other')
            const policy = policyList.find(i => i.sku === 'other')
    
            if (other && !policy) {
                    checkout.scan(other)
                    checkout.scan(other)
                    checkout.scan(other)
                    expect(checkout.total()).toBeCloseTo(other.price * 3)
                }
        })
        test("checkout should work if policy list is empty", () => {
            const checkout = new Checkout([]);
            expect(checkout).toBeDefined();
        });
      })

})
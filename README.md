# Project: checkout_demo
A typescript project to simulate a checkout scan system.

# Design
## Components 
There are mainly two components in this project: Checkout and Policy handlers.  
- Checkout is a Class and it provides two functions: total() and scan(). 
- Function total() will return the final items amount. 
- Function scan() will scan each item and apply the policy handler.    
- Policy handlers could handler different kinds of pricing policies, it will calulate the total amount and return it to scan().  
## Files Structure
```
- src/
  - index.ts            // Create Checkout class, call scan() function
  - checkout.ts         // Checkout class
  - policyHandlers.ts   // Policy handlers
  - interfaces.ts/      // All interfaces defined
  - policies.ts/        // All policies pre-defined
  - products.ts/        // Products pre-defined with policy

- test/
  - checkout.test.ts    // Unit test for Checkout
  - data.ts             // Test data

Other files:
Other files under root directory are docs and necessary config files, which are used to support running the system. 
```
## Pre-defined Input
There should be two lists existing as pre-defined input: policy list and product list, that container poliy and product information, like below: 
  - Policy list: 
```
    { sku: "atv", name: "POLICY_BUY_MORE_SAVE", policyParams: { minNumber: 3, savedNumber: 1 } },
    { sku: "ipd", name: "POLICY_BULK_FIXED_PRICE", policyParams: { minNumber: 4, fixedPrice: 499.99 } },
```
  - Product list: 
```
    { sku: "ipd", name: "Super iPad", price: 549.99 },
    { sku: "atv", name: "Apple TV", price: 109.5 },
    { sku: "vga", name: "VGA Adapter", price: 30.0 },
    { sku: "other", name: "Other item", price: 100.0 }
```

## Scan working flow
Take a example to explain the working flow. 
  - There are two property 'total' and 'items' defined in Class Checkout. 
    Property total will save total amount of saved items.  
    Property items will save all scaned items. 
    Function scan() could access these properties. 
  - When scan( { sku: "ipd", name: "Super iPad", price: 549.99 }) is invoked, it will get the matched policy from policy list. If there is policy for that product, it will execute the related policy handler 
    and pass the added items state and the item to be added information to handler. Otherwise, it will not apply the policy.
  - When Policy handler is called, it will update the property 'total' and 'items' according to the logic inside handler.
  - In above way, scan() could always get the latest total amount and update the property 'total accordingly.

- Add/update policy
   - When retail manger wants to add new policy, he only need to add the new policy handler, don't need to change other existing code(like checkout part). 
   - Retail manger could easily re-use current policy and adjust the parameters, and don't need to update code. 
   - This could make it is flexiable and extendable to add or update policy.
   For example:   
   { sku: "atv", name: "POLICY_BUY_MORE_SAVE", policyParams: { minNumber: 3, savedNumber: 1 } }
   If he wants to change the policy from 'buy 3 take 1 free' to 'buy 6 take 2 free', he could just update the policy list for that sku. 

## Env setup and start running
- Node version: v18 (in development and test environment, node version is v18.4.0)
- Run `npm install` to install dependencies.
- Run `npm run build` to build typescript. 
- Run `npm run start` to scan items.

## Test 

- Run `npm run test` for unit testing.
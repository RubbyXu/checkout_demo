const POLICY_BUY_MORE_SAVE = 'POLICY_BUY_MORE_SAVE'
const POLICY_BULK_FIXED_PRICE = 'POLICY_BULK_FIXED_PRICE'
const POLICY_BULK_DISCOUNT = 'POLICY_BULK_DISCOUNT'

const policyList = [
  {  sku: "atv", name: "POLICY_BUY_MORE_SAVE", policyParams: {minNumber: 3, savedNumber: 1}},
  {  sku: "ipd", name: "POLICY_BULK_FIXED_PRICE", policyParams: {minNumber: 4, fixedPrice: 499.99}},
  {  sku: "vga", name: "POLICY_BULK_DISCOUNT", policyParams: {minNumber: 10, discount: 0.8}},
]

export { policyList, POLICY_BUY_MORE_SAVE,  POLICY_BULK_FIXED_PRICE, POLICY_BULK_DISCOUNT}
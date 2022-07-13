// import type { Product, Item } from '../clients/search/types/ProductSearchResult'

// export type EnhancedSku = Item & { isVariantOf: Product }

export const enhanceSku = (item: any, product: any): any => ({
  ...item,
  isVariantOf: product,
})

import { commerce } from './services/vtex/commerce';
import { IntelligentSearch } from './services/search';
import {enhanceSku} from "./utils/enhanceSku" 

export const resolvers = {
  Query: {
    product: async (_: unknown, { slug, locale }:any, context:any) => {
      console.log("context", context)
      const data = await commerce({
        account: 'pivotree',
        environment: 'vtexcommercestable',
      }).catalog.portal.pagetype(slug);

      const {
        products: [product],
      } = await IntelligentSearch({
        account: 'pivotree',
        environment: 'vtexcommercestable',
        hideUnavailableItems: false,
        salesChannel: '1',
        regionId: null,
        locale: locale,
      }).products({
        page: 0,
        count: 1,
        query: `product:${data.id}`,
      });

      return product;
    },
    allProducts: async (
      _: unknown,
      { first, after: maybeAfter, locale }: any,
    ) => {
  
      const after = maybeAfter ? Number(maybeAfter) : 0

      const products  = await IntelligentSearch({
        account: 'pivotree',
        environment: 'vtexcommercestable',
        hideUnavailableItems: false,
        salesChannel: '1',
        regionId: null,
        locale: locale,
      }).products({
        page: Math.ceil(after / first),
        count: first,
      });

      console.log(products)
  
      const skus = products.products
        .map((product) => product.items.map((sku) => enhanceSku(sku, product)))
        .flat()
        .filter((sku) => sku.sellers.length > 0)
  
      return {
        pageInfo: {
          hasNextPage: products.pagination.after.length > 0,
          hasPreviousPage: products.pagination.before.length > 0,
          startCursor: '0',
          endCursor: products.recordsFiltered.toString(),
          totalCount: products.recordsFiltered,
        },
        // after + index is bigger than after+first itself because of the array flat() above
        edges: skus.map((sku, index) => ({
          node: sku,
          cursor: (after + index).toString(),
        })),
      }
    },
  },
};



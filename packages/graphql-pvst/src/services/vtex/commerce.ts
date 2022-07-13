
import { fetchAPI } from '../fetch';


// type ValueOf<T> = T extends Record<string, infer K> ? K : never;

export const commerce = ({ account, environment }) => {
  const base = `https://${account}.${environment}.com.br`;

  return {
    catalog: {
      portal: {
        pagetype: (slug: string): Promise<any> =>
          fetchAPI(`${base}/api/catalog_system/pub/portal/pagetype/${slug}`),
      },
    },
  };
};

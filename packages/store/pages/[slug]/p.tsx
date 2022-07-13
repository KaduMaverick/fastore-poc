import { gql } from 'apollo-server-micro'
import { GetStaticPaths } from 'next'

import { client } from '../api/graphql'


const Product = ({product}:any) => {  
  console.log(product)

  return <p>Product: {product?.productName}</p>
}
const query = gql`
    query($slug: String!, $locale: String!){
      product(slug: $slug, locale: $locale) {
    productName
  }
}
  `

export async function getStaticProps(args:any) {
  
  const {slug} = args.params

  const {data:{
    product
  }} = await client.query({
    query: query, 
    variables: { slug: slug + "/p" ?? '', locale: args.locale }
})
  
  return {
    props: {
      product: product
    },
    revalidate: 60
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export default Product
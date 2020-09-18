export const PRODUCT_QUERY = `{
  product {
    ...productFields
    related_products {
      ...related_productsFields
      product1 {
        product_image
        product_name
        sub_title
      }
    }
  }
}`;

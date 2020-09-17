// The compare at price of the variant.
// This can be used to mark a variant as on sale, when compareAtPriceV2 is higher than priceV2.
// https://help.shopify.com/en/api/storefront-api/reference/object/productvariant
export const isOnSale = variant => {
  return (
    variant &&
    !!(Number.parseInt(variant.compareAtPrice) > 0) &&
    !!(Number.parseInt(variant.compareAtPrice) > Number.parseInt(variant.price))
  );
};

export const saveDollarsOff = variant => {
  return variant.compareAtPrice - variant.price;
};

export const savePercentageOff = variant => {
  let decrease = variant.compareAtPrice - variant.price;
  let percent = (decrease / variant.price) * 100;
  return Math.ceil(percent);
};

// TODO: Implement isPopular Logic
export const isPopular = () => {
  return Math.random() >= 0.5;
};

// TODO: Implement hasFastDispatch Logic
export const hasFastDispatch = () => {
  return Math.random() >= 0.5;
};

// TODO: Implement hasFreeShipping Logic
// use variant as input argument
export const hasFreeShipping = () => {
  return Math.random() >= 0.5;
};

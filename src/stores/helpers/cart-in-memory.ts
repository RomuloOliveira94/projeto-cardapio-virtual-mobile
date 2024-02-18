import { ProductProps } from "@/utils/data/products";
import { ProductCartProps } from "../cart-store";

export function add(product: ProductCartProps[], newProduct: ProductProps) {
  const productIndex = product.findIndex((item) => item.id === newProduct.id);
  const newProductList = [...product];

  if (productIndex === -1) {
    newProductList.push({ ...newProduct, quantity: 1 });
  } else {
    newProductList[productIndex].quantity += 1;
  }

  return newProductList;
}

export function remove(products: ProductCartProps[], productRemoveId: string) {
  const updatedProducts = products.map((product) =>
    product.id === productRemoveId
      ? {
          ...product,
          quantity: product.quantity > 1 ? product.quantity - 1 : 0,
        }
      : product
  );
  return updatedProducts.filter((product) => product.quantity > 0);
}

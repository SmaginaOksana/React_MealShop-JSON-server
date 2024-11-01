import Services from "../services/json_server";

export function addItemBasket(item, upload, basketProducts, urlImg) {
  const findItemInBasket = basketProducts.find((elem) => {
    return elem.id === item.id;
  });

  if (!findItemInBasket) {
    const newItem = { ...item, urlImg };
    Services.setBasketProduct(newItem).then(() => {
      upload.setDataFlag((prev) => !prev);
    });
    return;
  }

  findItemInBasket.count += 1;
  Services.editBasketProduct(findItemInBasket, findItemInBasket.id).then(() => {
    upload.setDataFlag((prev) => !prev);
    return;
  });
}

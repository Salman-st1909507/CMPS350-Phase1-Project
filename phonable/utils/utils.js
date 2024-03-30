import * as itemsRepo from "../repo/items-repo.js";

const jsonData = [
  {
    name: "iPhone 13",
    price: 999,
    quantity: 20,
    picture:
      "https://www.apple.com/newsroom/images/product/iphone/standard/Apple_iphone13_hero_09142021_inline.jpg.large.jpg",
    details:
      "6.1-inch Super Retina XDR display, A15 Bionic chip, Dual-camera system",
    itemId: "sihhyyhtqn7en2lt",
    sellerId: "x2shaetx5ulm4gnk",
    category: "phone",
  },
  {
    name: "Samsung Galaxy S22 Ultra",
    price: 1199,
    quantity: 15,
    picture:
      "https://rptech.qa/cdn/shop/products/SamsungS22ultra_01_1200x1200.png?v=1664891993",
    details:
      "6.8-inch Dynamic AMOLED 2X display, Exynos 2200/Snapdragon 8 Gen 2, Quad-camera system",
    itemId: "wyhq2qdcjsf5malv",
    sellerId: "x2shaetx5ulm4gnk",
    category: "phone",
  },
  {
    name: "Google Pixel 6 Pro",
    price: 899,
    quantity: 10,
    picture:
      "https://cdn2.gsmarena.com/vv/pics/google/google-pixel-6-pro-1.jpg",
    details:
      "6.7-inch LTPO OLED display, Google Tensor chip, Dual-camera system",
    itemId: "z9xi8sivb6v3qzak",
    sellerId: "x2shaetx5ulm4gnk",
    category: "phone",
  },
  {
    name: "OnePlus 9 Pro",
    price: 899,
    quantity: 12,
    picture:
      "https://static.alaneesqatar.qa/2022/02/OnePlus-9-Pro-5G-12GB-256GB-China-Oasis-1.png?tr=w-395,q-80",
    details:
      "6.7-inch Fluid AMOLED display, Snapdragon 888, Triple-camera system",
    itemId: "drt91xiwo5ln3tpg",
    sellerId: "x2shaetx5ulm4gnk",
    category: "phone",
  },
  {
    name: "Xiaomi Mi 12",
    price: 799,
    quantity: 18,
    picture:
      "https://static.alaneesqatar.qa/2022/04/xiaomi-12-5g-256-grey-1.png?tr=w-395,q-80",
    details: "6.7-inch AMOLED display, Snapdragon 8 Gen 1, Quad-camera system",
    itemId: "0i16uc0idr4snora",
    sellerId: "x2shaetx5ulm4gnk",
    category: "phone",
  },
  {
    name: "Sony Xperia 1 III",
    price: 1099,
    quantity: 8,
    picture: "https://fdn2.gsmarena.com/vv/pics/sony/sony-xperia-1-iii-03.jpg",
    details:
      "6.5-inch 4K HDR OLED display, Snapdragon 888, Triple-camera system",
    itemId: "92nx8zostmjqilnq",
    sellerId: "8sudif9ssjm8ghz1",
    category: "phone",
  },
  {
    name: "Huawei P50 Pro",
    price: 899,
    quantity: 10,
    picture: "https://static.alaneesqatar.qa/2022/01/huawei-p50-gold-1.png",
    details: "6.6-inch OLED display, Kirin 9000, Quad-camera system",
    itemId: "mxcg46mkwkt8mss3",
    sellerId: "8sudif9ssjm8ghz1",
    category: "phone",
  },
  {
    name: "Realme GT 2 Pro",
    price: 599,
    quantity: 15,
    picture:
      "https://rukminim2.flixcart.com/image/850/1000/l3rmzrk0/mobile/c/c/o/-original-imagetmegwtng3xg.jpeg?q=90&crop=false",
    details:
      "6.7-inch Super AMOLED display, Snapdragon 888, Triple-camera system",
    itemId: "mzfdhc8lo6ghed8t",
    sellerId: "8sudif9ssjm8ghz1",
    category: "phone",
  },
  {
    name: "Asus ROG Phone 5s",
    price: 899,
    quantity: 10,
    picture:
      "https://static.alaneesqatar.qa/2022/02/ASUS-ROG-PHONE-5S-12-256GB-BLACK-1.png?tr=w-395,q-80",
    details: "6.78-inch AMOLED display, Snapdragon 888+, Triple-camera system",
    itemId: "q0wbolfp2c2katx9",
    sellerId: "8sudif9ssjm8ghz1",
    category: "phone",
  },
  {
    name: "Samsung Galaxy Z Fold 3",
    price: 1799,
    quantity: 10,
    picture:
      "https://cdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-z-fold3-5g-r1.jpg",
    details:
      "7.6-inch Dynamic AMOLED 2X display, Snapdragon 888, Triple-camera system",
    itemId: "g0s9s7uyjnqnhb1o",
    sellerId: "8sudif9ssjm8ghz1",
    category: "phone",
  },
  {
    name: "Apple iPhone 14 Pro",
    price: 1199,
    quantity: 15,
    picture:
      "https://static.alaneesqatar.qa/2022/09/Apple-iPhone-14-Pro-6GB-128GB-Silver-1.png?tr=w-395,q-80",
    details:
      "6.1-inch Super Retina XDR display, A16 Bionic chip, Triple-camera system",
    itemId: "kzgwszh39x1hi7hh",
    sellerId: "m2sheetx5ulm4gnk",
    category: "phone",
  },
  {
    name: "Google Pixel 7 Pro",
    price: 999,
    quantity: 20,
    picture: "https://static.alaneesqatar.qa/2022/10/ob-1.png?tr=w-395,q-80",
    details:
      "6.7-inch LTPO OLED display, Snapdragon 8 Gen 2, Triple-camera system",
    itemId: "0lgpdl2dj73cljye",
    sellerId: "m2sheetx5ulm4gnk",
    category: "phone",
  },
  {
    name: "Xiaomi Redmi Note 11 Pro",
    price: 399,
    quantity: 25,
    picture:
      "https://static.alaneesqatar.qa/2022/06/redmi-note-11-pro-4g-white-1.png?tr=w-395,q-80",
    details:
      "6.67-inch Super AMOLED display, Snapdragon 695, Quad-camera system",
    itemId: "gt480uzk47agmnk9",
    sellerId: "m2sheetx5ulm4gnk",
    category: "phone",
  },
  {
    name: "OnePlus 10 Pro",
    price: 1099,
    quantity: 12,
    picture:
      "https://static.alaneesqatar.qa/2023/01/ONEPLUS-10-PRO-5G-12-256GB-EMERALD-FOREST-1.png",
    details:
      "6.7-inch Fluid AMOLED display, Snapdragon 8 Gen 2, Quad-camera system",
    itemId: "c9etmma9946hg7ir",
    sellerId: "m2sheetx5ulm4gnk",
    category: "phone",
  },
  {
    name: "Sony Xperia 5 IV",
    price: 999,
    quantity: 15,
    picture:
      "https://sony.scene7.com/is/image/sonyglobalsolutions/PDX-224_Primary-Image_Green_hyperc?$S7Product$&fmt=png-alpha",
    details: "6.1-inch OLED display, Snapdragon 8 Gen 1, Triple-camera system",
    itemId: "igtnxp6ou3z2w31s",
    sellerId: "m2sheetx5ulm4gnk",
    category: "phone",
  },
  {
    name: "Huawei Mate 50 Pro",
    price: 1299,
    quantity: 10,
    picture:
      "https://img01.huaweifile.com/sg/ms/ph/pms/uomcdn/PH_HW_B2B2C/pms/202211/gbom/6941487280452/428_428_B1092F4F334249A2B8C3CFA68032F2D7mp.jpg",
    details: "6.8-inch OLED display, Kirin 9000E, Quad-camera system",
    itemId: "63apvznju2j6imdt",
    sellerId: "tzmq0cy59pmrm844",
    category: "phone",
  },
  {
    name: "Realme GT Neo 3",
    price: 499,
    quantity: 20,
    picture:
      "https://rukminim2.flixcart.com/image/850/1000/l3rmzrk0/mobile/p/n/u/-original-imagetmezhss8jzf.jpeg?q=20&crop=false",
    details:
      "6.7-inch Super AMOLED display, Dimensity 920, Triple-camera system",
    itemId: "bw4tyiyoom7c2y9j",
    sellerId: "tzmq0cy59pmrm844",
    category: "phone",
  },
  {
    name: "Motorola Moto G Stylus (2023)",
    price: 349,
    quantity: 18,
    picture:
      "https://s7d1.scene7.com/is/image/dish/Moto_G_Stylus_5G_2023_BLACK_BEAUTY_PDP_FRONT_BACK?$ProductBase$&fmt=webp",
    details: "6.8-inch IPS LCD display, Snapdragon 680, Quad-camera system",
    itemId: "82zyoe3xq680eul4",
    sellerId: "tzmq0cy59pmrm844",
    category: "phone",
  },
  {
    name: "Lenovo Legion Phone 3",
    price: 999,
    quantity: 10,
    picture:
      "https://fdn.gsmarena.com/imgroot/news/21/08/lenovo-legion-3-pro-snapdragon-898/inline/-737/gsmarena_001.jpg",
    details:
      "6.92-inch AMOLED display, Snapdragon 8 Gen 1+, Dual-camera system",
    itemId: "bmhwjqxzniadxf8r",
    sellerId: "tzmq0cy59pmrm844",
    category: "phone",
  },
  {
    name: "Nokia G50",
    price: 199,
    quantity: 30,
    picture:
      "https://static.alaneesqatar.qa/2022/01/nokia-g50-blue.png?tr=w-395,q-80",
    details: "6.82-inch IPS LCD display, Snapdragon 480, Triple-camera system",
    itemId: "e4y9l8k7xak132xv",
    sellerId: "tzmq0cy59pmrm844",
    category: "phone",
  },
];

export const usersData = [
  {
    userId: "9pjmh0p1gjn6qmwn",
    username: "johndoe",
    type: "customer",
    name: "John",
    surname: "Doe",
    shippingAddress: "123 Main Street, Cityville",
    moneyBalance: 1000.0,
    password: "John123",
  },
  {
    userId: "8sudif9ssjm8ghz1",
    username: "janesmith",
    type: "customer",
    name: "Jane",
    surname: "Smith",
    shippingAddress: "456 Elm Street, Townsville",
    moneyBalance: 1500.5,
    password: "Jane123",
  },
  {
    userId: "Aadsdas78ass",
    username: "michaeljohnson",
    type: "customer",
    name: "Michael",
    surname: "Johnson",
    shippingAddress: "789 Oak Avenue, Villagetown",
    moneyBalance: 800.75,
    password: "Michael123",
  },
  {
    userId: "m2sheetx5ulm4gnk",
    username: "emilybrown",
    type: "customer",
    name: "Emily",
    surname: "Brown",
    shippingAddress: "101 Maple Drive, Hamletville",
    moneyBalance: 2000.0,
    password: "Emily123",
  },
  {
    userId: "tzmq0cy59pmrm844",
    username: "davidwilson",
    type: "customer",
    name: "David",
    surname: "Wilson",
    shippingAddress: "202 Pine Road, Suburbia",
    moneyBalance: 12000.25,
    password: "David123",
  },
  {
    userId: "m2sheetx5ulm4gnk",
    username: "john_the_seller",
    companyName: "ABC Company",
    type: "seller",
    name: "Seller John",
    surname: "Doe",
    password: "SellerJohn123",
  },
  {
    userId: "x2shaetx5ulm4gnk",
    username: "abdullah",
    type: "Seller",
    name: "Abdullah",
    surname: "Al-Mansour",
    companyName: "XYZ Company",
    password: "Abdullah123",
  },
];

export function initLocalStorage() {
  itemsRepo.clearItems();
  jsonData.forEach((item) => itemsRepo.addItem(item));
}

export function generateRandomId(length) {
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  let randomId = "";
  for (let i = 0; i < length; i++) {
    randomId += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return randomId;
}

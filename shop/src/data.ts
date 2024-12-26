import type { SwiperOptions } from "swiper/types";

export const BestSectionProducts = [
  {
    _id: "6748adcb207b8671defcbf7e",
    image: "uploads/mens/Frame-26.png",
    title: "Nike Men's Product 29",
    description: "Description for Nike Men's product 29",
    price: 106,
    category: "clothing",
    gender: "men's",
    ageGroup: "adults",
  },
  {
    _id: "6748adcb207b8671defcbf7f",
    image: "uploads/mens/Frame-17.png",
    title: "Nike Men's Product 30",
    description: "Description for Nike Men's product 30",
    price: 108,
    category: "footwear",
    gender: "men's",
    ageGroup: "adults",
  },
  {
    _id: "6748adcb207b8671defcbf80",
    image: "uploads/womens/Frame-49.png",
    title: "Nike Women's Product 40",
    description: "Description for Nike Women's product 40",
    price: 177,
    category: "footwear",
    gender: "women's",
    ageGroup: "adults",
  },
  {
    _id: "6748adcb207b8671defcbf81",
    image: "uploads/womens/Frame-45.png",
    title: "Nike Women's Product 42",
    description: "Description for Nike Women's product 42",
    price: 183,
    category: "footwear",
    gender: "women's",
    ageGroup: "adults",
  },
  {
    _id: "6748adcb207b8671defcbf82",
    image: "uploads/womens/Frame-34.png",
    title: "Nike Women's Product 46",
    description: "Description for Nike Women's product 46",
    price: 195,
    category: "footwear",
    gender: "women's",
    ageGroup: "adults",
  },
  {
    _id: "6748adcb207b8671defcbf83",
    image: "uploads/boys/Frame-69.png",
    title: "Nike Boys' Product 52",
    description: "Description for Nike Boys' product 52",
    price: 142,
    category: "footwear",
    gender: "boys",
    ageGroup: "children",
  },
  {
    _id: "6748adcb207b8671defcbf84",
    image: "uploads/boys/Frame-56.png",
    title: "Nike Boys' Product 54",
    description: "Description for Nike Boys' product 54",
    price: 146,
    category: "footwear",
    gender: "boys",
    ageGroup: "children",
  },
];

export const GearUpSectionProductsMen = [
  {
    _id: "6748adcb207b8671defcbf5f",
    image: "uploads/mens/Frame-3.png",
    title: "Nike Men's Product 3",
    description: "Description for Nike Men's product 3",
    price: 54,
    category: "clothing",
    gender: "men's",
    ageGroup: "adults",
  },
  {
    _id: "6748adcb207b8671defcbf60",
    image: "uploads/mens/Frame-25.png",
    title: "Nike Men's Product 6",
    description: "Description for Nike Men's product 6",
    price: 60,
    category: "footwear",
    gender: "men's",
    ageGroup: "adults",
  },
  {
    _id: "6748adcb207b8671defcbf61",
    image: "uploads/mens/Frame-29.png",
    title: "Nike Men's Product 10",
    description: "Description for Nike Men's product 10",
    price: 68,
    category: "footwear",
    gender: "men's",
    ageGroup: "adults",
  },
];

export const GearUpSectionProductsWomen = [
  {
    _id: "6748adcb207b8671defcbf68",
    image: "uploads/womens/Frame-49.png",
    title: "Nike Women's Product 39",
    description: "Description for Nike Women's product 39",
    price: 174,
    category: "clothing",
    gender: "women's",
    ageGroup: "adults",
  },
  {
    _id: "6748adcb207b8671defcbf69",
    image: "uploads/womens/Frame-36.png",
    title: "Nike Women's Product 48",
    description: "Description for Nike Women's product 48",
    price: 201,
    category: "footwear",
    gender: "women's",
    ageGroup: "adults",
  },
  {
    _id: "6748adcb207b8671defcbf6a",
    image: "uploads/womens/Frame-36.png",
    title: "Nike Women's Product 51",
    description: "Description for Nike Women's product 51",
    price: 210,
    category: "clothing",
    gender: "women's",
    ageGroup: "adults",
  },
  {
    _id: "6748adcb207b8671defcbf6b",
    image: "uploads/boys/Frame-53.png",
    title: "Nike Boys' Product 61",
    description: "Description for Nike Boys' product 61",
    price: 160,
    category: "clothing",
    gender: "boys",
    ageGroup: "children",
  },
];

export const regularBreakPoints: SwiperOptions["breakpoints"] = {
  768: {
    slidesPerView: 2,
    spaceBetween: 30,
  },
  992: {
    slidesPerView: 3,
    spaceBetween: 20,
  },
  1440: {
    slidesPerView: 4,
    spaceBetween: 50,
  },
};

export const smallBreakPoints: SwiperOptions["breakpoints"] = {
  768: {
    slidesPerView: 1,
    spaceBetween: 0,
  },
  1200: {
    slidesPerView: 2,
    spaceBetween: 50,
  },
};

import { StarRating } from "./star-rating";

const rating = new StarRating('#rating', {starcount: 5, readonly: true, value: 2.4});

const rating2 = new StarRating('#rating2', {starcount: 5, readonly: false, value: 3});
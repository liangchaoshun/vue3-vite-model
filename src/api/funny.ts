import Service from "../http";
const service = new Service();
const DOG_IMAGE = "https://dog.ceo/api/breeds/image/random";
export const fetchDogImg = () => service.getData(DOG_IMAGE);

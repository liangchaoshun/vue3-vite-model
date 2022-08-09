import Service from "../http";
const service = new Service();
const LOGIN = "/netcloud/login/cellphone";
const BANNER = '/netcloud/banner'
export const login = () => service.getData(LOGIN, {withCredentials: true});
export const banner = () => service.getData(BANNER, {withCredentials: true});

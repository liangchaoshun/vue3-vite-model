import createAxios from './axios_custom'
import type { LocalResponseType } from '@/@types/shared'
export default class Service {
  private axios: any

  constructor() {
    this.axios = createAxios()
  }

  /**
   *
   * @returns axios 实例
   * @note 此方法用来测试 axios 是否为单例
   * @note 在某个地方创建两个 Service 类的实例，如
   * @example
   *  const service1 = new Service();
   *  const service1 = new Service();
   *  console.log(service1.getAxiosInst() === service2.getAxiosInst());
   */
  public getAxiosInst() {
    return this.axios
  }

  public getData(url: string, params?: any) {
    return new Promise<LocalResponseType>((resolve, reject) => {
      this.axios
        .get(url, params)
        .then((res: any) => {
          resolve(res)
        })
        .catch((err: any) => {
          reject(err.message)
        })
    })
  }

  public postData(url: string, params: any) {
    return new Promise<LocalResponseType>((resolve, reject) => {
      this.axios
        .post(url, params)
        .then((res: any) => {
          resolve(res)
        })
        .catch((err: any) => {
          reject(err.message)
        })
    })
  }

  public putData(url: string, params: any) {
    return new Promise<LocalResponseType>((resolve, reject) => {
      this.axios
        .put(url, params)
        .then((res: any) => {
          resolve(res)
        })
        .catch((err: any) => {
          reject(err.message)
        })
    })
  }

  public delData(url: string, params: any) {
    return new Promise<LocalResponseType>((resolve, reject) => {
      this.axios
        .delete(url, params)
        .then((res: any) => {
          resolve(res)
        })
        .catch((err: any) => {
          reject(err.message)
        })
    })
  }
}

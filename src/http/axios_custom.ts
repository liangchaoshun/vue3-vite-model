import { ElMessage, Message } from "element-plus";
import axios, { AxiosResponse, AxiosInstance } from "axios";

const TIMEOUT = 10000;
const baseURL = process.env.NODE_ENV === "production" ? "/cms/yjdp" : "";

class CustomAxios {
  private static instance: CustomAxios;
  private axiosInst: AxiosInstance;

  // 私有化构造函数，外部不能 new，只能内部 new
  private constructor() {
    // withCredentials: 带上 cookie。也可以在 interceptors.request 设置规则
    this.axiosInst = axios.create({
      baseURL,
      timeout: TIMEOUT,
    });
    this.setAxiosInterceptors();
  }

  // CustomAxios 单例模式
  public static getInstance() {
    if (!CustomAxios.instance) {
      CustomAxios.instance = new CustomAxios();
    }
    return CustomAxios.instance;
  }

  // 初始化拦截器
  private setAxiosInterceptors() {
    // 设置请求头
    this.axiosInst.defaults.headers.get["Content-Type"] =
      "application/x-www-form-urlencoded;charset=utf-8";
    this.axiosInst.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";

    // 请求拦截器
    /* this.axiosInst.interceptors.request.use(config => {
      // console.log('interceptors.request => ', config);
      const { url, withCredentials } = config;
      if (!url?.startsWith('/api/author') && !withCredentials) {
        config.withCredentials = true;
      }
      return config;
    }, error => {
      console.log('interceptors.request => ', error);
      return Promise.reject(error);
    }); */

    // 响应拦截器
    this.axiosInst.interceptors.response.use(
      // 请求成功
      (res: AxiosResponse) => {
        // LoadingInstance.close();
        if (res.status === 200) {
          return Promise.resolve(res.data);
        }
        return Promise.reject(res);
      },
      // 请求失败
      (error: any) => {
        const { response } = error;
        if (response) {
          // 请求已发出，但是不在2xx的范围
          this.errorHandle(response);
        }
        return Promise.reject(error);
      }
    );
  }

  // axios 实例
  public getAxiosInstance() {
    return this.axiosInst;
  }

  /**
   * http握手错误
   * @param res  响应回调,根据不同响应进行不同操作
   */
  private errorHandle(res: any) {
    // 状态码判断
    switch (res.status) {
      case 401:
        // console.error('401');
        if (!window.author401) {
          window.author401 = ElMessage({
            type: "error",
            message: "请重新登录",
            duration: 4000,
            onClose() {
              window.author401 = null;
              const {
                location: { origin },
              } = window;
              window.location.href = `${origin}/#/login`; // 登录界面
            },
          });
        }
        break;
      case 403: // 密码过期/此接口无权限
        console.error("无权限");
        break;
      case 500:
        console.error("服务器错误");
        break;
      default:
        console.error("服务器错误");
        break;
    }
  }
}

// 工厂模式
const createAxios = () => CustomAxios.getInstance().getAxiosInstance();

export default createAxios;

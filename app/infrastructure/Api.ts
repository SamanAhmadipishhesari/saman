import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { AppStorage } from "./Storage";

export class Api {
  private baseUrl: string | undefined;
  private api: AxiosInstance;

  constructor(baseUrl: string | undefined = process.env.NEXT_PUBLIC_BASE_URL) {
    this.api = axios.create({
      baseURL: baseUrl,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.setRequestInterceptor();
    this.setResponseInterceptor();

    this.baseUrl = baseUrl;
  }

  async GET<T>(url: string): Promise<T> {
    const response = await this.api.get<T>(this.baseUrl + url);
    return response.data;
  }

  async POST(url: string, data: any): Promise<AxiosResponse> {
    const response = await this.api.post(this.baseUrl + url, data);
    toast.success("Action was successful");
    return response.data;
  }

  async PUT(url: string, data: any): Promise<AxiosResponse> {
    const response = await this.api.put(this.baseUrl + url, data);
    toast.success("Action was successful");
    return response.data;
  }

  setRequestInterceptor() {
    this.api.interceptors.request.use(
      (config) => {
        // Check if the access token is present and not expired
        const accessToken = AppStorage.getItem("accessToken");
        if (accessToken) {
          // Add the access token to the Authorization header
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => {
        // Do something with the request error
        return Promise.reject(error);
      }
    );
  }

  setResponseInterceptor() {
    this.api.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        if (error.response) {
          const { status } = error.response;

          switch (status) {
            case 401:
              const refreshToken = AppStorage.getItem("refreshToken");
              if (refreshToken) {
                const newAccessToken = await this.refreshAccessToken(refreshToken);
                error.config.headers.Authorization = `Bearer ${newAccessToken.token}`;
                return axios(error.config);
              } else {
                this.redirectToLogin();
              }
              break;
            case 404:
              toast.error(error.message);
              break;
            case 500:
              toast.error(error.message);
              break;
            default:
              toast.error(error.message);
              break;
          }
        }
        return Promise.reject(error);
      }
    );
  }

  async refreshAccessToken(refreshToken: string) {
    let data : any = {
      "accessToken": window.localStorage.getItem("token"),
      "refreshToken": refreshToken
    };
    let request : RequestInit = {
       method: "POST",
       body: data
    }

    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}refresh`, request)
    .then(async (response) => {
      const data = await response.json();
      if (data?.data) {
        AppStorage.setItem("token", data?.data?.accessToken);
        AppStorage.setItem("refreshToken", data?.data?.refreshToken);
      }
    })
    .catch((error) => {
      if(error.statusCode == 401)
        
    })
    .finally(() => {
      isRefreshing = false;
    });

    

    // Implement your logic to refresh the access token
    // Make a request to your refresh token endpoint and return the new access token
    // ...
    // For example:
    // const response = await axios.post('/refresh-token', { refresh_token: refreshToken });
    // return response.data.access_token;
  }

  // Function to redirect to the login page
  redirectToLogin() {
    alert("Redirect to login raised");
    // Implement your logic to redirect to the login page
    // ...
  }
}

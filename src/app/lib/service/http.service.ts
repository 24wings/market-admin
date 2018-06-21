import { Injectable } from "@angular/core";

import { NzMessageService } from "ng-zorro-antd";
import {
  Http,
  RequestOptions,
  RequestOptionsArgs,
  Headers
} from "@angular/http";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FindValueSubscriber } from "rxjs/operators/find";

@Injectable()
export class MyHttpService {
  isMock: boolean = false;
  isDev: boolean = true;
  get ip() {
    return this.isDev ? this.localIp : this.serverIp;
  }
  localIp = "http://104.224.150.203";
  serverIp = "http://47.100.23.203";
  Get(url: string, options?: RequestOptionsArgs) {
    console.log(url);

    // url =
    //   url.startsWith("http") || url.startsWith("/assets")     ? url
    //     : `${this.ip}${url}`;
    if (this.isMock) {
      return this.mockGet(url);
    }

    return this.http
      .get(`${this.ip}${url}`, options)
      .toPromise()
      .then(rtn => {
        let result = rtn.json() as any;;
        if (rtn.status > 400 && rtn.status < 500) {
          result = { ok: false, data: '资源访问错误:' + rtn.json().message, status: rtn.status }
        } else if (rtn.status > 500) {
          result = { ok: false, data: '服务器内部错误:' + rtn.json().message, status: rtn.status }
        }
        if (!result.ok) {
          return this.createMessage("error", result.data) && false;
        }
        return result.data;

      }
      );
  }
  Post(url: string, body: any, options?: RequestOptionsArgs): Promise<any> {
    // console.log(url);
    // url = url.startsWith("http") ? url : `${this.ip}${url}`;
    if (this.isMock) {
      return this.mockGet(url);
    }

    // options = options ? options : {};
    if (!options) options = { headers: new Headers() };



    // options.headers.set("content-type", "application/json");
    console.log(options);

    // options.withCredentials = true;
    return this.http
      .post(`${this.ip}${url}`, body, options)
      .toPromise()
      .then(rtn => {
        let result = rtn.json() as any;;
        if (rtn.status > 400 && rtn.status <= 500) {
          return result = { ok: false, data: '资源访问错误:' + rtn.json().message, status: rtn.status }
        } else if (rtn.status > 500) {
          return result = { ok: false, data: '服务器内部错误:' + rtn.json().message, status: rtn.status }
        }
        if (!result.ok) {
          return this.createMessage("error", result.msg) && false;
        }
        return result.data;
      });
  }

  Delete(url: string, options?: RequestOptionsArgs) {
    url = url.startsWith("http") ? url : `${this.ip}${url}`;
    options = options ? options : {};

    // options.withCredentials = true;
    return this.http
      .delete(`${this.ip}${url}`)
      .toPromise()
      .then(rtn => {
        let result = rtn as any;
        return result.ok
          ? result.data
          : this.createMessage("error", result.data);
      });
  }

  Put(url: string, body, options?: RequestOptionsArgs) {
    url = url.startsWith("http") ? url : `${this.ip}${url}`;
    options = options ? options : {};
    // options.withCredentials = true;
    return this.http
      .put(`${this.ip}${url}`, body)
      .toPromise()
      .then(rtn => {
        let result = rtn as any;
        return result.ok
          ? result.data
          : this.createMessage("error", result.data);
      });
  }

  localGet(url: string) {
    return this.http.get(url).toPromise();
  }
  localGetJSON(url: string) {
    return this.http
      .get(url)
      .toPromise()
      .then(rtn => rtn.json());
  }
  mockGet(url: string) {
    return this.http
      .get("/assets/mock" + url + ".json")
      .toPromise()
      .then(rtn => rtn.json())
      .then(rtn => rtn.data);
  }

  createMessage(type: "error" | "success" | "warning", text) {
    return this._message.create(type, `${text}`);
  }
  constructor(public http: Http, private _message: NzMessageService) { }
}

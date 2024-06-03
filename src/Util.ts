import ConfigJson from "./model/ConfigJson";
import type LoadingError from "./model/LoadingError";

export default class Util {

  static RELEASE_DEV = "dev";
  static RELEASE_PROD = "prod";
  static RELEASE_PROD_TEST= "prod-test";
  static RELEASE_UNDEFINED = undefined;

  static getErrFromXhr(xhr: XMLHttpRequest): LoadingError {
    let title: string | null = null;
    let text: string | null = null;
    if (!xhr.responseText) {
      if (xhr.statusText !== undefined && xhr.statusText !== null) {
          title = xhr.statusText;
          text = "Error loading data from " + xhr.responseURL;
      } else {
        title = "Error";
        text =  "Error loading data from " + xhr.responseURL;
      }
    } else {
      try {
        const err = JSON.parse(xhr.response);
        title = "Error";
        text = err.error;
      } catch (err) {
        console.warn(err);
        title = "Error";
        text = xhr.response;
      }
    }
    return { title, text };
  }


  static parseK8sNames(uNameKeycloak: string, truncate: boolean) {
    let uNameKube: string | null = uNameKeycloak.toLowerCase()
      .replaceAll("_","--").replaceAll("@","-at-")
      .replaceAll(".","-dot-").replaceAll('"', '' )
      .replaceAll('\\', '' ).replaceAll('..', '')
      .replaceAll('%', '-perc-').replaceAll(" ","");
    if (truncate) {
      let start = 0
      let end = uNameKube.length - 1
      while (!uNameKube.charAt(start).match(/^[0-9a-z]+$/) && start < end) {
          start += 1 ;
      }
      while (!uNameKube.charAt(end).match(/^[0-9a-z]+$/) && end > start) {
          end -= 1;
      }
      if (start === end) {
          console.error(`parse_k8s_names -> Cannot convert ${uNameKube} to a valid name to k8s`);
          uNameKube = null;
      } else {  
        uNameKube = uNameKube.substring(start, end + 1);
      }
    }
  
    if (uNameKube && uNameKube.length >= 63) {
      uNameKube = uNameKube.substring(0, 63);
    }
    return uNameKube;
  
  }

  static getUserKubeNamespace(userName: string | null) {
    if (userName)
      return `user-${userName}`;
    else
      return null;
  }

  static getReleaseType(configJson: ConfigJson) {
    switch (configJson.release) {
      case Util.RELEASE_PROD: return Util.RELEASE_PROD;
      case Util.RELEASE_DEV: return Util.RELEASE_DEV;
      case Util.RELEASE_PROD_TEST: return Util.RELEASE_PROD_TEST;
      default: return Util.RELEASE_UNDEFINED;
    }
  }

  static updSearchParams(params: object, searchParams: URLSearchParams, setSearchParams: Function) {
    for (const [k, v] of Object.entries(params)) {
      if (v !== null) {
        searchParams.set(k, v);
      } else {
        searchParams.delete(k);
      }
    }
    setSearchParams(searchParams);
  }

  static msToTime(duration: number) {
    //var milliseconds = Math.floor((duration % 1000) / 100);
    const seconds = Math.floor((duration / 1000) % 60);
    const minutes = Math.floor((duration / (1000 * 60)) % 60);
    const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  
    const shours = (hours < 10) ? "0" + hours : hours;
    const sminutes = (minutes < 10) ? "0" + minutes : minutes;
    const sseconds = (seconds < 10) ? "0" + seconds : seconds;
  
    return shours + ":" + sminutes + ":" + sseconds;
  }

  static formatBytes(bytes: number, decimals: number = 2): string {
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

  static popPath(path: string): string {
    let pS = path.split("/");
    pS.pop();
    return pS.join("/");
  }

}

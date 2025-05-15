import SingleDataType from "../model/SingleDataType";
import Util from "../Util";
import config from "../service/config";
import UserView from "../components/data/users/user/UserView";

/**
 * TO BE USED WITH THE REACT ROUTER (navigate, Link etc.)
 * this class generates various links used around the web app, EXCEPT those used to call the API
 */
export default class UrlFactory {

    static baseName = config.basename.endsWith("/") ? config.basename : config.basename +  "/";
    static base = `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ""}${UrlFactory.baseName}`;

    public static singleDataDetails(id: string, singleDataType: SingleDataType): string {
        return `/${Util.singleDataPath(singleDataType)}/${id}/details`
    }

    public static projectDetails(code: string): string {
        return `/projects/${code}/details`
    }

    public static projectNew():  string {
        return `/projects/new`;
    }

    public static projectsList(): string {
        return `/projects`;
    }

    public static projectConfigEdit(code: string): string {
        return `/projects/${code}/config-editor`;
    }

    public static projectLogoFullUrl(logoUrl: string): string {
        return `${config.datasetService.projectLogo}${logoUrl}`;
        // const url: URL | null = URL.parse(Config.datasetService.api);
        // if (url) {
        //     return `${url.protocol}//${url.hostname}${url.port ? `:${url.port}` : ""}${Config.basename}${logoUrl}`
        // } else {
        //     return `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ""}${Config.basename}${logoUrl}`
        // }
    }

    public static userBase(username: string): string {
        return `/users/${username}`;
    }
    public static userDetails(username: string): string {
        return `${this.userBase(username)}/${UserView.TAB_DETAILS}`;
    }
    public static userLogs(username: string): string {
        return `${this.userBase(username)}/${UserView.TAB_LOGS}`;
    }
}
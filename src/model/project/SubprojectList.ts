import Subproject from "./Subproject";

export default interface SubprojectList {
    list: Array<Subproject>;
    allowedActionsForTheUser: string[];
}
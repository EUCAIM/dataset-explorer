import SingleDataType from "./SingleDataType";

export default interface SingleDataPageItem {

    type: SingleDataType;

    id: string;
    name: string;
    version: string;
    authorName: string | null;
    creationDate: string;
    project: string;
    draft: boolean;
    public: boolean;
    publicUse: boolean;
    corrupted: boolean;
    invalidated: boolean;
    tags: string[];
    studiesCount: number;
    subjectsCount: number;
    timesUsed: number;
    typeApi: string;

}
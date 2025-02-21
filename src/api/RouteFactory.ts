
import config from "../service/config";

export default class RouteFactory {

    static DATASET_DETAILS = config.basename + "/datasets/:datasetId/details";

    static getPath(id: string, format: any) {
        switch (id) {
            case RouteFactory.DATASET_DETAILS: return format ? 
                RouteFactory.DATASET_DETAILS.replace(":datasetId", format.datasetId) : RouteFactory.DATASET_DETAILS;
            default: throw new Error(`Unknown id ${id}`);
        }
    }
}
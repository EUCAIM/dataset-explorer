import React from "react";
import { Container } from "react-bootstrap";
import DataManager from "../../../../../api/DataManager";
import FilterFlags from "./FilterFlags";
import FilterProject from "./FilterProject";

interface FilteringViewProps {
    searchParams: URLSearchParams;
    filterUpdate: Function;
    loading: boolean;
    keycloakReady: boolean;
    dataManager: DataManager;
    postMessage: Function;
}

function FilteringView({searchParams, filterUpdate, loading, keycloakReady, dataManager, postMessage}: FilteringViewProps) {

    return <Container>
        <FilterFlags filterUpdate={filterUpdate} searchParams={searchParams} loading={loading}/>

        {/* All filters bellow are dynamic and can be unavailable depending on context */}
        <FilterProject filterUpdate={filterUpdate} searchParams={searchParams} loading={loading} 
            keycloakReady={keycloakReady} dataManager={dataManager} postMessage={postMessage}/>

    </Container>;
}

export default FilteringView;
import { Button } from "react-bootstrap";
import { PencilFill } from 'react-bootstrap-icons';
import React, { ReactNode, useState, useEffect } from "react";
import { useKeycloak } from '@react-keycloak/web';

import StaticValues from "../../../../../api/StaticValues";
import Footer from "./fieldedit/Footer";
import Body from "./fieldedit/Body";
import BodyPid from "./fieldedit/BodyPid";
import BodyId from "./fieldedit/BodyId";
import BodyLicense from "./fieldedit/BodyLicense";
import DataManager from "../../../../../api/DataManager";
import DialogSize from "../../../../../model/DialogSize";

function transformValue(field: string, value: any) {
  if (field === "pids") {
    let sVal = Object.create(null);
    sVal["preferred"] = value["preferred"];
    if (value["preferred"] === StaticValues.DS_PID_CUSTOM) {
      sVal["urls"] = Object.create(null);
      sVal["urls"][StaticValues.DS_PID_CUSTOM] = value["urls"][StaticValues.DS_PID_CUSTOM];
    }
    return sVal;
  } else 
    return value;
}

interface DatasetFieldEditProps {
  datasetId: string;
  oldValue: any;
  field: string;
  patchDataset: Function;
  keycloakReady: boolean;
  dataManager: DataManager;
  fieldDisplay: string;
  showDialog: Function;
}


function DatasetFieldEdit(props: DatasetFieldEditProps) {
  let [value, setValue] = useState<any>(props.oldValue);
  useEffect(() => setValue(props.oldValue), [props.oldValue]);
  let { keycloak } = useKeycloak();
  //console.log(`props.oldValue is ${JSON.stringify(props.oldValue)}`);
  //console.log(`dfe value is ${JSON.stringify(value)}`);
  const [isPatchValue, setIsPatchValue] = useState(false);
  const updValue = (newVal: any) => {setValue(newVal);};
  const patchDataset = () => setIsPatchValue(true);
  useEffect(() => {
    if (isPatchValue) {
      let sVal = transformValue(props.field, value);
      props.patchDataset(keycloak.token, props.datasetId, props.field, sVal);
      setIsPatchValue(false);
    }
  }, [isPatchValue]);
  // const patchDatasetCb = (newData) => setData( prevValues => {
  //    return { ...prevValues, data: newData.data, isLoading: newData.isLoading, isLoaded: newData.isLoaded, error: newData.error, status: newData.status}}
  //  );
  
  let body: ReactNode | null = null;
  if (props.field === "license" || props.field === "licenseUrl") {
    body = <BodyLicense updValue={updValue} oldValue={props.oldValue} dataManager={props.dataManager} keycloakReady={props.keycloakReady}/>;
  } else if (props.field === "pids") {
    body = <BodyPid updValue={updValue} oldValue={value} />;
  } else if (props.field === "previousId") {
    body = <BodyId updValue={updValue} oldValue={value} keycloakReady={props.keycloakReady} dataManager={props.dataManager}/>;
  } else {
    body = <Body updValue={updValue} oldValue={props.oldValue} />;
  }
  return <Button title={`Edit field '${props.fieldDisplay}'`} variant="link" className="m-0 ms-1 me-1 p-0" onClick={() =>
      {
        props.showDialog({
          show: true,
          footer: <Footer updValue={updValue} patchDataset={patchDataset} oldValue={props.oldValue} />,
          body: body,
          title: <span>Edit <b>{props.fieldDisplay}</b></span>,
          size: DialogSize.SIZE_LG,
          onBeforeClose: null
        });
        //patchDataset(props.field, props.newValue, props.succUpdCb);
      }} >
    <PencilFill />
  </Button>
}

export default DatasetFieldEdit;

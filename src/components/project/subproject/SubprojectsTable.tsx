import React from "react";
import Subproject from "../../../model/project/Subproject";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import UrlFactory from "../../../service/UrlFactory";

interface SubprojectsTableProps {
    projectCode: string;
    subprojects: Subproject[];
    canEdit: boolean;
}
export default function SubprojectsTable({projectCode, subprojects, canEdit}: SubprojectsTableProps): JSX.Element {
    const navigate = useNavigate();
    if (subprojects.length === 0) {
        return <div>
            <i>No subprojects available.</i>
        </div>
    } else {
        return <Table striped bordered hover style={{tableLayout: "fixed", width: "100%", wordBreak: "break-all"}}>
             <thead>
                <tr>
                    <th>Code</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>External ID</th>
                    {
                        canEdit ? <th>Actions</th> : null
                    }
                </tr>
            </thead>
            <tbody>
                {
                    subprojects.map((sp: Subproject) => {
                        return <tr>
                            <td>{sp.code}</td>
                            <td>{sp.name}</td>
                            <td>{sp.description}</td>
                            <td>{sp.externalId ?? ""}</td>
                            {
                                canEdit ? <td>
                                        <Button variant="link" size="sm" 
                                                onClick={() => navigate(UrlFactory.subprojectEditor(projectCode, sp.code))}>
                                            Edit
                                        </Button>
                                    </td> 
                                    : null
                            }
                        </tr>
                    })
                }
            </tbody>
        </Table>
    }
}
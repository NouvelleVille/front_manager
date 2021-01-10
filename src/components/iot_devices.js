import { useState } from "react";
import { Badge, Button, Table } from "react-bootstrap";
import useDevices from "../api/devices";

export default function IotDevice() {


    const [devices, setDevices] = useState([]);

    const { listDevices } = useDevices();

    const listDevicesClick = () => {
        console.log('List device called');
        listDevices().then((response) => {
            setDevices(response);
        })
    };


    let deviceRows = devices.map((device, index) => {
        
        return <tr key={"device_row_" + index.toString()}>
            <td>{device.id}</td>
            <td>{device.serial_number}</td>
            <td>{device.device_type.name}</td>
            <td>{device.device_maker.name}</td>
            <td>
                {device.device_tags.map((tag, tag_index) => {
                    return (
                        <Badge key={"device_tag_" + tag_index.toString()} variant="primary">{tag.name}</Badge>
                    )
                })}
            </td>
        </tr>
    })


    let deviceTable = <Table striped bordered hover size="sm" variant="dark">
        <thead>
            <tr>
                <th># id</th>
                <th>Device Serial Number</th>
                <th>Device Type</th>
                <th>Device Maker</th>
                <th>Device Tags</th>
            </tr>

        </thead>
        <tbody>
                {deviceRows}
        </tbody>
    </Table>

    return <div className="container">
        <div className="row">
            <div className="col">
                <div className="card">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="header-title">Device List</h4>
                            <Button onClick={listDevicesClick}>List Devices</Button>
                        </div>
                        <div className="card-body">
                            {Object.keys(devices).length}
                        </div>
                        {deviceTable}
                    </div>
                </div>
            </div>
        </div>
    </div>;
}

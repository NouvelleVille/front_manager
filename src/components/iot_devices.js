import { useEffect, useState } from "react";
import { Badge, Button, Table } from "react-bootstrap";
import useDevices from "../api/devices";

export default function IotDevice() {


    const [devices, setDevices] = useState([]);
    const [initialFetch, setInialFetch] = useState(false);

    const { listDevices } = useDevices();



    let deviceRows = devices.map((device, index) => {

        return <tr key={"device_row_" + index.toString()}>
            <td>{device.id}</td>
            <td>{device.device_model.device_type.name}</td>
            <td>{device.device_model.device_maker.name}{" "}{device.device_model.name}</td>
            <td>{device.serial_number}</td>
            <td>
                {device.device_tags.map((tag, tag_index) => {
                    return (
                        <Badge className="ml-1" key={"device_tag_" + tag_index.toString()} variant="primary">{tag.name}</Badge>
                    )
                })}
            </td>
        </tr>
    })


    useEffect(() => {
        if (!initialFetch) {
            setInialFetch('done');
            listDevices().then((response) => {
                setDevices(response);
            }).catch((error) => {
                console.log(error);
                setDevices([]);
            });

        }

    }, [initialFetch, listDevices])

    let deviceTable = <Table striped bordered hover size="sm" variant="dark">
        <thead>
            <tr>
                <th># id</th>
                <th>Type</th>
                <th>Model</th>
                <th>Device Serial Number</th>
                <th>Device Tags</th>
            </tr>

        </thead>
        <tbody>
            {deviceRows}
        </tbody>
    </Table>

    const listDevicesClick = () => {
        console.log('List device called');
        listDevices().then((response) => {
            setDevices(response);
        }).catch((error) => {
            setDevices([]);
        })
    };



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

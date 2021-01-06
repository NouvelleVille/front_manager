import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import React, { useState } from "react";
import cityWithSun from '../images/architecture-and-city.svg';
import streetLight from '../images/street-light.svg';

export default function LightController() {

    const [isOn, setSwitchOn] = useState(false);

    const toggleSwitch = function () {
        setSwitchOn(!isOn);
    }

    let stateText = 'off';

    let image = <img src={cityWithSun} className="rounded img-fluid" alt="Sun Light" />;



    if (isOn) {
        stateText = 'on';
        image = <img className="rounded img-fluid" src={streetLight} alt="Street Light" />;
    }


    let message = <React.Fragment>
        <span className="ml-2"><strong>Lights are {stateText}</strong></span>
    </React.Fragment>
    
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="header-title">City Lights</h4>
                        </div>
                        <div className="card-body text-center">

                            <form className="form-inline">
                                <BootstrapSwitchButton onstyle={"success"} offstyle={"outline-danger"} checked={isOn} onChange={toggleSwitch} />
                                {" "}{message}
                            </form>
                            <div className="col-4 mx-auto">
                                <div className="media mt-2 bg-light  img-thumbnail mx-auto d-block">
                                    {image}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}
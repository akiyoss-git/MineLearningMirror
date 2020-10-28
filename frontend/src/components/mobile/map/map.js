import React, { Component } from "react";

class MapMobile extends React.Component {
    render() {
        return (
            <>
                <div className="map"><iframe src="http://ivaz.servegame.com:52257" width="100%" height="1000" /></div>
            </>
        );
    }
}


export default MapMobile;
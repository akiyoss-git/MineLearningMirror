import React, { Component } from "react";

class Map extends React.Component {
    render() {
        return (
            <>
                <div className="map"><iframe src="http://ivaz.servegame.com:52257" width="100%" height="600" /></div>
            </>
        );
    }
}


export default Map;
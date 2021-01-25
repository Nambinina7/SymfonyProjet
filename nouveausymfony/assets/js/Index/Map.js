import React from "react";
import Map from "google-map-react";



const GoogleMaps = ({ google }) => {
    return (
        <>
            <div className="row w-100">
                <div
                    className="col text-center"
                    style={{ width: "100%", height: "1000px" }}
                >
                    <Map
                        bootstrapURLKeys={{ key: 'AIzaSyCPF3hAgVGlX0twlHWHSUGkzlzgKRnPjRM'}}
                        defaultZoom={20}
                        defaultCenter={{
                            lat: 24.4539,
                            lng: 54.3773
                        }}
                    />
                </div>
            </div>
        </>
    );
};

export default GoogleMaps;
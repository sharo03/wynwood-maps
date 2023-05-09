import React, { useEffect, useState } from "react";
import Map, {
  Layer,
  MapLayerMouseEvent,
  Source,
  ViewStateChangeEvent,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import myKey from "./private/key";
import { overlayData, geoLayer } from "./overlay";

const LAT = 25.8042;
const LONG = -80.1989;
const ZOOM = 14;

export default function MapBox() {
  const [viewState, setViewState] = useState({
    latitude: LAT,
    longitude: LONG,
    zoom: ZOOM,
  });

  function onMapClick(e: MapLayerMouseEvent) {
    console.log(e.lngLat.lat);
    console.log(e.lngLat.lng);
    console.log(e.target);
  }

  const [overlay, setOverlay] = useState<GeoJSON.FeatureCollection | undefined>(
    undefined
  );

  useEffect(() => {
    setOverlay(overlayData());
  }, []);

  return (
    <Map
      mapboxAccessToken={myKey}
      longitude={viewState.longitude}
      latitude={viewState.latitude}
      zoom={viewState.zoom}
      onMove={(ev: ViewStateChangeEvent) => setViewState(ev.viewState)}
      style={{ width: window.innerWidth, height: window.innerHeight }}
      //mapStyle={"mapbox://styles/mapbox/navigation-day-v1"}
      mapStyle={"mapbox://styles/mapbox/satellite-streets-v12"}
      //mapStyle={"mapbox://styles/mapbox/outdoors-v12"}
      //mapStyle={"mapbox://styles/mapbox/streets-v12"}
      onClick={onMapClick}
    >
      <Source id="geo_data" type="geojson" data={overlay}>
        <Layer id={geoLayer.id} type={geoLayer.type} paint={geoLayer.paint} />
      </Source>
    </Map>
  );
}

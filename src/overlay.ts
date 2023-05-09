import { FeatureCollection } from "geojson";
import { FillLayer } from "react-map-gl";

//import rl_data from "./data/FLMiami1937.json";
import rl_data from "./data/sample.json";

function isFeatureCollection(json: any): json is FeatureCollection {
  return json.type === "FeatureCollection";
}

export function overlayData(): GeoJSON.FeatureCollection | undefined {
  return isFeatureCollection(rl_data) ? rl_data : undefined;
}

const propertyName = "holc_grade";
export const geoLayer: FillLayer = {
  id: "geo_data",
  type: "fill",
  paint: {
    "fill-color": [
      "match",
      ["get", propertyName],
      "A",
      "#5bcc04",
      "B",
      "#04b8cc",
      "C",
      "#e9ed0e",
      "D",
      "#d11d1d",
      "#ccc",
    ],
    "fill-opacity": [
      "match",
      ["get", propertyName],
      "A",
      0.35,
      "B",
      0.3,
      "C",
      0.2,
      "D",
      0.2,
      0.0,
    ],
  },
};

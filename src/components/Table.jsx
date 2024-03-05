import React from "react";
import PORTALS from "../constants/portals";
import INTERACTIONS from "../constants/interactions";
import { usePortals } from "../hooks/usePortals";

export default function Table() {

  const { portals } = usePortals();
  const [metrics, setMetrics] = React.useState({});

  const handleMetricInput = (metric) => {
    const metricObject = { value: metric.value, portalId: metric.portal, interactionId: metric.interaction, date: new Date()};

    console.log(metricObject);
  }

  return (
    <div className="container">
      <table className="table table-borderless table-responsive mx-auto p-5">
        <thead>
          <tr>
            <th><span className="visually-hidden">Metrics</span></th>
            {portals.map((portal, index) => (
              <th key={index} className="text-nowrap text-center">{portal.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {INTERACTIONS.map((interaction, index) => (
            <tr key={index}>
              <th className="w-10 text-end align-middle">{interaction.name}</th>
              {portals.map((portal, index) => (
                <td key={index} className="text-nowrap">
                  <input type="number" min="0" className="form-control" id={`${portal.id + "_" + interaction.id}`} name={`${portal.id + "_" + interaction.id}`} tabIndex={`${index + 1}`} onChange={(e) => handleMetricInput({ value: e.target.value, portal: portal.id, interaction: interaction.id })}/>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
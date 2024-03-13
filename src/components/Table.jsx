import React, { useEffect } from "react";
import INTERACTIONS from "../constants/interactions";
import { usePortals } from "../hooks/usePortals";
import { format, set } from 'date-fns';

export default function Table({ selectedDateISO }) {

  const { portals } = usePortals();
  const [metrics, setMetrics] = React.useState();

  useEffect(() => {

    const fetchMetricsByDate = async () => {
      const response = await fetch(`http://localhost:5000/api/metrics/bydate/${selectedDateISO.toDateString()}`);
      const data = await response.json();
      setMetrics(data);
      console.log("metrics data re-fetched!");
    }
    fetchMetricsByDate();

  }, [selectedDateISO]);

  const handleMetricInput = async (metric) => {

    //if the metric value is empty, do nothing
    if (!metric.value || !metric.value.length) {
      return;
    }

    console.log("metric input value: " + metric.value)
    let metricObject = { value: parseInt(metric.value), portalId: metric.portal, interactionId: metric.interaction, date: format(selectedDateISO, 'yyyy-MM-dd') };


    const matchingMetric = metrics.find(m => m.portalId === metricObject.portalId && m.interactionId === metricObject.interactionId && m.date === metricObject.date);


    //if the metric value does not exist, create it
    if (!matchingMetric) {
      console.log("creating new metric");
      const response = await fetch("http://localhost:5000/api/metrics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(metricObject)
      }).catch(function (error) {
        console.log('Request failed', error);
      })

      const data = await response.json();

      setMetrics([...metrics, { ...metricObject, metricId: data.metricId }]);
    }

    //if the metric value is the same, do nothing
    else if (matchingMetric.value === metricObject.value) {
      return;
    }

    //the metric value already exists, update it
    else {
      console.log("updating metric, existing id: " + matchingMetric.metricId);
      const response = await fetch(`http://localhost:5000/api/metrics/${matchingMetric.metricId}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ ...metricObject, metricId: matchingMetric.metricId })
      });

      setMetrics(metrics.map(m => m.metricId === matchingMetric.metricId ? { ...metricObject, metricId: matchingMetric.metricId } : m));
    }
  }

  return (
    <div className="container-fluid">
      <table className="table table-borderless table-responsive mx-auto p-5" style={{ width: "auto" }}>
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
                  <input type="number" min="0" className="form-control" id={`${portal.id + "_" + interaction.id}`} name={`${portal.id + "_" + interaction.id}`} tabIndex={`${index + 1}`} onChange={(e) => handleMetricInput({ value: e.target.value, portal: portal.id, interaction: interaction.id })} value={metrics ? metrics.find(metric => metric.portalId === portal.id && metric.interactionId === interaction.id && metric.date === format(selectedDateISO, "yyyy-MM-dd"))?.value || "" : ""} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
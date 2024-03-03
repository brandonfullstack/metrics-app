import React from "react";
import PORTALS from "../constants/portals";
import INTERACTIONS from "../constants/interactions";

export default function Table() {
  return (
    <div className="container">

    <table className="table table-responsive mx-auto p-5">
      <thead>
        <tr>
          <th><span className="visually-hidden">Metrics</span></th>
          {PORTALS.map((portal, index) => (
            <th key={index} className="text-nowrap">{portal.name}</th>
            ))}
        </tr>
      </thead>
      <tbody>
        {INTERACTIONS.map((interaction, index) => (
          <tr>
            <th className="w-10">{interaction.name}</th>
            {PORTALS.map((portal, index) => (
              <td key={index} className="text-nowrap">
                <input type="text" className="form-control" />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
</div>
  );
}
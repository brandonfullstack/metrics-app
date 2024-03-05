import React from "react";
import PORTALS from "../constants/portals";
import INTERACTIONS from "../constants/interactions";
import { usePortals } from "../hooks/usePortals";

export default function Table() {

  const { portals } = usePortals();

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
            <tr>
              <th className="w-10 text-end align-middle">{interaction.name}</th>
              {portals.map((portal, index) => (
                <td key={index} className="text-nowrap">
                  <input type="number" min="0" className="form-control" id={`${portal.id + interaction.id}`} name={`${portal.name + interaction.name}`} tabIndex={`${index + 1}`} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
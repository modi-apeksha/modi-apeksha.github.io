import React from "react";
import "./logo.scss";
import { useConfig } from "../../../hooks/ConfigContext";
export default function Logo() {

  const { brandLogo, brandName } = useConfig();

  return (
    <div className="logo-container">
      {brandLogo && <img src={brandLogo} className="logo" alt="logo" />}
      {(!brandLogo && brandName) && <h4>{brandName}</h4>}
    </div>
  );
}

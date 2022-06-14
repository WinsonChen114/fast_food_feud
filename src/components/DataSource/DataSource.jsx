import * as React from "react"
import "./DataSource.css"

export function DataSource({dataSource = ""}) {
  return (
    <div className="data-sources">
    <p>{dataSource}</p>
  </div>
  )
}

export default DataSource
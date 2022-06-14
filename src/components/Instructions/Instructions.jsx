import * as React from "react"
import "./Instructions.css"

export function Instructions({ selectedCategory = null, selectedRestaurant = null, selectedMenuItem = null, instructions = [] }) {
  let instruction = ""
  if (selectedCategory) {
    if (selectedRestaurant) {
      //All are selected
      if (selectedMenuItem) {
        instruction = instructions.allSelected
      }
      //Item has not been selected
      else {
        instruction = instructions.noSelectedItem
      }
    }
    //Only category is selected
    else {
      instruction = instructions.onlyCategory
    }
  }
  else {
    //Only restaurant is selected
    if (selectedRestaurant) {
      instruction = instructions.onlyRestaurant
    }
    //Nothing is selected
    else {
      instruction = instructions.start
    }
  }
  return (
    <aside className="instructions">
      <p>{instruction}</p>
    </aside>
  )
}

export default Instructions

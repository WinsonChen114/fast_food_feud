import * as React from "react"
// IMPORT ANY NEEDED COMPONENTS HERE
import { createDataSet } from "./data/dataset"
import "./App.css"
import Header from "./components/Header/Header.jsx"
import Instructions from "./components/Instructions/Instructions.jsx"
import DataSource from "./components/DataSource/DataSource.jsx"
import RestaurantsRow from "./components/RestaurantsRow/RestaurantsRow.jsx"
import CategoryColumn from "./components/CategoryColumn/CategoryColumn.jsx"
import MenuDisplay from "./components/MenuDisplay/MenuDisplay.jsx"

// don't move this!
export const appInfo = {
  title: `Fast Food Feud 🍔!`,
  tagline: `Folks' Favorite Friendly Fuel Finder For Food Facts`,
  description: `Finding healthy food is hard. Sometimes we just settle for what's available. That doesn't mean we shouldn't know what's going into our bodies! Fast Food Feud is here to arm the public with all the nutritional facts needed to make informed decisions about fast food consumption.`,
  dataSource: `All data pulled from the MenuStat.org interactive online database.`,
  instructions: {
    start: `Start by clicking on a food category on the left and a fast food joint from the list above. Afterwards, you'll be able to choose from a list of menu items and see their nutritional content.`,
    onlyCategory: `Now select a fast food restaurant from the list above!`,
    onlyRestaurant: `Now select a category from the list on the left!`,
    noSelectedItem: `Almost there! Choose a menu item and you'll have the fast food facts right at your fingertips!`,
    allSelected: `Great choice! Amazing what a little knowledge can do!`,
  },
}
// or this!
const { data, categories, restaurants } = createDataSet()

//booleans for instruction state
let catebool = false
let restbool = false
let itembool = false

export function App() {
  //States for Category and restarurant
  const [selectedCategory, setCategory] = React.useState(null)
  const [selectedRestaurant, setRestaurant] = React.useState(null)
  const [selectedMenuItem, setMenuItem] = React.useState(null)
  const [instructionState, setInstructionState] = React.useState("start")

  //Selecting a Chip
  const cateOnClick = (category) => {
    setMenuItem(null)
    catebool = true
    itembool = false
    setCategory(category)
    instrOnClick()
  }
  const restOnClick = (restaurant) => {
    setMenuItem(null)
    restbool = true
    itembool = false
    setRestaurant(restaurant)
    instrOnClick()
  }
  const itemOnClick = (item) => {
    itembool = true
    setMenuItem(item)
    instrOnClick()
  }

  //Deselecting a Chip
  const cateClose = () => {
    catebool = false
    itembool = false
    setMenuItem(null)
    setCategory(null)
    instrOnClick()
  }
  const restClose = () => {
    restbool = false
    itembool = false
    setMenuItem(null)
    setRestaurant(null)
    instrOnClick()
  }
  const itemClose = () => {
    itembool = false
    setMenuItem(null)
    instrOnClick()
  }

  //Setting Instrction state
  const instrOnClick = () => {
    if (catebool) {
      if (restbool) {
        //All are selected
        if (itembool) {
          setInstructionState("allSelected")
        }
        //Item has not been selected
        else {
          setInstructionState("noSelectedItem")
        }
      }
      //Only category is selected
      else {
        setInstructionState("onlyCategory")
      }
    }
    else {
      //Only restaurant is selected
      if (restbool) {
        setInstructionState("onlyRestaurant")
      }
      //Nothing is selected
      else {
        setInstructionState("start")
      }
    }
  }

  const currentMenuItems = data.filter((item) => { return item.food_category == selectedCategory && item.restaurant == selectedRestaurant })

  return (
    <main className="App">
      {/* CATEGORIES COLUMN */}
      <CategoryColumn categories={categories} onClick={cateOnClick} close={() => cateClose()} selectedCategory={selectedCategory} />

      {/* MAIN COLUMN */}
      <div className="container">
        <Header title={appInfo.title} tagline={appInfo.tagline} description={appInfo.description} />

        {/* RESTAURANTS ROW */}
        <RestaurantsRow restaurants={restaurants} onClick={restOnClick} close={() => restClose()} selectedRestaurant={selectedRestaurant} />

        <Instructions instructions={appInfo.instructions[instructionState]} />

        {/* MENU DISPLAY */}
        <MenuDisplay currentMenuItems={currentMenuItems} onClick={itemOnClick} close={() => itemClose()} selectedMenuItem={selectedMenuItem} />

        <DataSource dataSource={appInfo.dataSource} />
      </div>
    </main>
  )
}

export default App

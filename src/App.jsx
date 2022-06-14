import * as React from "react"
// IMPORT ANY NEEDED COMPONENTS HERE
import { createDataSet } from "./data/dataset"
import "./App.css"
import Header from "./components/Header/Header.jsx"
import Instructions from "./components/Instructions/Instructions.jsx"
import Chip from "./components/Chip/Chip.jsx"
import NutritionalLabel from "./components/NutritionalLabel/NutritionalLabel.jsx"

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
    console.log("click fire")
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

  //Deselecting a Chip
  const cateClose = () => {
    catebool = false
    itembool = false
    setMenuItem(null)
    setCategory(null)
    console.log("close fire")
  }

  const restClose = () => {
    restbool = false
    itembool = false
    setMenuItem(null)
    setRestaurant(null)
  }

  const itemClose = () => {
    itembool = false
    setMenuItem(null)
  }


  const currentMenuItems = data.filter((item) => { return item.food_category == selectedCategory && item.restaurant == selectedRestaurant })

  return (
    <main className="App">
      {/* CATEGORIES COLUMN */}
      <div className="CategoriesColumn col">
        <div className="categories options">
          <h2 className="title">Categories</h2>
          {categories.map((category) => (
            <Chip label={category} key={category} onClick={() => cateOnClick(category)} close={() => cateClose} isActive={selectedCategory == category} />
          ))}
        </div>
      </div>

      {/* MAIN COLUMN */}
      <div className="container">
        <Header title={appInfo.title} tagline={appInfo.tagline} description={appInfo.description} />

        {/* RESTAURANTS ROW */}
        <div className="RestaurantsRow">
          <h2 className="title">Restaurants</h2>
          <div className="restaurants options">
            {restaurants.map((restaurant) => (
              <Chip label={restaurant} key={restaurant} onClick={() => restOnClick(restaurant)} close={() => restClose} isActive={selectedRestaurant == restaurant} />
            ))}
          </div>
        </div>

        <Instructions instructions={appInfo.instructions[instructionState]} />

        {/* MENU DISPLAY */}
        <div className="MenuDisplay display">
          <div className="MenuItemButtons menu-items">
            <h2 className="title">Menu Items</h2>
            {currentMenuItems.map((item) => (
              <Chip label={item.item_name} key={item.item_description} onClick={() => itemOnClick(item)} close={() => itemClose} isActive={selectedMenuItem && selectedMenuItem.item_name == item.item_name} />
            ))}
          </div>

          {/* NUTRITION FACTS */}
          <div className="NutritionFacts nutrition-facts">{selectedMenuItem ? <NutritionalLabel item={selectedMenuItem} /> : <></>}</div>
        </div>

        <div className="data-sources">
          <p>{appInfo.dataSource}</p>
        </div>
      </div>
    </main>
  )
}

export default App

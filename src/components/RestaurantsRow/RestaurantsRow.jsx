import * as React from "react"
import Chip from "../Chip/Chip.jsx"
import "./RestaurantsRow.css"

export function RestaurantsRow({restaurants, onClick = () => {}, close = () => {}, selectedRestaurant}) {
    return (
        <div className="RestaurantsRow">
            <h2 className="title">Restaurants</h2>
            <div className="restaurants options">
                {restaurants.map((restaurant) => (
                    <Chip label={restaurant} key={restaurant} onClick={() => onClick(restaurant)} close={close} isActive={selectedRestaurant == restaurant} />
                ))}
            </div>
        </div>
    )
}

export default RestaurantsRow

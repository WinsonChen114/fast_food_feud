import * as React from "react"
import Chip from "../Chip/Chip.jsx"
import NutritionalLabel from "../NutritionalLabel/NutritionalLabel.jsx"
import "./MenuDisplay.css"

export function MenuDisplay({ currentMenuItems, onClick = () => { }, close = () => { }, selectedMenuItem }) {
    return (
        <div className="MenuDisplay display">
            <div className="MenuItemButtons menu-items">
                <h2 className="title">Menu Items</h2>
                {currentMenuItems.map((item) => (
                    <Chip label={item.item_name} key={item.item_description} onClick={() => onClick(item)} close={close} isActive={selectedMenuItem && selectedMenuItem.item_name == item.item_name} />
                ))}
            </div>

            {/* NUTRITION FACTS */}
            <div className="NutritionFacts nutrition-facts">{selectedMenuItem ? <NutritionalLabel item={selectedMenuItem} /> : <></>}</div>
        </div>
    )
}

export default MenuDisplay
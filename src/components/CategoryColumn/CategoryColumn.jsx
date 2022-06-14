import * as React from "react"
import Chip from "../Chip/Chip.jsx"
import "./CategoryColumn.css"

export function CategoryColumn({ categories, onClick = () => { }, close = () => { }, selectedCategory }) {
    return (
        <div className="CategoriesColumn col">
            <div className="categories options">
                <h2 className="title">Categories</h2>
                {categories.map((category) => (
                    <Chip label={category} key={category} onClick={() => onClick(category)} close={close} isActive={selectedCategory == category} />
                ))}
            </div>
        </div>
    )
}

export default CategoryColumn
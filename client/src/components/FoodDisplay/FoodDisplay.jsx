import React from 'react'
import './FoodDisplay.css'
import FoodItem from '../FoodItem/FoodItem';
import { useStore } from '../../stores/useStore';
const FoodDisplay = ({ category }) => {
  const { food_list } = useStore();
  return (
    <div className='food-display' id='food-display'>
      <h2>Top Dishes near You</h2>
      <div className="food-display-list">
        {food_list.map((item, index) => {
          if (category === 'All' || category === item.category) {
            return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />
          }
        })}
      </div>
      <hr />
    </div>
  )
}

export default FoodDisplay

import axios from 'axios'
import { useEffect, useState } from 'react'
import Card from '../UI/Card'
import classes from './AvailableMeals.module.css'
import MealItem from './MealItem/MealItem'

// const DUMMY_MEALS = [
//   {
//     id: 'm1',
//     name: 'Sushi',
//     description: 'Finest fish and veggies',
//     price: 22.99,
//   },
//   {
//     id: 'm2',
//     name: 'Schnitzel',
//     description: 'A german specialty!',
//     price: 16.5,
//   },
//   {
//     id: 'm3',
//     name: 'Barbecue Burger',
//     description: 'American, raw, meaty',
//     price: 12.99,
//   },
//   {
//     id: 'm4',
//     name: 'Green Bowl',
//     description: 'Healthy...and green...',
//     price: 18.99,
//   },
// ];

const AvailableMeals = () => {
  const [meals, setMeals] = useState([])

  useEffect(() => {
    async function getMeals() {
      const response = await axios.get(
        'https://react-food-be722-default-rtdb.firebaseio.com/meals.json',
      )
      const data = response.data
      const loadedMeals = []
      for (const meal in data) {
        loadedMeals.push({
          id: meal,
          name: data[meal].name,
          description: data[meal].description,
          price: data[meal].price,
        })
      }
      setMeals(loadedMeals)
    }

    getMeals()
  }, [])

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ))

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  )
}

export default AvailableMeals

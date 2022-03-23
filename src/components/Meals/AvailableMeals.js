import { useEffect, useState } from "react";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import useHttp from "../../hooks/use-http";

const AvailableMeals = () => {
  const { isLoading, error, sendRequest: fetchMeals } = useHttp();
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const availableMeals = [];
    const applyFetchData = (data) => {
      for (const meal in data) {
        availableMeals.push(data[meal]);
      }
      setMeals(availableMeals);
    };

    fetchMeals(
      {
        url: "https://react-http-e090c-default-rtdb.firebaseio.com/meals.json",
      },
      applyFetchData
    );
  }, [fetchMeals]);

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }
  if (error) {
    return (
      <section className={classes.MealsError}>
        <p>{error}</p>
      </section>
    );
  }

  const mealList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;

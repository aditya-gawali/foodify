import React, { useEffect, useState } from "react";
import "./Home.css";
import Header from "../../components/Header/Header";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import AppDownload from "../../components/AppDownload/AppDownload";
import { useStore } from "../../stores/useStore";
const Home = () => {
  const [category, setCategory] = useState("All");
  const { food_list, setFoodList, fetchFoodList, loadCartData, userId, setToken } = useStore();
  useEffect(() => {

    fetchFoodList();
    setFoodList(food_list)
    setToken(localStorage.getItem('token'))
    // loadCartData()
  }, [userId])


  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
      <AppDownload />
    </div>
  );
};

export default Home;

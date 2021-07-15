import { useState, useEffect } from "react";

import Header from "../../components/Header";
import api from "../../services/api";
import Food, { FoodType } from "../../components/Food";
import ModalAddFood from "../../components/ModalAddFood";
import ModalEditFood from "../../components/ModalEditFood";
import { FoodsContainer } from "./styles";

function Dashboard() {
  const [foods, setFoods] = useState<FoodType[]>([]);
  const [editingFood, setEditingFood] = useState({} as FoodType);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    async function loadFoods() {
      const { data: foods } = await api.get("/foods");
      setFoods(foods);
    }
    loadFoods();
  }, []);

  async function handleAddFood(food: FoodType) {
    try {
      const { data: newFood } = await api.post("/foods", {
        ...food,
        available: true,
      });

      setFoods((foods) => [...foods, newFood]);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdateFood(food: FoodType) {
    try {
      const { data: foodUpdated } = await api.put(`/foods/${editingFood.id}`, {
        ...editingFood,
        ...food,
      });

      const foodsUpdated = foods.map((food) =>
        food.id !== foodUpdated.id ? food : foodUpdated.data
      );

      setFoods(foodsUpdated);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDeleteFood(id: number) {
    await api.delete(`/foods/${id}`);
    const filteredFoods = foods.filter((food) => food.id !== id);
    setFoods(filteredFoods);
  }

  async function handleEditFood(food: FoodType) {
    setEditingFood(food);
    setIsEditModalOpen(true);
  }

  function toggleModal() {
    setIsAddModalOpen((state) => !state);
  }

  function toggleEditModal() {
    setIsEditModalOpen((state) => !state);
  }

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={isAddModalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={isEditModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map((food) => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  );
}

export default Dashboard;

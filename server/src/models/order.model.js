import crypto from "crypto";

let ordersCollection = [];

// Crear una orden
export const createOrder = (coffee, userId) => {
  const newOrder = {
    id: crypto.randomUUID().toString(),
    coffee,
    userId,
  };

  ordersCollection.push(newOrder);

  return newOrder;
};

export const getOrders = (userId) => {
  return ordersCollection.filter((coffee) => coffee.userId === userId);
};

export const getOrderById = (id, userId) => {
  return (
    ordersCollection.find(
      (coffee) => coffee.id === id && coffee.userId === userId
    ) || null
  );
};

export const deleteOrderById = (id, userId) => {
  const deletedOrder = ordersCollection.find(
    (coffee) => coffee.id === id && coffee.userId === userId
  );
  ordersCollection = ordersCollection.filter(
    (coffee) => coffee.id !== id && coffee.userId === userId
  );
  return deletedOrder;
};

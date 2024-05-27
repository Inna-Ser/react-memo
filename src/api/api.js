/* eslint-disable prettier/prettier */
const baseURL = "https://wedev-api.sky.pro/api/leaderboard";

export const getLeaderbord = async () => {
  try {
    const response = await fetch(baseURL, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Ошибка HTTP: " + response.status);
    }
    const data = await response.json();
    return data.leaders || [];
  } catch (error) {
    console.error("Ошибка при получении данных:", error.message);
    throw error;
  }
};

export const addUserToLeaderboard = async ({ name, achievements, time }) => {
  try {
    const response = await fetch(baseURL, {
      method: "POST",
      body: JSON.stringify({ name, achievements, time }),
    });
    if (!response.ok) {
      throw new Error("Ошибка при добавления пользователя:" + response.status);
    }
    return await response.json();
  } catch (error) {
    console.error("Ошибка при добавления пользователя:", error.message);
    throw error;
  }
};

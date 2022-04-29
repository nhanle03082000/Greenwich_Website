export const apiUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:4000"
    : "https://greenwich-attendance.herokuapp.com";

export const LOCAL_STORAGE_TOKEN_NAME = "Lazy-Website";

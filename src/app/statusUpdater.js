import Cookies from "js-cookie";
import { checkUserState } from "src/data/loginData";

const checkUserStatus = async () => {
  try {
    const state = await checkUserState();
    if (!state || !state.payload || !state.isLogged) {
      Cookies.remove("isLogged");
      Cookies.remove("isAdmin");
      localStorage.removeItem("username");
      console.log("User not logged in, all is clean");
    } else {
      console.log("Everything is fine.");
    }
  } catch (error) {
    console.error("Error verifying user status:", error);
    Cookies.remove("isLogged");
    Cookies.remove("isAdmin");
    localStorage.removeItem("username");
  }
};

setInterval(checkUserStatus, 30 * 60 * 1000);

checkUserStatus();
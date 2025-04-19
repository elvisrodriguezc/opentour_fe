import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { lo }

export async function submitForm(query) {
    const dispatch = useDispatch();



    const formValues = Object.fromEntries(query);
    console.log("submitForm: ", formValues);
    localStorage.setItem("token", "fake-token");

    try {
        await new Promise((resolve) => setTimeout(resolve, 2000))
            .then(() => {
                console.log("submitForm: Promise resolved after 1 second");
                return Navigate("/dasboard/v3"); // Indicate successful submission
            })
            .catch((error) => {
                console.error("Error in Promise:", error);
                return false; // Indicate failure
            })
            .finally(() => {
                console.log("submitForm: Promise finally executed");
            });
    }
    catch (error) {
        console.error("Error in submitForm:", error);
        return false; // Indicate failure
    }
}


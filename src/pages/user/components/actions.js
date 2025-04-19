
export async function submitForm(query) {

    const formValues = Object.fromEntries(query);
    console.log("submitForm: ", formValues);
    // localStorage.setItem("token", "fake-token");

    try {
        await new Promise((resolve) => setTimeout(resolve, 2000))
            .then(() => {
                console.log("submitForm: Promise resolved after 1 second");
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


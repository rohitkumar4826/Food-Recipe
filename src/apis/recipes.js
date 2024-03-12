
const server = import.meta.env.VITE_RECIPE_API;

export const readAllRecipes = async () => {
    try {
        const url = `${server}filter.php?a=American`;
        const response = await fetch(url)
        .then(async(response) => await response.json())
        .catch((err) => console.log("readRecipes res: ", err))

        return response;
    } catch (err) {
        console.log("readRecipes : ", err)
    }
}

export const readRecipeById = async (id) => {
    try {
        const url = `${server}lookup.php?i=${id}`;
        const response = await fetch(url)
        .then(async(response) => await response.json())
        .catch((err) => console.log("readSingleRecipe res: ", err))

        return response;
    } catch (err) {
        console.log("readSingleRecipe :", err);
    }
}

export const readSearchRecpie = async (value) => {
    try {
        const url = `${server}search.php?s=${value}`;
        const response = await fetch(url)
        .then(async(response) => await response.json())
        .catch((err) => console.log("readSearchRecipe res:", err));

        return response;
    } catch (err) {
        console.log("readSearchRecipe: ", err)
    }
}

export const readRecipeByCategory = async (category) => {
    try {
        const url = `${server}filter.php?c=${category}`;
        const response = await fetch(url)
        .then(async(response) => await response.json())
        .catch((err) => console.log("readRecipeByCategory res: ", err))

        return response;
    } catch (err) {
        console.log("readRecipeByCategory : ", err)
    }
}
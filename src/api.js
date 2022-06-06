import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** 
 * Static class tying together methods used to get/send to to the API.
 */
class RecipeApi {
  // the token for interaction with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${this.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      const message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /* HOME ROUTE *************************************************************/
  
  /**
   * Extract recipe data given a url.
   * 
   * @returns recipeData - { title, servings, sourceUrl, sourceName, image, instructions,
 *           ingredients, cuisines, courses, diets, occasions }
   */
  static async getRecipeFromUrl(query) {
    const res = await this.request('/', query);
    return res.recipeData;
  }

  /* AUTH ROUTES *************************************************************/
  
  /**
   * Authenticate user and return token.
   * Auth required: none
   * 
   * @param {Object} userCredentials { username, password }
   * @returns token
   */
   static async authenticate(userCredentials) {
    const res = await this.request(`auth/token`, 
                                  userCredentials,
                                  "post");
    return res.token;
  }

  /**
   * Create user account and return token.
   * Auth required: none
   * 
   * @param {Object} userData 
   * @returns token
   */
  static async register(userData) {
    const res = await this.request(`auth/register`, 
                                  userData,
                                  "post");
    return res.token;
  }
  // end auth routes

  /* USER ROUTES *************************************************************/

  /**
   * Allows admin to add a new user.
   * Auth required: admin
   * 
   * @param {Object} userData 
   * @returns {user: { username, firstName, lastName, email, isAdmin }, token }
   */
   static async addUser(userData) {
    const res = await this.request(`users`,
                                   userData,
                                   "post");
    return res;
  }

  /**
   * Gets a list of users.
   * Auth required: admin
   * 
   * @returns users: [ {username, firstName, lastName, email, isAdmin }, ... ]
   */
  static async getUsers() {
    const res = await this.request(`users`);
    return res.users;
  }

  /**
   * Get user details by username.
   * Auth required: admin or same user-as-:username
   * 
   * @param {string} username 
   * @returns user: { username, firstName, lastName, isAdmin, email, recipes }
 *   where recipes is [recipe1_id, recipe2_id, ...]
   */
  static async getUser(username) {
    const res = await this.request(`users/${username}`);
    return res.user;
  }

  /**
   * Update a user given a username.
   * Auth required: admin or same user-as-:username
   * 
   * @param {string} username 
   * @param {Object} updatedData - data can include: { firstName, lastName, password, email }
   * @returns user: { username, firstName, lastName, email, isAdmin }
   */
  static async updateUser(username, updatedData) {
    const res = await this.request(`users/${username}`,
                                   updatedData,
                                   "patch");
    return res.user;
  }

  /**
   * Delete a user by username.
   * Auth required: admin or same-user-as-:username
   * 
   * @param {string} username 
   * @returns username
   */
  static async deleteUser(username) {
    const res = await this.request(`users/${username}`,
                                   {},
                                   "delete");
    return res.deleted;
  }
  // end user routes

/* CATEGORY ROUTES *************************************************************/

  /**
   * Add a new category for user's recipes.
   * Auth required: admin or same-user-as-:username
   * 
   * @param {String} username
   * @param {Object} data { label, parentId }
   * @returns category: { id, username, label, parentId }
   */
  static async addCategory(username, data) {
    const res = await this.request(`users/${username}/categories`,
                                    data,
                                    "post");
    return res.category;
  }

  /**
   * Get a list of root categories for user's recipes.
   * Auth required: admin or same-user-as-:username
   * 
   * @param {String} username
   * @param {Object} data { label, parentId }
   * @returns categories: [{ id, username, label, parentId, children, recipes }, ...]
   */
   static async getRootCategories(username) {
    const res = await this.request(`users/${username}/categories`);
    return res.categories;
  }

  /**
   * Get category details given a category id.
   * Auth required: admin or same-user-as-:username
   * 
   * @param {String} username
   * @param {Object} data { label, parentId }
   * @returns category: { id, username, label, parentId, children, recipes }
   */
   static async getCategory(username, id) {
    const res = await this.request(`users/${username}/categories/${id}`);
    return res.category;
  }

  /**
   * Update a category.
   * Auth required: admin or same-user-as-:username
   * 
   * @param {String} username
   * @param {Object} data { label, parentId }
   * @returns category: { id, username, label, parentId }
   */
   static async updateCategory(username, id, data) {
    const res = await this.request(`users/${username}/categories/${id}`,
      data, "patch");
    return res.category;
  }

  /**
   * Delete a category.
   * Auth required: admin or same-user-as-:username
   * 
   * @param {String} username
   * @returns category id
   */
   static async deleteCategory(username, id) {
    const res = await this.request(`users/${username}/categories/${id}`,
      {}, "delete");
    return res.deleted;
  }

  /**
   * Add a recipe to a category.
   * @param {String} username 
   * @param {Number} categoryId 
   * @param {Number} recipeId 
   * @returns recipe id
   */
  static async addRecipeToCategory(username, categoryId, recipeId) {
    const res = await this.request(`users/${username}/categories/${categoryId}/recipe/${recipeId}`,
      {}, "post");

    return res.added;
  }

/* RECIPE ROUTES *************************************************************/

  /**
   * Add a new recipe for user.
   * Auth required: admin or same-user-as-:username
   * 
   * @param {String} username
   * @param {Object} data { title, servings, sourceUrl, sourceName, image, ingredients,
                        instructions, cuisines, diets, courses, occasions }
  * @returns recipe: { title, url, sourceName, image, servings, notes, editedAt, 
  *           createdAt, isFavorite, instructions, ingredients, categories }
  */
  static async addRecipe(username, data) {
    const res = await this.request(`users/${username}/recipes`,
                                    data,
                                    "post");
    return res.recipe;
  }

  /**
   * Get a list of recipes for user.
   * Auth required: admin or same-user-as-:username
   * 
   * Can filter by provided criteria:
   * - query - string, will find case-insensitive, partial matches
   * - orderBy - array, can include ['title', 'edited_at', 'created_at', 'source_name']
   * - isAsc - boolean, if true order results ascending, else descending
   * 
   * @param {String} username
   * @param {Object} searchCriteria
   * @returns recipes: [ { id, title, url, source_name, image, servings, notes, edited_at, 
   *           created_at, is_favorite, instructions, ingredients }, ...]
   */
  static async getRecipes(username, searchCriteria={}) {
    const res = await this.request(`users/${username}/recipes`, searchCriteria);
    return res.recipes;
  }

  /**
   * Get recipe details given a recipe id.
   * Auth required: admin or same-user-as-:username
   * 
   * @param {String} username
   * @param {Number} id - recipe id
   * @returns recipe: { id, username, title, url, sourceName, image, 
   *           servings, notes, isFavorite,
   *           editedAt, createdAt, ingredients,
   *           instructions } 
   */
  static async getRecipe(username, id) {
    const res = await this.request(`users/${username}/recipes/${id}`);
    return res.recipe;
  }

  /**
   * Favorite a recipe.
   * 
   * @param {String} username 
   * @param {Number} id - recipe id
   * @returns recipe id
   */
  static async favorite(username, id) {
    const res = await this.request(`users/${username}/recipes/favorites/${id}`,
      {}, "patch");
    return res.favoriteToggled;
  } 

  /**
   * Update a recipe.
   * Auth required: admin or same-user-as-:username
   * 
   * @param {String} username
   * @param {Object} data - can include { title, url, sourceName, image, servings, notes, instructions, ingredients }
   * @returns recipe: { id, username, title, url, sourceName, image, servings, notes, 
 *           editedAt, createdAt, isFavorite, ingredients, instructions }
   */
  static async updateRecipe(username, id, data) {
    const res = await this.request(`users/${username}/recipes/${id}`,
      data, "patch");
    return res.recipe;
  }

  /**
   * Delete a recipe.
   * Auth required: admin or same-user-as-:username
   * 
   * @param {String} username
   * @returns recipe id
   */
  static async deleteCategory(username, id) {
    const res = await this.request(`users/${username}/recipes/${id}`,
      {}, "delete");
    return res.deleted;
  }


}
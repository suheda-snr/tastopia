import { BACKEND_URL } from '../config.js'
import { Recipe } from './Recipe.js'
const RECIPES_ROUTE = '/recipes'; // Define your new route

class Recipes {
  #recipes = []
  
  getRecipes = () => {
    return new Promise(async(resolve,reject)=> {
      fetch(BACKEND_URL+ RECIPES_ROUTE)
      .then(response => response.json())
      .then(json => {
        this.#readJson(json)
        resolve(this.#recipes)
      }),(error) => {
        reject(error)
      }
    })
  }


  #readJson = (json) => {
    json.forEach(node => {
      const recipe = new Recipe(node.recipeid, node.title, node.description, node.ingredients, node.instructions,node.postdate, node.category, node.picture, node.username)
      this.#recipes.push(recipe)
    });
  }
}
export { Recipes }
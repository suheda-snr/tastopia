import { BACKEND_URL } from '../config.js'
import { Recipe } from './Recipe.js'

class Recipes {
  #recipes = []
  
  getRecipes = () => {
    return new Promise(async(resolve,reject)=> {
      fetch(BACKEND_URL)
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
      const recipe = new Recipe(node.recipeid, node.title, node.description, node.ingredients, node.instructions, node.postdate, node.category, node.picture)
      this.#recipes.push(recipe)
    });
  }
}
export { Recipes }
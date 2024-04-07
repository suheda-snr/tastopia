class Recipe {
  #recipeid
  #title
  #ingredients
  #iinstructions
  #postdate
  #category
  #picture

  constructor(recipeid, title, ingredients, iinstructions,postdate,category, picture) {
    this.#recipeid = recipeid
    this.#title = title
    this.#ingredients = ingredients
    this.#iinstructions = iinstructions
    this.#postdate = postdate
    this.#category = category
    this.#picture = picture
  }

  get id() {
    return this.#recipeid
  }

    get title() {
    return this.#title
    }
    
    get ingredients() {
    return this.#ingredients
    }

    get instructions() {
    return this.#iinstructions
    }
    
    get date() {
    return this.#postdate
    }

    get category() {
    return this.#category
    }

    get picture() {
    return this.#picture
    }


  get formattedDate() {
    const date_from_database = new Date(this.#postdate) 
    const day = date_from_database.getDate()
    const month = date_from_database.getMonth()
    const year = date_from_database.getFullYear()
    return `${day}.${month}.${year}`
  }

}

export { Recipe }
# 🍴 Tastopia – Recipe Sharing Platform

Tastopia is a recipe-sharing web application where users can explore, share, and interact with recipes. It brings together food lovers by allowing them to post their own recipes, rate and review others, and discover new favorites.

---

## 📸 Screenshots

#### Homepage
- Showcases **Most Beloved Recipes** (highest-rated).  
- Displays **You Might Also Like** section with personalized suggestions.  

<div style="margin-left: 40px;">
  <img src="./images/README/home.jpg" alt="Homepage Screenshot" width="70%">
</div>

#### Recipe Details Page
- View full recipe details: ingredients, steps, cooking time.  
- Registered users can:  
  - ⭐ Rate recipes  
  - 💬 Add reviews  
- All interactions happen directly on this page.  

<div style="margin-left: 40px;">
  <img src="./images/README/details.jpg" alt="DetailsPage Screenshot" width="70%">
</div> 

#### Recipe Sharing Page
- Registered users can submit their own recipes.  
- Includes fields for: Title, Ingredients, Instructions, Image upload.  

<div style="margin-left: 40px;">
  <img src="./images/README/sharing.jpg" alt="SharingPage Screenshot" width="70%">
</div> 

---

## 🔑 User Permissions

- **Guest users** can:  
  - Browse recipes  
  - View ratings & comments  

- **Registered users** can:  
  - Share new recipes  
  - Rate existing recipes  
  - Write reviews  

---

## ⚙️ Tech Stack

- **Frontend:** HTML, CSS, Bootstrap  
- **Backend:** Node.js + Express  
- **Database:** PostgreSQL with Sequelize ORM  
- **Authentication:** JWT (JSON Web Tokens)  

---

## 🚀 Features

- Browse recipes by category or search by title and ingredients     
- Share, rate, and review recipes (registered users only)  
- Suggestions on homepage 
- Responsive design for seamless browsing on any device 

---

## 🛠️ Installation & Setup

1. **Clone the repository:**

  ```bash
  git clone https://github.com/suheda-snr/tastopia.git
  cd tastopia
  ```

2. **Install dependencies:**

  ```bash
  npm install
  ```

3. **Set up environment variables:**

  Create a `.env` file in the root directory and add the following variables:

  ```env
  DB_USER=<your-database-username>
  DB_PASSWORD=<your-database-password>
  DB_HOST=<your-database-host>
  DB_PORT=<your-database-port>
  DB_NAME=<your-database-name>
  SESSION_SECRET=<your-session-secret>
  PORT=<your-application-port>
  ```
4. **Initialize the database:**

  Ensure PostgreSQL is running, then run the following command to initialize the database:

5. **Start the application:**

  ```bash
  node server/index.js
  ```

6. **Access the application:**

  Open your browser and navigate to [http://localhost:3001](http://localhost:3001) to start using Tastopia.
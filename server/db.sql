drop database if exists recipesharing;
create database recipesharing;
use recipesharing;
CREATE TABLE Users (
    UserID SERIAL PRIMARY KEY,
    Username VARCHAR(255) NOT NULL,
    Email VARCHAR(255) UNIQUE NOT NULL,
    Passwordhash VARCHAR(255) NOT NULL, 
    CreateDate TIMESTAMP NOT NULL
);
CREATE TABLE Recipes (
    RecipeID SERIAL PRIMARY KEY,
    UserID INT NOT NULL,
    Title VARCHAR(255) NOT NULL,
    Description TEXT NOT NULL ,
    Ingredients TEXT NOT NULL,
    Instructions TEXT NOT NULL,
    PostDate TIMESTAMP NOT NULL,
    Category VARCHAR(255) NOT NULL,
    Picture TEXT, -- Assuming the picture is stored as a URL or base64 encoded string
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);
CREATE TABLE Comments (
    CommentID SERIAL PRIMARY KEY,
    RecipeID INT NOT NULL,
    UserID INT NOT NULL,
    CommentText TEXT NOT NULL,
    CreateDate TIMESTAMP NOT NULL,
    FOREIGN KEY (RecipeID) REFERENCES Recipes(RecipeID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);
CREATE TABLE Ratings (
    RatingID SERIAL PRIMARY KEY,
    RecipeID INT NOT NULL,
    UserID INT NOT NULL,
    Rating INT CHECK (Rating >= 1 AND Rating <= 5),
    FOREIGN KEY (RecipeID) REFERENCES Recipes(RecipeID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);
CREATE TABLE SavedRecipes (
    SavedID SERIAL PRIMARY KEY,
    UserID INT NOT NULL,
    RecipeID INT NOT NULL,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (RecipeID) REFERENCES Recipes(RecipeID)
);
INSERT INTO Users (Username, Email, Passwordhash, CreateDate) 
VALUES 
    ('user1', 'user1@example.com', 'password_hash_1', NOW()),
    ('user2', 'user2@example.com', 'password_hash_2', NOW());

-- Inserting test recipes with descriptions
INSERT INTO Recipes (UserID, Title, Description, Ingredients, Instructions, PostDate, Category, Picture)
VALUES 
    (1, 'Roasted Orange Chicken Legs', 'A flavorful and zesty chicken dish with a citrus twist.', '1 cup freshly squeezed orange juice, 1/2 cup honey, 2 tablespoons olive oil, 3 cloves garlic, minced, 1 tablespoon orange zest, 11/2 teaspoons kosher salt, 1/2 teaspoon freshly ground pepper, 2 pounds chicken drumsticks, 4 mini sweet red bell peppers, 4 mini sweet yellow bell pepper, 1 large carrot, 1 large zucchini, 1 large squash, 1 orange', '1. Preheat oven to 400°F. 2. In large mixing bowl, whisk together, orange juice, honey, olive oil, garlic, orange zest, salt and pepper. Place chicken in a large shallow dish or zip-top plastic freezer bag. Add orange juice marinade; cover and seal and chill 30 minutes for up to 1 hour. 3. Remove chicken from marinade and place in a single layer in a large baking dish or roasting pan. Add bell peppers, carrots, zucchini, squash and oranges. Pour marinade evenly over the top. 4. Bake chicken, basting occasionally, 30 minutes or until an instant-read thermometer inserted in the chicken registers 165°F. If chicken needs more color, turn on the broiler to HIGH and broil chicken 3 to 5 minutes or until golden browned.', '2016-08-08', 'MAIN COURSE', NULL),
    (2, 'Hawaiian BBQ Chicken Pizza', 'A delightful pizza featuring the flavors of Hawaii and barbecue chicken.', '1 large pizza crust, 1/3 cup + 2 tablespoons barbecue sauce, 1 cup grated smoked Gouda cheese, 1 cup cooked and shredded chicken, 1/4 onion, 1/2 cup canned or fresh pineapple chunks, fresh cilantro', '1. Preheat oven according to pizza crust instructions and prepare pizza baking pan/stone, if using. 2. Toss 2 tablespoons of barbecue sauce with the cooked, chopped chicken to coat it. Set aside. 3. Spread 1/3 cup (more or less, depending on preference) barbecue sauce over pizza crust. Add a layer of 1/2 cup of cheese over the barbecue sauce. Next, top with chicken, the reserved cheese, sliced onion and pineapple. 4. Bake pizza according to crust instructions. I baked my pizza at 450 degrees F. for about 10 minutes. 5. Remove from the oven, top with fresh cilantro, slice and serve.', NOW(), 'MAIN COURSE', NULL),
    (1, 'Chicken Spinach Salad with Pomegranate', 'A refreshing salad combining chicken, spinach, and the tangy sweetness of pomegranate.', '2 kg chicken legs, 3 tbsp olive oil, 3 tbsp pomegranate molasses, 2 red onions, 1 lemon, 2 tbsp ground sumac, 700g Maris Piper potatoes, 80g pomegranate seeds, 50g flat-leaf parsley', 'Step 1. Place the chicken pieces in a large bowl with the olive oil, pomegranate molasses, red onions, lemon, sumac and a good sprinkling of sea salt and ground black pepper. Toss everything together well and marinade for at least 2 hours but preferably overnight. Step 2. When ready to cook, preheat the oven to 180°C/fan 160°C/gas mark 4. Tip the chicken and all the marinade ingredients out into a large roasting tin and add the potatoes. Place in the oven to roast for 45 minutes until the chicken has turned sticky and caramelised and the potatoes are cooked and golden. Step 3. Transfer to a large serving platter and scatter over the pomegranate seeds and parsley. Serve with any pan juices drizzled over the top.', NOW(), 'SALAD', NULL);
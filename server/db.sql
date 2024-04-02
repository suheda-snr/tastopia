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
    Ingredients TEXT NOT NULL,
    IInstructions TEXT NOT NULL,
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

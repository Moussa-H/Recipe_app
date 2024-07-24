-- Inserting data into users table
INSERT INTO users (first_name, last_name, username, password) VALUES
('John', 'Doe', 'johndoe', 'password123'),
('Jane', 'Smith', 'janesmith', 'password456'),
('Emily', 'Johnson', 'emilyjohnson', 'password789');

-- Inserting data into recipes table
INSERT INTO recipe (user_id, name, ingredients, steps, image_url) VALUES
(1, 'Spaghetti Carbonara', 'Spaghetti, eggs, pancetta, Parmesan cheese, black pepper', '1. Cook spaghetti. 2. Fry pancetta. 3. Mix eggs and cheese. 4. Combine all ingredients.', 'http://example.com/image1.jpg'),
(2, 'Chicken Curry', 'Chicken, curry powder, coconut milk, onions, garlic, ginger', '1. Sauté onions, garlic, and ginger. 2. Add curry powder. 3. Add chicken and cook. 4. Stir in coconut milk.', 'http://example.com/image2.jpg'),
(3, 'Vegetable Stir Fry', 'Mixed vegetables, soy sauce, garlic, ginger, olive oil', '1. Heat olive oil. 2. Add garlic and ginger. 3. Stir fry vegetables. 4. Add soy sauce and serve.', 'http://example.com/image3.jpg');

-- Inserting data into recipe_comments table
INSERT INTO comments (user_id, recipe_id, comment_text) VALUES
(1, 1, 'This is the best carbonara recipe I have ever tried!'),
(2, 2, 'Delicious! The curry has a great flavor.'),
(1, 3, 'The stir fry was quick and tasty.');

-- Inserting data into stars table
INSERT INTO stars (user_id, recipe_id, star) VALUES
(1, 1, 5),
(2, 2, 4),
(3, 3, 4);

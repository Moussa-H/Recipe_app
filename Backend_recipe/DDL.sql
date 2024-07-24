CREATE TABLE users (
  user_id int(11) NOT NULL AUTO_INCREMENT,
  first_name varchar(255) NOT NULL,
  last_name varchar(255) NOT NULL,
  username varchar(255) NOT NULL UNIQUE,
  password varchar(255) NOT NULL,
  PRIMARY KEY (user_id)
);

CREATE TABLE recipe (
  recipe_id int(11) NOT NULL AUTO_INCREMENT,
  user_id int(11) NOT NULL,
  name varchar(255) NOT NULL,
  ingredients text NOT NULL,
  steps text NOT NULL,
  image_url varchar(512) NOT NULL,
  PRIMARY KEY (recipe_id),
  FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE
);

CREATE TABLE comments (
  comment_id int(11) NOT NULL AUTO_INCREMENT,
  user_id int(11) NOT NULL,
  recipe_id int(11) NOT NULL,
  comment_text text NOT NULL,
  PRIMARY KEY (comment_id),
  FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE,
  FOREIGN KEY (recipe_id) REFERENCES recipes (recipe_id) ON DELETE CASCADE
);

CREATE TABLE stars (
  star_id int(11) NOT NULL AUTO_INCREMENT,
  user_id int(11) NOT NULL,
  recipe_id int(11) NOT NULL,
  star int(11) NOT NULL,
  PRIMARY KEY (star_id),
  FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE,
  FOREIGN KEY (recipe_id) REFERENCES recipes (recipe_id) ON DELETE CASCADE
);

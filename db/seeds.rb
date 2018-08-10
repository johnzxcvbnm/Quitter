# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Postgres commands to create tables and add basic seed data

# CREATE TABLE users (id SERIAL, user_name VARCHAR(32), password VARCHAR(32), avatar TEXT);
# CREATE TABLE posts (id SERIAL, post_content TEXT, image TEXT, user_id INT);

# INSERT INTO posts (post_content, image, user_id) VALUES ('This post is way too', 'https://i.ytimg.com/vi/_37IuCIaMFA/maxresdefault.jpg', 1), ('Is this a cat?', 'https://i.ytimg.com/vi/_37IuCIaMFA/maxresdefault.jpg', 1), ('What is this app abo', 'https://i.ytimg.com/vi/_37IuCIaMFA/maxresdefault.jpg', 2), ('I was going to go to the gym, but I decided to go to Dairy Queen Instead', 'https://i.ytimg.com/vi/_37IuCIaMFA/maxresdefault.jpg', 3);

# INSERT INTO users (user_name, password, avatar) VALUES ('John_K', '1234', 'https://vignette.wikia.nocookie.net/parody/images/e/e2/Super_Secret.jpg/revision/latest/scale-to-width-down/400?cb=20180120111247'), ('Jordan', '5678', 'https://vignette.wikia.nocookie.net/parody/images/e/e2/Super_Secret.jpg/revision/latest/scale-to-width-down/400?cb=20180120111247'), ('Sean', 'abc', 'https://vignette.wikia.nocookie.net/parody/images/e/e2/Super_Secret.jpg/revision/latest/scale-to-width-down/400?cb=20180120111247');

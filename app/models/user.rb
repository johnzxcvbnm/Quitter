class User
  DB = PG.connect({ :host => "localhost", :port => 5432, :dbname => 'quitter_app_development'})
  def self.all
    results = DB.exec(
        <<-SQL
          SELECT
           users.*,
           posts.id AS post_id,
           posts.post_content,
           posts.user_id,
           comments.id AS comment_id,
           comments.comment_content,
           comments.image
          FROM users
          LEFT JOIN posts
            ON posts.user_id = users.id
          LEFT JOIN comments
            ON users.id = comments.user_id
          ORDER BY users.id;
        SQL
    )
    users = []
    last_user_id = nil
    results.each do |result|
      if result["id"] != last_user_id
      new_user = {
        "id" => result["id"].to_i,
        "user_name" => result["user_name"],
        "password" => result["password"],
        "avatar" => result["avatar"],
        "posts" => [],
        "comments" => []
        }
        users.push(new_user)
        last_user_id = result["id"]
      end
      if result["comment_id"]
        users.last["comments"].push({
          "id" => result["comment_id"].to_i,
          "comment_content" => result["comment_content"],
          "user_name" => result["user_name"],
          "image" => result["image"]
        })
      end
      if result["post_id"]
        users.last["posts"].push({
          "id" => result["post_id"].to_i,
          "post_content" => result["post_content"],
          "image" => result["image"],
          "user_name" => result["user_name"]
          })
      end
    end
    return users
  end
  def self.find(id)
    results = DB.exec(
        <<-SQL
          SELECT users.*,
          posts.id as post_id,
          posts.post_content as post_content,
          posts.image as post_image,
          posts.user_id as post_user_id,
          comments.id as comment_id,
          comments.comment_content as comment_content,
          comments.image as comment_image,
          comments.user_id as comment_user_id,
          comments.post_id as comment_post_id
          FROM users
          LEFT JOIN posts
            ON users.id = posts.user_id
          LEFT JOIN comments
            ON users.id = comments.user_id
          WHERE users.id =#{id};
        SQL
    )
    posts = []
    results.each do |result|
      if result["post_id"]
        posts.push({
          "id" => result["post_id"].to_i,
          "post_content" => result["post_content"],
          "image" => result["post_image"],
          "user_name" => result["user_name"]
          })
      end
    end
    comments = []
    results.each do |result|
      if result["comment_id"]
        comments.push({
          "id" => result["comment_id"].to_i,
          "comment_content" => result["comment_content"],
          "image" => result["comment_image"],
          "user_name" => result["user_name"]
          })
      end
    end
    return {
        "id" => results.first["id"].to_i,
        "user_name" => results.first["user_name"],
        "password" => results.first["password"],
        "avatar" => results.first["avatar"],
        "post_id" => results.first["post_id"],
        "posts" => posts,
        "comments" => comments
    }
  end
  def self.create(opts)
    results = DB.exec(
        <<-SQL
            INSERT INTO users (user_name, password, avatar, post_id)
            VALUES ('#{opts["user_name"]}', '#{opts["password"]}', '#{opts["avatar"]}', '#{opts["post_id"]}')
            RETURNING id, user_name, password, avatar, post_id;
        SQL
    )
    return {
        "id" => results.first["id"].to_i,
        "user_name" => results.first["user_name"],
        "password" => results.first["password"],
        "avatar" => results.first["avatar"],
        "post_id" => results.first["post_id"]
    }
  end
  def self.delete(id)
    results = DB.exec("DELETE FROM users WHERE id=#{id};")
    return {"deleted" => true}
  end
  def self.update(id, opts)
    results = DB.exec(
        <<-SQL
            UPDATE users
            SET user_name='#{opts["user_name"]}', password='#{opts["password"]}', avatar='#{opts["avatar"]}', post_id=#{opts["post_id"]}
            WHERE id=#{id}
            RETURNING id, user_name, password, avatar, post_id
        SQL
    )
    return {
        "id" => results.first["id"].to_i,
        "user_name" => results.first["user_name"],
        "password" => results.first["password"],
        "avatar" => results.first["avatar"],
        "post_id" => results.first["post_id"]
    }
  end
end

class User
  DB = PG.connect({ :host => "localhost", :port => 5432, :dbname => 'quitter_app_development'})

  def self.all
    results = DB.exec(
        <<-SQL
          SELECT
           users.*,
           posts.id AS post_id,
           posts.post_content, posts.user_id
          FROM users
          LEFT JOIN posts
            ON users.id = posts.user_id
          ORDER BY users.id;
        SQL
    )
    users = []
    last_id = nil
    results.each do |result|
      if result["id"] != last_id
        users.push({
        "id" => result["id"].to_i,
        "user_name" => result["user_name"],
        "password" => result["password"],
        "avatar" => result["avatar"],
        "post_id" => result["post_id"],
        "posts" => []
        })
        last_id = result["id"]
      end
      if result["post_id"]
        users.last["posts"].push({
          "id" => result["post_id"].to_i,
          "post_content" => result["post_content"],
          "image" => result["image"],
          "user_id" => result["user_id"].to_i
          })
      end
    end
    return users
  end

  def self.find(id)
    results = DB.exec(
        <<-SQL
          SELECT *
          FROM users
          JOIN posts
          ON users.id = posts.user_id
          WHERE users.id =#{id};
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

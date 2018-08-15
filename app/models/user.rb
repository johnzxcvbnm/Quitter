class User
  DB = PG.connect({ :host => "localhost", :port => 5432, :dbname => 'quitter_app_development'})
  def self.all
      results = DB.exec(
          <<-SQL
            SELECT users.*,
            posts.id as postid,
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
            ORDER BY users.id ASC;
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
        posts = []
        comments = []
        last_comment_id = nil
        if result["comment_id"]
          puts result["comment_id"]
          if result["comment_id"] != last_comment_id
          new_comment = ({
            "id" => result["comment_id"].to_i,
            "comment_content" => result["comment_content"],
            "user_name" => result["user_name"],
            "image" => result["comment_image"]
          })
          users.last["comments"].push(new_comment)
          last_comment_id = result["comment_id"]
          end
        end


        last_post_id = nil
          if result["postid"] != last_post_id
            puts result["postid"]
            users.last["posts"].push({
            "id" => result["postid"].to_i,
            "post_content" => result["post_content"],
            "image" => result["post_image"],
            "user_name" => result["user_name"]
            })
            last_post_id = result["postid"]

        end
      end
      users.each do |user|
        user["posts"] = user["posts"].uniq
        user["comments"] = user["comments"].uniq
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
              ON posts.user_id = users.id
            LEFT JOIN comments
              ON users.id = comments.user_id
            WHERE users.id =#{id};
          SQL
      )
      posts = []
      last_post_id = nil
      results.each do |result|
        if result["post_id"]
          if result["post_id"] != last_post_id
          posts.push({
            "id" => result["post_id"].to_i,
            "post_content" => result["post_content"],
            "image" => result["post_image"],
            "user_name" => result["user_name"]
            })
        end
        last_post_id = result["post_id"]
        end
      end
      comments = []
      last_comment_id = nil
      results.each do |result|
        if result["comment_id"]
          if result["comment_id"] != last_comment_id
          comments.push({
            "id" => result["comment_id"].to_i,
            "comment_content" => result["comment_content"],
            "image" => result["comment_image"],
            "user_name" => result["user_name"]
            })
        end
        last_comment_id = result["comment_id"]
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
            INSERT INTO users (user_name, password, avatar)
            VALUES ('#{opts["user_name"]}', '#{opts["password"]}', '#{opts["avatar"]}')
            RETURNING id, user_name, password, avatar;
        SQL
    )
    return {
        "id" => results.first["id"].to_i,
        "user_name" => results.first["user_name"],
        "password" => results.first["password"],
        "avatar" => results.first["avatar"],

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
            SET user_name='#{opts["user_name"]}', password='#{opts["password"]}', avatar='#{opts["avatar"]}'
            WHERE id=#{id}
            RETURNING id, user_name, password, avatar
        SQL
    )
    return {
        "id" => results.first["id"].to_i,
        "user_name" => results.first["user_name"],
        "password" => results.first["password"],
        "avatar" => results.first["avatar"],

    }
  end
  def self.findByName(name)
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
          WHERE user_name =#{name};
        SQL
    )
    posts = []
    results.each do |result|
      if result["post_id"]
        posts.push({
          "id" => result["post_id"].to_i,
          "post_content" => result["post_content"],
          "image" => result["post_image"],
          "user_name" => result["user_name"],
          "avatar" => result["avatar"]
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
end

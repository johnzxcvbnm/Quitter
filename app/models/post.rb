class Post
  # Connect to the database
  DB = PG.connect({
    :host => 'localhost',
    :port => 5432,
    :dbname => 'quitter_app_development'
  })

  #Pulls all the posts along with their user who created it
  def self.all
    results = DB.exec(
      <<-SQL
        SELECT
          posts.*,
          users.avatar,
          users.user_name
        FROM posts
        JOIN users
          ON posts.user_id = users.id
        ORDER BY posts.id DESC;
      SQL
    )
    return results.map do |result|
      {
        "id" => result["id"].to_i,
        "post_content" => result["post_content"],
        "image" => result["image"],
        "user_id" => result["user_id"].to_i,
        "user_name" => result["user_name"],
        "avatar" => result["avatar"]
      }
    end
  end

  # Pulls one specific Post
  def self.find(id)
    results = DB.exec(
      <<-SQL
        SELECT *
        FROM posts
        JOIN users
          ON posts.user_id = users.id
        WHERE posts.id = #{id};
      SQL
    ).first
    return {
      "id" => results["id"].to_i,
      "post_content" => results["post_content"],
      "image" => results["image"],
      "user_id" => results["user_id"].to_i,
      "user_name" => results["user_name"],
      "avatar" => results["avatar"]
    }
  end

  # Create a new Post
  def self.create(opts)
    results = DB.exec(
      <<-SQL
        INSERT INTO posts (post_content, image, user_id)
        VALUES ( '#{opts["post_content"]}', '#{opts["image"]}', #{opts["user_id"]})
        RETURNING id, post_content, image, user_id;
      SQL
    ).first
    return {
      "id" => results["id"].to_i,
      "post_content" => results["post_content"],
      "image" => results["image"],
      "user_id" => results["user_id"].to_i
    }
  end

  # Delete a post at ID
  def self.delete(id)
    results = DB.exec(
      <<-SQL
        DELETE FROM posts WHERE id = #{id};
      SQL
    )
    return { "DELETED" => true }
  end

  # Update a post at ID
  def self.update(id, opts)
    results = DB.exec(
      <<-SQL
        UPDATE posts
        SET post_content = '#{opts["post_content"]}',
            image = '#{opts["image"]}',
            user_id = #{opts["user_id"]}
        WHERE id = #{id}
        RETURNING id, post_content, image, user_id;
      SQL
    ).first
    return {
      "id" => results["id"].to_i,
      "post_content" => results["post_content"],
      "image" => results["image"],
      "user_id" => results["user_id"].to_i
    }
  end
end

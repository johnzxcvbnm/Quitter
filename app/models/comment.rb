class Comment
# connet to the quitter app development database
if(ENV['DATABASE_URL'])
       uri = URI.parse(ENV['DATABASE_URL'])
       DB = PG.connect(uri.hostname, uri.port, nil, nil, uri.path[1..-1], uri.user, uri.password)
   else
       DB = PG.connect(host: "localhost", port: 5432, dbname: 'quitter_app_development')
   end

# pulls all the comments along with the user who made it
  def self.all
    results = DB.exec(
      <<-SQL
      SELECT * FROM
        comments
      LEFT JOIN
        users
      ON
        comments.user_id = users.id
      SQL
    )
    return results.map do |result|
      {
        "id" => result["id"].to_i,
        "comment_content" => result["comment_content"],
        "image" => result["image"],
        "username" => result["username"],
        "avatar" => result["avatar"]
      }
    end
  end

# creates a new comment
  def self.create(opts)
    results = DB.exec(
      <<-SQL
      INSERT INTO
        comments (comment_content, image, user_id, post_id)
        Values ( '#{opts["comment_content"]}', '#{opts["image"]}', #{opts["user_id"]}, #{opts["post_id"]})
        RETURNING id, comment_content, image, user_id, post_id;
      SQL
    )
    results = results.first
    return {
      "id" => results["id"].to_i,
      "comment_content" => results["comment_content"],
      "image" => results["image"],
      "user_id" => results["user_id"].to_i,
      "post_id" => results["post_id"].to_i
    }
  end

# deletes a new comment
  def self.delete(id)
    results = DB.exec(
      <<-SQL
      DELETE FROM comments WHERE id = #{id};
      SQL
    )
    return { "DELETED" => true}
  end

# updates one specific comment
  def self.update(id, opts)
    results = DB.exec(
      <<-SQL
        UPDATE comments
        SET comment_content = '#{opts["comment_content"]}',
            image = '#{opts["image"]}',
            user_id = #{opts["user_id"]},
            post_id = #{opts["post_id"]}
        WHERE id = #{id}
        RETURNING id, comment_content, image, user_id, post_id;
      SQL
    )
    results = results.first
    return {
      "id" => results["id"].to_i,
      "comment_content" => results["comment_content"],
      "image" => results["image"],
      "user_id" => results["user_id"].to_i,
      "post_id" => results["post_id"].to_i
    }
  end
end

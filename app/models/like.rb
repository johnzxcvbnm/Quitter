class Like
  DB = PG.connect({ :host => "localhost", :port => 5432, :dbname => 'quitter_app_development'})

  def self.all
    results = DB.exec("SELECT * FROM likes;")
    return results.map do |result|
      {
        "id" => result["id"].to_i,
        "user_id" => result["user_id"].to_i,
        "post_id" => result["post_id"].to_i
      }
    end
  end

  def self.find(id)
    results = DB.exec("SELECT * FROM likes WHERE id=#{id};")
    return {
        "id" => results.first["id"].to_i,
        "user_id" => results.first["user_id"].to_i,
        "post_id" => results.first["post_id"].to_i
    }
  end

  def self.create(opts)
    results = DB.exec(
        <<-SQL
            INSERT INTO likes (user_id, post_id)
            VALUES ( #{opts["user_id"]}, #{opts["post_id"]})
            RETURNING id, user_id, post_id;
        SQL
    )
    return {
        "id" => results.first["id"].to_i,
        "user_id" => results.first["user_id"].to_i,
        "post_id" => results.first["post_id"].to_i
    }
  end

  def self.delete(id)
    results = DB.exec("DELETE FROM likes WHERE id=#{id};")
    return {"deleted" => true}
  end
  def self.update(id, opts)
    results = DB.exec(
        <<-SQL
            UPDATE likes
            SET user_id=#{opts["user_id"]}, post_id=#{opts["post_id"]}
            WHERE id=#{id}
            RETURNING id, user_id, post_id
        SQL
    )
    return {
        "id" => results.first["id"].to_i,
        "user_id" => results.first["user_id"].to_i,
        "post_id" => results.first["post_id"].to_i
    }
  end
end

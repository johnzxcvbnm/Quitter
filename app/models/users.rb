class User
  DB = PG.connect({ :host => "localhost", :port => 5432, dbname: => 'quitter_app_development'})

  def self.all
    results = DB.exec("SELECT * FROM users;")
    return results.map do |result|
      {
        "id" => result["id"].to_i,
        "user_name" => result["user_name"],
        "password" => result["password"],
        "avatar" => result["avatar"]
      }
    end
  end

  def self.find(id)
    results = DB.exec("SELECT * FROM users WHERE id=#{id};")
    return {
        "id" => results.first["id"].to_i,
        "user_name" => results.first["user_name"],
        "password" => results.first["password"],
        "avatar" => results.first["avatar"]
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
        "avatar" => results.first["avatar"]
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
        "avatar" => results.first["avatar"]
    }
  end
end

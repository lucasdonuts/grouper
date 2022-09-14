User.destroy_all
Group.destroy_all
UserGroup.destroy_all
Post.destroy_all
# Comment.destroy_all

User.reset_pk_sequence
Group.reset_pk_sequence
UserGroup.reset_pk_sequence
Post.reset_pk_sequence
# Comment.reset_pk_sequence

Faker::Name.unique.clear

10.times do
  User.create!(
    first_name: Faker::Name.unique.first_name,
    last_name: Faker::Name.unique.last_name,
    username: Faker::Internet.unique.username,
    bio: Faker::Hacker.say_something_smart,
    image_url: "https://cdn.dribbble.com/users/6142/screenshots/5679189/media/1b96ad1f07feee81fa83c877a1e350ce.png?compress=1&resize=400x300&vertical=top",
    password_digest: User.digest('password')
  )
end

Group.create(name: "Star Wars Fans", description: "Anything and everything Star Wars", image_url: "https://steamuserimages-a.akamaihd.net/ugc/1000306209427540478/331F32D5272625195BBA890FA41CFFFD9AE76CFD/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false")
Group.create(name: "Star Wars Haters", description: "Star Wars is crap and you know it")
Group.create(name: "Basketball", description: Faker::Lorem.sentence)
Group.create(name: "Flatiron School", description: Faker::Lorem.sentence)
Group.create(name: "American Football", description: Faker::Lorem.sentence)
Group.create(name: "Soccer", description: Faker::Lorem.sentence)
Group.create(name: "Esports", description: Faker::Lorem.sentence)

Group.all.each do |group|
  rand(3..15).times do
    Post.create!(text: Faker::Hipster.paragraph, group: group, user: User.all.sample)
  end
end
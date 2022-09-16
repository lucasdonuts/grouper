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

20.times do
  User.create!(
    first_name: Faker::Name.unique.first_name,
    last_name: Faker::Name.unique.last_name,
    username: Faker::Internet.unique.username,
    bio: Faker::Hacker.say_something_smart,
    image_url: Faker::Avatar.image,
    password_digest: User.digest('password')
  )
end

Group.create(name: "Star Wars Fans", description: "Anything and everything Star Wars", image_url: "https://steamuserimages-a.akamaihd.net/ugc/1000306209427540478/331F32D5272625195BBA890FA41CFFFD9AE76CFD/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false")
Group.create(name: "Star Wars Haters", description: "Star Wars is crap and you know it", image_url: "https://www.geeksofdoom.com/GoD/img/2012/10/2012-10-06-starwarsno.jpg")
Group.create(name: "Basketball", description: Faker::Lorem.sentence, image_url: "https://stacknj.com/wp-content/uploads/2021/08/basketball.jpeg")
Group.create(name: "Flatiron School", description: Faker::Lorem.sentence, image_url: "https://mma.prnewswire.com/media/1488233/Flatiron_Primary__Logo_Blue_highres_Logo.jpg?p=facebook")
Group.create(name: "American Football", description: Faker::Lorem.sentence, image_url: "https://olympics.nbcsports.com/wp-content/uploads/sites/10/2022/04/GettyImages-1237679853-e1649181927440.jpg?w=811")
Group.create(name: "Soccer", description: Faker::Lorem.sentence, image_url: "https://cdn.britannica.com/51/190751-050-147B93F7/soccer-ball-goal.jpg?q=60")
Group.create(name: "Esports", description: Faker::Lorem.sentence, image_url: "https://www.gannett-cdn.com/presto/2021/03/23/NTEG/b8203b70-6485-4e1b-8c45-be77d983edac-esports-logo.png")

# All users join random groups
User.all.each do |user|
  groups = Group.all.sample(rand(3..15))
  groups.each do |group|
    UserGroup.create!(user: user, group: group)
  end
end

# Create random posts in each group with users
Group.all.each do |group|
  rand(3..15).times do
    Post.create!(text: Faker::Hipster.paragraph, group: group, user: group.users.sample)
  end unless !group.users
end
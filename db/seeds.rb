User.destroy_all
Group.destroy_all
UserGroup.destroy_all
# Post.destroy_all
# Comment.destroy_all

User.reset_pk_sequence
Group.reset_pk_sequence
UserGroup.reset_pk_sequence
# Post.reset_pk_sequence
# Comment.reset_pk_sequence

Group.create(name: "Star Wars Fans", description: "Anything and everything Star Wars")
Group.create(name: "Star Wars Haters", description: "Star Wars is crap and you know it")
Group.create(name: "Basketball", description: Faker::Lorem.sentence)
Group.create(name: "Flatiron School", description: Faker::Lorem.sentence)
Group.create(name: "American Football", description: Faker::Lorem.sentence)
Group.create(name: "Soccer", description: Faker::Lorem.sentence)
Group.create(name: "Esports", description: Faker::Lorem.sentence)
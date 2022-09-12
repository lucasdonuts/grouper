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
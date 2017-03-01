import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  if (!Posts.findOne()) {
  	Posts.insert({
  		name: "Creative title",
  		tags: ["creative", "amazing"]
  	});
  }
});


Meteor.publish("posts", () => {
	return Posts.find({tags: {$not: /^cre/im} });
});
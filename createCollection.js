const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/guilds', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define GuildMember schema
const guildMemberSchema = new mongoose.Schema({
  guild: String, // Change guildName to guild
  name: String,
  age: Number,
});

// Create GuildMember model
const GuildMember = mongoose.model('GuildMember', guildMemberSchema);

// Create guilds collection and add members
const createCollection = async () => {
  try {
    // Guild 1 members
    await GuildMember.create({ guild: 'Guild 1', name: 'Member1', age: 25 });
    await GuildMember.create({ guild: 'Guild 1', name: 'Member2', age: 30 });
    await GuildMember.create({ guild: 'Guild 1', name: 'Member3', age: 28 });
    await GuildMember.create({ guild: 'Guild 1', name: 'Member4', age: 22 });

    // Guild 2 members
    await GuildMember.create({ guild: 'Guild 2', name: 'Member1', age: 27 });
    await GuildMember.create({ guild: 'Guild 2', name: 'Member2', age: 32 });
    await GuildMember.create({ guild: 'Guild 2', name: 'Member3', age: 26 });

    // Guild 3 members
    await GuildMember.create({ guild: 'Guild 3', name: 'Member1', age: 29 });
    await GuildMember.create({ guild: 'Guild 3', name: 'Member2', age: 34 });
    await GuildMember.create({ guild: 'Guild 3', name: 'Member3', age: 31 });
    await GuildMember.create({ guild: 'Guild 3', name: 'Member4', age: 23 });
    await GuildMember.create({ guild: 'Guild 3', name: 'Member5', age: 27 });

    console.log('Guild members added successfully.');
  } catch (error) {
    console.error('Error adding guild members:', error);
  } finally {
    // Close the connection after adding members
    mongoose.connection.close();
  }
};

// Execute the createCollection function
createCollection();


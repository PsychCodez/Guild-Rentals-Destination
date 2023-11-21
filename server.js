// server.js - This file sets up the Express server with MongoDB

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8000;

app.use(cors());
app.options('*', cors());


app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/guilds', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const guildMemberSchema = new mongoose.Schema({
    guild: String,
    name: String,
    age: Number,
});

const GuildMember = mongoose.model('GuildMember', guildMemberSchema);

app.post('/api/addMember', async (req, res) => {
    const { guildName, name, age } = req.body;

    try {
        const newMember = new GuildMember({ guild: guildName, name, age });
        await newMember.save();
        res.status(200).send('Member added successfully.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to add member.');
    }
});

app.get('/', (req, res) => {
  res.send('Hello, this is the root route!');
});



app.get('/api/getMembers/:guildName', async (req, res) => {
    const guildName = req.params.guildName;

    try {
        const members = await GuildMember.find({ guild: guildName }, { _id: 0, name: 1 });
        res.json(members);
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to fetch guild members.');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// guild_page.js

async function joinGuild(guildName) {
  try {
    // Fetch and display guild members
    const members = await fetchGuildMembers(guildName);
    alert(`Current members of ${guildName}:\n${members.join('\n')}`);

    const confirmJoin = confirm(`Do you want to join ${guildName}?`);

    if (confirmJoin) {
      const name = prompt('Enter your name:');
      const age = prompt('Enter your age:');

      if (name && age) {
        const response = await fetch('http://localhost:8000/api/addMember', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ guildName, name, age: parseInt(age, 10) }),
        });

        if (response.ok) {
          alert('Joined successfully!');
        } else {
          alert('Failed to join. Please try again.');
        }
      } else {
        alert('Name and age are required.');
      }
    }
  } catch (error) {
    console.error('An error occurred:', error);
    alert('An error occurred. Please try again later.');
  }
}

async function fetchGuildMembers(guildName) {
  try {

    const response = await fetch(`http://localhost:8000/api/getMembers/${guildName}`);
    if (response.ok) {
      const members = await response.json();
      return members.map(member => member.name);
    } else {
      console.error(`Failed to fetch guild members: ${response.status}`);
      return [];
    }
  } catch (error) {
    console.error('An error occurred while fetching guild members:', error);
    return [];
  }
}

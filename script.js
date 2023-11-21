async function joinGuild(guildName) {
  try {
    // Fetch guild members from the server
    const membersResponse = await fetch(`http://localhost:8000/api/getMembers/${guildName}`);
    if (!membersResponse.ok) {
      throw new Error(`Failed to fetch guild members: ${membersResponse.status}`);
    }

    const members = await membersResponse.json();

    // Display guild members
    const memberNames = members.map(member => member.name).join(', ');
    const confirmJoin = confirm(`Guild Members: ${memberNames}\n\nDo you want to join ${guildName}?`);

    if (confirmJoin) {
      const name = prompt('Enter your name:');
      const age = prompt('Enter your age:');

      if (name && age) {
        // Add the new member to the database
        const addMemberResponse = await fetch('http://localhost:8000/api/addMember', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ guildName, name, age: parseInt(age, 10) }),
        });

        if (!addMemberResponse.ok) {
          throw new Error('Failed to join. Please try again.');
        }

        // Fetch and display updated guild members
        const updatedMembersResponse = await fetch(`http://localhost:8000/api/getMembers/${guildName}`);
        if (updatedMembersResponse.ok) {
          const updatedMembers = await updatedMembersResponse.json();
          renderMembers(updatedMembers);
          alert('Joined successfully!');
        } else {
          throw new Error(`Failed to fetch updated guild members: ${updatedMembersResponse.status}`);
        }
      } else {
        alert('Name and age are required.');
      }
    }
  } catch (error) {
    console.error(error);
    alert('An error occurred. Please try again later.');
  }
}

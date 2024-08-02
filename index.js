import React from 'react';

function UserForm() {
    const handleSubmit = async (event) => {
        event.preventDefault();

        const name = event.target.name.value;
        const email = event.target.email.value;

        const response = await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email }),
        });

        const responseData = await response.json();
        console.log(responseData);
    };

    return (
        <div>
            <h1>Create User</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" required />
                <br /><br />
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required />
                <br /><br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default UserForm;

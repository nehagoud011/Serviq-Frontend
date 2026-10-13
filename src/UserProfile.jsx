import { useState } from 'react';
import './UserProfile.css';

function UserProfile() {
  const [user, setUser] = useState({
    name: 'Neha',
    email: 'neha@example.com',
    phone: '',
    location: 'Hyderabad, India',
  });

  const [savedUser, setSavedUser] = useState(user);
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState('');

  function handleChange(event) {
    const { name, value } = event.target;

    setUser((previousUser) => ({
      ...previousUser,
      [name]: value,
    }));
  }

  function handleSave(event) {
    event.preventDefault();

    if (!user.name.trim() || !user.email.trim()) {
      setMessage('Please enter your name and email.');
      return;
    }

    setSavedUser({ ...user });
    setEditing(false);
    setMessage('Profile updated successfully!');
  }

  function handleCancel() {
    setUser({ ...savedUser });
    setEditing(false);
    setMessage('');
  }

  return (
    <main className="profile-page">
      <section className="profile-header">
        <p className="eyebrow">YOUR ACCOUNT</p>
        <h1>My Profile</h1>
        <p>
          Manage your personal information and keep your
          Serviq account details up to date.
        </p>
      </section>

      <section className="profile-container">
        <div className="profile-card">
          <div className="profile-card-header">
            <div className="profile-avatar">
              {savedUser.name.trim()
                ? savedUser.name.trim()[0].toUpperCase()
                : 'U'}
            </div>

            <div className="profile-heading">
              <h2>{savedUser.name || 'Your Name'}</h2>
              <p>{savedUser.email}</p>
            </div>

            {!editing && (
              <button
                type="button"
                className="profile-edit-button"
                onClick={() => {
                  setUser({ ...savedUser });
                  setEditing(true);
                  setMessage('');
                }}
              >
                Edit Profile
              </button>
            )}
          </div>

          {message && (
            <div className="profile-message" role="status">
              {message}
            </div>
          )}

          <form onSubmit={handleSave}>
            <div className="profile-form-grid">
              <div className="profile-field">
                <label htmlFor="name">Full Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  disabled={!editing}
                  required
                />
              </div>

              <div className="profile-field">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  disabled={!editing}
                  required
                />
              </div>

              <div className="profile-field">
                <label htmlFor="phone">Phone Number</label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={user.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  disabled={!editing}
                />
              </div>

              <div className="profile-field">
                <label htmlFor="location">Location</label>
                <input
                  id="location"
                  type="text"
                  name="location"
                  value={user.location}
                  onChange={handleChange}
                  placeholder="Enter your location"
                  disabled={!editing}
                />
              </div>
            </div>

            {editing && (
              <div className="profile-form-actions">
                <button
                  type="submit"
                  className="profile-save-button"
                >
                  Save Changes
                </button>

                <button
                  type="button"
                  className="profile-cancel-button"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            )}
          </form>
        </div>

        <section className="profile-overview">
          <h2>Your Serviq Overview</h2>
          <p className="profile-overview-description">
            Everything you need to manage your belongings in one place.
          </p>

          <div className="profile-overview-grid">
            <article className="profile-overview-card">
              <div className="overview-icon">🚗</div>
              <h3>My Assets</h3>
              <p>Manage your vehicles and home appliances.</p>
            </article>

            <article className="profile-overview-card">
              <div className="overview-icon">🛠️</div>
              <h3>Service History</h3>
              <p>Review your previous repairs and maintenance records.</p>
            </article>

            <article className="profile-overview-card">
              <div className="overview-icon">🛡️</div>
              <h3>Warranty Care</h3>
              <p>Keep warranty information organized for your assets.</p>
            </article>
          </div>
        </section>
      </section>
    </main>
  );
}

export default UserProfile;
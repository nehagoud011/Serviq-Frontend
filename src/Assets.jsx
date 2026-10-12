
import { useEffect, useState } from 'react';
import { getAllAssets, addAsset, deleteAsset } from './services/assetService';

function Assets() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    assetName: '',
    category: 'Car',
    brand: '',
    model: '',
    purchaseDate: '',
    warrantyExpiry: '',
    description: '',
  });

  async function loadAssets() {
    try {
      setError('');
      const data = await getAllAssets();
      setAssets(data);
    } catch {
      setError('Could not load assets. Check that the backend is running.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAssets();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setError('');
      await addAsset(form);

      setForm({
        assetName: '',
        category: 'Car',
        brand: '',
        model: '',
        purchaseDate: '',
        warrantyExpiry: '',
        description: '',
      });

      await loadAssets();
    } catch {
      setError('Could not save the asset. Please check the backend.');
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Are you sure you want to delete this asset?')) {
      return;
    }

    try {
      setError('');
      await deleteAsset(id);
      await loadAssets();
    } catch {
      setError('Could not delete the asset.');
    }
  }

  return (
    <main className="assets-page">
      <header className="assets-header">
        <p className="eyebrow">YOUR PERSONAL INVENTORY</p>
        <h1>Asset Management</h1>
        <p>Keep your vehicles and appliances organized in one place.</p>
      </header>

      {error && <p role="alert" className="assets-error">{error}</p>}

      <section className="assets-panel">
        <h2>Add a new asset</h2>

        <form className="assets-form" onSubmit={handleSubmit}>
          <label>
            Asset name *
            <input
              name="assetName"
              value={form.assetName}
              onChange={handleChange}
              placeholder="e.g. Family car"
              required
            />
          </label>

          <label>
            Category *
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
            >
              <option>Car</option>
              <option>Bike</option>
              <option>AC</option>
              <option>Washing Machine</option>
              <option>Refrigerator</option>
              <option>Laptop</option>
              <option>Other</option>
            </select>
          </label>

          <label>
            Brand
            <input
              name="brand"
              value={form.brand}
              onChange={handleChange}
              placeholder="e.g. Samsung"
            />
          </label>

          <label>
            Model
            <input
              name="model"
              value={form.model}
              onChange={handleChange}
              placeholder="Enter model"
            />
          </label>

          <label>
            Purchase date
            <input
              type="date"
              name="purchaseDate"
              value={form.purchaseDate}
              onChange={handleChange}
            />
          </label>

          <label>
            Warranty expiry
            <input
              type="date"
              name="warrantyExpiry"
              value={form.warrantyExpiry}
              onChange={handleChange}
            />
          </label>

          <label className="assets-full-width">
            Description
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Add any useful details"
              rows="3"
            />
          </label>

          <button className="primary-button" type="submit">
            Add Asset
          </button>
        </form>
      </section>

      <section className="assets-panel">
        <h2>Your assets ({assets.length})</h2>

        {loading ? (
          <p>Loading assets...</p>
        ) : assets.length === 0 ? (
          <p>No assets added yet. Use the form above to add your first asset.</p>
        ) : (
          <div className="assets-list">
            {assets.map((asset) => (
              <article className="saved-asset" key={asset.id}>
                <div>
                  <h3>{asset.assetName}</h3>
                  <p>{asset.category} {asset.brand ? `· ${asset.brand}` : ''} {asset.model ? `· ${asset.model}` : ''}</p>
                  {asset.warrantyExpiry && (
                    <small>Warranty expiry: {asset.warrantyExpiry}</small>
                  )}
                  {asset.description && <p>{asset.description}</p>}
                </div>

                <button
                  type="button"
                  className="delete-asset-button"
                  onClick={() => handleDelete(asset.id)}
                >
                  Delete
                </button>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Assets;

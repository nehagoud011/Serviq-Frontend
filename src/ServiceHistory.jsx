
import { useEffect, useState } from 'react';
import {
  getAllServiceRecords,
  addServiceRecord,
  deleteServiceRecord,
} from './services/serviceRecordService';

function ServiceHistory() {
  const [records, setRecords] = useState([]);
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    assetId: '',
    serviceDate: '',
    serviceType: 'Maintenance',
    description: '',
    serviceProvider: '',
    cost: '',
  });

  async function loadRecords() {
    try {
      setError('');
      const response = await getAllServiceRecords();
      setRecords(response);
    } catch {
      setError('Could not load service records. Check your backend.');
    } finally {
      setLoading(false);
    }
  }

  async function loadAssets() {
    try {
      const response = await fetch('http://localhost:8080/api/assets');
      if (!response.ok) throw new Error('Failed to load assets');
      setAssets(await response.json());
    } catch {
      setError('Could not load assets. Please check your backend.');
    }
  }

  useEffect(() => {
    loadAssets();
    loadRecords();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setError('');

      await addServiceRecord({
        ...form,
        assetId: Number(form.assetId),
        cost: Number(form.cost),
      });

      setForm({
        assetId: '',
        serviceDate: '',
        serviceType: 'Maintenance',
        description: '',
        serviceProvider: '',
        cost: '',
      });

      await loadRecords();
    } catch {
      setError('Could not save the service record. Please try again.');
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this service record?')) return;

    try {
      setError('');
      await deleteServiceRecord(id);
      await loadRecords();
    } catch {
      setError('Could not delete the service record.');
    }
  }

  function getAssetName(assetId) {
    const asset = assets.find((item) => item.id === assetId);
    return asset ? asset.assetName : `Asset #${assetId}`;
  }

  return (
    <main className="assets-page">
      <header className="assets-header">
        <p className="eyebrow">MAINTENANCE TRACKER</p>
        <h1>Service &amp; Repair History</h1>
        <p>
          Record repairs, track maintenance costs, and keep every service
          organized.
        </p>
      </header>

      {error && (
        <p role="alert" className="assets-error">
          {error}
        </p>
      )}

      <section className="assets-panel">
        <h2>Add a service record</h2>

        <form className="assets-form" onSubmit={handleSubmit}>
          <label>
            Select asset *
            <select
              name="assetId"
              value={form.assetId}
              onChange={handleChange}
              required
            >
              <option value="">Choose an asset</option>
              {assets.map((asset) => (
                <option key={asset.id} value={asset.id}>
                  {asset.assetName} ({asset.category})
                </option>
              ))}
            </select>
          </label>

          <label>
            Service date *
            <input
              type="date"
              name="serviceDate"
              value={form.serviceDate}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Service type *
            <select
              name="serviceType"
              value={form.serviceType}
              onChange={handleChange}
              required
            >
              <option>Maintenance</option>
              <option>Repair</option>
              <option>Inspection</option>
              <option>Replacement</option>
              <option>Other</option>
            </select>
          </label>

          <label>
            Service provider
            <input
              name="serviceProvider"
              value={form.serviceProvider}
              onChange={handleChange}
              placeholder="e.g. Authorized service center"
            />
          </label>

          <label>
            Cost (₹) *
            <input
              type="number"
              name="cost"
              min="0"
              step="0.01"
              value={form.cost}
              onChange={handleChange}
              placeholder="e.g. 1500"
              required
            />
          </label>

          <label className="assets-full-width">
            Description *
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe the repair or maintenance work"
              rows="3"
              required
            />
          </label>

          <button className="primary-button" type="submit">
            Save Service Record
          </button>
        </form>
      </section>

      <section className="assets-panel">
        <h2>Previous services ({records.length})</h2>

        {loading ? (
          <p>Loading service records...</p>
        ) : records.length === 0 ? (
          <p>No service records yet. Add your first record above.</p>
        ) : (
          <div className="assets-list">
            {records.map((record) => (
              <article className="saved-asset" key={record.id}>
                <div>
                  <h3>{getAssetName(record.assetId)}</h3>
                  <p>
                    {record.serviceType} · {record.serviceDate}
                  </p>
                  <p>{record.description}</p>
                  {record.serviceProvider && (
                    <p>Provider: {record.serviceProvider}</p>
                  )}
                  <small>
                    Maintenance cost: ₹
                    {Number(record.cost || 0).toLocaleString('en-IN', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </small>
                </div>

                <button
                  type="button"
                  className="delete-asset-button"
                  onClick={() => handleDelete(record.id)}
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

export default ServiceHistory;

import { useState, useEffect } from 'react';
import { dashboardAPI } from '../services/api';

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await dashboardAPI.getStats();
        setStats(res.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load dashboard data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return (
    <div className="dashboard-loading">
      <div className="spinner" />
      <p className="text-muted">Loading your dashboard...</p>
    </div>
  );

  if (error) return <div className="alert alert-error">{error}</div>;

  const metricCards = [
    { label: 'Total Patients', value: stats?.totalPatients, icon: '🧑‍⚕️', color: '#2563eb' },
    { label: 'Total Doctors', value: stats?.totalDoctors, icon: '👨‍⚕️', color: '#7c3aed' },
    { label: "Today's Appointments", value: stats?.todaysAppointments, icon: '📅', color: '#0891b2' },
    { label: 'Total Appointments', value: stats?.totalAppointments, icon: '📋', color: '#16a34a' },
    { label: 'High Risk Patients', value: stats?.highRiskPatients, icon: '🚨', color: '#dc2626' },
    { label: 'Scheduled Today', value: stats?.scheduledAppointments, icon: '✅', color: '#d97706' },
  ];

  const riskLevels = [
    { label: 'High Risk', count: stats?.highRiskPatients ?? 0, color: '#dc2626' },
    { label: 'Medium Risk', count: stats?.mediumRiskPatients ?? 0, color: '#d97706' },
    { label: 'Low Risk', count: stats?.lowRiskPatients ?? 0, color: '#16a34a' },
  ];
  const totalRiskPatients = riskLevels.reduce((total, risk) => total + risk.count, 0);

  const appointmentStats = [
    { label: 'Total', value: stats?.totalAppointments, color: 'var(--primary)' },
    { label: 'Scheduled', value: stats?.scheduledAppointments, color: '#16a34a' },
    { label: 'Cancelled', value: stats?.cancelledAppointments, color: '#dc2626' },
    { label: 'Today', value: stats?.todaysAppointments, color: '#d97706' },
  ];

  return (
    <div className="dashboard-page">
      <div className="dashboard-heading">
        <div>
          <p className="dashboard-eyebrow">YOUR HEALTHCARE WORKSPACE</p>
          <h1>Dashboard</h1>
          <p className="text-muted" style={{ marginTop: 5 }}>
            Here's an overview of your Patient Management System.
          </p>
        </div>
        <span className="dashboard-date">
          {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
        </span>
      </div>

      <div className="grid-3 dashboard-metrics">
        {metricCards.map(({ label, value, icon, color }) => (
          <div key={label} className="card metric-card">
            <div className="metric-card-content">
              <div>
                <p className="metric-label">{label}</p>
                <p className="metric-value" style={{ color }}>{value ?? 0}</p>
              </div>
              <span className="metric-icon">{icon}</span>
            </div>
            <div className="metric-card-accent" style={{ background: color }} />
          </div>
        ))}
      </div>

      <div className="grid-2 dashboard-panels">
        <section className="card">
          <div className="card-header">🎯 Patient Risk Distribution</div>
          <div className="card-body">
            {riskLevels.map(({ label, count, color }) => {
              const percentage = totalRiskPatients > 0 ? Math.round((count / totalRiskPatients) * 100) : 0;
              return (
                <div className="risk-row" key={label}>
                  <div className="risk-row-heading">
                    <span style={{ color }}>{label}</span>
                    <strong>{count} <small>({percentage}%)</small></strong>
                  </div>
                  <div className="risk-progress-track">
                    <div className="risk-progress-bar" style={{ width: `${percentage}%`, background: color }} />
                  </div>
                </div>
              );
            })}
            {totalRiskPatients === 0 && (
              <p className="text-muted" style={{ marginTop: 8, fontSize: 12 }}>No patient risk data available yet.</p>
            )}
          </div>
        </section>

        <section className="card">
          <div className="card-header">🦠 Most Common Diagnoses</div>
          <div className="card-body">
            {stats?.mostCommonDiseases?.length > 0 ? (
              <div className="diagnosis-list">
                {stats.mostCommonDiseases.map((disease, index) => (
                  <div className="diagnosis-row" key={`${disease.disease}-${index}`}>
                    <div className="diagnosis-name">
                      <span className="diagnosis-rank">{index + 1}</span>
                      <span>{disease.disease}</span>
                    </div>
                    <span className="badge badge-info">{disease.count} patients</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted text-center empty-dashboard-state">No diagnosis data available yet.</p>
            )}
          </div>
        </section>
      </div>

      <section className="card dashboard-appointments">
        <div className="card-header">📊 Appointment Overview</div>
        <div className="card-body appointment-stat-grid">
          {appointmentStats.map(({ label, value, color }) => (
            <div className="appointment-stat" key={label}>
              <div className="appointment-stat-value" style={{ color }}>{value ?? 0}</div>
              <div className="appointment-stat-label">{label}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

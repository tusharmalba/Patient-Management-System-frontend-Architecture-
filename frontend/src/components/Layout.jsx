<<<<<<< HEAD
import { useState } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { getUser, logout } from '../utils/auth';

const navItems = [
  { to: '/dashboard', icon: '▦', label: 'Dashboard', hint: 'Your overview' },
  { to: '/patients', icon: '♡', label: 'Patients', hint: 'Patient records' },
  { to: '/doctors', icon: '✚', label: 'Doctors', hint: 'Care team' },
  { to: '/appointments', icon: '▣', label: 'Appointments', hint: 'Schedules & visits' },
];

function BrandMark() {
  return <span className="app-brand-mark" aria-hidden="true"><svg viewBox="0 0 40 40" fill="none"><rect width="40" height="40" rx="13" fill="currentColor" opacity=".15"/><path d="M20 10v20M10 20h20" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/></svg></span>;
}

export default function Layout() {
  const user = getUser();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const current = navItems.find(item => item.to === location.pathname) || navItems[0];
  const initials = (user?.fullName || 'Care User').split(/\s+/).map(part => part[0]).slice(0, 2).join('').toUpperCase();

  return (
    <div className="app-shell">
      {menuOpen && <button className="sidebar-scrim" aria-label="Close navigation" onClick={() => setMenuOpen(false)} />}
      <aside className={`app-sidebar ${menuOpen ? 'is-open' : ''}`}>
        <div className="app-brand"><BrandMark /><span className="app-brand-name">Care<span>flow</span><small>PATIENT MANAGEMENT</small></span></div>
        <div className="sidebar-section-label">WORKSPACE</div>
        <nav className="app-nav" aria-label="Main navigation">
          {navItems.map(({ to, icon, label, hint }) => (
            <NavLink key={to} to={to} onClick={() => setMenuOpen(false)} className={({ isActive }) => `app-nav-link ${isActive ? 'active' : ''}`}>
              <span className="nav-icon">{icon}</span><span className="nav-link-copy"><b>{label}</b><small>{hint}</small></span><span className="nav-chevron">›</span>
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-help-card"><span className="help-spark">✳</span><b>Care, made clearer.</b><p>Your team's patient workspace, all in one place.</p></div>
        <div className="sidebar-account">
          <div className="account-avatar">{initials}</div>
          <div className="account-copy"><b>{user?.fullName || 'Care user'}</b><small>{user?.role || 'MEMBER'}</small></div>
          <button className="logout-button" onClick={logout} title="Sign out" aria-label="Sign out">↗</button>
        </div>
      </aside>

      <div className="app-main">
        <header className="app-topbar">
          <div className="topbar-left">
            <button className="mobile-menu-button" onClick={() => setMenuOpen(v => !v)} aria-label="Toggle navigation">☰</button>
            <div><div className="topbar-breadcrumb">WORKSPACE <span>/</span> <b>{current.label.toUpperCase()}</b></div><div className="topbar-page-title">{current.label}</div></div>
          </div>
          <div className="topbar-right"><span className="system-status"><i /> System operational</span><div className="topbar-user"><div className="account-avatar small-avatar">{initials}</div><span><b>{user?.fullName || 'Care user'}</b><small>{user?.role || 'Member'}</small></span></div></div>
        </header>
        <main className="workspace-content"><Outlet /></main>
        <footer className="workspace-footer"><span>© {new Date().getFullYear()} Careflow Healthcare</span><span>Thoughtfully designed for better care <b>✳</b></span></footer>
      </div>
=======
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { getUser, logout } from '../utils/auth';

/**
 * Shared layout wrapper for all protected pages.
 * Uses React Router's <Outlet /> to render child routes.
 */
export default function Layout() {
  const user = getUser();
  const navigate = useNavigate();

  const navItems = [
    { to: '/dashboard',    icon: '📊', label: 'Dashboard' },
    { to: '/patients',     icon: '🧑‍⚕️', label: 'Patients' },
    { to: '/doctors',      icon: '👨‍⚕️', label: 'Doctors' },
    { to: '/appointments', icon: '📅', label: 'Appointments' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* ── SIDEBAR ── */}
      <aside style={{
        width: 240, background: '#1e293b', color: '#fff',
        display: 'flex', flexDirection: 'column', padding: '24px 0', flexShrink: 0
      }}>
        {/* Logo */}
        <div style={{ padding: '0 20px 24px', borderBottom: '1px solid #334155' }}>
          <div style={{ fontSize: 20, fontWeight: 700 }}>🏥 PMS</div>
          <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>
            Patient Management
          </div>
        </div>

        {/* Nav links */}
        <nav style={{ flex: 1, padding: '16px 12px' }}>
          {navItems.map(({ to, icon, label }) => (
            <NavLink key={to} to={to} style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 12px', borderRadius: 8, marginBottom: 4,
              textDecoration: 'none', fontSize: 14, fontWeight: 500,
              color: isActive ? '#fff' : '#94a3b8',
              background: isActive ? '#2563eb' : 'transparent',
              transition: 'all .15s',
            })}>
              <span>{icon}</span>
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* User info + logout */}
        <div style={{ padding: '16px 20px', borderTop: '1px solid #334155' }}>
          <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 4 }}>
            {user?.fullName}
          </div>
          <div style={{
            display: 'inline-block', fontSize: 11, fontWeight: 600,
            background: '#2563eb', color: '#fff', borderRadius: 999,
            padding: '2px 8px', marginBottom: 12
          }}>
            {user?.role}
          </div>
          <br />
          <button
            onClick={logout}
            style={{
              background: 'none', border: '1px solid #475569', color: '#94a3b8',
              borderRadius: 6, padding: '6px 12px', cursor: 'pointer', fontSize: 13,
              width: '100%'
            }}>
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <main style={{ flex: 1, padding: 28, overflow: 'auto' }}>
        <Outlet />
      </main>
>>>>>>> 3bc3b564f488d33b18666e41de63c278d5a23a9e
    </div>
  );
}

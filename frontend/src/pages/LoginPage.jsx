import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../services/api';
import { saveAuth } from '../utils/auth';
import '../auth.css';

function BrandMark() {
  return (
    <span className="auth-brand-mark" aria-hidden="true">
      <svg viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="13" fill="currentColor" opacity=".14" />
        <path d="M20 9v22M9 20h22" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <path d="M28.5 10.5c-2.5 0-4.5 2-4.5 4.5s2 4.5 4.5 4.5 4.5-2 4.5-4.5-2-4.5-4.5-4.5Z" fill="#53D6C5" />
      </svg>
    </span>
  );
}

function ShieldIcon() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3 19 6v5.2c0 4.5-2.9 7.7-7 9.8-4.1-2.1-7-5.3-7-9.8V6l7-3Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/><path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await authAPI.login(form);
      saveAuth(res.data.data);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-shell">
        <section className="auth-showcase" aria-label="Patient care platform introduction">
          <div className="showcase-orb showcase-orb-one" />
          <div className="showcase-orb showcase-orb-two" />
          <div className="showcase-topline">
            <BrandMark />
            <span className="showcase-brand">Care<span>flow</span></span>
          </div>

          <div className="showcase-content">
            <div className="showcase-eyebrow"><span className="eyebrow-dot" /> SMARTER HEALTHCARE, CONNECTED</div>
            <h1>Better care starts with <em>better connections.</em></h1>
            <p className="showcase-copy">One thoughtful space for patient records, care teams, appointments, and the details that matter most.</p>

            <div className="care-illustration" aria-hidden="true">
              <div className="illustration-glow" />
              <div className="orbit orbit-outer" />
              <div className="orbit orbit-inner" />
              <div className="illustration-cross"><span /><i /></div>
              <div className="floating-card floating-card-left">
                <span className="float-icon calendar-icon">▦</span>
                <span><b>Appointments</b><small>Everything in sync</small></span>
                <span className="float-check">✓</span>
              </div>
              <div className="floating-card floating-card-right">
                <span className="pulse-line"><i /><i /><i /><i /><i /><i /><i /></span>
                <span><b>Patient wellbeing</b><small>Care, at a glance</small></span>
              </div>
              <div className="illustration-caption"><span className="caption-pulse" /> Care that moves with you</div>
            </div>
          </div>

          <div className="showcase-footer">
            <span><ShieldIcon /> Built around secure, thoughtful care</span>
            <span className="showcase-footer-note">YOUR CARE TEAM, IN SYNC</span>
          </div>
        </section>

        <section className="auth-panel">
          <div className="mobile-brand"><BrandMark /><span>Care<span>flow</span></span></div>
          <div className="auth-form-wrap">
            <div className="form-overline">YOUR HEALTHCARE WORKSPACE</div>
            <h2>Welcome back<span className="heading-period">.</span></h2>
            <p className="auth-subtitle">Sign in to continue to your account.</p>

            {error && <div className="auth-error" role="alert"><span className="error-symbol">!</span><span>{error}</span></div>}

            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="auth-field">
                <label htmlFor="login-email">Email address</label>
                <div className="auth-input-wrap">
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3.5" y="5" width="17" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.6"/><path d="m5 7 7 5.5L19 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <input id="login-email" type="email" name="email" autoComplete="email" placeholder="you@yourclinic.com" value={form.email} onChange={handleChange} required />
                </div>
              </div>

              <div className="auth-field">
                <div className="field-label-row"><label htmlFor="login-password">Password</label></div>
                <div className="auth-input-wrap">
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="4.5" y="10" width="15" height="10" rx="2.5" stroke="currentColor" strokeWidth="1.6"/><path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/><circle cx="12" cy="15" r="1.2" fill="currentColor"/></svg>
                  <input id="login-password" type={showPassword ? 'text' : 'password'} name="password" autoComplete="current-password" placeholder="Enter your password" value={form.password} onChange={handleChange} required />
                  <button className="password-toggle" type="button" onClick={() => setShowPassword(v => !v)} aria-label={showPassword ? 'Hide password' : 'Show password'}>
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              <button type="submit" className="auth-submit" disabled={loading}>
                {loading ? <><span className="auth-spinner" /> Signing you in...</> : <>Sign in to your workspace <span aria-hidden="true">↗</span></>}
              </button>
            </form>

            <div className="auth-divider"><span /> <small>SECURE ACCESS</small> <span /></div>
            <div className="security-note"><span className="security-icon"><ShieldIcon /></span><span><b>Your care data deserves care.</b><small>Your sign-in is protected by secure authentication.</small></span></div>
            <p className="auth-switch">New to Careflow? <Link to="/register">Create an account <span aria-hidden="true">→</span></Link></p>
          </div>
          <footer className="auth-panel-footer"><span>© {new Date().getFullYear()} Careflow</span><span>Made for better care.</span></footer>
        </section>
      </div>
    </main>
  );
}

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../services/api';
import { saveAuth } from '../utils/auth';
import './auth.css';

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

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '',
    password: '', role: 'PATIENT', phoneNumber: ''
  });
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
      const res = await authAPI.register(form);
      saveAuth(res.data.data);
      navigate('/dashboard');
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed';
      const errors = err.response?.data?.data;
      if (errors && typeof errors === 'object') {
        setError(Object.values(errors).join('. '));
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page auth-page-register">
      <div className="auth-shell auth-shell-register">
        <section className="auth-showcase register-showcase" aria-label="Careflow platform introduction">
          <div className="showcase-orb showcase-orb-one" />
          <div className="showcase-orb showcase-orb-two" />
          <div className="showcase-topline"><BrandMark /><span className="showcase-brand">Care<span>flow</span></span></div>
          <div className="showcase-content">
            <div className="showcase-eyebrow"><span className="eyebrow-dot" /> A MORE CONNECTED WAY TO CARE</div>
            <h1>Make room for <em>what matters.</em></h1>
            <p className="showcase-copy">Bring your healthcare journey into one calm, organized space — designed to keep care teams and patients connected.</p>
            <div className="register-feature-list">
              <div><span>✓</span><p><b>One organized workspace</b><small>Keep important information close at hand.</small></p></div>
              <div><span>✓</span><p><b>Care that stays connected</b><small>Manage appointments and patient details.</small></p></div>
              <div><span>✓</span><p><b>Designed with privacy in mind</b><small>Secure account-based access.</small></p></div>
            </div>
          </div>
          <div className="showcase-footer"><span> <span className="footer-heart">✳</span> A little more clarity in every day</span><span className="showcase-footer-note">CARE, CONNECTED</span></div>
        </section>

        <section className="auth-panel auth-panel-register">
          <div className="mobile-brand"><BrandMark /><span>Care<span>flow</span></span></div>
          <div className="auth-form-wrap register-form-wrap">
            <div className="form-overline">GET STARTED IN A FEW STEPS</div>
            <h2>Create your account<span className="heading-period">.</span></h2>
            <p className="auth-subtitle">Set up your details to join your healthcare workspace.</p>
            {error && <div className="auth-error" role="alert"><span className="error-symbol">!</span><span>{error}</span></div>}

            <form className="auth-form register-form" onSubmit={handleSubmit}>
              <div className="auth-fields-grid">
                <div className="auth-field"><label htmlFor="register-first-name">First name</label><input id="register-first-name" className="auth-plain-input" name="firstName" autoComplete="given-name" placeholder="First name" value={form.firstName} onChange={handleChange} required /></div>
                <div className="auth-field"><label htmlFor="register-last-name">Last name</label><input id="register-last-name" className="auth-plain-input" name="lastName" autoComplete="family-name" placeholder="Last name" value={form.lastName} onChange={handleChange} required /></div>
              </div>
              <div className="auth-field"><label htmlFor="register-email">Email address</label><input id="register-email" className="auth-plain-input" type="email" name="email" autoComplete="email" placeholder="you@yourclinic.com" value={form.email} onChange={handleChange} required /></div>
              <div className="auth-field"><label htmlFor="register-password">Create password</label><div className="auth-input-wrap auth-input-no-icon"><input id="register-password" type={showPassword ? 'text' : 'password'} name="password" autoComplete="new-password" placeholder="Min 8 chars, uppercase, digit & special char" value={form.password} onChange={handleChange} required /><button className="password-toggle" type="button" onClick={() => setShowPassword(v => !v)} aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? 'Hide' : 'Show'}</button></div></div>
              <div className="auth-field"><label htmlFor="register-phone">Phone number <span className="optional-label">Optional</span></label><input id="register-phone" className="auth-plain-input" type="tel" name="phoneNumber" autoComplete="tel" placeholder="+91 98765 43210" value={form.phoneNumber} onChange={handleChange} /></div>
              <div className="auth-field"><label htmlFor="register-role">I am registering as</label><select id="register-role" className="auth-plain-input auth-select" name="role" value={form.role} onChange={handleChange}><option value="PATIENT">Patient</option><option value="DOCTOR">Doctor</option><option value="ADMIN">Admin</option></select></div>
              <button type="submit" className="auth-submit" disabled={loading}>{loading ? <><span className="auth-spinner" /> Creating your account...</> : <>Create account <span aria-hidden="true">↗</span></>}</button>
            </form>
            <p className="auth-switch auth-switch-register">Already have an account? <Link to="/login">Sign in <span aria-hidden="true">→</span></Link></p>
          </div>
          <footer className="auth-panel-footer"><span>© {new Date().getFullYear()} Careflow</span><span>Made for better care.</span></footer>
        </section>
      </div>
    </main>
  );
}

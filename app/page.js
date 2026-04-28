import Link from 'next/link';

export default function HomePage() {
  return (
    <main>
      {/* 1. HERO SECTION */}
      <div className="hero-wrapper" style={{ backgroundImage: `url('/gate.jpg')` }}>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>Welcome to Campus Voice</h1>
          <h3 style={{ fontSize: '1.5rem', opacity: 0.9, fontWeight: '400' }}>Jamia Hamdard</h3>
          <p style={{ fontSize: '1.1rem', marginTop: '1rem', maxWidth: '600px', marginInline: 'auto' }}>
            Your Voice, Our Priority. Faster resolutions for a better campus.
          </p>
        </div>
      </div>

      <div className="container" style={{ marginTop: '-4rem', position: 'relative', zIndex: '10' }}>
        
        {/* 2. MAIN CARDS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📝</div>
            <h2 style={{ color: 'var(--primary-blue)', marginBottom: '1rem' }}>For Students</h2>
            <p style={{ color: 'var(--text-gray)', marginBottom: '1.5rem' }}>
              Report campus issues like wifi, water, or maintenance. AI prioritizes your request.
            </p>
            <a href="/login"><button className="btn btn-primary">Report an Issue</button></a>
          </div>

          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👨‍💼</div>
            <h2 style={{ color: 'var(--primary-blue)', marginBottom: '1rem' }}>For Admins</h2>
            <p style={{ color: 'var(--text-gray)', marginBottom: '1.5rem' }}>
              View issues sorted by AI priority and track campus maintenance.
            </p>
            <a href="/admin"><button className="btn btn-primary">View Dashboard</button></a>
          </div>
        </div>

        {/* 3. CAMPUS HIGHLIGHTS GALLERY */}
        <div className="gallery-section">
          <h2 style={{ textAlign: 'center', color: 'var(--primary-blue)', marginBottom: '1rem' }}>
            Inside Jamia Hamdard
          </h2>
          <div className="gallery-grid">
            <div className="gallery-item">
              <img src="/convention.jpg" alt="Convention Centre" />
              <p>Convention Centre</p>
            </div>
            <div className="gallery-item">
              <img src="/library.jpg" alt="Library" />
              <p>Central Library</p>
            </div>
            <div className="gallery-item">
              <img src="/masjid.jpg" alt="Masjid" />
              <p>Rabia Masjid</p>
            </div>
            <div className="gallery-item">
              <img src="/sest.jpg" alt="SEST Building" />
              <p>SEST Building</p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. FOOTER SECTION */}
      <footer style={{
        backgroundColor: '#f8fafc',
        borderTop: '1px solid #e2e8f0',
        marginTop: '4rem',
        padding: '3rem 0 0 0'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2rem'
        }}>

          {/* FOOTER COLUMN 1: BRAND */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
              <div style={{
                width: '40px',
                height: '40px',
                backgroundColor: '#1E4D9B',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '1.2rem'
              }}>C</div>
              <span style={{ fontWeight: '700', fontSize: '1.2rem' }}>
                Campus<span style={{ color: '#080707' }}>Voice</span>
              </span>
            </div>
            <p style={{ color: '#6B7280', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1rem' }}>
              A centralized issue reporting portal for Jamia Hamdard.
              Report campus issues, track progress, and get faster resolutions.
            </p>
            <p style={{ color: '#56595f', fontSize: '0.85rem', fontStyle: 'italic' }}>
              A Jamia Hamdard Initiative
            </p>
          </div>

          {/* FOOTER COLUMN 2: SUPPORT */}
          <div>
            <h4 style={{ fontWeight: '700', marginBottom: '1.2rem', color: '#1F2937' }}>Support</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <li>
                <a href="#" style={{ color: '#6B7280', textDecoration: 'none', fontSize: '0.9rem' }}>
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" style={{ color: '#6B7280', textDecoration: 'none', fontSize: '0.9rem' }}>
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" style={{ color: '#6B7280', textDecoration: 'none', fontSize: '0.9rem' }}>
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* FOOTER COLUMN 3: CONTACT */}
          <div>
            <h4 style={{ fontWeight: '700', marginBottom: '1.2rem', color: '#1F2937' }}>Contact</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <li style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                <span>📍</span>
                <span style={{ color: '#6B7280', fontSize: '0.9rem' }}>
                  Jamia Hamdard, Hamdard Nagar, New Delhi - 110062
                </span>
              </li>
              <li style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span>✉️</span>
                <a href="mailto:support@campusvoice.in"
                  style={{ color: '#6B7280', textDecoration: 'none', fontSize: '0.9rem' }}>
                  support@campusvoice.in
                </a>
              </li>
              <li style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span>📞</span>
                <span style={{ color: '#6B7280', fontSize: '0.9rem' }}>011 2605 9688</span>
              </li>
            </ul>
          </div>
        </div>

        {/* FOOTER BOTTOM BAR */}
        <div style={{
          borderTop: '1px solid #e2e8f0',
          marginTop: '2.5rem',
          padding: '1.2rem 2rem',
          maxWidth: '1200px',
          margin: '2.5rem auto 0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '10px'
        }}>
          {/* COPYRIGHT */}
          <p style={{ color: '#9CA3AF', fontSize: '0.85rem', margin: 0 }}>
            © 2025 Campus Voice. All rights reserved.
          </p>

          {/* RIGHT SIDE: Developer tag + Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            {/* DEVELOPER CREDIT */}
            <p style={{ color: '#373a3f', fontSize: '0.75rem', margin: 0, fontStyle: 'italic' }}>
              Developed by{' '}
              <span style={{ color: '#1E4D9B', fontWeight: '600' }}>MOHD SAAD KHAN</span>
            </p>
            <a href="#" style={{ color: '#9CA3AF', fontSize: '0.85rem', textDecoration: 'none' }}>
              Privacy Policy
            </a>
            <a href="#" style={{ color: '#9CA3AF', fontSize: '0.85rem', textDecoration: 'none' }}>
              Terms of Service
            </a>
          </div>
        </div>
      </footer>

    </main>
  );
}
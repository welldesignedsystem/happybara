export default function Hours() {
  return (
    <section className="hours-section" id="hours">
      <div className="section-label">When We&apos;re Open</div>
      <h2 className="section-title">Opening Hours</h2>
      <div className="section-divider"><span></span><span style={{ color: 'var(--caramel)', fontSize: '1.1rem' }}>☕</span><span></span></div>
      <div className="hours-grid">
        <div className="hours-card"><div className="hours-day">Mon – Fri</div><div className="hours-time">7:00 AM – 10:00 PM</div><div className="hours-meal">Breakfast · Lunch · Dinner</div></div>
        <img src="/images/logo2.jpeg" alt="Capybara" className="capybara-peek" />
        <div className="hours-card"><div className="hours-day">Sat – Sun</div><div className="hours-time">5:30 AM – 10:00 PM</div><div className="hours-meal">Breakfast · Lunch · Dinner</div></div>
      </div>
      <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '1.5rem', fontSize: '0.85rem' }}>
        📍 12 Riverside Lane, Newtown &nbsp;·&nbsp; 📞 (02) 9000 0042
      </p>
    </section>
  )
}

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-badge">☕ Est. 2024 · Where every sip is happier</div>
      <div className="capybara-container">
        <div className="capybara-ring">
          <img src="/images/logo.png" alt="Happybara Café Capybara" />
        </div>
      </div>
      <h1>Happy<em>bara</em> Café</h1>
      <p className="hero-sub">Calm vibes, great coffee &amp; food made with love — just like a capybara.</p>
      <div className="hero-buttons">
        <a href="#menu" className="hero-cta">View Menu</a>
        <a href="#order" className="hero-cta outline">Place an Order</a>
      </div>
    </section>
  )
}

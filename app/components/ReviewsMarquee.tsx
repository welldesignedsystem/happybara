'use client'

const reviews = [
  { name: 'Sarah M.', text: 'Best café in town! The capybara pancakes are amazing.' },
  { name: 'James K.', text: 'Incredible coffee and the friendliest staff. Love this place!' },
  { name: 'Emily R.', text: 'The atmosphere is so cozy. Perfect for a morning meetup.' },
  { name: 'Michael T.', text: 'Their eggs benedict is divine. Highly recommend!' },
  { name: 'Olivia W.', text: 'A hidden gem! Everything on the menu is delicious.' },
  { name: 'Daniel P.', text: 'Great vibes, great food. The hot chocolate is a must-try.' },
  { name: 'Sophia L.', text: 'Best breakfast spot. The granola bowl is my go-to.' },
  { name: 'Ethan H.', text: 'Fantastic service and the portions are generous!' },
  { name: 'Isabella C.', text: 'Love the capybara theme! So cute and the food is top-notch.' },
  { name: 'William A.', text: 'The smashed avo toast is perfection. 5 stars all the way!' },
  { name: 'Mia J.', text: 'Warm, welcoming, and wonderful food. A true local favourite.' },
  { name: 'Alexander N.', text: 'Their homemade lemonade is refreshing. Will be back!' },
  { name: 'Charlotte B.', text: 'I drive 30 minutes just to eat here. Worth every mile!' },
  { name: 'Benjamin F.', text: 'Kids love the happy meals. Finally a place for everyone!' },
  { name: 'Amelia D.', text: 'Best café atmosphere. Great for brunch with friends.' },
  { name: 'Henry G.', text: 'Outstanding quality. You can taste the freshness in every dish.' },
  { name: 'Evelyn S.', text: 'The truffle pasta is life-changing. Must order!' },
  { name: 'Jack V.', text: 'Friendly team, quick service, and the coffee is world-class.' },
]

export default function ReviewsMarquee() {
  const doubled = [...reviews, ...reviews]
  return (
    <section className="reviews-section">
      <div className="section-label" style={{ fontSize: '2rem' }}>What Our Guests Say</div>
      <div className="marquee-track">
        <div className="marquee-content">
          {doubled.map((review, i) => (
            <div key={i} className="review-card">
              <div className="review-stars">★★★★★</div>
              <p className="review-text">&ldquo;{review.text}&rdquo;</p>
              <span className="review-name">— {review.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

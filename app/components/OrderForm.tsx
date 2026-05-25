'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import emailjs from '@emailjs/browser'

emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!)

interface OrderItem {
  name: string
  price: number
  quantity: number
}

interface OrderFormProps {
  orderItems: OrderItem[]
  onAddToOrder: (name: string, price: number) => void
  onRemoveFromOrder: (name: string) => void
  onChangeQty: (name: string, delta: number) => void
  onClearOrder: () => void
}

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!

export default function OrderForm({
  orderItems,
  onAddToOrder,
  onRemoveFromOrder,
  onChangeQty,
  onClearOrder,
}: OrderFormProps) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [time, setTime] = useState('')
  const [notes, setNotes] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [toastMsg, setToastMsg] = useState('')
  const toastTimeout = useRef<ReturnType<typeof setTimeout>>()

  const showToast = useCallback((msg: string) => {
    setToastMsg(msg)
    clearTimeout(toastTimeout.current)
    toastTimeout.current = setTimeout(() => setToastMsg(''), 1200)
  }, [])

  const total = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const itemCount = orderItems.reduce((s, i) => s + i.quantity, 0)

  const submitOrder = async () => {
    if (!name || !phone || !time) {
      alert('Please fill in all required fields (Name, Phone, Pickup Time).')
      return
    }
    if (orderItems.length === 0) {
      alert('Please add at least one item to your order.')
      return
    }

    setSending(true)
    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        to_email: 'cafehappybara@outlook.com',
        customer_name: name,
        customer_phone: phone,
        customer_email: email || 'not provided',
        pickup_time: time,
        order_items: orderItems.map(i => `${i.quantity}x ${i.name}`),
        order_total: `$${total.toFixed(2)}`,
        notes: notes || '',
      })
      setSubmitted(true)
    } catch (err: unknown) {
      const error = err as { text?: string; message?: string }
      alert('Email error: ' + (error.text || error.message || JSON.stringify(err)))
    } finally {
      setSending(false)
    }
  }

  const emailOrder = async () => {
    setSending(true)
    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        to_email: 'cafehappybara@outlook.com',
        customer_name: name,
        customer_phone: phone,
        customer_email: email || 'not provided',
        pickup_time: time,
        order_items: orderItems.map(i => `${i.quantity}x ${i.name}`),
        order_total: `$${total.toFixed(2)}`,
        notes: notes || '',
      })
      showToast('Order sent to cafe!')
    } catch (err: unknown) {
      const error = err as { text?: string; message?: string }
      alert('Email error: ' + (error.text || error.message || JSON.stringify(err)))
    } finally {
      setSending(false)
    }
  }

  const resetOrder = () => {
    setName('')
    setPhone('')
    setEmail('')
    setTime('')
    setNotes('')
    setSubmitted(false)
    onClearOrder()
  }

  const now = new Date()
  const dateStr = now.toLocaleDateString('en-AU', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  })

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const card = (e.target as HTMLElement).closest('.menu-card')
      if (!card) return
      const nameEl = card.querySelector('.menu-card-name')
      const priceEl = card.querySelector('.menu-card-price')
      if (!nameEl || !priceEl) return
      const name = nameEl.textContent?.trim() || ''
      const price = parseFloat((priceEl.textContent?.trim() || '$0').replace('$', ''))
      onAddToOrder(name, price)
      showToast(`${name} added`)
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [onAddToOrder, showToast])

  return (
    <section className="order-section" id="order">
      <div className="section-label">Pre-Order &amp; Takeaway</div>
      <h2 className="section-title">Place an Order</h2>
      <div className="section-divider"><span></span><span style={{ color: 'var(--caramel)', fontSize: '1.1rem' }}>🐾</span><span></span></div>
      <div className="order-form-wrap">
        {!submitted ? (
          <div id="formContent">
            <div className="form-grid">
              <div className="form-group">
                <label>Your Name *</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Jane Smith" required />
              </div>
              <div className="form-group">
                <label>Phone Number *</label>
                <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="e.g. 04xx xxx xxx" required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" />
              </div>
              <div className="form-group">
                <label>Pickup Time *</label>
                <input type="time" value={time} onChange={e => setTime(e.target.value)} required />
              </div>
            </div>

            <div className="order-items" style={{ marginTop: '1.5rem' }}>
              <div className="order-items-title">
                🛒 Order Items{' '}
                {itemCount > 0 && (
                  <span style={{ fontSize: '0.75rem', color: 'var(--caramel)', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>
                    ({itemCount} item{itemCount !== 1 ? 's' : ''})
                  </span>
                )}
              </div>
              <div id="itemsList">
                {orderItems.length === 0 ? (
                  <div className="empty-order">Click any menu item above to add it to your order.</div>
                ) : (
                  orderItems.map(item => {
                    const lineTotal = item.price * item.quantity
                    const safeName = item.name.replace(/'/g, "\\'")
                    return (
                      <div key={item.name} className="order-item-row">
                        <span className="order-item-name">
                          {item.name}{' '}
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 400 }}>
                            @ ${item.price.toFixed(2)}
                          </span>
                        </span>
                        <button className="qty-btn" onClick={() => onChangeQty(item.name, -1)}>−</button>
                        <span className="qty-display">{item.quantity}</span>
                        <button className="qty-btn" onClick={() => onChangeQty(item.name, 1)}>+</button>
                        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--caramel)', minWidth: 48, textAlign: 'right' }}>
                          ${lineTotal.toFixed(2)}
                        </span>
                        <button className="remove-btn" onClick={() => onRemoveFromOrder(item.name)}>✕</button>
                      </div>
                    )
                  })
                )}
              </div>
              {orderItems.length > 0 && (
                <div id="orderTotal" style={{ textAlign: 'right', paddingTop: '0.75rem', borderTop: '2px solid var(--warm-brown)', marginTop: '0.5rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                    Total:
                  </span>
                  <span style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--warm-brown)', marginLeft: '0.5rem' }}>
                    ${total.toFixed(2)}
                  </span>
                </div>
              )}
            </div>

            <div className="form-grid" style={{ marginTop: '1rem' }}>
              <div className="form-group full">
                <label>Special Requests / Allergies</label>
                <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="e.g. no nuts, extra sauce, gluten free…" />
              </div>
            </div>
            <button className="submit-btn" onClick={submitOrder} disabled={orderItems.length === 0 || sending}>
              {sending ? 'Sending…' : '🐾 Submit Order'}
            </button>
          </div>
        ) : (
          <div className="form-success" style={{ display: 'block' }}>
            <div className="success-icon">🎉</div>
            <h3>Order Received!</h3>
            <p>Thanks for your order. We&apos;ll have it ready at your pickup time. See you soon at Happybara Café! 🐾</p>
            <div id="orderReceipt" style={{ marginTop: '1.25rem', padding: '1rem', background: 'var(--cream)', borderRadius: 12, border: '1px solid var(--soft-tan)', textAlign: 'left', fontSize: '0.85rem', lineHeight: 1.6 }}>
              <div style={{ borderBottom: '2px dashed var(--soft-tan)', paddingBottom: '0.75rem', marginBottom: '0.75rem' }}>
                <div style={{ fontWeight: 700, color: 'var(--warm-brown)', fontSize: '1rem' }}>🐾 Happybara Café</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{dateStr} · {time}</div>
              </div>
              <div style={{ marginBottom: '0.5rem' }}>
                <div><strong>Name:</strong> {name}</div>
                <div><strong>Phone:</strong> {phone}</div>
                {email && <div><strong>Email:</strong> {email}</div>}
              </div>
              <div style={{ borderTop: '1px solid var(--soft-tan)', paddingTop: '0.5rem', marginTop: '0.5rem' }}>
                {orderItems.map(item => (
                  <div key={item.name} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>{item.quantity}x {item.name}</span>
                    <span style={{ fontWeight: 700, color: 'var(--caramel)' }}>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: '2px solid var(--warm-brown)', paddingTop: '0.5rem', marginTop: '0.5rem', display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1rem', color: 'var(--warm-brown)' }}>
                <span>Total</span><span>${total.toFixed(2)}</span>
              </div>
              {notes && (
                <div style={{ borderTop: '1px solid var(--soft-tan)', paddingTop: '0.5rem', marginTop: '0.5rem', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                  <strong>Notes:</strong> {notes}
                </div>
              )}
            </div>
            <button
              className="hero-cta"
              style={{ marginTop: '1rem', fontSize: '0.75rem' }}
              onClick={emailOrder}
              disabled={sending}
            >
              {sending ? 'Sending…' : 'Send Order to Cafe'}
            </button>
            <button className="submit-btn" style={{ marginTop: '0.75rem' }} onClick={resetOrder}>
              🐾 Place New Order
            </button>
          </div>
        )}
      </div>

      <div className={`toast${toastMsg ? ' show' : ''}`}>{toastMsg}</div>
    </section>
  )
}

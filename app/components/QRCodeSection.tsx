'use client'

import { QRCodeSVG } from 'qrcode.react'

const SITE_URL = 'https://happybara.wasmer.app/'

export default function QRCodeSection() {
  return (
    <section className="qr-section" id="qr">
      <div className="section-label">Scan &amp; Share</div>
      <h2 className="section-title" style={{ marginBottom: '2rem' }}>Find Us Online</h2>
      <div className="qr-inner">
        <div id="qrcode">
          <QRCodeSVG
            value={SITE_URL}
            size={180}
            fgColor="#6B3F1F"
            bgColor="#ffffff"
            level="H"
          />
        </div>
        <div className="qr-label">Scan to visit our website</div>
        <div className="qr-url">{SITE_URL}</div>
      </div>
    </section>
  )
}

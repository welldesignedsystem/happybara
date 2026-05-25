'use client'

import { useState, useCallback } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Ribbon from './components/Ribbon'
import MenuSection from './components/MenuSection'
import AboutStrip from './components/AboutStrip'
import OrderForm from './components/OrderForm'
import QRCodeSection from './components/QRCodeSection'
import Hours from './components/Hours'
import Footer from './components/Footer'

interface OrderItem {
  name: string
  price: number
  quantity: number
}

export default function Home() {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])

  const addToOrder = useCallback((name: string, price: number) => {
    setOrderItems(prev => {
      const existing = prev.find(item => item.name === name)
      if (existing) {
        return prev.map(item =>
          item.name === name ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prev, { name, price, quantity: 1 }]
    })
  }, [])

  const removeFromOrder = useCallback((name: string) => {
    setOrderItems(prev => prev.filter(item => item.name !== name))
  }, [])

  const changeQty = useCallback((name: string, delta: number) => {
    setOrderItems(prev =>
      prev
        .map(item =>
          item.name === name
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter(item => item.quantity > 0)
    )
  }, [])

  const clearOrder = useCallback(() => {
    setOrderItems([])
  }, [])

  return (
    <>
      <Navbar />
      <Hero />
      <Ribbon />
      <MenuSection onAddToOrder={addToOrder} />
      <AboutStrip />
      <OrderForm
        orderItems={orderItems}
        onAddToOrder={addToOrder}
        onRemoveFromOrder={removeFromOrder}
        onChangeQty={changeQty}
        onClearOrder={clearOrder}
      />
      <QRCodeSection />
      <Hours />
      <Footer />
    </>
  )
}

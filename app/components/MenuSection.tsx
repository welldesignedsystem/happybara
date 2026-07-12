'use client'

import { useState } from 'react'

interface MenuItem {
  icon: string
  name: string
  desc: string
  price: string
  tags: { label: string; className: string }[]
}

const menuData: Record<string, MenuItem[]> = {
  drinks: [
    { icon: '🧃', name: 'Apple Juice', desc: 'Freshly pressed apple juice served chilled', price: '$4', tags: [] },
    { icon: '🍊', name: 'Orange Juice', desc: 'Freshly squeezed orange juice', price: '$4', tags: [] },
    { icon: '🍹', name: 'Tropical Drink', desc: 'A blend of tropical fruit juices', price: '$5', tags: [{ label: 'Popular', className: 'popular' }] },
    { icon: '🥤', name: 'Soft Drinks', desc: 'Selection of your favourite soft drinks', price: '$2.50', tags: [] },
    { icon: '☕', name: 'Coffee', desc: 'Freshly brewed coffee', price: '$3', tags: [{ label: 'Popular', className: 'popular' }] },
    { icon: '☕', name: 'Cappuccino', desc: 'Classic Italian cappuccino with frothy milk', price: '$4', tags: [] },
    { icon: '☕', name: 'Puppuccino', desc: 'A special treat for your furry friend — whipped cream in a cup', price: '$1', tags: [{ label: 'New', className: 'new' }] },
    { icon: '🥤', name: 'Slush Up Mango', desc: 'Refreshing mango slush blended with ice', price: '$5.50', tags: [{ label: 'Popular', className: 'popular' }] },
    { icon: '🍫', name: 'Hot Chocolate', desc: 'Rich and creamy hot chocolate', price: '$4', tags: [] },
    { icon: '🧊', name: 'Icy — Choice of Your Drink', desc: 'Your favourite drink served ice cold', price: '$4', tags: [] },
    { icon: '🥛', name: 'Milk Shake', desc: 'Creamy milkshake in chocolate, strawberry or vanilla', price: '$6', tags: [{ label: 'Popular', className: 'popular' }] },
    { icon: '🍦', name: 'New! Ice Cream Lover', desc: 'Scoop of premium ice cream with your choice of toppings', price: '$5', tags: [{ label: 'New', className: 'new' }] },
  ],
  breakie: [
    { icon: '🥚', name: 'Boiled Eggs', desc: 'Perfectly boiled eggs served with toast soldiers', price: '$7', tags: [] },
    { icon: '🍳', name: 'Breakie Combo', desc: 'Hearty breakfast combo with eggs, toast & sides', price: '$15', tags: [{ label: 'Popular', className: 'popular' }] },
    { icon: '🥗', name: 'Small Salad', desc: 'Light and fresh small salad', price: '$7', tags: [{ label: 'Veg', className: 'veg' }] },
    { icon: '🥦', name: 'Veg Breakie Combo', desc: 'Vegetarian breakfast combo with eggs, toast & veggies', price: '$14', tags: [{ label: 'Veg', className: 'veg' }] },
    { icon: '🥗', name: 'Veg Small Salad', desc: 'Light small salad with fresh vegetables', price: '$6', tags: [{ label: 'Veg', className: 'veg' }] },
    { icon: '🥚', name: 'Egg Friends', desc: 'Eggs prepared your way with friendly sides', price: '$11', tags: [] },
    { icon: '👨‍🍳', name: "Chef's Special", desc: "Ask your server for today's breakfast creation", price: '$17', tags: [{ label: 'Seasonal', className: '' }] },
    { icon: '🍗', name: 'Chicken Wings', desc: 'Crispy chicken wings with dipping sauce', price: '$13', tags: [{ label: 'Popular', className: 'popular' }] },
  ],
  lunch: [
    { icon: '🥗', name: 'Salad', desc: 'Fresh garden salad with your choice of dressing', price: '$10', tags: [{ label: 'Veg', className: 'veg' }] },
    { icon: '🥗', name: 'Salad Combo', desc: 'Hearty salad combo with your choice of protein', price: '$14', tags: [] },
    { icon: '🥗', name: 'Veg Salad', desc: 'Fresh vegetable salad with light vinaigrette', price: '$9', tags: [{ label: 'Veg', className: 'veg' }] },
    { icon: '🥗', name: 'Veg Salad Combo', desc: 'Generous veggie salad combo with seasonal produce', price: '$13', tags: [{ label: 'Veg', className: 'veg' }] },
    { icon: '🍜', name: 'Soup', desc: 'Daily soup selection served hot', price: '$8', tags: [] },
    { icon: '🥣', name: 'Veg Soup', desc: 'Hearty vegetable soup', price: '$8', tags: [{ label: 'Veg', className: 'veg' }] },
    { icon: '🦀', name: 'Crab Curry', desc: 'Fresh crab cooked in rich coconut curry sauce', price: '$21', tags: [{ label: 'Popular', className: 'popular' }] },
    { icon: '🥩', name: 'Beef', desc: 'Grilled beef steak with sides', price: '$19', tags: [{ label: 'Popular', className: 'popular' }] },
    { icon: '🍛', name: 'Beef Curry', desc: 'Aromatic beef curry simmered in spiced gravy', price: '$18', tags: [] },
    { icon: '🐟', name: 'Seafood', desc: 'Mixed seafood platter of the day', price: '$23', tags: [] },
    { icon: '🦞', name: 'Fried Lobster', desc: 'Crispy fried lobster served with dipping sauce', price: '$27', tags: [{ label: 'New', className: 'new' }] },
  ],
  dinner: [
    { icon: '🥗', name: 'Salad', desc: 'Fresh garden salad with your choice of dressing', price: '$11', tags: [{ label: 'Veg', className: 'veg' }] },
    { icon: '🥗', name: 'Salad Combo', desc: 'Hearty salad combo with your choice of protein', price: '$15', tags: [] },
    { icon: '🍲', name: 'Stew', desc: 'Slow-cooked hearty stew served with bread', price: '$17', tags: [{ label: 'Popular', className: 'popular' }] },
    { icon: '🍛', name: 'Beef Curry', desc: 'Aromatic beef curry simmered in spiced gravy', price: '$19', tags: [{ label: 'Popular', className: 'popular' }] },
    { icon: '🦀', name: 'Crab Curry', desc: 'Fresh crab cooked in rich coconut curry sauce', price: '$23', tags: [] },
    { icon: '👨‍🍳', name: "Chef's Special", desc: "Ask your server for tonight's chef creation", price: '$27', tags: [{ label: 'Seasonal', className: '' }] },
    { icon: '🍜', name: 'Noodles (50% off)', desc: 'Stir-fried noodles with vegetables — half price!', price: '$9', tags: [{ label: 'New', className: 'new' }] },
    { icon: '🍜', name: 'Soup Noodles', desc: 'Warming noodle soup in flavourful broth', price: '$13', tags: [] },
  ],
  kids: [
    { icon: '🍗', name: 'Chicken Wings', desc: 'Crispy chicken wings with a side of sauce', price: '$8', tags: [] },
    { icon: '🍦', name: 'Ice Cream', desc: 'Scoop of vanilla or chocolate ice cream', price: '$4', tags: [] },
    { icon: '🍱', name: 'New Kids Combo', desc: 'Fun combo meal with a little bit of everything', price: '$11', tags: [{ label: 'New', className: 'new' }] },
    { icon: '🐟', name: 'Seafood Mince', desc: 'Light and tasty seafood mince for little ones', price: '$9', tags: [] },
    { icon: '🥕', name: 'Healthy Snack', desc: 'Fresh fruit and veggie sticks with dip', price: '$6', tags: [{ label: 'Veg', className: 'veg' }] },
    { icon: '🥩', name: 'Yum Beef', desc: 'Tender beef bites kids will love', price: '$10', tags: [{ label: 'Popular', className: 'popular' }] },
    { icon: '🍗', name: 'Yum Chicken', desc: 'Juicy chicken pieces perfect for kids', price: '$9', tags: [] },
    { icon: '🐟', name: 'Yum Fish', desc: 'Lightly crumbed fish fillets', price: '$10', tags: [] },
    { icon: '🍟', name: 'Chicken Nuggets', desc: 'Golden chicken nuggets with dipping sauce', price: '$8', tags: [{ label: 'Popular', className: 'popular' }] },
    { icon: '🍔', name: 'Happy Meal with Chips', desc: 'Kids meal with a main, chips & drink', price: '$11', tags: [{ label: 'Popular', className: 'popular' }] },
    { icon: '🍔', name: 'Happy Meal with Apple Slices', desc: 'Kids meal with a main, apple slices & drink', price: '$11', tags: [{ label: 'New', className: 'new' }] },
  ],
}

const tabs = ['drinks', 'breakie', 'lunch', 'dinner', 'kids']

export default function MenuSection({ onAddToOrder }: { onAddToOrder: (name: string, price: number) => void }) {
  const [activeTab, setActiveTab] = useState('drinks')
  const [toastMsg, setToastMsg] = useState('')

  const handleAdd = (name: string, price: number) => {
    onAddToOrder(name, price)
    setToastMsg(`${name} added`)
    setTimeout(() => setToastMsg(''), 1200)
  }

  return (
    <section className="menu-section" id="menu">
      <div className="section-label" style={{ fontSize: '2rem' }}>Our Menu</div>
      <div className="menu-tabs">
        {tabs.map(tab => (
          <button
            key={tab}
            className={`tab-btn${activeTab === tab ? ' active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'drinks' ? '☕ Drinks' : tab === 'breakie' ? '🥚 Breakie' : tab === 'lunch' ? '🥗 Lunch' : tab === 'dinner' ? '🍜 Dinner' : '🧒 Kids'}
          </button>
        ))}
      </div>
      {Object.entries(menuData).map(([category, items]) => (
        <div key={category} id={category} className={`menu-panel${activeTab === category ? ' active' : ''}`}>
          {items.map(item => (
            <div
              key={item.name}
              className="menu-card"
              onClick={() => handleAdd(item.name, parseFloat(item.price.replace('$', '')))}
            >
              <div className="menu-icon">{item.icon}</div>
              <div className="menu-card-body">
                <div className="menu-card-name">{item.name}</div>
                <div className="menu-card-desc">{item.desc}</div>
                <div className="menu-card-footer">
                  <span className="menu-card-price">{item.price}</span>
                  {item.tags.map(tag => (
                    <span key={tag.label} className={`menu-tag${tag.className ? ' ' + tag.className : ''}`}>
                      {tag.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </section>
  )
}

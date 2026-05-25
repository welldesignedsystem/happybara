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
  breakfast: [
    { icon: '🥞', name: 'Capybara Stacks', desc: 'Fluffy ricotta pancakes with wild berry compote, whipped cream & maple drizzle', price: '$16', tags: [{ label: 'Popular', className: 'popular' }] },
    { icon: '🍳', name: 'Garden Eggs Benedict', desc: 'Poached eggs on brioche with avocado, roasted tomatoes & hollandaise', price: '$18', tags: [{ label: 'Veg', className: 'veg' }] },
    { icon: '🥣', name: 'Happybara Granola Bowl', desc: 'House-made granola, coconut yoghurt, seasonal fruits & local honey', price: '$14', tags: [{ label: 'Veg', className: 'veg' }] },
    { icon: '🥐', name: 'Café Croissant Plate', desc: 'Buttery croissant with house jam, Brie, prosciutto & café latte', price: '$19', tags: [{ label: 'Popular', className: 'popular' }] },
    { icon: '🍞', name: 'Smashed Avo Toast', desc: 'Sourdough with smashed avocado, feta, chilli flakes & poached eggs', price: '$17', tags: [{ label: 'New', className: 'new' }] },
    { icon: '🫐', name: 'Blueberry French Toast', desc: 'Thick brioche in vanilla custard, blueberry sauce & icing sugar', price: '$15', tags: [{ label: 'Veg', className: 'veg' }] },
  ],
  lunch: [
    { icon: '🥗', name: 'Riverside Green Salad', desc: 'Mixed leaves, roasted pumpkin, candied walnuts, goat cheese & lemon vinaigrette', price: '$19', tags: [{ label: 'Veg', className: 'veg' }] },
    { icon: '🥪', name: 'Capybara Club', desc: 'Triple-decker with pulled chicken, turkey, bacon, brie & house aioli', price: '$22', tags: [{ label: 'Popular', className: 'popular' }] },
    { icon: '🍜', name: 'Miso Noodle Soup', desc: 'Silky miso broth, udon noodles, soft boiled egg, wakame & spring onion', price: '$20', tags: [{ label: 'New', className: 'new' }] },
    { icon: '🫓', name: 'Roasted Veggie Flatbread', desc: 'Herbed flatbread with roasted capsicum, zucchini, ricotta & basil oil', price: '$18', tags: [{ label: 'Veg', className: 'veg' }] },
    { icon: '🐟', name: 'Salmon Poke Bowl', desc: 'Sushi rice, sashimi salmon, edamame, cucumber, avocado & ponzu', price: '$24', tags: [{ label: 'Popular', className: 'popular' }] },
    { icon: '🥚', name: 'Quiche of the Day', desc: "Chef's daily quiche with side salad & chutney — ask your server for today's filling", price: '$16', tags: [{ label: 'Seasonal', className: '' }] },
  ],
  dinner: [
    { icon: '🍝', name: 'Mushroom Truffle Pasta', desc: 'Fresh pappardelle, wild mushroom ragù, truffle oil, parmesan & crispy sage', price: '$26', tags: [{ label: 'Veg', className: 'veg' }] },
    { icon: '🥩', name: 'Grilled Wagyu Sirloin', desc: '250g Wagyu sirloin with roasted potatoes, seasonal greens & red wine jus', price: '$42', tags: [{ label: 'Popular', className: 'popular' }] },
    { icon: '🐔', name: 'Lemon Herb Chicken', desc: 'Pan-roasted chicken breast, cauliflower purée, asparagus & lemon caper butter', price: '$32', tags: [{ label: 'New', className: 'new' }] },
    { icon: '🦐', name: 'Prawn & Chorizo Risotto', desc: 'Saffron risotto with sautéed prawns, chorizo, cherry tomatoes & rocket', price: '$34', tags: [{ label: 'Popular', className: 'popular' }] },
    { icon: '🌿', name: 'Stuffed Eggplant', desc: 'Roasted eggplant filled with herbed quinoa, feta, pine nuts & tomato sauce', price: '$28', tags: [{ label: 'Veg', className: 'veg' }] },
    { icon: '🍰', name: 'Warm Chocolate Fondant', desc: 'Dark chocolate lava cake with vanilla bean ice cream & salted caramel drizzle', price: '$14', tags: [{ label: 'Popular', className: 'popular' }] },
  ],
  drinks: [
    { icon: '☕', name: 'Happybara Cappuccino', desc: 'Double ristretto, silky micro-foam, dusted with house-blend cacao', price: '$5.50', tags: [{ label: 'Popular', className: 'popular' }] },
    { icon: '🧋', name: 'Brown Sugar Matcha Latte', desc: 'Ceremonial grade matcha, oat milk & house brown sugar syrup over ice', price: '$7.50', tags: [{ label: 'New', className: 'new' }] },
    { icon: '🍵', name: 'Loose Leaf Tea Selection', desc: 'Earl Grey, English Breakfast, Chamomile, Peppermint or Jasmine Green', price: '$5', tags: [{ label: 'Veg', className: 'veg' }] },
    { icon: '🥤', name: 'Elderflower Lemonade', desc: 'House elderflower cordial, fresh lemon juice & sparkling water with mint', price: '$6', tags: [{ label: 'Veg', className: 'veg' }] },
    { icon: '🍫', name: 'Decadent Hot Chocolate', desc: 'Valrhona dark chocolate, steamed milk & cinnamon, topped with cream', price: '$7', tags: [{ label: 'Popular', className: 'popular' }] },
    { icon: '🍊', name: 'Fresh Pressed Juice', desc: 'Orange & ginger, apple & beetroot, or carrot & turmeric — daily selection', price: '$8', tags: [{ label: 'Veg', className: 'veg' }] },
  ],
}

const tabs = ['breakfast', 'lunch', 'dinner', 'drinks']

export default function MenuSection({ onAddToOrder }: { onAddToOrder: (name: string, price: number) => void }) {
  const [activeTab, setActiveTab] = useState('breakfast')

  return (
    <section className="menu-section" id="menu">
      <div className="section-label">Our Menu</div>
      <h2 className="section-title">Food &amp; Drinks</h2>
      <div className="section-divider"><span></span><span style={{ color: 'var(--caramel)', fontSize: '1.1rem' }}>🐾</span><span></span></div>
      <div className="menu-tabs">
        {tabs.map(tab => (
          <button
            key={tab}
            className={`tab-btn${activeTab === tab ? ' active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'breakfast' ? '☀️ Breakfast' : tab === 'lunch' ? '🌤️ Lunch' : tab === 'dinner' ? '🌙 Dinner' : '☕ Drinks'}
          </button>
        ))}
      </div>
      {Object.entries(menuData).map(([category, items]) => (
        <div key={category} id={category} className={`menu-panel${activeTab === category ? ' active' : ''}`}>
          {items.map(item => (
            <div
              key={item.name}
              className="menu-card"
              onClick={() => onAddToOrder(item.name, parseFloat(item.price.replace('$', '')))}
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

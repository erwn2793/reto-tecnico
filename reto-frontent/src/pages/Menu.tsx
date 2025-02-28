import React from 'react';
import { Coffee, Wine, Soup, Pizza, IceCream } from 'lucide-react';

type MenuItem = {
  name: string;
  description: string;
  price: string;
  image: string;
};

type MenuSection = {
  title: string;
  icon: React.ReactNode;
  items: MenuItem[];
};

function Menu() {
  const menuSections: MenuSection[] = [
    {
      title: 'Starters',
      icon: <Soup className="w-6 h-6" />,
      items: [
        {
          name: 'French Onion Soup',
          description: 'Classic soup with caramelized onions, rich beef broth, and melted Gruyère cheese',
          price: '$12',
          image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80'
        },
        {
          name: 'Bruschetta',
          description: 'Grilled bread rubbed with garlic and topped with diced tomatoes, fresh basil, and olive oil',
          price: '$10',
          image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80'
        }
      ]
    },
    {
      title: 'Main Courses',
      icon: <Pizza className="w-6 h-6" />,
      items: [
        {
          name: 'Filet Mignon',
          description: '8oz center-cut tenderloin with red wine reduction and roasted vegetables',
          price: '$42',
          image: 'https://images.unsplash.com/photo-1558030006-450675393462?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80'
        },
        {
          name: 'Grilled Salmon',
          description: 'Fresh Atlantic salmon with lemon butter sauce and seasonal vegetables',
          price: '$34',
          image: 'https://images.unsplash.com/photo-1485921325833-c519f76c4927?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80'
        }
      ]
    },
    {
      title: 'Desserts',
      icon: <IceCream className="w-6 h-6" />,
      items: [
        {
          name: 'Crème Brûlée',
          description: 'Classic French vanilla custard with caramelized sugar crust',
          price: '$12',
          image: 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80'
        }
      ]
    },
    {
      title: 'Beverages',
      icon: <Wine className="w-6 h-6" />,
      items: [
        {
          name: 'House Red Wine',
          description: 'Selection of premium regional wines',
          price: '$12/glass',
          image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80'
        }
      ]
    }
  ];

  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Menu</h1>
          <p className="text-lg text-gray-600">Discover our carefully curated selection of dishes</p>
        </div>

        <div className="space-y-16">
          {menuSections.map((section, index) => (
            <div key={index}>
              <div className="flex items-center justify-center mb-8">
                <div className="bg-orange-100 p-3 rounded-full mr-3">
                  {section.icon}
                </div>
                <h2 className="text-3xl font-semibold text-gray-900">{section.title}</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex space-x-4 bg-white rounded-lg shadow-lg overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-48 h-48 object-cover"
                    />
                    <div className="p-4 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.name}</h3>
                        <p className="text-gray-600 text-sm">{item.description}</p>
                      </div>
                      <p className="text-orange-600 font-semibold">{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Menu;
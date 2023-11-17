interface navItems {
  
}

const navItems: Array<any> = [
  {
    id: 1,
    title: 'Home',
    key:'home',
    route:'/'
  }, 
  {
    id: 2,
    title: 'Library',
    key:'library',
    route:'/library'
  },
  {
    id: 3,
    title: 'About',
    key:'about',
    route:'/about'
  },
]
export const extraNavItems: Array<any> = [
  {
    id: 4,
    title: 'Profile',
    key:'profile',
    route:'/profile'
  }, 
  {
    id: 5,
    title: 'Cart',
    key:'cart',
    route:'/cart'
  },
]


export default navItems;
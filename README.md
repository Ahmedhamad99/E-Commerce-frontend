#  E-Commerce Vue.js  



## Requirements

- **Vue 3 (Composition API)**
- **Vite**
- **Bootstrap 5**
- **Pinia**
- **Vue Router**
- **Axios**
- **JWT Authentication**
- **Dark Mode + Toast Notifications + Global Loader**


## Setup
1. clone  https://github.com/Ahmedhamad99/E-Commerce-backend.git
2. cp .env.example .env and set DB credentials
3. composer install
4. php artisan key:generate
5. php artisan jwt:secret
6. php artisan migrate
7. php artisan serve


###  Authentication
- Login  
- Register  
- Logout  
- Auth guard using Vue Router  
- Token stored in `localStorage`  
- Axios interceptor attaches JWT token automatically  

---

###  Products Module
- List all products  
- Create new product (Bootstrap Modal)  
- Edit product  
- Delete product  
- Auto-update list  
- Stock/out_of_stock indicator  

---

### Orders Module
- List all user orders  
- Show full order details  
- Display items, quantity, subtotals  
- Totals and address/phone fields  

---

###  Dashboard Features
- Total Products  
- Total Orders  
- Lightweight UI  
- Responsive Design  
- Shadow cards  

---

###  UI Enhancements
- **Dark Mode** (saved in localStorage)  
- **Toast Notifications** (success, error, warning)  
- **Global Loading Overlay** (spinner shown during API requests)  

---

# Tech Stack

| Tool | Usage |
|------|--------|
| Vue 3 | App UI |
| Vite | Dev server & build tool |
| Pinia | State management |
| Vue Router | Routing system |
| Axios | API communication |
| Bootstrap 5 | UI components |
| Bootstrap Icons | Icons |
| JWT | Auth token |

# 📘 Project Overview

## 1️⃣ API Types (ApiResponse.ts)

- Defined all required TypeScript types for API responses
- Ensures type safety and better maintainability
- Used across components for consistent data handling

## 2️⃣ Routing

- Configured routing using React Router DOM
- Implemented dynamic routing for Product Details page using `useParams`
- Enabled seamless navigation between pages
- Integrated query parameters for search functionality (`useSearchParams`)

## 3️⃣ Navbar

- Built a reusable Navbar component
- Integrated a Search component
- Implemented a custom `useDebounce` hook to:
  - Optimize API calls
  - Improve performance during user input
- Synced search input with URL query parameters

## 4️⃣ Home Page

- Fetched product data using React Query (`useQuery`)
- Managed API states:
  - `data` → response data
  - `isLoading` → loading UI
  - `isError` → error handling

## 5️⃣ Category Component

- Displayed product categories dynamically
- Passed data via props from Home page
- Used TypeScript for structured props handling

## 6️⃣ Product Category Section

- Rendered product lists grouped by category
- Passed title and products as props
- Built reusable UI for displaying product collections

## 7️⃣ Product Details Page

- Navigated using product ID from URL (`useParams`)
- Fetched single product data via API
- Displayed:
  - Images (with thumbnail selection)
  - Product details
  - Pricing
  - Ratings
  - Additional information

## 8️⃣ Comments & Reviews System

- Built a Comments component for each product
- Integrated with API using:
  - `useQuery` → fetch comments
  - `useMutation` → add new comments

- Filtered comments based on `productId`

### Features:

- Add new comments with:
  - Name
  - Email
  - Rating
  - Message

- Display user comments dynamically
- Show rating using ⭐ UI

### Handles:

- Loading state
- Error state
- Empty state

## 9️⃣ Lifting State Up (Child → Parent Communication) 🔥

- Implemented Lifting State Up pattern
- Passed setter functions from parent to child

### Use Case:

- Sent:
  - Total comment count
  - Average rating
- From **Comments → ProductDetails**

### Approach:

- Parent provides callback functions
- Child calculates data
- Child updates parent using callbacks

## 🔟 Derived State Calculations

- Calculated:
  - Total number of comments
  - Average rating

### Best Practice:

- Computed values outside `useEffect`
- Used `useEffect` only for:
  - Sending data to parent (side effects)

## 1️⃣1️⃣ React Query Optimization

- Used dynamic `queryKey` for search-based API calls
- Used `enabled` flag to prevent unnecessary API calls
- Implemented query invalidation using `invalidateQueries` after mutations
- Ensures real-time UI updates and server state consistency

## 1️⃣2️⃣ Search & Filtering System

- Implemented debounced search using `useDebounce`
- Synced search input with URL using query parameters
- Used `useSearchParams` for reading search values
- Integrated React Query with dynamic query keys:
  - Triggers API calls when search value changes

- Prevented unnecessary API calls using:
  - `enabled` property

- Built scalable structure for adding:
  - Category filters
  - Price filters
  - Sorting
  - Pagination

---

## 1️⃣3️⃣ Products Page & Product Tile Component

### 📦 Products Page

- Implemented dynamic product listing page
- Fetches products based on search query using:

  ```
  /products?search=keyword
  ```

- Integrated API using **Axios** and **React Query (`useQuery`)**
- Optimized API calls using:
  - `queryKey`
  - `enabled` flag (only runs when search value exists)

  🔥 Filtering Enhancements
  Integrated rating-based filtering like (1,2,3,4,5) using comments from a separate API
  Implemented client-side data mapping using productId (multi-API handling)
  Added discount-based filtering (10%, 20%, 30% and above)
  Added Price Based Filtering (0-499 , 500-999 , 1000-1999 , 2000 - 4999 , 5000-9999 , 10000 and above)
  Combined multiple filters (rating + discount) efficiently

  ⚡ Optimization:
  Used useMemo for filtering logic
  Prevented unnecessary computations and re-renders
  Ensured type-safe data handling with TypeScript

#### Features:

- Handles loading and error states
- Uses `useSearchParams` to read query parameters
- Displays products dynamically using:

  ```ts
  data?.products?.map();
  ```

- Responsive grid layout using Tailwind CSS

---

### 🧩 Product Tile Component

- Created reusable `ProductTile` component
- Displays individual product details:
  - Image
  - Brand
  - Title
  - Price
  - Original price (with discount)
  - Discount percentage

#### Navigation:

- On click, navigates to:

  ```
  /productDetails/:id
  ```

- Implemented using `useNavigate`

---

### ⚙️ Utilities Used

- `CurrencyConverter` → Formats product price
- `OriginalPrice` → Calculates original price before discount

---

## 1️⃣4️⃣ Cart Page 🛒

### 📦 Cart Page (`Cart.tsx`)

- Displays all items currently added to the cart using **Redux state** via `useSelector`
- Dispatches cart actions using `useDispatch`

#### Computed Values (Derived State):

- **Total Item Count** → Sum of all `item.quantity` values across cart items
- **Total Discounted Price** → Sum of `item.price * item.quantity`
- **Total Original Price** → Calculated using `getOriginalPrice(price, discountPercentage)` for each item
- **Total Discount** → `totalOriginalPrice - totalPrice`

#### Cart Actions:

- **Increase Quantity** → Dispatches `addToCart(item)`
- **Decrease Quantity** → Dispatches `decreaseQuantity(item)`
- **Remove Item** → Dispatches `removeFromCart(item)` + shows toast notification via `react-hot-toast`
- **Clear All** → Dispatches `clearAll()` to wipe the entire cart

#### Layout (Two-Panel):

- **Left Panel (3/4 width)** → Lists all cart items using the `CartTile` component
- **Right Panel (1/4 width)** → Shows price breakdown summary (only visible when cart is non-empty):
  - Price for all items at original price
  - Discount amount (in green)
  - Delivery charges (shown as FREE)
  - Total payable amount
  - Savings summary banner
  - "Place Order" button

#### Empty State:

- When the cart is empty, displays a full-height message prompting the user to add items

---

### 🧩 CartTile Component (`CartTile.tsx`)

- Reusable component to render an individual cart item
- Accepts props: `id`, `images`, `title`, `category`, `rating`, `stock`, `price`, `discountPercentage`, `quantity`, `item`, `onRemove`, `onIncrease`, `onDecrease`

#### Displays:

- **Product image** → Clickable, navigates to `/productDetails/:id` using `useNavigate`
- **Category** → Shown in uppercase
- **Title** → Formatted using `Capitalize` utility
- **Rating & Stock** → Rendered via reusable `RatingAndStock` component
- **Price Section** → Rendered via reusable `PriceSection` component with discount info

#### Quantity Controls:

- **"−" button** → Calls `onDecrease(item)` (dispatches `decreaseQuantity`)
- **Quantity display** → Shows `item.quantity`
- **"+" button** → Calls `onIncrease(item)` (dispatches `addToCart`)

#### Remove:

- **"REMOVE" button** → Calls `onRemove(item)`, which dispatches `removeFromCart` and shows a toast error notification

#### TypeScript:

- Strongly typed via `cartTileProps` type definition
- Uses `CartItem` type from `ApiResponse.ts` for the `item` prop

---

## 🧠 Key Concepts Used

- React Hooks (`useState`, `useEffect`)
- Custom Hooks (`useDebounce`)
- React Router Hooks (`useNavigate`, `useParams`, `useLocation`, `useSearchParams`)
- React Query (Server State Management)
- Redux Toolkit (Client State Management — Cart)
- Lifting State Up
- Controlled Components (Forms)
- Conditional Rendering
- TypeScript for type safety

## 🚀 Summary

This project demonstrates a scalable and production-ready React architecture using:

- Clean component structure
- Efficient data fetching with React Query
- URL-based state management (search & filters)
- Redux-based cart management with full CRUD operations
- Proper state management techniques
- Real-world features like comments, ratings, filtering, and a cart system
- Optimized performance with debouncing and query control
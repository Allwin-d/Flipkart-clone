# 📘 Project Overview

## 1️⃣ API Types (ApiResponse.ts)
* Defined all required TypeScript types for API responses
* Ensures type safety and better maintainability
* Used across components for consistent data handling

## 2️⃣ Routing
* Configured routing using React Router DOM
* Implemented dynamic routing for Product Details page using `useParams`
* Enabled seamless navigation between pages
* Integrated query parameters for search functionality (`useSearchParams`)

## 3️⃣ Navbar
* Built a reusable Navbar component
* Integrated a Search component
* Implemented a custom `useDebounce` hook to:
  * Optimize API calls
  * Improve performance during user input
* Synced search input with URL query parameters

## 4️⃣ Home Page
* Fetched product data using React Query (`useQuery`)
* Managed API states:

  * `data` → response data
  * `isLoading` → loading UI
  * `isError` → error handling

## 5️⃣ Category Component
* Displayed product categories dynamically
* Passed data via props from Home page
* Used TypeScript for structured props handling

## 6️⃣ Product Category Section
* Rendered product lists grouped by category
* Passed title and products as props
* Built reusable UI for displaying product collections


## 7️⃣ Product Details Page
* Navigated using product ID from URL (`useParams`)
* Fetched single product data via API
* Displayed:

  * Images (with thumbnail selection)
  * Product details
  * Pricing
  * Ratings
  * Additional information


## 8️⃣ Comments & Reviews System
* Built a Comments component for each product
* Integrated with API using:

  * `useQuery` → fetch comments
  * `useMutation` → add new comments
* Filtered comments based on `productId`

### Features:
* Add new comments with:

  * Name
  * Email
  * Rating
  * Message
* Display user comments dynamically
* Show rating using ⭐ UI

### Handles:
* Loading state
* Error state
* Empty state


## 9️⃣ Lifting State Up (Child → Parent Communication) 🔥
* Implemented Lifting State Up pattern
* Passed setter functions from parent to child

### Use Case:

* Sent:
  * Total comment count
  * Average rating
* From **Comments → ProductDetails**

### Approach:
* Parent provides callback functions
* Child calculates data
* Child updates parent using callbacks


## 🔟 Derived State Calculations
* Calculated:

  * Total number of comments
  * Average rating

### Best Practice:
* Computed values outside `useEffect`
* Used `useEffect` only for:

  * Sending data to parent (side effects)


## 1️⃣1️⃣ React Query Optimization
* Used dynamic `queryKey` for search-based API calls
* Used `enabled` flag to prevent unnecessary API calls
* Implemented query invalidation using `invalidateQueries` after mutations
* Ensures real-time UI updates and server state consistency


## 1️⃣2️⃣ Search & Filtering System (NEW 🔥)
* Implemented debounced search using `useDebounce`
* Synced search input with URL using query parameters
* Used `useSearchParams` for reading search values
* Integrated React Query with dynamic query keys:

  * Triggers API calls when search value changes
* Prevented unnecessary API calls using:

  * `enabled` property
* Built scalable structure for adding:

  * Category filters
  * Price filters
  * Sorting
  * Pagination

---

## 🧠 Key Concepts Used
* React Hooks (`useState`, `useEffect`)
* Custom Hooks (`useDebounce`)
* React Router Hooks (`useNavigate`, `useParams`, `useLocation`, `useSearchParams`)
* React Query (Server State Management)
* Lifting State Up
* Controlled Components (Forms)
* Conditional Rendering
* TypeScript for type safety


## 🚀 Summary
This project demonstrates a scalable and production-ready React architecture using:
* Clean component structure
* Efficient data fetching with React Query
* URL-based state management (search & filters)
* Proper state management techniques
* Real-world features like comments, ratings, and filtering
* Optimized performance with debouncing and query control

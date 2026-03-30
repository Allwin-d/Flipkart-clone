✅ Updated README (with your recent changes)
📘 Project Overview

1️⃣ API Types (ApiResponse.ts)
Defined all required TypeScript types for API responses
Ensures type safety and better maintainability
Used across components for consistent data handling

2️⃣ Routing
Configured routing using React Router DOM
Implemented dynamic routing for Product Details page using useParams
Enabled navigation between pages seamlessly

3️⃣ Navbar
Built a reusable Navbar component
Integrated a Search component
Implemented a custom useDebounce hook to:
Optimize API calls
Improve performance during user input

4️⃣ Home Page
Fetched product data using React Query (useQuery)
Managed API states:
data → response data
isLoading → loading UI
isError → error handling

5️⃣ Category Component
Displayed product categories dynamically
Passed data via props from Home page
Used TypeScript for structured props handling

6️⃣ Product Category Section
Rendered product lists grouped by category
Passed title and products as props
Built reusable UI for displaying product collections

7️⃣ Product Details Page
Navigated using product ID from URL (useParams)
Fetched single product data via API
Displayed:
Images (with thumbnail selection)
Product details
Pricing
Ratings
Additional information

8️⃣ Comments & Reviews System 
Built a Comments component for each product
Integrated with API using:
useQuery → fetch comments
useMutation → add new comments
Filtered comments based on productId
Features:
Add new comments with:
Name
Email
Rating
Message
Display user comments dynamically
Show rating using ⭐ UI
Handles:
Loading state
Error state
Empty state

9️⃣ Lifting State Up (Child → Parent Communication) 🔥
Implemented Lifting State Up pattern
Passed setter functions from parent to child
Use Case:
Sent:
Total comment count
Average rating
from Comments → ProductDetails
Approach:
Parent provides callback functions
Child calculates data
Child updates parent using callbacks

🔟 Derived State Calculations (NEW)
Calculated:
Total number of comments
Average rating
Best Practice:
Computed values outside useEffect
Used useEffect only for:
Sending data to parent (side effects)

1️⃣1️⃣ React Query Optimization
Used invalidateQueries after adding comments
Ensures real-time UI updates
Maintains server state consistency

🧠 Key Concepts Used
React Hooks (useState, useEffect)
Custom Hooks (useDebounce)
React Query (Server State Management)
Lifting State Up
Controlled Components (Forms)
Conditional Rendering
TypeScript for type safety


🚀 Summary

This project demonstrates a scalable React architecture using:

Clean component structure
Efficient data fetching with React Query
Proper state management techniques
Real-world features like comments, ratings, and filtering
Project Overview

This project is built using React + TypeScript and consumes data from the Dummy JSON Products API.

API Types
Defined TypeScript types for the API responses.
File: ApiResponse.ts

Home Page
Used useQuery to fetch product data (GET request).
Rendered the list of products on the Home page.
Created a Product Tile component to display each product.
Used useNavigate inside the Product Tile component to navigate to the ProductDetails page for a selected product.

Product Details Page
Used the useEffect hook to fetch data for a single product.
Did not use useQuery for this page.
Used the Product type to handle and display single product data.
Reviews / Comments Section:
Displays customer reviews for each product.
Each review shows:
Reviewer name
Rating
Comment
Reviewer email
Review date
Reviews are dynamically rendered from the product API response.

Cart Functionality
Created a Redux slice:
File: CartSlice.ts
Handles adding and removing cart items.
Created the Redux store:
File: Store.ts

Created Cart.tsx to:
Access cart data from the Redux store
Render cart items on the Cart page

Navbar
Implemented a search functionality with debouncing (500ms delay).
Used useDebounce custom hook to optimize API calls.
On search input, fetches product data from the API.
Automatically navigates to the Products page with search results passed via navigation state.
Includes navigation handlers for:
- Logo click → Home page
- Cart icon → Cart page
Handles errors during product search with try-catch.

Products Page
Receives searched product data through React Router navigation state using useLocation.
Displays products in a responsive grid layout.
Each product tile shows:
Product image
Title and description
Rating
Price with discount percentage
Remaining stock
Implemented currency formatting using a utility function.
Added click navigation using useNavigate:
Clicking a product image navigates to the Product Details page using the product ID.
Displays a fallback message when no search results are found.

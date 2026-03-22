📘 Project Overview

1️⃣ API Types (ApiResponse.ts)
Defined all the required TypeScript types for handling API responses.
Ensures type safety and better code maintainability across the project.
Routing for different pages is configured in the main App component using React Router DOM.


2️⃣ Navbar
Created a reusable Navbar component.
Integrated a Search component inside the Navbar.
Implemented a custom useDebounce hook in the Search component to efficiently handle user input and avoid unnecessary API calls.

3️⃣ Home Page
Fetched all product data using React Query (useQuery).
Managed different states:
data → API response
isLoading → Loading state
isError → Error handling

4️⃣ Category Component
Retrieved category data (such as name and image) on the Home page.
Passed this data as props to the Category component.
Used destructuring to access props and render the categories dynamically.
Defined proper TypeScript types for better structure and safety.

5️⃣ Product Category
Rendered the Product Section component from the Home page.
Passed title and product data as props.
Displayed the section title along with the corresponding list of products.

6️⃣ Product Details Page
When a user clicks on a specific product, they are navigated to the Product Details page.
Used React Router’s useParams hook to extract the product ID from the URL.
With this ID, an API call is made to fetch the details of the selected product.
The page then handles and displays the fetched product data accordingly.
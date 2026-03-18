1) ApiResponse.ts
Initially, I created the TypeScript types for the project in this file.
Then, in the App component, I configured routing for different pages using React Router DOM.

2) Navbar
I created a Navbar component, which includes a Search component.
Inside the Search component, I implemented a custom useDebounce hook to handle debouncing for user input.

3) Home Page
On the Home page, I fetched all product data using useQuery.
From useQuery, I also handled the states such as data, isLoading, and isError.

4) Category Component
In the Home page, I retrieved category data (name and image) and passed it as props to the Category component.
Inside the Category component, I used destructuring to access the props and rendered the categories accordingly.
I also defined appropriate types for the received data.

5) Product Section
In the Home page, I rendered the Product Section component by passing the title and product data as props.
Inside the Product Section component, I displayed the title along with the corresponding product list.
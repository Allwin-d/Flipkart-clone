First, I defined TypeScript types for the API responses that I receive from the Dummy JSON Products API.
File name: ApiResponse.ts

Home Page:

On the Home page, I used useQuery to fetch the product data (useQuery is used for GET requests).
I rendered the products on the Home page.
For displaying each product individually, I used a Product Tile component.
Inside the (Product Tile) component, I used useNavigate to navigate to the (ProductDetails) page for a single product.


ProductDetails Page:
On the ProductDetails page, instead of using useQuery to fetch a single product, I used the useEffect hook to fetch the data.
I used the Product type to handle the single product data.  
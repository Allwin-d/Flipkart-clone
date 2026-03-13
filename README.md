ApiResponse.ts : 
First i have created the Types for the projects here,
then in the App file , i have defined routing for each pages using the react-router-dom, 

2) Created the Navbar , 
in the Navbar i used the Search Component Inside , inside the Search Component i used the (useDebounce hook) for the debouncing,

3) Home page : 
In the Home page we fetched the all products data using the useQuery 
and also we got the data , isloading , isError state from the useQuery

4) Category Component : 
in the Home Page , we got the categories with the name and image , and passed it as a props to the category compoenent , where we rendered those products 
in the Category Compoenent used Destructuring to extract those products , and also defined for that 


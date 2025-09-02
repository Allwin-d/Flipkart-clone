1) design the navbar 
2) in the home page , use useQuery to fetch the data , 
  -- then i filterd the fragrance , grocery , beauty and furniture for that i used useMemo bcz it runs only when the data gets changed , and it wont run on every time the page re-renders ...
  

  3)PRODUCT DETAILS PAGE : 
    3.1 ) in products details page , first we get the product item from the url using (useLocation) , and then using destructuring to get specific details from the product

    the Uselocation have 3 properties : state,key,pathname;
     
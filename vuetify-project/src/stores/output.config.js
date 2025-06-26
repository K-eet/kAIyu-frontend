export const recommendedProducts = [
  {
    id: 1,
    name: "IDANÄS",
    description: "Bookcase",
    price: 1390.0,
    image: "https://www.ikea.com/my/en/images/products/idanaes-bookcase-dark-brown-stained__1008945_pe827388_s5.jpg?f=xl",
    link: "https://www.ikea.com/my/en/p/idanaes-bookcase-dark-brown-stained-80487832/",
  },
  {
          id: 2,
          name: "IDANÄS",
          description: "Coffee Table",
          price: 129.0,
          image:
            "https://www.ikea.com/my/en/images/products/idanaes-coffee-table-dark-brown-stained__1161066_pe889274_s5.jpg?f=xl",
          link: "https://www.ikea.com/my/en/p/idanaes-coffee-table-dark-brown-stained-90500003/",
          selected: false, // Added selected property
        },
        {
          id: 3,
          name: "DYTÅG",
          description: "Curtains",
          price: 285,
          image:
            "https://www.ikea.com/my/en/images/products/dytag-curtains-1-pair-dark-beige-with-heading-tape__1024993_pe833752_s5.jpg?f=xl",
          link: "https://www.ikea.com/my/en/p/dytag-curtains-1-pair-dark-beige-with-heading-tape-40519118/",
          selected: false, // Added selected property
        },
        {
          id: 4,
          name: "FORSÅ",
          description: "Work lamp",
          price: 139.0,
          image:
            "https://www.ikea.com/my/en/images/products/forsa-work-lamp-nickel-plated__0121576_pe278160_s5.jpg?f=xl",
          link: "https://www.ikea.com/my/en/p/forsa-work-lamp-nickel-plated-10146766/",
          selected: false, // Added selected property
        },
        {
          id: 5,
          name: "IDANÄS",
          description: "Cabinet",
          price: 2490.0,
          image:
            "https://www.ikea.com/my/en/images/products/idanaes-high-cabinet-w-gls-drs-and-1-drawer-dark-brown-stained__1008948_pe827389_s5.jpg?f=xl",
          link: "https://www.ikea.com/my/en/p/idanaes-high-cabinet-w-gls-drs-and-1-drawer-dark-brown-stained-50487838/",
          selected: false, // Added selected property
        },
        {
          id: 6,
          name: "RÖDFLIK",
          description: "Floor/reading lamp",
          price: 139.0,
          image:
            "https://www.ikea.com/my/en/images/products/roedflik-floor-reading-lamp-grey-green__1232722_pe916583_s5.jpg?f=xl",
          link: "https://www.ikea.com/my/en/p/roedflik-floor-reading-lamp-grey-green-80563576/",
          selected: false, // Added selected property
        },
      ],
     export const hotspots = [
        {
          x: 18,
          y: 25,
          productId: 5, // Cabinet
          tooltip: "Cabinet",
        },
        {
          x: 73,
          y: 35,
          productId: 4, // Work Lamp
          tooltip: "Work Lamp",
        },
        {
          x: 40,
          y: 70,
          productId: 2, // Coffee Table
          tooltip: "Coffee Table",
        },
        {
          x: 38,
          y: 40,
          productId: 6, // Floor Lamp
          tooltip: "Floor Lamp",
        },
        {
          x: 25,
          y: 25,
          productId: 1, // Bookcase
          tooltip: "Bookcase",
        },
        {
          x: 55,
          y: 30,
          productId: 3, // Curtains
          tooltip: "Curtains",
        },
      ]
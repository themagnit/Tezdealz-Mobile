export const sortingOptions = [
  { value: "price", label: "Price: Low to High" },
  { value: "-price", label: "Price: High to Low" },
  { value: "-createdAt", label: "Ad Date: Recent First" },
  { value: "createdAt", label: "Ad Date: Oldest First" },
  { value: "-milage", label: "Mileage: Highest First" },
  { value: "milage", label: "Mileage: Lowest First" },
  { value: "modelYear", label: "Model Year: Oldest First" },
  { value: "-modelYear", label: "Model Year: Newest First" },
];

export const Carfilters = {
  TRANSMISSION: [
    { id: 1, name: "Automatic" },
    { id: 2, name: "Manual" },
  ],
  ENGINE_TYPE: [
    { id: 1, name: "CNG" },
    { id: 2, name: "Diesel" },
    { id: 3, name: "Electric" },
    { id: 4, name: "Hybrid" },
    { id: 5, name: "Petrol" },
  ],
  MAKE: ["Daihatsu", "Honda", "Nissan", "Suzuki", "Toyota"],
  MODEL: [
    "City",
    "Civic",
    "Vezel",
    "N Wgn",
    "Corolla",
    "Yaris",
    "Aqua",
    "Fortuner",
    "Prius",
    "Mehran",
    "Alto",
    "Cultus",
    "Wagon R",
    "Swift",
    "Dayz",
    "Dayz Highway Star",
    "Clipper",
    "Sunny",
    "Juke",
    "Mira",
    "Coure",
    "Hijet",
    "Move",
    "Charade",
  ],

  COLOR: [
    { hex: "#000000", text: "Black" },
    { hex: "#FFFFFF", text: "White" },
    { hex: "#CC0000", text: "Red" },
    { hex: "#4E9B47", text: "Green" },
    { hex: "#0000FF", text: "Blue" },
    { hex: "#808080", text: "Grey" },
    { hex: "#2A3439", text: "Gun Metallic" },
  ],
  BODY_TYPE: [],
  ASSEMBLY: [
    { id: 1, name: "Imported" },
    { id: 2, name: "Local" },
  ],
  PICTURE_AVAILABILITY: ["With Picture"],
  VIDEO_AVAILABILITY: ["With Video"],
  SELLER_TYPE: [
    { id: 1, name: "Dealer" },
    { id: 2, name: "Individual" },
  ],
  AD_TYPE: ["Featured Ads"],
};

export const minMaxValues: any = {
  price: [0, 50000000],
  modelYear: [1971, 2021],
  milage: [0, 240000],
  engineCapacity: [600, 10000]
};

export const filterNames = [
  {
    id: 1,
    title: "Basic",
    isExpanded: false,
    data: [
      {
        key: "11",
        active: false,
        text: "PRICE RANGE",
      },
      {
        key: "12",
        active: false,
        text: "MAKE",
      },

      {
        key: "13",
        active: false,
        text: "MODEL",
      },
      {
        key: "14",
        active: false,
        text: "MILEAGE (KM)",
      },
      {
        key: "15",
        active: false,
        text: "YEAR",
      },
    ],
  },
  {
    id: 2,
    title: "Location",
    isExpanded: false,
    data: [
      {
        key: "16",
        active: false,
        text: "PROVINCE",
      },
      {
        key: "17",
        active: false,
        text: "CITY",
      },

      {
        key: "18",
        text: "REGISTERED CITY",
        active: false,
      },
    ],
  },
  {
    id: 3,
    title: "Performance",
    isExpanded: false,
    data: [
      {
        key: "19",
        text: "TRANSMISSION",
        active: false,
      },
      {
        key: "20",
        text: "ENGINE TYPE",
        active: false,
      },

      {
        key: "21",
        text: "ENGINE CAPACITY (CC)",
        active: false,
      },
    ],
  },
  {
    id: 4,
    title: "Style",
    isExpanded: false,
    data: [
      {
        key: "22",
        text: "BODY TYPE",
        active: false,
      },
      {
        key: "23",
        text: "COLOR",
        active: false,
      },
    ],
  },
  {
    id: 5,
    title: "Others",
    isExpanded: false,
    data: [
      {
        key: "24",
        text: "ASSEMBLY",
        active: false,
      },
      {
        key: "25",
        text: "SELLAR TYPE",
        active: false,
      },
    ],
  },
];

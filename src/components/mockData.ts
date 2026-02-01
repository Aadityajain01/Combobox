import { Node } from "./types";

export const mockData: Record<string, Node[]> = {
  categories: [
    {
      id: "electronics",
      label: "Electronics",
      hasChildren: true,
      parentId: null,
    },
    { id: "fashion", label: "Fashion", hasChildren: true, parentId: null },
    { id: "furniture", label: "Furniture", hasChildren: true, parentId: null },
    { id: "fitness", label: "Fitness", hasChildren: true, parentId: null },
  ],
  electronics: [
    {
      id: "mobiles",
      label: "Mobiles",
      hasChildren: false,
      parentId: "electronics",
    },
    {
      id: "laptops",
      label: "Laptops",
      hasChildren: true,
      parentId: "electronics",
    },
  ],
  laptops: [
    {
      id: "gaming-laptops",
      label: "Gaming Laptops",
      hasChildren: false,
      parentId: "laptops",
    },
    {
      id: "chromebooks",
      label: "Chromebooks",
      hasChildren: false,
      parentId: "laptops",
    },
    {
      id: "professional-laptops",
      label: "Professional Laptops",
      hasChildren: false,
      parentId: "laptops",
    },
  ],
  fashion: [
    { id: "mens", label: "Mens", hasChildren: true, parentId: "fashion" },
    { id: "womens", label: "Womens", hasChildren: true, parentId: "fashion" },
  ],
  mens: [
    { id: "shirts", label: "Shirts", hasChildren: false, parentId: "mens" },
    { id: "trousers", label: "Trousers", hasChildren: false, parentId: "mens" },
    { id: "tshirts", label: "T-Shirts", hasChildren: false, parentId: "mens" },
  ],
  womens: [
    { id: "tops", label: "Tops", hasChildren: false, parentId: "womens" },
    { id: "skirts", label: "Skirts", hasChildren: false, parentId: "womens" },
    {
      id: "traditional",
      label: "Traditional",
      hasChildren: false,
      parentId: "womens",
    },
  ],
  furniture: [
    { id: "table", label: "Table", hasChildren: false, parentId: "furniture" },
    { id: "chair", label: "Chair", hasChildren: true, parentId: "furniture" },
    { id: "sofa", label: "Sofa", hasChildren: false, parentId: "furniture" },
  ],
  chair: [
    {
      id: "dining-chair",
      label: "Dining Chair",
      hasChildren: false,
      parentId: "chair",
    },
    {
      id: "office-chair",
      label: "Office Chair",
      hasChildren: false,
      parentId: "chair",
    },
    {
      id: "gaming-chair",
      label: "Gaming Chair",
      hasChildren: false,
      parentId: "chair",
    },
  ],
  fitness: [
    { id: "sports", label: "Sports", hasChildren: true, parentId: "fitness" },
    { id: "gym", label: "Gym", hasChildren: true, parentId: "fitness" },
  ],
  sports: [
    {
      id: "football",
      label: "Football",
      hasChildren: false,
      parentId: "sports",
    },
    { id: "cricket", label: "Cricket", hasChildren: false, parentId: "sports" },
    {
      id: "basketball",
      label: "Basketball",
      hasChildren: false,
      parentId: "sports",
    },
  ],
  gym: [
    {
      id: "treadmill",
      label: "Treadmill",
      hasChildren: false,
      parentId: "gym",
    },
    {
      id: "dumbbells",
      label: "Dumbbells",
      hasChildren: false,
      parentId: "gym",
    },
  ],
};
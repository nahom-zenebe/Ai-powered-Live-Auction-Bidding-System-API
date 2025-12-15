import mongoose from "mongoose";

const CategorySchema = mongoose.Schema({
  name: {
    type: String,
    enum: [
      "Electronics",
      "Fashion",
      "Home & Kitchen",
      "Sports & Outdoors",
      "Books",
      "Toys & Games",
      "Health & Beauty",
      "Automotive",
      "Music",
      "Movies & TV",
      "Video Games",
      "Computers",
      "Mobile Phones",
      "Cameras",
      "Jewelry",
      "Watches",
      "Shoes",
      "Handbags",
      "Office Supplies",
      "Pet Supplies",
      "Garden & Outdoor",
      "Grocery",
      "Baby Products",
      "Arts & Crafts",
      "Software",
      "Industrial & Scientific",
      "Tools & Equipment",
      "Collectibles",
      "Gift Cards",
      "Tickets & Experiences",
      "Musical Instruments",
      "Smart Home",
      "Appliances",
      "Furniture",
      "Luggage & Travel",
      "Stationery",
      "Bags & Accessories",
      "Camping & Hiking",
      "Fitness",
      "Photography",
    ],
    required: true,
  },
  description: {
    type: String,
  },
});

const Category = mongoose.model("Category", CategorySchema);

export default Category;

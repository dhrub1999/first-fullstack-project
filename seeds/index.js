const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cites");
const { places, descriptors } = require("./seedHelpers");

mongoose.set("strictQuery", true);
mongoose.connect("mongodb://localhost:27017/safari");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database Connected!!");
});

const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;

    const camp = new Campground({
      //* My user id

      author: "63b2b32eb08c5ec78c823287",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi nostrum molestias sunt rem, voluptatem excepturi corporis velit sit perspiciatis quo.",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longtitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dgvkxttnx/image/upload/v1672798035/Safari/nciezk3z0yyqg2ogupbp.jpg",
          filename: "Safari/nciezk3z0yyqg2ogupbp",
        },
        {
          url: "https://res.cloudinary.com/dgvkxttnx/image/upload/v1672798040/Safari/ekfmibyiquvrr08anyyb.jpg",
          filename: "Safari/ekfmibyiquvrr08anyyb",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});

//DECLARING VARIABLES
//===========================
var mongoose           = require( 'mongoose' )
var Item

Item = new mongoose.Schema( {
	name : { type: String, unique: false },
	photolink: String,
	// type : { type: String },
  // quantity: { type: Number, default: 0 },
	price: { type: Number },
	category: String,
	// status: {type: String, default: 'active'},
	// completedAt : Date,
	description: { type: String }
} )

module.exports = mongoose.model( 'Item', Item )

// db.items.insert({"name": "drip coffee", "photoLink": "http://assets.pages.viewpoints.com/wp-content/uploads/2013/05/drip-coffee-maker1.jpg", "price": '3.25', "category": "hot drink"})
// db.items.insert({"name": "Latte", "photoLink": "http://silvestregustolatino.com/magento/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/l/a/latte.jpg", "price": '4.50', "category": "hot drink"})
// db.items.insert({"name": "Mocha", "photoLink": "https://cloffee.files.wordpress.com/2013/09/saltred-caramel-mocha.jpg", "price": '3.25', "category": "hot drink"})
// db.items.insert({"name": "English Tea", "photoLink": "http://communitytimes.me/wp-content/uploads/2016/01/shutterstock_136561298.jpg", "price": '2.25', "category": "hot drink"})
// db.items.insert({"name": "Green Tea", "photoLink": "http://www.teamajesty.com/wp-content/uploads/2014/03/Green-Tea-Side-Effects.jpg", "price": '2.25', "category": "hot drink"})
/////cold drinks
// db.items.insert({"name": "Iced Coffee", "photoLink": "http://www.theshoppingmama.com/wp-content/uploads/2014/07/Iced-Coffee-Recipes.jpg.jpg", "price": '3.75', "category": "cold drink"})
// db.items.insert({"name": "Iced Tea", "photoLink": "https://www.twoleavestea.com/media/catalog/product/cache/1/image/490x445/9df78eab33525d08d6e5fb8d27136e95/b/l/blackicedtea_glasswithlemon_web.png", "price": '3.50', "category": "cold drink"})
// db.items.insert({"name": "Cold Brew", "photoLink": "http://static4.techinsider.io/image/55ce0f262acae7b7188c00b9-4752-3564/cold%20brew.jpg", "price": '4.50', "category": "cold drink"})
// db.items.insert({"name": "Lemonade", "photoLink": "http://detoxinista.com/wp-content/uploads/2014/07/Basil-Lemonade.jpg", "price": '4.50', "category": "cold drink"})

//DECLARING VARIABLES
//===========================
var mongoose           = require( 'mongoose' )
var Item

Item = new mongoose.Schema( {
	name : { type: String, unique: false },
	photolink: String,
	customFields: {
		espressoShots: {
			on: Boolean,
			value: Number,
			addedPrice: Number
		}
		,cream: {
			on: Boolean
			,value: String
		}
		,sugar: {
			on: Boolean
			,value: Number
		}
		,flavourShot: {
			on: Boolean
			,value: String
			,addedPrice: Number
		}
		,size: {
			on: Boolean
			,value: Object/////each size with it's price as a key value pair
		}
	},
	price: { type: Number },
	category: String,
	description: { type: String }
} )

module.exports = mongoose.model( 'Item', Item )


///////current seed data for menu items

// db.items.insert({"name": "drip coffee", "photoLink": "http://assets.pages.viewpoints.com/wp-content/uploads/2013/05/drip-coffee-maker1.jpg", "price": '3.25', "category": "hot drink", customFields: {
// 	espressoShots: {
// 		on: true,
// 		value: 0,
// 		addedPrice: 1
// 	}
// 	,cream: {
// 		on: true
// 		,value: false
// 	}
// 	,sugar: {
// 		on: true
// 		,value: false
// 	}
// 	,flavourShot: {
// 		on: true
// 		,value: false
// 		,addedPrice: 0.5
// 	}
// 	,size: {
// 		on: true
// 		,sizes: {
// 			small: 0,
// 			medium: 1,
// 			large: 1.75,
// 			value: false
// 		}
// 	}
// }})
//
//
// db.items.insert({"name": "Latte", "photoLink": "http://silvestregustolatino.com/magento/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/l/a/latte.jpg", "price": '4.50', "category": "hot drink", customFields: {
// 	espressoShots: {
// 		on: true,
// 		value: 0,
// 		addedPrice: 1
// 	}
// 	,cream: {
// 		on: true
// 		,value: false
// 	}
// 	,sugar: {
// 		on: true
// 		,value: false
// 	}
// 	,flavourShot: {
// 		on: true
// 		,value: false
// 		,addedPrice: 0.5
// 	}
// ,size: {
// 	on: true
// 	,sizes: {
// 		small: 0,
// 		medium: 1,
// 		large: 1.75,
// 		value: false
// 	}
// }
// }})
//
//
// db.items.insert({"name": "Mocha", "photoLink": "https://cloffee.files.wordpress.com/2013/09/saltred-caramel-mocha.jpg", "price": '3.25', "category": "hot drink", customFields: {
// 	espressoShots: {
// 		on: true,
// 		value: 0,
// 		addedPrice: 1
// 	}
// 	,cream: {
// 		on: true
// 		,value: false
// 	}
// 	,sugar: {
// 		on: true
// 		,value: false
// 	}
// 	,flavourShot: {
// 		on: true
// 		,value: false
// 		,addedPrice: 0.5
// 	}
// ,size: {
// 	on: true
// 	,sizes: {
// 		small: 0,
// 		medium: 1,
// 		large: 1.75,
// 		value: false
// 	}
// }
// }})
//
//
// db.items.insert({"name": "English Tea", "photoLink": "http://communitytimes.me/wp-content/uploads/2016/01/shutterstock_136561298.jpg", "price": '2.25', "category": "hot drink", customFields: {
// 	espressoShots: {
// 		on: false,
// 		value: 0,
// 		addedPrice: 1
// 	}
// 	,cream: {
// 		on: true
// 		,value: false
// 	}
// 	,sugar: {
// 		on: true
// 		,value: false
// 	}
// 	,flavourShot: {
// 		on: false
// 		,value: false
// 	}
// ,size: {
// 	on: true
// 	,sizes: {
// 		small: 0,
// 		medium: 1,
// 		large: 1.75,
// 		value: false
// 	}
// }
// }})
//
//
// db.items.insert({"name": "Green Tea", "photoLink": "http://www.teamajesty.com/wp-content/uploads/2014/03/Green-Tea-Side-Effects.jpg", "price": '2.25', "category": "hot drink", customFields: {
// 	espressoShots: {
// 		on: false,
// 		value: 0,
// 		addedPrice: 1
// 	}
// 	,cream: {
// 		on: true
// 		,value: false
// 	}
// 	,sugar: {
// 		on: true
// 		,value: false
// 	}
// 	,flavourShot: {
// 		on: false
// 		,value: false
// 	}
// ,size: {
// 	on: true
// 	,sizes: {
// 		small: 0,
// 		medium: 1,
// 		large: 1.75,
// 		value: false
// 	}
// }
// }})
//
//
// ///cold drinks
// db.items.insert({"name": "Iced Coffee", "photoLink": "http://www.theshoppingmama.com/wp-content/uploads/2014/07/Iced-Coffee-Recipes.jpg.jpg", "price": '3.75', "category": "cold drink"}, customFields: {
// 	espressoShots: {
// 		on: true,
// 		value: 0,
// 		addedPrice: 1
// 	}
// 	,cream: {
// 		on: true
// 		,value: false
// 	}
// 	,sugar: {
// 		on: true
// 		,value: false
// 	}
// 	,flavourShot: {
// 		on: true
// 		,value: false
// 		,addedPrice: 0.5
// 	}
// ,size: {
// 	on: true
// 	,sizes: {
// 		small: 0,
// 		medium: 1,
// 		large: 1.75,
// 		value: false
// 	}
// }
// })
//
//
// db.items.insert({"name": "Iced Tea", "photoLink": "https://www.twoleavestea.com/media/catalog/product/cache/1/image/490x445/9df78eab33525d08d6e5fb8d27136e95/b/l/blackicedtea_glasswithlemon_web.png", "price": '3.50', "category": "cold drink", customFields: {
// 	espressoShots: {
// 		on: false,
// 		value: 0,
// 		addedPrice: 1
// 	}
// 	,cream: {
// 		on: true
// 		,value: false
// 	}
// 	,sugar: {
// 		on: true
// 		,value: false
// 	}
// 	,flavourShot: {
// 		on: true
// 		,value: false
// 		,addedPrice: false
// 	}
// ,size: {
// 	on: true
// 	,sizes: {
// 		small: 0,
// 		medium: 1,
// 		large: 1.75,
// 		value: false
// 	}
// }
// }})
//
//
// db.items.insert({"name": "Cold Brew", "photoLink": "http://static4.techinsider.io/image/55ce0f262acae7b7188c00b9-4752-3564/cold%20brew.jpg", "price": '4.50', "category": "cold drink", customFields: {
// 	espressoShots: {
// 		on: true,
// 		value: 0,
// 		addedPrice: 1
// 	}
// 	,cream: {
// 		on: true
// 		,value: false
// 	}
// 	,sugar: {
// 		on: true
// 		,value: false
// 	}
// 	,flavourShot: {
// 		on: true
// 		,value: false
// 		,addedPrice: 0.5
// 	}
// ,size: {
// 	on: true
// 	,sizes: {
// 		small: 0,
// 		medium: 1,
// 		large: 1.75,
// 		value: false
// 	}
// }
// }})
//
//
// db.items.insert({"name": "Lemonade", "photoLink": "http://detoxinista.com/wp-content/uploads/2014/07/Basil-Lemonade.jpg", "price": '4.50', "category": "cold drink", customFields: {
// 	espressoShots: {
// 		on: false,
// 		value: 0,
// 		addedPrice: 1
// 	}
// 	,cream: {
// 		on: false
// 		,value: false
// 	}
// 	,sugar: {
// 		on: false
// 		,value: false
// 	}
// 	,flavourShot: {
// 		on: false
// 		,value: false
// 		,addedPrice: false
// 	}
// ,size: {
// 	on: true
// 	,sizes: {
// 		small: 0,
// 		medium: 1,
// 		large: 1.75,
// 		value: false
// 	}
// }
// }})

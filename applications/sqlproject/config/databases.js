//  /home/vladimir/impress_server/applications/sqlproject/config/databases.js
//Официально поддерживаются MySQL и MongoDB

module.exports = {

	impress: {
		url: "mongodb://localhost:27017/impress", // MongoDB connection string
		slowTime: "1s",                           // time to log query as slow
		collections: ["sessions", "users", "groups"],  // Collection name for store sessions (to be removed and use introspection)
		security: true,                            // this database will be used for security subsystem storage (sessions, users, groups)
	},

	my_project: {
	 	url: "mysql://svr93:passwd@localhost:3306/forums", // MySQL connection example
	 	slowTime: "1s",                                // time to log query as slow
	 	tables: [],                                     // to be implemented (to be removed and use introspection)
	},

}


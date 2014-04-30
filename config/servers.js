// /home/vladimir/impress_server/config/servers.js

// Server ports bind configuration
// Each server is named server on specified address and port

module.exports = {
	www: {
		protocol:      "http",
		address:       "0.0.0.0",
		port:          80,
		applications:  ["example", "sqlproject"], // virtual hosts for this server (see hosts definitions below)
		nagle:         true,        // Nagle algorithm, default true, set to false for latency optimization
		slowTime:      "1s"
	},
	//ssl: {
	//	protocol:  "https",
	//	address:   "127.0.0.1",
	//	port:      443,
	//	key:       "example.key",
	//	cert:      "example.cer"
	//},
	//static: {
	//	protocol:  "http",
	//	address:   "127.0.0.1",
	//	port:      8080,
	//	slowTime:  1000
	//}
}


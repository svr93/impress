//  /home/vladimir/impress_server/applications/sqlproject/config/routes.js
//dir2 = <somename>.json
//127.0.0.1/api/<dir1>/<dir2> -> sqlproject/app/api/<dir1>/<dir2>/<get or post>.js
module.exports = [
        //post requests
        {
                url:      "/db/api/(forum|post|thread|user)/(\\w+)/()",
                rewrite:  "/api/[1]/[2].json"
        },
        //get requests
        {
                url:      "/db/api/(forum|post|thread|user)/(\\w+)/(.*)",
                rewrite:  "/api/[1]/[2].json[3]"
        },
        //clear database
        {
                url:      "/db/api/clear(.*)",
                rewrite:  "/api/clear.json"
        }
]


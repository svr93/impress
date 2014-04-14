//  /home/vladimir/impress_server/applications/sqlproject/config/routes.js
//dir2 = <somename>.json
//127.0.0.1/api/<dir1>/<dir2> -> sqlproject/app/api/<dir1>/<dir2>/<get or post>.js
module.exports = [
        //post requests
        {
                url:      "/db/api/([a-zA-z0-9._]+)/(forum|post|thread|user)/(\\w+)/()",
                rewrite:  "/api/[2]/[3].json"
        },
        //get requests
        {
                url:      "/db/api/([a-zA-z0-9._]+)/(forum|post|thread|user)/(\\w+)/(.*)",
                rewrite:  "/api/[2]/[3].json[4]"
        }
]


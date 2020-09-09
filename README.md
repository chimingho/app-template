# App Template

Commonly used Dotnet Core web templates and libraries for reference

## Getting Started

Copy from templates or run scripts to generate your own.

### Installing
* create_new_app.ps1: script to generate web templates 
* deployment_db.ps1: script to deploy to AWS ElasticBeanstalk
### Debugging
1. run `dotnet watch run` to debug server side and client app on the same port
2. to run Angular project through `ng serve` or `npm start` instread of `dotnet watch run` onto different port, add proxy server to avoid CORS.    

    Angular Proxy: https://angular.io/guide/build#proxy

    To run Angular project through `ng serve` or `npm start` instread of `dotnet watch run` onto different port, add proxy server to avoid CORS.    
    ```
    {
        "/": {
            "target": "https://localhost:5001",
            "secure": false,
            "logLevel": "debug"
        }
    }
    ```
3. to debug in linux, add DockerFile. https://code.visualstudio.com/docs/containers/quickstart-aspnet-core




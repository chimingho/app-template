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


##Appendix 
* MS Agular template is very old. https://medium.com/@waelkdouh/how-to-update-visual-studio-asp-net-core-angular-project-to-the-latest-version-25de32cfeb84

https://stackoverflow.com/questions/44525746/global-angular-cli-version-greater-than-local-version

run "npm install --save-dev @angular/cli@latest" to upgrade 

* https://medium.com/@devblog_/angular-7-import-json-14f8bba534af



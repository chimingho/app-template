$AppName = Read-Host "Please enter app name"
Write-Verbose "Create a dotnet core anugular tempalte with app name $AppName"
dotnet new angular -o $AppName --auth individual
Set-Location $AppName

$answer = Read-Host "Add Swagger, [Yes] or [No]"
while ("yes", "no" -notcontains $answer) {
  $answer = Read-Host "Yes or No"
}
if ($answer -eq "yes") {
  dotnet add package Swashbuckle.AspNetCore
  #dotnet add $AppName.csproj package Swashbuckle.AspNetCore -v 5.0.0-rc3
}


$answer = Read-Host "Add GraphQL for server, [Yes] or [No]"
while ("yes", "no" -notcontains $answer) {
  $answer = Read-Host "Yes or No"
}
if ($answer -eq "yes") {
  Write-Verbose "Ref: https://graphql-dotnet.github.io/docs/getting-started/introduction/"
  dotnet add package GraphQL
  dotnet add package GraphQL.Server.Transports.AspNetCore
  dotnet add package GraphQL.Server.Ui.Playground
}

dotnet list package
#dotnet restore 


Set-Location ClientApp
$answer = Read-Host "Add GraphQL at ClientApp, [Yes] or [No]"
if ($answer -eq "yes") {
  Write-Verbose "https://graphql.org/blog/rest-api-graphql-wrapper/"
  npm install --save graphql 
}


$answer = Read-Host "Restore server and client package"
if ($answer -eq "yes") {
  dotnet restore
  npm install 
}



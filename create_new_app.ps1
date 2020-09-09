$AppName = Read-Host "Please enter app name"

Write-Verbose "Create a dotnet core anugular tempalte with app name $AppName"
$AuthType = Read-Host "Please enter optional argument, e.g. '--auth individual --no-https' for auth or empty for default"
dotnet new angular -o $AppName $AuthType

Write-Verbose "Create a dotnet core xunit for app name $AppName"
dotnet new xunit -o $AppName.Tests 
dotnet add ./$AppName.Tests/$AppName.Tests.csproj  reference ./$AppName/$AppName.csproj 


Set-Location $AppName
#$AppPath = ./$AppName/
$answer = Read-Host "Add Swagger, [Yes] or [No]"
while ("yes", "no" -notcontains $answer) {
  $answer = Read-Host "Yes or No"
}
if ($answer -eq "yes") {
  dotnet add package Swashbuckle.AspNetCore
  #dotnet add $AppName.csproj package Swashbuckle.AspNetCore -v 5.0.0-rc3
}

$answer = Read-Host "Add GraphQL for server and client, [Yes] or [No]"
while ("yes", "no" -notcontains $answer) {
  $answer = Read-Host "Yes or No"
}

if ($answer -eq "yes") {
  Write-Verbose "Ref: https://graphql-dotnet.github.io/docs/getting-started/introduction/"
  dotnet add package GraphQL
  dotnet add package GraphQL.Server.Transports.AspNetCore
  dotnet add package GraphQL.Server.Ui.Playground

  Set-Location ClientApp
  #$answer = Read-Host "Add GraphQL at ClientApp, [Yes] or [No]"
  #if ($answer -eq "yes") {
    Write-Verbose "https://graphql.org/blog/rest-api-graphql-wrapper/"
    npm install --save graphql 
  #}

}

    Write-Verbose "kendo ui for angular"
    ng add @progress/kendo-angular-inputs



Set-Location ../../ 
$answer = Read-Host "Restore server and client package"
  if ($answer -eq "yes") {
    dotnet list package
    dotnet restore
    npm install 
  }






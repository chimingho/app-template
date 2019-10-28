
Write-Verbose "Compile angular client app"
set-location ClientApp
ng build --prod
set-location ..

Write-Verbose "Publish .net core api"
dotnet publish --configuration Release
dotnet eb deploy-environment

set-location ClientApp
ng build --prod
set-location ..

dotnet publish --configuration Release
dotnet eb deploy-environment

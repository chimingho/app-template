

Write-Verbose "Create a anugular tempalte with app name $AppName"
angular new $AppName --routing

Set-Location $AppName
#$AppPath = ./$AppName/

Write-Verbose "bootstrap javascript apparoch"
npm install bootstrap
npm install jquery
npm install @popperjs/core

Write-Verbose "Setting: set auto save, auto format"
Write-Verbose "consider bootstrap angular apparoch: instrall ngx-boostrap"
Write-Verbose "https://www.techiediaries.com/angular-bootstrap/"
Write-Verbose "add script in angular.json"
Write-Verbose "configure launch.json through Run view to debug from VS Code"
Write-Verbose "configure proxy through Run view"
Write-Verbose "add FormModule, ReactiveFormModule for reactive form"

npm i angular-in-memory-web-api








$answer = Read-Host "Add Swagger, [Yes] or [No]"
while ("yes", "no" -notcontains $answer) {
  $answer = Read-Host "Yes or No"
}
if ($answer -eq "yes") {
}

# Shawn

A website that assists in picking where to hang in tokyo
https://jonkenobi.github.io/shawn/

## How to deploy API 
`terraform init`  Pull the latest remote state
TODO add instructions

#### Todos
* Refine docs/overview.md continuning that chat i got 
* Display area descriptions in UI, add it in API response
* Add more places; add more stuff related to food; add other attributes
* In places db add attributes such as ethnic foods?
* Find a way to auto add more areas instead of manually adding the latitude and longitude
* Add i18n support to the frontend (English / Japanese, with a language toggle) — lists tab done, still need to do English i18n for the areas tab

Note
No need to redploy API for adding attributes to response model
Can just alter the lambda to return more attributes from DynamoDB





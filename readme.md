# Picture Management Service

Welcome to the Picture Management Service, a RESTful API for uploading and managing cat pictures.

## Getting Started

### Prerequisites

Before running the application, ensure you have the following installed:

- Node.js
- MongoDB
- Docker (optional for containerization)

### Installation

1. Clone the repository:
2. cd picture-management-service
3. npm install
4. npm run start

### cURLs
GET: Auth token: 
`
curl --location --request POST 'http://localhost:3000/auth/login'
`

GET: Single cat image by ID
`curl --location --request GET 'http://localhost:3000/pic/bxigwj68kpvah5vjupgp' \
--header 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJEZWVwYWsiLCJpYXQiOjE3MDQ1NTY5MTQsImV4cCI6MTcwNDkxNjkxNH0.4tX0GF00HZhaPSiAETgLCEvPj6Ss7SrcxTYCPtCfBmM' \
--form 'image=@"/Users/deepakprajapati/Desktop/Screenshot 2023-12-06 at 10.30.51 AM.png"'
`

GET: All cat images
`
curl --location --request GET 'http://localhost:3000/pic/all' \
--header 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJEZWVwYWsiLCJpYXQiOjE3MDQ1NTY5MTQsImV4cCI6MTcwNDkxNjkxNH0.4tX0GF00HZhaPSiAETgLCEvPj6Ss7SrcxTYCPtCfBmM' \
--form 'image=@"/Users/deepakprajapati/Desktop/Screenshot 2023-12-06 at 10.30.51 AM.png"'
`

POST: Upload cat image
`
curl --location 'http://localhost:3000/pic' \
--header 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJEZWVwYWsiLCJpYXQiOjE3MDQ1NTY5MTQsImV4cCI6MTcwNDkxNjkxNH0.4tX0GF00HZhaPSiAETgLCEvPj6Ss7SrcxTYCPtCfBmM' \
--form 'image=@"/Users/deepakprajapati/Pictures/Rajastan 2023/20230814_190607.jpg"'
`

POST: Update the exisitng cat image
`
curl --location --request PUT 'http://localhost:3000/pic/uyl7b3wqqgjnfueiigjh' \
--header 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJEZWVwYWsiLCJpYXQiOjE3MDQ1NTY5MTQsImV4cCI6MTcwNDkxNjkxNH0.4tX0GF00HZhaPSiAETgLCEvPj6Ss7SrcxTYCPtCfBmM' \
--form 'image=@"/Users/deepakprajapati/Pictures/Rajastan 2023/20230814_192826.jpg"'
`

DELETE: Cat image
`
curl --location --request DELETE 'http://localhost:3000/pic/uyl7b3wqqgjnfueiigjh' \
--header 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJEZWVwYWsiLCJpYXQiOjE3MDQ1NTY5MTQsImV4cCI6MTcwNDkxNjkxNH0.4tX0GF00HZhaPSiAETgLCEvPj6Ss7SrcxTYCPtCfBmM'
`

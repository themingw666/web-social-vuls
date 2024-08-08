### My website: 
- [167.172.74.17/register](http://167.172.74.17/register)

- Reset data: [167.172.74.17:80/fakedata666666888888](http:167.172.74.17:80/fakedata666666888888)

## Installation

### Step 1 - Clone project
```
git clone https://github.com/themingw666/web-social-vuls.git
```

### Step 2 - Run docker
Running
```
docker compose up --build
```

### Step 3 - Reset data
Go to: [localhost:80/fakedata666666888888](http:localhost:80/fakedata666666888888)

### Step 4 - Choose the vulnerability
Go to: [localhost:80/settings](http:localhost:80/settings)

<p align="center">
<img src="https://github.com/themingw666/web-social-vuls/blob/main/src/public/assets/image.png" width="666px">
</p>

## Review website and vulnerabilities

<p align="center">
<img src="https://github.com/themingw666/web-social-vuls/blob/main/src/public/assets/image2.png" width="666px">
</p>

<p align="center">
<img src="https://github.com/themingw666/web-social-vuls/blob/main/src/public/assets/image1.png" width="666px">
</p>

### SQL Injection
- Easy: Search function - http://localhost:80/search?name=minh
- Medium: Timeline page - http://localhost:80/timeline?id=666666
- Hard: Login function - http://localhost:80/login

### JWT
- Easy, Medium, Hard: Authentication function

### SSRF
- Easy, Medium: Export profile function - http://localhost:80/timeline?id=666666
- Hard: Post status function

### XSS
- Easy: Chat function - http://localhost:80/messages
- Medium, Hard: Comment status function

### Broken Authentication
- Easy, Medium: Setting function - http://localhost:80/setting?id=666666
- Hard: /admin Route

### CSRF
- Easy, Medium, Hard: Update email function - http://localhost:80/setting

### SSTI
- Easy, Hard: Update bio function - http://localhost:80/setting
- Hard: Comment status post only function - http://localhost:80/statuspost?id=12

### XXE
- Easy, Medium, Hard: Post xml file

### OS Command Injection
- Easy, Medium: Post document file
- Hard: Update email function - http://localhost:80/setting

<!-- Enable babel: "dev": "nodemon --exec ./node_modules/.bin/babel-node ./src/app.js" -->
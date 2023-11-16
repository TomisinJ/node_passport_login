const express = require('express')
const app = express()
const bcrypt = require('bcrypt')

// in this appp, users will be empty everytime we refresh the app
const users = []

app.set('view-engine', 'ejs')

// take forms and access them inside the request variable inside the post method
app.use(express.urlencoded({ extended:false }))

app.get('/', (req, res) => {
    res.render('index.ejs', { name: "Tomi"})
})

app.get('/login', (req, res) => {

})

app.post('/login', (req, res) => {
    res.render('login.ejs')
})


app.get('/register', (req, res) => {
    res.render('register.ejs')
})

// id is automatically generated in database, if we had one

app.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        res.redirect('/login')
    } catch {
        res.redirect('/register')
    }
    console.log(users)
})

app.listen(3000)
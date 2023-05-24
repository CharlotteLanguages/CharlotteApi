const express = require('express')
const mysql = require('mysql2')
const myconn = require('express-myconnection')

const routesMembership = require('./routes/membership_routes')
const routesStudent = require('./routes/student_routes')
const routesNews = require('./routes/news_routes')
const routesCourses = require('./routes/courses_routers')

const app = express()
app.set('port', process.env.PORT || 3000)
const dbOptions = {
    host: 'containers-us-west-153.railway.app',
    port: 5905,
    user: 'root',
    password: '4UuCsu5O6YBY7ZUlSXLr',
    database: 'railway'
}

//------------------------ Middlewares ------------------------
app.use(myconn(mysql, dbOptions, 'single'))
app.use(express.json())

//------------------------ Routes ------------------------
app.get('/', (req, res) =>{
    res.send('Bienvenido')
})

app.use('/membership', routesMembership)
app.use('/student', routesStudent)
app.use('/news', routesNews)
app.use('/user', routesCourses)

//------------------------ Server running ------------------------
app.listen(app.get('port'), () => {
    console.log('Example app listening on port',  app.get('port'))
})
const express = require('express')
const mysql = require('mysql2')
const myconn = require('express-myconnection')
const cors = require('cors')

const routesMembership = require('./routes/membership_routes')
const routesStudent = require('./routes/student_routes')
const routesNews = require('./routes/news_routes')
const routesCourses = require('./routes/courses_routers')
const routesActivities = require('./routes/activities_routers')
const routesResources = require('./routes/resource_routers')
const routesCertificado = require('./routes/certificate_routers')
const routesPrivateClass = require('./routes/privateClass_routers')
const routesPromociones = require('./routes/promociones_routers')
const routesReferrals = require('./routes/referrals_routers')
const routesSponsors = require('./routes/sponsor_routers')
const routesResenas = require('./routes/reviews_routers')

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
app.use(cors())

//------------------------ Routes ------------------------
app.get('/', (req, res) =>{
    res.send('Bienvenido')
})

app.use('/membership', routesMembership)
app.use('/student', routesStudent)
app.use('/news', routesNews)
app.use('/course', routesCourses)
app.use('/activities', routesActivities)
app.use('/resource', routesResources)
app.use('/certificado', routesCertificado)
app.use('/privateClasses', routesPrivateClass)
app.use('/promociones', routesPromociones)
app.use('/referrals', routesReferrals)
app.use('/sponsor', routesSponsors)
app.use('/reviews', routesResenas)

//------------------------ Server running ------------------------
app.listen(app.get('port'), () => {
    console.log('Example app listening on port',  app.get('port'))
})
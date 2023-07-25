const express = require('express')
const mysql = require('mysql2')
const myconn = require('express-myconnection')
const cors = require('cors')

//const payment_router = require('./payment_routers.js')

//--------news
var db  = require('./dbConnection');
const createError = require('http-errors');
const path = require('path');
const bodyParser = require('body-parser');
const indexRouter = require('./router.js');
//--------

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
const routesRol = require('./routes/rol_routers')
const routesRegister = require('./routes/register_routers')

const routesRazones = require('./routes/razones_routers')

//const routesImagen = require('./routes/image_routers')

const app = express()
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true,
}));
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
//const upload = multer({ dest: 'uploads/' })

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
app.use('/certificate', routesCertificado)
app.use('/privateClasses', routesPrivateClass)
app.use('/promotions', routesPromociones)
app.use('/referrals', routesReferrals)
app.use('/sponsor', routesSponsors)
app.use('/reviews', routesResenas)
app.use('/rol', routesRol )
app.use('/register', routesRegister)

app.use('/api', indexRouter)

app.use('/razon', routesRazones)

//app.use('/imagen', routesImagen)

/*app.use('/payment', payment_router)*/

//------------------------ Server running ------------------------
app.listen(app.get('port'), () => {
    console.log('Example app listening on port',  app.get('port'))
})

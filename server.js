const express = require('express')
const mysql = require('mysql2')
const fs = require('fs')
const myconn = require('express-myconnection')
const cors = require('cors')

const bcrypt = require('bcrypt');
const path = require('path');

////const payment_router = require('./payment_routers.js')

//-------------
const routes = require('./routes/image_routers')
const routesNew = require('./routes/news_routes')

const routesImagenDefault = require('./routes/imagen_default_routes')

//--------news
const bodyParser = require('body-parser');
const indexRouter = require('./router.js');
//--------

const routesRoles = require('./routes/role_routers')

const routesMembership = require('./routes/membership_routes')
const routesStudent = require('./routes/student_routes')
//const routesNews = require('./routes/news_routes')

const routesNewsNew = require('./routes/newsNew')

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

//--------Razones
const routesRazonesPersona = require('./routes/razones/razones_routers_persona')
const routesRazonesActividades = require('./routes/razones/razones_routers_actividades')
const routesRazonesCertificados = require('./routes/razones/razones_routers_certificados')
const routesRazonesClassPersonalizadas = require('./routes/razones/razones_routers_classPer')
const routesRazonesCursos = require('./routes/razones/razones_routers_cursos')
const routesRazonesMembership = require('./routes/razones/razones_routers_membership')
const routesRazonesNews = require('./routes/razones/razones_routers_news')
const routesRazonesPatrocinador = require('./routes/razones/razones_routers_patrocinadores')
const routesRazonesPromociones = require('./routes/razones/razones_routers_promociones')
const routesRazonesRecursos = require('./routes/razones/razones_routers_recursos')
const routesRazonesReferidos = require('./routes/razones/razones_routers_referidos')
const routesRazonesResenas = require('./routes/razones/razones_routers_resenas')
const routesRazonesRol = require('./routes/razones/razones_routers_rol')
const routesRazonesSocialNetworks = require('./routes/razones/razones_routers_rol')

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
app.use(express.urlencoded({ extended: false }));

//------------------------ Routes ------------------------
app.get('/', (req, res) =>{
    res.send('Bienvenido')
})

app.use('/membership', routesMembership)
app.use('/student', routesStudent)
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

app.use('/registroPersona', routesNewsNew)

//-----Razones
app.use('/razonPersona', routesRazonesPersona)
app.use('/razonActividades', routesRazonesActividades)
app.use('/razonCertificado', routesRazonesCertificados)
app.use('/razonClassPer', routesRazonesClassPersonalizadas)
app.use('/razonCursos', routesRazonesCursos)
app.use('/razonMembership', routesRazonesMembership)
app.use('/razonNews', routesRazonesNews)
app.use('/razonPatrocinador', routesRazonesPatrocinador)
app.use('/razonPromociones', routesRazonesPromociones)
app.use('/razonRecursos', routesRazonesRecursos)
app.use('/razonReferidos', routesRazonesReferidos)
app.use('/razonResenas', routesRazonesResenas)
app.use('/razonRol', routesRazonesRol)
app.use('/razonesSocialNetworks', routesRazonesSocialNetworks)

app.use('/', routes)
app.use('/', routesNew)

app.use('/', routesImagenDefault)

app.use('/roles', routesRoles)

/*app.use('/payment', payment_router)*/

//------------------------ Server running ------------------------
app.listen(app.get('port'), () => {
    console.log('Example app listening on port',  app.get('port'))
})

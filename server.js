const express = require('express')
const mysql = require('mysql2')
//const fs = require('fs')
const myconn = require('express-myconnection')
const cors = require('cors')
const jwt = require('jsonwebtoken')

//const bcrypt = require('bcrypt');
//const path = require('path');

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
    host: 'roundhouse.proxy.rlwy.net',
    port: 25195,
    user: 'root',
    password: 'Gda1Ffh-3DD41AEdc2E54CBCD5g-GG21',
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
app.use('/student', routesStudent) //Ruta student
app.use('/course', routesCourses)
app.use('/activities', routesActivities)
app.use('/resource', routesResources)
app.use('/certificate', routesCertificado)
app.use('/privateClasses', routesPrivateClass)
app.use('/promotions', routesPromociones)
app.use('/referrals', routesReferrals)
app.use('/sponsor', routesSponsors) //Ruta patrocinadores
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
app.use('/new', routesNew)

app.use('/', routesImagenDefault)

app.use('/roles', routesRoles)

/*app.use('/payment', payment_router)*/

//------------------------ Server running ------------------------
app.listen(app.get('port'), () => {
    console.log('Example app listening on port',  app.get('port'))
})


//---------------------SESION----------------------------------

app.post('/apiLogin', (req, res) =>{
    const user= {
        nombre: 'Victor',
        email: 'correo@gmail.com'
    }

    jwt.sign({user}, 'secretkey', {expiresIn: '32s'}, (err, token) => {
        res.json({
            token
        })
    })
})

app.post('/apiPost', verifyToken, (req, res) =>{
    jwt.verify(req.token, 'secretkey', (error, authData) => {
        if(error){
            res.sendStatus(403);
        }else{
            res.json({
                msj: "Post fue creado",
                authData
            })
        }
    })
})

//Authorization: Bearer <token>
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];

    if(typeof bearerHeader !== 'undefined'){
        const bearerToken = bearerHeader.split(" ")[1];
        req.token = bearerToken;
        next();
    }else{
        res.sendStatus(403);
    }
}
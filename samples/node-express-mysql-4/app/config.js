// Application configuration.
'use strict';

var config = module.exports;

config.db = {
    user: 'root', 
    password: 'root',
    name: 'auth'
};

config.db.details = {
    host: process.env.MYSQL_HOST || 'localhost',
    port: 3306,      
    dialect: 'mysql'
};

config.keys = {
    secret: '/jVdfUX+u/Kn3qPY4+ahjwQgyV5UhkM5cdh1i2xhozE=' // Not anymore...
};

var userRoles = config.userRoles = {
    guest: 1,    // ...001
    user: 2,     // ...010
    admin: 4     // ...100
};

config.accessLevels = {
    guest: userRoles.guest | userRoles.user | userRoles.admin,    // ...111
    user: userRoles.user | userRoles.admin,                       // ...110
    admin: userRoles.admin                                        // ...100
};

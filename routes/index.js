// import about from './about'
'use strict';
import admin from './admin'

export default app => {
	// app.use('/login', about);
	app.use('/admin', admin);
}
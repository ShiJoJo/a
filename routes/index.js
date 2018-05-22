// import about from './about'
import admin from './admin'

export default app => {
	// app.use('/login', about);
	app.use('/admin', admin);
}
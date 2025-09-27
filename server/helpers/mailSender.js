import nodemailer from 'nodemailer'
import 'dotenv/config'

export default class mailSender {
	constructor(){
		this.transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: process.env.GMAIL_USER,
				pass: process.env.GMAIL_APP_PASSWORD
			}
		})
		
	}
	send(user, { text, html, title }){
		
		const mailOptions = {
			from: process.env.GMAIL_USER,
			to: user,
			subject: title,
			text,
			html
		}
		
		const sender = this.transporter.sendMail(mailOptions, (err, data)=> {
			if(err) {
				console.error("[Error / mailSender]: ", err)
				return { 
					status: false, 
					message: 'Mail gönderimi Başarısız',
					error: err
				}
			
			} else {
				// ..
				return {
					status: true, 
					message: 'Mail gönderildi.',
					data: data
				}
			}
		})
		return sender
	}
}


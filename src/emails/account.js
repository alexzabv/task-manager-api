import sgMail from "@sendgrid/mail"

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'sashazab21@gmail.com',
        subject: 'Welcome!',
        text: `Welcome to the app, ${name} Let me know how you get along with the app.`
    })
}

const sendCancelEmail = (email, name) => {
    sgMail.send({
        to: email, 
        from: 'SashaZab21@gmail.com',
        subject: 'Goodbye', 
        text: `${name}, it is sad to see you go. If there is anything we could have done to make your experience better, please leave a review here.`
    })
}

export { sendWelcomeEmail, sendCancelEmail }

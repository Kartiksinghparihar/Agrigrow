import React, { useState } from "react";
import "./Contact.css";
import bg from "../assets/contactback.png";
import emailjs from "@emailjs/browser";

import { db } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const Contact = () => {

const [form,setForm] = useState({
name:"",
email:"",
phone:"",
subject:"",
message:""
});

const handleChange = (e)=>{
setForm({...form,[e.target.name]:e.target.value});
};

const handleSubmit = async(e)=>{
e.preventDefault();

try{

// Save message in Firebase
await addDoc(collection(db,"messages"),{
...form,
createdAt:Timestamp.now()
});

// Email parameters
const templateParams = {
name: form.name,
email: form.email,
phone: form.phone,
subject: form.subject,
message: form.message
};

// Send email to admin
await emailjs.send(
"service_zwhsm4e",
"template_24zyd1o",
templateParams,
"Zqp-9tI5APVdi5IJB"
);

// Send auto reply to farmer
await emailjs.send(
"service_zwhsm4e",
"template_ycmgx1a",
templateParams,
"Zqp-9tI5APVdi5IJB"
);

alert("Message Sent Successfully!");

setForm({
name:"",
email:"",
phone:"",
subject:"",
message:""
});

}catch(error){

console.log(error);
alert("Error sending message");

}

};

return(

<div className="contact-container" style={{backgroundImage:`url(${bg})`}}>

<div className="contact-card">

<h2>Contact Us</h2>

<form onSubmit={handleSubmit}>

<input
type="text"
name="name"
placeholder="Your Name"
value={form.name}
onChange={handleChange}
required
/>

<input
type="email"
name="email"
placeholder="Email Address"
value={form.email}
onChange={handleChange}
required
/>

<input
type="tel"
name="phone"
placeholder="Phone Number"
value={form.phone}
onChange={handleChange}
/>

<input
type="text"
name="subject"
placeholder="Subject"
value={form.subject}
onChange={handleChange}
/>

<textarea
name="message"
placeholder="Write your message..."
value={form.message}
onChange={handleChange}
required
></textarea>

<button type="submit">
Send Message
</button>

</form>

</div>

</div>

);

};

export default Contact;
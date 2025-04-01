import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../../style/bookingtrainer.css"

export default function BookingTrainerApp() {
    const { id } = useParams();
    const currentDate = new Date();
    const time = currentDate.toLocaleTimeString(); 
    const [userid, setUserid] = useState([]);
    const [trainerid, setTrainerid] = useState([]);

    const [date, setDate] = useState([]);
    // const [time, setTime] = useState([]);
    const [tbmessage, setTbmessage] = useState([]);
    const [assignedPlans, setAssignedPlans] = useState([]);
    const [paymentStatus, setPaymentStatus] = useState([]);
    const [availableSlots, setAvailableSlots] = useState([]);
    const [age, setAge] = useState([]);
    const [gender, setGender] = useState([]);
    // const [options, setEmergency] = useState([]);
    const [focused,setFocused] = useState(false);
   
    useEffect(() => {
        setTrainerid(id); // Update state when id changes
    }, [id]);
    // useEffect(() => {
    //     function getEme() {

    //         axios.get(`http://localhost:8000/Avdoctor/`)
    //             .then((res) => {
    //                 console.log(res.data);
    //                 setEmergency(res.data.existingDoc);
    //             })
    //             .catch((err) => {
    //                 alert(err.message);
    //             });
    //     }
    //     getEme();
    // }, []);

    //page refresh function

    function refreshPage() {
        window.location.reload(false);
    };

    const handleFocus = (e) => {
        setFocused(true);
      };
    

    //Creating new Appointment
    function sendData(s) {
        s.preventDefault();

        //Creating object
        const neweme = {
            userid,
            trainerid,
            date,
            time,
            tbmessage,
            assignedPlans,
            paymentStatus,
            availableSlots,
            age,
            gender

        }

        //passing data to the DB
       
        axios.post("http://localhost:8000/book/save/", neweme).then(() => {

            alert(" Trainer Booking successfully ", refreshPage());
            console.log(neweme);

        }).catch((err) => {

            alert("Error: Trainer Booking unsuccessful");
            console.log(err);

        })

    }


    return (
        <div className="main-container">
            <div className="body-container clearfix">
                <center>
                    <h1>Booking Your Personal Trainer</h1>
                    <h4>Give us Your Information.</h4><br/><br/>
                </center>
                <form className="reg-form" onSubmit={sendData}>
                    <div className="form-row" id="frow">
                        <div className="form-col" id="fcoll">
                            <div className='name-container'>
                                <label id="eSavelabel" className="eme-full-name">User ID:</label><br />
                                <input type="text" id="emesave" className="eme-name" name="userid" onChange={(event) => {
                                    setUserid(event.target.value);
                                }} required />
                            </div><br />
                        </div>
                        <div className="form-col" id="fcoll">
                            <div className='discription-container'>
                                <label id="eSavelabel" for="eme-availableSlots">Available Time :</label><br />
                                <select id="emeScategory" className="eme-availableSlots" name="availableSlots" onChange={(event) => {
                                    setAvailableSlots(event.target.value);
                                }} required>
                                    <option value="">Select</option>
                                    <option value="9.00 AM- 10.00 AM">9.00 AM- 10.00 AM</option>
                                    <option value="11.00 AM- 1.00 PM">11.00 AM- 1.00 PM</option>
                                    <option value="10.00 AM- 11.00 AM">10.00 AM- 11.00 AM</option>
                                </select>
                            </div><br />
                        </div>
                    </div>
                    <div className="form-row" id="frow">
                        <div className="form-col" id="fcoll">
                            <div className='name-container'>
                                <label id="eSavelabel" className="eme-date">Date:</label><br />
                                <input type="date" id="emesave" className="eme-date" name="date" onChange={(event) => {
                                    setDate(event.target.value);
                                }} required onBlur={handleFocus} focused={focused.toString()} />
                            </div><br />
                        </div>
                        <div className="form-col" id="fcoll">
                            <div className='discription-container'>
                                <label id="eSavelabel" for="eme-assignedPlans">Assigned Plans:</label><br />
                                <input type="text" id="emesave" className="eme-assignedPlans" name="assignedPlans" onChange={(event) => {
                                    setAssignedPlans(event.target.value);
                                }} required />
                            </div><br />
                        </div>
                    </div>
                    <div className="form-row" id="frow">
                        <div className="form-col" id="fcoll">
                            <div className='time-container'>
                                <label id="eSavelabel" className="eme-age">Age:</label> <br />
                                <input type="text" id="emesave" className="eme-age" name="age" onChange={(event) => {
                                    setAge(event.target.value);
                                }} required />
                            </div><br />
                        </div>
                        <div className="form-col" id="fcoll">
                            <div className='reason-container'>
                                <label id="eSavelabel" for="eme-tbmessage">Message:</label><br />
                                <textarea id="emeStext" className="eme-tbmessage" name="tbmessage" onChange={(event) => {
                                    setTbmessage(event.target.value);
                                }} required />
                            </div><br />




                        </div>
                    </div>

                    {/* <div className='category-container'>
              <label for="eme-category"><b>What is the health Category</b></label><br/> 
              <input type="text" id="category" className="eme-category" name="category"  onChange={(event)=>{
                  setCategory(event.target.value);
              }} required/>
              </div><br/> */}
                    <div className="form-row" id="frow">
                        <div className="form-col" id="fcoll">



                            <div className='gender-container'>
                                <label className="eme-gender" id="eSavelabel">Gender:</label> <br />
                                <input type="radio" id="emSradio" className="eme-gender" value="Male" name="gender" onChange={(event) => {
                                    setGender(event.target.value);
                                }} required />
                                <label id="eSavelabel" for="currently-yes">Male</label>

                                <input type="radio" id="emSradio" className="eme-gender" value="Female" name="gender" onChange={(event) => {
                                    setGender(event.target.value);
                                }} required />
                                <label for="currently-yes" id="eSavelabel">Female</label>

                            </div><br />




                        </div>
                        <div className="form-col" id="fcoll">

                        </div>
                    </div>

                    <div className="form-row" id="frow">
                        <div className="form-col" id="fcoll">

                            <div className='currently-container'>
                                <label id="eSavelabel">Payment status</label><br />
                                <input type="radio" id="emSradio" name="paymentStatus" value="pending" onChange={(event) => {
                                    setPaymentStatus(event.target.value);
                                }} required />
                                <label for="paymentStatus-yes" id="eSavelabel">Pending</label>

                                <input type="radio" id="emSradio" name="paymentStatus" value="paid" onChange={(event) => {
                                    setPaymentStatus(event.target.value);
                                }} required />
                                <label for="paymentStatus-no" id="eSavelabel">Paid</label>
                            </div><br />


                        </div>
                        <div className="form-col" id="fcoll">

                        </div>
                    </div>

                    <div className="form-row" id="frow">
                        <div className="form-col" id="fcoll">

                            
                        <input type="text" id="emesave" className="eme-assignedPlans" name="trainerid" value ={id} hidden  required />

                        </div>
                    
                    </div>





                    < center>
                        <input type="submit" id="joinBtn" value="SUBMIT"></input><br /><br />
                    </center>

                </form>
            </div >
        </div >






    );
}
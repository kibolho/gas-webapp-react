import { useState } from "react";
import "./styles.css";

export default function App() {
  const [isLoading,setIsLoading] = useState(false);
  function Submit(e) {
    e.preventDefault();
    if(isLoading) return;
    setIsLoading(true)
    const formEle = document.querySelector("form");
    const body = new FormData(formEle);
    fetch(
      window.location.href,
      {
        method: "POST",
        body
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      }).finally(()=>{
        setIsLoading(false)
        })
  }
  return (
    <div className="App">
      <h1>Send me a message</h1>
      <h2>
        This application is deployed on Google Apps Script as a web app and it demonstrates how to send data from a website form to Google sheet
        in React.
      </h2>
      <div>
        <form className="form" onSubmit={(e) => Submit(e)}>
          <input placeholder="Your Name" name="Name" type="text" />
          <input placeholder="Your Email" name="Email" type="text" />
          <input placeholder="Your Message" name="Message" type="text" />
          <button name="Name" type="submit">{isLoading ? "Submitting" : "Submit"}</button>
        </form>
      </div>
    </div>
  );
}

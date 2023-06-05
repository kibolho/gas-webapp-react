import { useState } from "react";
import "./styles.css";

export default function App() {
  const [isLoading,setIsLoading] = useState(false);
  const [error,setError] = useState();
  const [success,setSuccess] = useState();

  const Submit = (e) => {
    e.preventDefault();
    if(isLoading) return;
    setIsLoading(true)
    setError()
    setSuccess()
    const formEle = document.querySelector("form");
    const body = new FormData(formEle);
    const data = Object.fromEntries(body.entries());
    try {
      const server = google.script.run.withFailureHandler((error) => {
        setError(error.message)
        setIsLoading(false)
      })
      const call = server.withSuccessHandler(() => {
        setSuccess("Your message was successfully sent to the Google Sheet database!")
        setIsLoading(false)
      })
      
      call.doInsertData(data)
    } catch (error) {
      setError(error.message)
      setIsLoading(false)
    }
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
          {error && <div class="error-banner">
            <span class="error-message">{error}</span>
          </div>}
          {success && <div class="success-banner">
          <span class="success-message">{success}</span>
          </div>}
          <button name="Name" type="submit">{isLoading ? "Submitting" : "Submit"}</button>
        </form>
      </div>
    </div>
  );
}

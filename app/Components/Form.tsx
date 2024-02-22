"use client";
import { useState } from "react";
import { FadeLoader } from "react-spinners";

const MyForm = () => {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [response, setResponse] = useState("Waiting for response...");

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setSubmitted(true);

    const data = {
      to,
      subject,
      body,
    };
    try {
      const response = await fetch(
        "https://zgt0z6l7-1880.asse.devtunnels.ms/send-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setResponse(result.statusCode);
      console.log("Success:", result);
    } catch (error) {
        console.error("Error:", error);
        setResponse(error as string);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className={`grid border p-10 rounded-xl ${submitted ? "hidden" : ""}`}
        style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.13)" }}
      >
        <label className="text-xs text-zinc-500 mt-2" htmlFor="to">
          Receiver&apos;s Email
        </label>
        <input
          className=" p-2 rounded-lg border"
          type="email"
          id="to"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          required
        />

        <label className="text-xs text-zinc-500 mt-2" htmlFor="subject">
          Email Subject
        </label>
        <input
          className=" p-2 rounded-lg border"
          type="text"
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />

        <label className="text-xs text-zinc-500 mt-2" htmlFor="body">
          Email Body
        </label>
        <textarea
          className=" p-2 rounded-lg border"
          id="body"
          value={body}
          style={{ resize: "vertical" }}
          onChange={(e) => setBody(e.target.value)}
          required
        />

        <button
          type="submit"
          className="text-x hover:bg-zinc-700 active:bg-zinc-900 font-medium p-2 border rounded-lg mt-2 bg-zinc-800 text-zinc-200"
        >
          Send Email
        </button>
      </form>
      <div
        className={`grid place-items-center border p-10 rounded-xl ${
          submitted ? "" : "hidden"
        }`}
      >
        <p>
          {response == '200' ? (
            "Email Sent ✅"
          ) : (
            <FadeLoader color="rgba(115, 115, 115, 1)" />
          )}
          {response == '500' ? (
            "Email was not send 🚫"
          ) : (
            <FadeLoader color="rgba(115, 115, 115, 1)" />
          )}
        </p>
      </div>{" "}
    </>
  );
};

export default MyForm;

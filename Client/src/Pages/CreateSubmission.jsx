import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

const CreateSubmission = () => {
  const [name, setName] = useState("");
  const [questions, setQuestions] = useState([""]); 
  const navigate = useNavigate();
  
   const mutation = useMutation({
    mutationFn: async (submissionData) => {
      const response = await fetch("http://localhost:7000/api/submissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        throw new Error("Error creating submission");
      }

      return await  response.json();
    },
    onSuccess: () => {
      alert("Submission created successfully");
      navigate("/dashboard"); 
    },
    onError: (error) => {
      console.error("Error during submission:", error);
      alert("An error occurred while creating submission");
    },
  });

 
  const handleSubmit = async (e) => {
    e.preventDefault();

    const submissionData = {
      name,
      questions,
    };

    mutation.mutate(submissionData); 
  };

  // Handle adding a new question input field
  const handleAddQuestion = () => {
    setQuestions([...questions, ""]);
  };

  // Handle question input change
  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = value;
    setQuestions(updatedQuestions);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">
      <h1 className="text-xl font-semibold text-center mb-6">Create Submission</h1>
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm font-medium">Name</label>
          <input
            type="text"
            id="name"
            className="mt-2 w-full px-3 py-2 border rounded-md"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium">Questions</label>
          {questions.map((question, index) => (
            <div key={index} className="flex items-center mb-3">
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md"
                value={question}
                onChange={(e) => handleQuestionChange(index, e.target.value)}
                placeholder={`Question ${index + 1}`}
                required
              />
              {questions.length > 1 && (
                <button
                  type="button"
                  onClick={() => setQuestions(questions.filter((_, i) => i !== index))}
                  className="ml-2 text-red-500"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddQuestion}
            className="mt-2 text-blue-600"
          >
            Add another question
          </button>
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateSubmission;

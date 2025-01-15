/* eslint-disable react/prop-types */
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const Card = ({ name, questions=[], createdAt,userId }) => {

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  
  const currentUserId = queryClient.getQueryData(["user"])?.id;

  const handleUnlock = () => {
    // You can navigate to a separate page or show the unlock functionality here.
    alert("This question is locked. You need to unlock it.");
    navigate("/unlock-page"); // Navigate to a page for unlocking or showing the full question
  };

  console.log("userId",userId)
  console.log("currentuserid",currentUserId);
 return (
    <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
      <h2 className="text-xl font-bold text-gray-800">{name}</h2>
      <p className="text-sm text-gray-500 mt-1">
        Created At: {new Date(createdAt).toLocaleString()}
      </p>
      {currentUserId === userId ? (
        // If the current user is the creator, show full questions
        <ul className="mt-4 space-y-2">
          {questions.map((question, index) => (
            <li
              key={index}
              className="text-gray-700 text-sm bg-gray-100 rounded-md p-2"
            >
              {index + 1}. {question}
            </li>
          ))}
        </ul>
      ) : (
        // If the user is not the creator, show a locked state
        <div className="mt-4 text-center">
          <button
            onClick={handleUnlock}
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg"
          >
            Unlock to View
          </button>
        </div>
      )}
    </div>
  );
};

export default Card;

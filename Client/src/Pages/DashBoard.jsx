import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Card from "../components/Card";
import Navbar from "../components/Navbar";


function Dashboard() {
  const [page, setPage] = useState(1); // Tracks the current page number


  const { data, isFetching } = useQuery({
    queryKey: ["fetch-Results", page],
    queryFn: async () => {
      const response = await fetch(`http://localhost:7000/api/submissions?start=${page}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        credentials: "include",
      });


      return await response.json();
    },
    keepPreviousData: true, // Keeps previous data visible during refetch
  });


  // Prevent going negative
  const handlePrevious = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => {
    if (data?.data?.length > 0) {
      setPage((prev) => prev + 1);
    }
  };
  console.log("data recieverd from backend",data);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-10 px-5">
      {(data?.success === false && (!data?.data || data?.data.length === 0)) ? (
  <p className="text-gray-500 text-sm font-medium text-center mt-8">
    No submissions found for this page.
  </p>
) : (
  <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {data?.data?.map((item) => (
      <Card
        key={item._id}
        name={item.name}
        questions={item.questions}
        createdAt={item.createdAt}
        userId={item.user}
      />
    ))}
  </div>
)}

        {/* Pagination Controls */}
        <div className="flex justify-center items-center mt-8 space-x-4">
          <button
            onClick={handlePrevious}
            disabled={page === 1 || isFetching}
            className={`px-4 py-2 rounded-md text-white ${
              page === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            } transition`}
          >
            Previous
          </button>
          <span className="text-lg font-medium">{`Page: ${page}`}</span>
          <button
            onClick={handleNext}
            disabled={isFetching || data?.data?.length === 0}
            className={`px-4 py-2 rounded-md text-white ${
              data?.data?.length === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            } transition`}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default Dashboard;

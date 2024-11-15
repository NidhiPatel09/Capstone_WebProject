{/* Upload Recipe Section */}
<section className="flex justify-center items-center my-8">
  <div className="bg-dark p-6 rounded shadow-md max-w-md w-full">
    <h2 className="text-2xl font-bold mb-4 text-center">Upload Your Blog</h2>
    <form className="flex flex-col gap-4">
      {}
      <div className="relative">
        <input
          type="text"
          placeholder="Title"
          className="p-2 pl-10 border rounded w-full" 
        />
        <i className="fas fa-pencil-alt absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600"></i>{" "}
        {}
      </div>

      <div className="relative">
        <input
          type="text"
          placeholder="Add Description"
          className="p-2 pl-10 border rounded w-full"
        />
        <i className="fas fa-pen absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600"></i>{" "}
        {}
      </div>

      <div className="relative">
        <textarea
          placeholder="Add More Details"
          className="p-2 pl-10 border rounded resize-none w-full" 
        ></textarea>
        <i className="fas fa-align-left absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600"></i>{" "}
        {}
      </div>

      <button className="group relative w-full flex justify-center mt-2 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
        Submit
      </button>
    </form>
  </div>
</section>;

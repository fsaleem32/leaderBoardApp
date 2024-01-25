import React from "react";
import MkdSDK from "../utils/MkdSDK";
import LeaderboardApp from "./dashboadUi";
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

let sdk = new MkdSDK();
const AdminDashboardPage = () => {
  const [page, setPage] = React.useState(1)
  const [limit] = React.useState(10)
  const [data, setData] = React.useState()

  const getVideos = async () => {
    try {
      let payload = {
        page: page,
        limit: limit,
      }
      let response = await sdk.callRestAPI(payload, 'PAGINATE')
      setData(response)
    } catch (error) {
      console.error(error)
    }
  }
  React.useEffect(() => {
    getVideos()
  }, [page]);


  const goToNextPage = () => {
    if (data?.num_pages && data?.num_pages === page) {
      return;
    }
    setPage(prev => prev + 1)
  }
  const goToPreviousPage = () => {
    if (page > 1) {
      setPage(prev => prev - 1)
    }
  }
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <LeaderboardApp data={data}
          goToNextPage={goToNextPage}
          goToPreviousPage={goToPreviousPage}
          page={page}
          setData={setData}
        />
      </DndProvider>
      {/* <div className="w-full flex justify-center items-center text-7xl h-screen text-gray-700 ">
        Dashboard
      </div>
      <button onClick={()=>goToNextPage()}>
        next
      </button>
      <button onClick={()=>goToPreviousPage()}>
        Previous
      </button> */}
    </>

  );
};

export default AdminDashboardPage;

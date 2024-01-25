import React, { useReducer } from "react";
import { useDrag, useDrop } from 'react-dnd';

import { AuthContext } from "../authContext";


const LeaderboardItem = ({ id, title, author, likes, index, moveItem }) => {
  const [, drag] = useDrag({
    type: 'LEADERBOARD_ITEM',
    item: { id, index },
  });

  const [, drop] = useDrop({
    accept: 'LEADERBOARD_ITEM',
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });
  return (
    <div ref={(node) => drag(drop(node))} className="flex items-center justify-between rounded-2xl border border-[#FFFFFF1F] px-6 py-4">
      <div className="flex gap-[2.1875rem]">
        <div className="flex items-center gap-4">
          <span className="mr-2.5 text-sm font-thin text-[#666666]">
            {id}
          </span>
          <img
            src="https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg"
            alt="image title"
            className="h-16 w-[7.375rem] rounded-lg"
          />
          <span className="w-[22.75rem] text-xl font-thin text-[#FFFFFF]">
            {title}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <img
            src="https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXV0aG9yfGVufDB8fDB8fHww"
            alt="author image"
            className="h-6 w-6 rounded-full"
          />
          <span className="font-thin text-[#DBFD51]">@{author}</span>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <span className="font-thin text-white">{likes}</span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_6729_97)">
            <path
              d="M10.0085 3.75833V16.25"
              stroke="#9BFF00"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M5.01929 8.76167L10.0001 3.74834L14.981 8.76167"
              stroke="#9BFF00"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_6729_97">
              <rect width="20" height="20" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  );
};

const LeaderboardApp = (props) => {
  let { data, goToNextPage, goToPreviousPage, page, setData } = props;
  const moveItem = (fromIndex, toIndex) => {
    const newDataList = [...data.list];
    const [movedItem] = newDataList.splice(fromIndex, 1);
    console.log(movedItem)
    newDataList.splice(toIndex, 0, movedItem);
    console.log(newDataList)
    setData({ ...data, list: newDataList });
  };
  const context = React.useContext(AuthContext);
  const logout = () => {
    context.dispatch({
      type: "LOGOUT",
    });
    window.location.href = "/" + context?.state?.user?.role + "/login";
  }
  return (

    <div className=" bg-[#111111] text-white">
      <div className="mx-auto flex min-h-screen max-w-[76rem] flex-col gap-[4.5rem]">
        <header className="flex h-24 items-center justify-between p-4">
          <h1 className="text-5xl font-black text-white">APP</h1>
          <button onClick={logout} className="flex items-center gap-1 rounded-full bg-[#9BFF00] px-6 py-3 font-thin text-[#050505] hover:opacity-90">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_6729_333)">
                <path
                  d="M5 20C5 17.544 6.991 15.553 9.447 15.553H14.553C17.009 15.553 19 17.544 19 20"
                  stroke="#696969"
                  stroke-width="1.4824"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M15.0052 5.2448C16.6649 6.90453 16.6649 9.59548 15.0052 11.2552C13.3455 12.9149 10.6545 12.9149 8.9948 11.2552C7.33507 9.59548 7.33507 6.90453 8.9948 5.2448C10.6545 3.58507 13.3455 3.58507 15.0052 5.2448"
                  stroke="#696969"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_6729_333">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
            Logout
          </button>
        </header>
        <div>
          <div className="flex items-center justify-between py-4">
            <h2 className="text-[2.5rem] font-thin text-white">
              Today’s leaderboard
            </h2>
            <div className="flex items-center justify-between gap-2 rounded-lg bg-[#1D1D1D] px-6 py-4">
              <span className="font-thin text-white">30 May 2022</span>
              <span className="h-1 w-1 rounded-full bg-[#696969]"></span>
              <span className="rounded-lg bg-[#9BFF00] px-4 py-1 text-sm font-thin  text-black">
                SUBMISSIONS OPEN
              </span>
              <span className="h-1 w-1 rounded-full bg-[#696969]"></span>
              <span className="font-thin text-white">11:34</span>
            </div>
          </div>
          <div className="flex items-center px-6 py-2">
            <div className="flex gap-[26px]">
              <div>
                <span className="font-thin text-[#666666]">#</span>
              </div>
              <div className="w-[33.375rem]">
                <h5 className="font-thin text-[#666666]">Title</h5>
              </div>
            </div>
            <div className="flex w-full justify-between">
              <div>
                <h5 className="font-thin text-[#666666]">Author</h5>
              </div>
              <div className="flex items-center">
                <h5 className="font-thin text-[#666666]">Most Liked</h5>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_6729_388)">
                    <path
                      d="M8 10L12 14L16 10"
                      stroke="#696969"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_6729_388">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {data?.list?.map((item, index) => (
              <LeaderboardItem
                key={index}
                id={item.id}
                title={item.title}
                author={item.username}
                likes={item.like}
                index={index}
                moveItem={moveItem}
              />
            ))}
          </div>
          <div className="flex justify-end" >
            {
              page !== 1 ?
                <div className="w-32 h-12 flex-col cursor-pointer justify-start items-start inline-flex" onClick={goToPreviousPage}>
                  <div className="px-6 py-3 bg-lime-400 rounded-[40px] flex-col justify-center items-center gap-2.5 flex">
                    <div className="h-6 justify-center items-center gap-1 inline-flex">
                      <div className="text-zinc-950 text-base font-thin font-['Inter'] leading-tight w-full">Previous</div>
                    </div>
                  </div>
                </div>
                : null
            }

            {
              page !== data?.num_pages ? (
                <div className="w-32 h-12 flex-col cursor-pointer justify-start items-start inline-flex" onClick={goToNextPage}>
                  <div className="px-6 py-3 bg-lime-400 rounded-[40px] flex-col justify-center items-center gap-2.5 flex">
                    <div className="h-6 justify-center items-center gap-1 inline-flex">
                      <div className="text-zinc-950 text-base font-thin font-['Inter'] leading-tight w-full">Next</div>
                    </div>
                  </div>
                </div>
              )
                : null
            }

          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardApp;
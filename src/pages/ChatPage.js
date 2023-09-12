import { Box } from "@chakra-ui/layout";
import { useState } from "react";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import { ChatState } from "../Context/ChatProvider";
import MyChats from "../components/MyChats";
import Chatbox from "../components/Chatbox";

const Chatpage = () => {
  // const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();

  return (
    <div
      style={{ width: "100%", height: "100%" }}
      className="d-flex flex-column"
    >
      {user && <SideDrawer />}
      <div className="d-flex justify-content-between w-100 flex-g p-1">
        {user && <MyChats />}
        {user && <Chatbox />}
      </div>
    </div>
  );
};

export default Chatpage;

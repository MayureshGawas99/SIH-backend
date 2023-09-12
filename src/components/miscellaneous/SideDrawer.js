import {
  Avatar,
  Box,
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { ChatState } from "../../Context/ChatProvider";
import { useNavigate } from "react-router-dom";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const toast = useToast();

  const { user, setUser, setShowProfile } = ChatState();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    setUser(null);
    toast({
      title: "Logout Successfull.",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "bottom-left",
    });
  };

  return (
    <>
      <div className="p-2 d-flex justify-content-between align-items-center">
        <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
          <button className=" btn btn-sm d-flex justify-content-center align-items-baseline gap-2">
            <i className="fas fa-search"></i>
            <span>Search User</span>
          </button>
        </Tooltip>
        <div>
          <Menu>
            <MenuButton p={1}>
              <BellIcon />
            </MenuButton>
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar
                size="sm"
                cursor={"pointer"}
                name={user.name}
                src={user.pic}
              />
            </MenuButton>
            <MenuList>
              <MenuItem
                onClick={() => {
                  setShowProfile(user);
                  navigate("/chatprofile");
                }}
              >
                My profile
              </MenuItem>
              <MenuDivider />
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>
    </>
  );
};

export default SideDrawer;

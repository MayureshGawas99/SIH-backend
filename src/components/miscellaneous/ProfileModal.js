import { ViewIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  IconButton,
  Text,
  Image,
} from "@chakra-ui/react";
import Chatpage from "../../pages/ChatPage";
import { ChatState } from "../../Context/ChatProvider";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProfileModal = ({ children }) => {
  const { showProfile } = ChatState();
  const navigate = useNavigate();
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (!userInfo) {
      console.log("hi");
      navigate("/");
    }
  }, []);

  return (
    <div className="row h-100 w-100">
      {showProfile && (
        <>
          <div className="col-md-8">
            <Image
              borderRadius="full"
              boxSize="150px"
              src={showProfile.pic}
              alt={showProfile.name}
            />
            <Text
              fontSize={{ base: "28px", md: "30px" }}
              fontFamily="Work sans"
            >
              Email: {showProfile.email}
            </Text>
          </div>
          <div className="col-md-4">
            <Chatpage />
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileModal;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Image, Button, useToast } from "@chakra-ui/react";
import { useAuth } from "../../Hooks/useAuth";

const ImageViewer = ({ idUsuario, pad }) => {
  const [imageSrc, setImageSrc] = useState("");
  const { addressBack } = useAuth();
  const toast = useToast();

  useEffect(() => {
    if (idUsuario) {
      axios
        .get(`${addressBack}/api/image/${idUsuario}`, {
          responseType: "blob",
        })
        .then((response) => {
          const url = URL.createObjectURL(response.data);
          setImageSrc(url);
        })
        .catch((error) => {
          toast({
            title: "Error fetching image.",
            description: error.message,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        });
    }
  }, [idUsuario, toast, addressBack]);

  return (
    <Box p={pad}>
      {imageSrc ? (
        <Image mt={4} src={imageSrc} alt="Fetched" />
      ) : (
        <Button colorScheme="teal" isDisabled={!idUsuario}>
          No image available
        </Button>
      )}
    </Box>
  );
};

export default ImageViewer;

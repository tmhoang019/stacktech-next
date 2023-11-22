"use client";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import axios from "axios";
import useSWR from "swr";

const Detail = ({ params }: { params: { slug: string } }) => {
  const apiImages: string = "https://jsonplaceholder.typicode.com/photos";
  const albumId = params.slug;

  const getDataImages = async () => {
    try {
      const response = await axios.get(apiImages, {
        params: {
          albumId,
        },
      });

      return response.data; // Trả về dữ liệu thực tế từ phản hồi
    } catch (error) {
      console.log(error);
    }
  };

  const {
    data: listImage,
    error,
    isLoading,
  } = useSWR(apiImages + `?albumId=${albumId}`, getDataImages, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
  });

  if (error) {
    return (
      <Box>
        <Typography variant="h5">
          Error! An error occurred. Please try again later
        </Typography>
      </Box>
    );
  }
  if (isLoading) {
    return (
      <Box marginTop={25} className="w-full text-center">
        <Typography variant="h5">Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box className="w-full">
      <span className="block text-5xl text-center font-semibold my-10 mt-8">
        Detail page
      </span>
      <div
        className="grid 
                grid-cols-1 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-3 xs:grid-cols-2
                gap-5
                px-5"
      >
        {Array.isArray(listImage) &&
          listImage.length > 0 &&
          listImage.map((item) => {
            console.log("id: ", item.albumId);
            return (
              <Card key={item.id} className="flex flex-col h-auto max-h-full">
                <CardMedia
                  image={item.thumbnailUrl}
                  className="w-full h-[150px] flex-shrink-0"
                  title="imageAlbum"
                />
                <div className="flex flex-col flex-1">
                  <CardContent className="flex-1 flex flex-col justify-between h-20">
                    <div className="md:h-[40px] lg:h-[70px] overflow-hidden">
                      <p
                        className="text-xl lg:text-base
                                   sm:truncate lg:text-clip lg:whitespace-normal"
                      >
                        {item.title}
                      </p>
                    </div>
                    <p className="mt-3 text-base text-[#928d8d]">
                      Image of album {albumId}
                    </p>
                  </CardContent>
                  <CardActions>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => {
                        window.open(item.url, "_blank");
                      }}
                    >
                      Open in new page
                    </Button>
                  </CardActions>
                </div>
              </Card>
            );
          })}
      </div>
    </Box>
  );
};

export default Detail;

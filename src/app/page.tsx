"use client";
import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import axios from "axios";
import Link from "next/link";

import useSWR from "swr";
import PhotoAlbumIcon from "@mui/icons-material/PhotoAlbum";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import Search from "@/components/Search";

const Home: React.FC = () => {
  const apiAlbum: string = "https://jsonplaceholder.typicode.com/albums";

  const getData = async () => {
    try {
      const response = await axios.get(apiAlbum);

      return response.data; // Trả về dữ liệu thực tế từ phản hồi
    } catch (error) {
      console.log(error);
      return []; // Trả về một mảng rỗng trong trường hợp xảy ra lỗi
    }
  };
  const {
    data: listAlbum,
    error,
    isLoading,
  } = useSWR(apiAlbum, getData, {
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

  //const listAlbum:Album[] = []

  return (
    <Grid container wrap="wrap">
      <Grid item xs={12} sm={12} md={12}>
        <Box className="mb-10 w-full flex justify-center">
          <Search urlAlbum={apiAlbum}></Search>
        </Box>
      </Grid>
      {Array.isArray(listAlbum) && listAlbum.length > 0 ? (
        listAlbum.map((item) => {
          let href = `/detail?id=${item.id}`;
          return (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Box
                padding={2}
                className="flex items-center border-2 border-cyan-400 rounded-md mx-2 mb-4
                                h-[70px] overflow-hidden"
              >
                <PhotoAlbumIcon className="mr-[5px]"></PhotoAlbumIcon>
                <Link href={href} className="flex-1 overflow-hidden">
                  <Typography
                    variant="h5"
                    className="hover:text-[#2367FF] truncate"
                  >
                    {item.title}
                  </Typography>
                </Link>
                <KeyboardDoubleArrowRightIcon className="shrink-0"></KeyboardDoubleArrowRightIcon>
              </Box>
            </Grid>
          );
        })
      ) : (
        <Grid item xs={12} sm={12} md={12}>
          <Box className="mb-10 w-full">
            <Typography>
              There are no products matching the searched keywords
            </Typography>
          </Box>
        </Grid>
      )}
    </Grid>
  );
};

export default Home;

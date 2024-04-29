import { Box, Button, VStack, HStack, Text, Image, Slider, SliderTrack, SliderFilledTrack, SliderThumb } from "@chakra-ui/react";
import { FaPlay, FaPause, FaForward, FaBackward } from "react-icons/fa";
import React, { useState, useRef } from "react";

const songs = [
  {
    title: "Song One",
    artist: "Artist A",
    url: "https://www.example.com/song1.mp3",
    cover: "https://www.example.com/cover1.jpg"
  },
  {
    title: "Song Two",
    artist: "Artist B",
    url: "https://www.example.com/song2.mp3",
    cover: "https://www.example.com/cover2.jpg"
  },
  {
    title: "Song Three",
    artist: "Artist C",
    url: "https://www.example.com/song3.mp3",
    cover: "https://www.example.com/cover3.jpg"
  }
];

const Index = () => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio(songs[currentSongIndex].url));

  const playPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const skipSong = (forward = true) => {
    if (forward) {
      setCurrentSongIndex((prev) => (prev + 1) % songs.length);
    } else {
      setCurrentSongIndex((prev) => (prev - 1 + songs.length) % songs.length);
    }
    audioRef.current.src = songs[currentSongIndex].url;
    if (isPlaying) {
      audioRef.current.play();
    }
  };

  return (
    <VStack spacing={4} align="center" justify="center" height="100vh">
      <Image boxSize="150px" src={songs[currentSongIndex].cover} alt="Song cover" />
      <Text fontSize="2xl">{songs[currentSongIndex].title}</Text>
      <Text fontSize="md">{songs[currentSongIndex].artist}</Text>
      <HStack>
        <Button onClick={() => skipSong(false)}><FaBackward /></Button>
        <Button onClick={playPause}>{isPlaying ? <FaPause /> : <FaPlay />}</Button>
        <Button onClick={() => skipSong(true)}><FaForward /></Button>
      </HStack>
      <Slider aria-label="song-progress">
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </VStack>
  );
};

export default Index;
import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import Slider from "@react-native-community/slider";

export default function PlayedScreen({ route, navigation }) {
  const { song } = route.params;
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const duration = 180;

  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 1) {
            clearInterval(interval);
            setIsPlaying(false);
            return 1;
          }
          return prevProgress + 1 / duration;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.replace("PlaylistScreen")}
      >
        <Icon name="keyboard-arrow-down" size={30} color="white" />
      </TouchableOpacity>

      <View style={styles.albumCoverContainer}>
        <Image source={{ uri: song.cover }} style={styles.albumCover} />
        <View style={styles.songInfoOverlay}>
          <Text style={styles.songTitle}>{song.title}</Text>
          <Text style={styles.songArtist}>{song.album}</Text>
        </View>
      </View>

      <View style={styles.progressContainer}>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          value={progress}
          onValueChange={(value) => setProgress(value)}
          minimumTrackTintColor="white"
          maximumTrackTintColor="gray"
          thumbTintColor="white"
        />
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{formatTime(progress * duration)}</Text>
          <Text style={styles.timeText}>{formatTime(duration)}</Text>
        </View>
      </View>

      <View style={styles.controls}>
        <Icon name="shuffle" size={24} color="white" />
        <Icon name="skip-previous" size={40} color="white" />
        <TouchableOpacity style={styles.playButton} onPress={togglePlayPause}>
          <Icon name={isPlaying ? "pause" : "play-arrow"} size={50} color="black" />
        </TouchableOpacity>
        <Icon name="skip-next" size={40} color="white" />
        <Icon name="repeat" size={24} color="white" />
      </View>
      <View style={styles.device}>
        <Icon
          name="speaker"
          type="material-community"
          size={30}
          color="white"
        />
      </View>
      <View style={styles.undo}>
        <Icon
          name="arrow-u-left-bottom"
          type="material-community"
          size={30}
          color="white"
        />
      </View>
      <TouchableOpacity style={styles.lyricsButton}>
        <Text style={styles.lyricsText}>Lyrics</Text>
      </TouchableOpacity>
    </View>
  );
}

const formatTime = (seconds) => {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec < 10 ? "0" : ""}${sec}`;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d0d0d",
    alignItems: "center",
    paddingTop: 50,
  },
  backButton: {
    position: "absolute",
    top: 60,
    left: 20,
    zIndex: 10,
  },
  albumCoverContainer: {
    position: "relative",
    width: "100%",
    height: 450,
  },
  albumCover: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  songInfoOverlay: {
    left: 20,
    right: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    top: 20,
  },
  songTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  songArtist: {
    fontSize: 18,
    color: "gray",
  },
  progressContainer: {
    top: 100,
    width: "80%",
    marginTop: 0,
  },
  slider: {
    width: "100%",
    height: 10,
    borderRadius: 5,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: -5,
  },
  timeText: {
    color: "white",
    fontSize: 12,
  },
  controls: {
    top: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 30,
    width: "80%",
  },
  playButton: {
    backgroundColor: "white",
    borderRadius: 50,
    padding: 15,
    bottom: 20,
  },

  
  lyricsButton: {
    position: "absolute",
    bottom: -15,
    left: 15,
    right: 15,
    backgroundColor: "#2F818D",
    padding: 5,
    borderRadius: 10,
    paddingVertical: 80,
  },
  lyricsText: {
    color: "white",
    textAlign: "left",
    fontSize: 30,
    fontWeight: "bold", 
    position: 'absolute',
    top: 15, 
    left: 15,
  },
  device: {
    position: "absolute",
    left: 15,
    bottom: 160,
  },
  undo: {
    position: "absolute",
    right: 15,
    bottom: 160,
  },
});
import React, { useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

const playlist = [
  { id: '1', title: 'Overcompesate', album: 'Clancy', cover: 'https://i.scdn.co/image/ab67616d0000b2739cf15c7323fb85b7112197d5' },
  { id: '2', title: 'Heavydirtysoul', album: 'Blurryface', cover: 'https://thewestreview.co.uk/wp-content/uploads/2016/02/tumblr_nlott6smih1ta3rfmo1_1280.jpg?w=1200' },
  { id: '3', title: 'Holding on to You', album: 'Vessel', cover: 'https://m.media-amazon.com/images/I/61DiSquOq-L._UF1000,1000_QL80_.jpg' },
  { id: '4', title: 'Jumpsuit', album: 'Trench', cover: 'https://m.media-amazon.com/images/I/81znz4j2UTL._UF1000,1000_QL80_.jpg' },
  { id: '5', title: 'Trees', album: 'Regional At Best', cover: 'https://cdn-images.dzcdn.net/images/cover/e276d1f527dc726a47cb10a87cf90742/0x1900-000000-80-0-0.jpg' }
];

export default function PlaylistScreen({ navigation }) {
  const [favorites, setFavorites] = useState({});

  const toggleFavorite = (songId) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [songId]: !prevFavorites[songId],
    }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: 'https://setlist.me/wp-content/uploads/2024/05/430114079_962373078582544_1369644565270141836_n.jpg' }} style={styles.albumCover} />
        <View style={styles.overlay}>
          <Text style={styles.playlistTitle}>TWENTY ONE PILOTS - Songs</Text>
          <View style={styles.infoContainer}>
            <Icon name="heart-outline" type="material-community" size={15} color="white" />
            <Text style={styles.likes}> 46,732 Likes</Text>
            <Icon name="timer-sand-complete" type="material-community" size={15} color="white" />
            <Text style={styles.duration}> 23 mins</Text>
          </View>
          <TouchableOpacity style={styles.playButton}>
            <Icon name="play-arrow" size={40} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <View>
        <Text style={styles.canciones}> Canciones</Text>
      </View>

      <FlatList
        marginTop={10}
        data={playlist}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.replace('PlayerScreen', { song: item })}>
            <View style={styles.songItem}>
              <Image source={{ uri: item.cover }} style={styles.songImage} />
              <View style={styles.songDetails}>
                <Text style={styles.songTitle}>{item.title}</Text>
                <Text style={styles.songAlbum}>{item.album}</Text>
              </View>
              <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
                <Icon
                  name={favorites[item.id] ? 'favorite' : 'favorite-border'}
                  size={30}
                  color={favorites[item.id] ? 'green' : 'white'}
                />
              </TouchableOpacity>

              <Icon name="more-vert" size={24} color="white" />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d0d',
    paddingTop: 55,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 300,
  },
  albumCover: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(71, 71, 71, 0.4)',
    borderRadius: 10,
  },
  playlistTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    top: 90,
    left: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 20,
    left: 10
  },
  likes: {
    color: 'white',
    fontSize: 14,
    marginRight: 10
  },
  duration: {
    color: 'white',
    fontSize: 14
  },
  playButton: {
    position: 'absolute',
    bottom: -20,
    right: 20,
    backgroundColor: '#1db954',
    borderRadius: 50,
    padding: 15
  },
  canciones: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    top: 10,
  },
  songItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 7
  },
  songImage: {
    width: 70,
    height: 70,
    borderRadius: 7,
    marginRight: 10,
    left: 10
  },
  songDetails: {
    flex: 1
  },
  songTitle: {
    fontSize: 18,
    color: 'white',
    left: 10
  },
  songAlbum: {
    fontSize: 14,
    color: 'gray',
    left: 10
  }
});
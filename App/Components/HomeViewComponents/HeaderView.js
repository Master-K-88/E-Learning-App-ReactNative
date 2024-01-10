import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors'
import Coin from './../../../assets/images/Coin.png'

export default function HeaderInfoView(props) {
  return (
    <View style={styles.mainRow}>
        <View style={styles.subRow}>
            <Image 
            source={{uri: props.user?.imageUrl}} 
            style={styles.image}
            />

            <View>
                <Text style={styles.welcomeText}>
                    Welcome,
                </Text>

                <Text style={styles.nameText}>
                    {props.user?.fullName}
                </Text>
            </View>
        </View>

        <View style={styles.subRow}>
            <Image source={Coin} />
            <Text style={styles.nameText}>
                {props.userPoints}
            </Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    image: {
        height: 70,
        width: 70,
        backgroundColor: Colors.GREEN,
        borderRadius: 99,
    },
    mainRow: {
        flexDirection: 'row', 
        marginTop: 50, 
        marginHorizontal: 18,
        alignItems: 'center', 
        justifyContent: 'space-between'
    },
    subRow: {
        flexDirection: 'row', 
        alignItems: 'center', 
        gap: 10
    },
    welcomeText: {
        fontSize: 15,
        fontFamily: 'outfit',
        color: Colors.WHITE,
        paddingBottom: 5
    },
    nameText: {
        fontSize: 20,
        fontFamily: 'outfit-bold',
        color: Colors.WHITE,
    }
})
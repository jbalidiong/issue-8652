import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useEffect } from "react";
//gerekli importları yapalım
import { getAuth, signInWithRedirect, GoogleAuthProvider } from "firebase/auth";
import { app } from "./firebaseConfig.js";

export default function App() {
    const auth = getAuth(app);

    function signUp() {
        const provider = new GoogleAuthProvider();

        //import ettiğimiz functiona basit email password parametreleri girelim ve console log respones ile çalışıp çalışmadığını test edelim.
        signInWithRedirect(
            auth,
            provider
        )
            .then((res) => console.log(res))
            .catch((err) => console.log(err));

    }
    // This function handles the result after the user is redirected back
    const handleRedirectSignIn = async () => {
        try {
            const result = await getRedirectResult(auth);
            alert(result) //this returns null
            if (result && result.user) {
                alert(`Welcome!`);
                router.push('/HomeScreen');
            } else {
                alert('User not authenticated.');
            }
        } catch (error) {
            console.error("Error during redirect sign-in:", error);
            alert('Failed to sign in with Google.');
        }
    };

    useEffect(() => {
        handleRedirectSignIn();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Check For Firebase Integration!</Text>
            {/* butona tıkalndığında signUp functionı çalışacak ve verdiğimiz kullanıcıyı kayıt etmeyi deneyecek */}
            <TouchableOpacity style={styles.button_container} onPress={signUp}>
                <Text style={styles.button_text}>SignUp</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        marginTop: 48,
    },
    text: {
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 24,
    },
    button_text: {
        textAlign: "center",
        fontSize: 24,
        color: "#1976d2"
    },
    button_container: {
        borderRadius: 15,
        flexDirection: "row",
        margin: 16,
        padding: 24,
        justifyContent: "center",
        backgroundColor: "#e6e6e6"
    },
});
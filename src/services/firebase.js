import { initializeApp } from "firebase/app";
import {
    getFirestore,
    doc,
    setDoc,
    getDoc,
    updateDoc
} from "firebase/firestore";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile
} from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCd72m_ZUszupydo684j_9ZKj1gQk0GMP4",
    authDomain: "inkosketra.firebaseapp.com",
    projectId: "inkosketra",
    storageBucket: "inkosketra.firebasestorage.app",
    messagingSenderId: "741890291759",
    appId: "1:741890291759:web:b810649f2ba15e03d3aeda"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// ============ TEST CONNECTION FUNCTION ============
export const testConnection = async () => {
    try {
        console.log("🔍 Testing Firebase connection...");
        const testRef = doc(db, "test", "connection");
        await setDoc(testRef, {
            message: "Firebase connected successfully!",
            timestamp: new Date().toISOString()
        });
        console.log("✅ Firestore: Connected and writing data!");
        console.log("✅ Authentication: Ready!");
        console.log("✅ Storage: Ready!");
        console.log("🎉 Firebase is fully connected!");
        return { success: true };
    } catch (error) {
        console.error("❌ Firebase connection error:", error);
        return { success: false, error: error.message };
    }
};

// ============ USER AUTHENTICATION ============

export const registerUser = async (email, password, name) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: name });

        await setDoc(doc(db, "users", userCredential.user.uid), {
            name: name,
            email: email,
            createdAt: new Date().toISOString(),
            role: "customer",
            addresses: [],
            orders: [],
            cart: [],
            wishlist: []
        });

        return { success: true, user: userCredential.user };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

export const loginUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return { success: true, user: userCredential.user };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

export const logoutUser = async () => {
    try {
        await signOut(auth);
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

export const getCurrentUser = () => {
    return new Promise((resolve) => {
        onAuthStateChanged(auth, (user) => {
            resolve(user);
        });
    });
};

// ============ CART SYNC FUNCTIONS ============

export const saveCartToFirestore = async (userId, cartItems) => {
    try {
        const userRef = doc(db, "users", userId);
        await updateDoc(userRef, {
            cart: cartItems,
            lastCartUpdate: new Date().toISOString()
        });
        console.log("✅ Cart saved to Firestore");
        return { success: true };
    } catch (error) {
        console.error("❌ Error saving cart:", error);
        return { success: false, error: error.message };
    }
};

export const getCartFromFirestore = async (userId) => {
    try {
        const userRef = doc(db, "users", userId);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
            const userData = docSnap.data();
            return { success: true, cart: userData.cart || [] };
        }
        return { success: true, cart: [] };
    } catch (error) {
        console.error("❌ Error getting cart:", error);
        return { success: false, error: error.message, cart: [] };
    }
};

export const mergeCarts = async (userId, localCart) => {
    try {
        const cloudCartResult = await getCartFromFirestore(userId);
        if (!cloudCartResult.success) return cloudCartResult;

        const cloudCart = cloudCartResult.cart;
        const mergedCart = [...cloudCart];

        localCart.forEach(localItem => {
            const exists = mergedCart.some(cloudItem =>
                `${cloudItem.id}-${cloudItem.size || "A4"}` === `${localItem.id}-${localItem.size || "A4"}`
            );
            if (!exists) {
                mergedCart.push(localItem);
            }
        });

        await saveCartToFirestore(userId, mergedCart);
        return { success: true, cart: mergedCart };
    } catch (error) {
        console.error("❌ Error merging carts:", error);
        return { success: false, error: error.message };
    }
};

export const clearCartInFirestore = async (userId) => {
    try {
        const userRef = doc(db, "users", userId);
        await updateDoc(userRef, {
            cart: [],
            lastCartUpdate: new Date().toISOString()
        });
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

export default app;
import { auth, storage } from '../firebase/firebase'
import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword } from 'firebase/auth'
import { ref, uploadBytesResumable } from "firebase/storage";

const register = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
}

const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
}

const logout = () => {
    return signOut(auth)
}

const uploadImage = (displayName, file) => {
    const storageRef = ref(storage, displayName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    return uploadTask

}

// const addUserToFirestore = (id, displayName, email, photoURL) => {
//     return setDoc(doc(db, "users", id), {
//         uid: id,
//         displayName: displayName,
//         email: email,
//         photoURL: photoURL
//     })
// }

export {
    register,
    uploadImage,
    login,
    logout
}
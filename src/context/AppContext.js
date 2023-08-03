import { createContext, useContext, useEffect, useState } from "react";
import { storage, auth, db } from "../firebase";
import {
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    updateProfile,
    reauthenticateWithPopup,
    deleteUser,
} from "firebase/auth";
import { ref, getDownloadURL } from "firebase/storage";
import {
    doc,
    setDoc,
    updateDoc,
    getDoc,
    deleteDoc,
    arrayRemove,
    arrayUnion,
    collection,
    getDocs,
} from "firebase/firestore";
const appContext = createContext();
export const useApp = () => {
    const context = useContext(appContext);
    if (!context) throw new Error("No hay contexto de autenticación");
    return context;
};
export function AppProvider({ children }) {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [admins, setAdmins] = useState(null);
    const [users, setUsers] = useState(null);
    const [block, setBlock] = useState(null);
    const [cuentos, setCuentos] = useState(null);
    const [cuento, setCuento] = useState(null);
    const [misCuentos, setMisCuentos] = useState(null);
    const [mensajes, setMensajes] = useState(null);
    const [misMensajes, setMisMensajes] = useState(null);
    const [noauth, setNoauth] = useState(false);
    const [aleatorio, setAleatorio] = useState(false);
    const [cargando1, setCargando1] = useState(false)
    const resolveAleatorio = () =>{
        setAleatorio(true)
    }
    const resolveNoAleatorio = () =>{
        setAleatorio(false)
    }
    const resolveCuento = (cuento) => {
        setCuento(cuento)
    }
    const noCuento = () => {
        setCuento(null)
    }
    const updateName = async (displayName) => {
        await updateProfile(auth.currentUser, { displayName }).then(() => {
            setUser({ ...user, displayName: displayName });
            return;
        });
    };
    const getPhotoURL = async (photoLocation) => {
        return await getDownloadURL(ref(storage, photoLocation));
    };
    const login = async () => {
        const googleProvider = new GoogleAuthProvider();
        return await signInWithPopup(auth, googleProvider);
    };
    const reAuthenticateGoogle = async () => {
        const googleProvider = new GoogleAuthProvider();
        await reauthenticateWithPopup(auth.currentUser, googleProvider);
    };
    const logout = async () => {
        return await signOut(auth);
    };
    const userDelete = async () => {
        setLoading(true);
        await deleteUser(auth.currentUser)
            .then(() => {
                setLoading(false);
            })
            .catch((err) => console.log(err));
    };
    const publicar = async (cuento) => {
        const docRef = doc(collection(db, "cuentos"));
        await setDoc(docRef, cuento)
        setCuentos(null)
        setMisCuentos(null)

    }
    const enviar = async (msg) => {
        const docRef = doc(collection(db, "mensajes"));
        await setDoc(docRef, msg)
        setMensajes(null)
        setMisMensajes(null)
    }
    const deleteCuento = async (id) => {
        const docRef = doc(db, "cuentos", id);
        await deleteDoc(docRef)
        let c = []
        cuentos.forEach((cuento) => {
            if (cuento.id !== id){
                c.push(cuento)
            }
        })
        setCuentos(c)
        let d = []
        c.forEach((cuento) => {
            if (cuento.user_id === user.uid){
                d.push(cuento)
            }
        })
        setMisCuentos(d)
    }
    const editarCuento = async (id, cuento) => {
        const docRef = doc(db, "cuentos", id);
        await updateDoc(docRef, cuento)
        let c = cuentos
        for(let i = 0; i < c.length; i++){
            if (c[i].id === id){
                c[i].titulo = cuento.titulo
                c[i].autor = cuento.autor
                c[i].cuento = cuento.cuento
            }
        }
        let d = misCuentos
        for(let i = 0; i < d.length; i++){
            if (d[i].id === id){
                d[i].titulo = cuento.titulo
                d[i].autor = cuento.autor
                d[i].cuento = cuento.cuento
            }
        }
        setCuentos(c)
        setMisCuentos(d)
    }
    const deleteMsg = async (id) => {
        const docRef = doc(db, "mensajes", id);
        await deleteDoc(docRef)
        let c = []
        mensajes.forEach((msg) => {
            if (msg.id !== id){
                c.push(msg)
            }
        })
        setMensajes(c)
        let d = []
        c.forEach((msg) => {
            if (msg.user_id === user.uid){
                d.push(msg)
            }
        })
        setMensajes(c)
        setMisMensajes(d)
    }
    const editarMsg = async (id, mensaje) => {
        const docRef = doc(db, "mensajes", id);
        await updateDoc(docRef, mensaje)
        let c = mensajes
        for(let i = 0; i < c.length; i++){
            if (c[i].id === id){
                c[i].asunto = mensaje.asunto
                c[i].mensaje = mensaje.mensaje
                c[i].privado = mensaje.privado
            }
        }
        let d = misMensajes
        for(let i = 0; i < d.length; i++){
            if (d[i].id === id){
                d[i].asunto = mensaje.asunto
                d[i].mensaje = mensaje.mensaje
                d[i].privado = mensaje.privado
            }
        }
        setMensajes(c)
        setMisMensajes(d)
    }
    const addBlock = async (usuario) =>{
        let u = []
        u = block.concat(usuario)
        console.log(u)
        const docRef = doc(db, "users", "users");
        await updateDoc((docRef), {
            block: u,
        });
        setBlock(u)
    }

    const removeBlock = async (usuario) =>{
        const docRef = doc(db, "users", "users");
        console.log(usuario)
        await updateDoc((docRef), {
            block: arrayRemove(usuario),
        });
        let u = block
        u.splice(u.indexOf(usuario), 1)
        setBlock(u)
    }
    useEffect(() => {
        const resolveCuentos = () => {
            let c = []
            cuentos.forEach((cuento) => {
                if (cuento.user_id === user.uid){
                    c.push(cuento)
                }
            })
                setMisCuentos(c)
            
            
        };
        const resolveMensajes = () => {
            let c = []
            console.log(mensajes)
            mensajes.forEach((mensaje) => {
                if (mensaje.user_id === user.uid){
                    c.push(mensaje)
                }
            })
            console.log(c)
                setMisMensajes(c)
            
            
        };
        if (user && cuentos && !misCuentos) {
            resolveCuentos()
        }
        if (user && mensajes && !misMensajes) {
            resolveMensajes()
        }
    }, [cuentos, user, misCuentos, mensajes, misMensajes]);
    useEffect(() => {
        const getCuentos = async () => {
            const querySnapshot = await getDocs(collection(db, "cuentos"));
            let all = [];
            querySnapshot.forEach((doc) => {
                let data = doc.data();
                let newdata = {
                    id: doc.id,
                    user_id: data.user_id,
                    user: data.user,
                    titulo: data.titulo,
                    autor: data.autor,
                    cuento: data.cuento,
                };
                all.push(newdata);
            });
            setCuentos(all);
        };
        if (!cuentos) {
            getCuentos();
        }
    }, [cuentos]);
    useEffect(() => {
        const getMensajes = async () => {
            const querySnapshot = await getDocs(collection(db, "mensajes"));
            let all = [];
            querySnapshot.forEach((doc) => {
                let data = doc.data();
                let newdata = {
                    id: doc.id,
                    user_id: data.user_id,
                    user: data.user,
                    asunto: data.asunto,
                    mensaje: data.mensaje,
                    privado: data.privado,
                };
                all.push(newdata);
            });
            setMensajes(all);
        };
        if (!mensajes) {
            getMensajes();
        }
    }, [mensajes]);
    useEffect(() => {
        const getAdmins = async () => {
            const docRef = doc(db, "users", "admins");
            await getDoc(docRef)
                .then((res) => {
                    if (res.data()) {
                        let data = res.data()
                        setAdmins(data.admins)
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        const getUsers = async () => {
            const docRef = doc(db, "users", "users");
            await getDoc(docRef)
                .then((res) => {
                    if (res.data()) {
                        let data = res.data()
                        setUsers(data.users)
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        const getBlock = async () => {
            const docRef = doc(db, "users", "users");
            await getDoc(docRef)
                .then((res) => {
                    if (res.data()) {
                        let data = res.data()
                        setBlock(data.block)
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        if (!block) {
            getBlock();
        }
        if (!admins) {
            getAdmins();
        }
        if (!users) {
            getUsers();
        }
    }, [admins, users, block]);
    useEffect(() => {
        

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                if (admins && users && block && (admins.includes(currentUser.email) || !block.includes(currentUser.email))) {
                    setUser(currentUser);
                    let a = false
                    for (let i = 0; i < users.length; i++) {
                        let u = users[i].split(",")
                        if (u[0] === currentUser.email) {
                            a = true
                        }
                    }
                    if (!a){
                        let u = []
                        let l = currentUser.email+","+currentUser.displayName
                        u = users.concat(l)
                        u = Array.from(new Set(u));
                        setUsers(u)
                        const docRef = doc(db, "users", "users");
                        updateDoc((docRef), {
                            users: u,
                        });
                    }
                } else {
                    setUser(null);
                    setTimeout(()=>{
                        setNoauth(true)
                        setLoading(false);
                    },3000)
                   
                }
                setLoading(false);
            } else {
                setUser(null);
                setLoading(false);
            }
            
        });
        if (admins && users && block) {
            return () => unsubscribe();
        }
    }, [admins, users, block]);


    return (
        <appContext.Provider
            value={{
                user,
                loading,
                login,
                logout,
                userDelete,
                updateName,
                reAuthenticateGoogle,
                getPhotoURL,
                publicar,
                cuentos,
                resolveCuento,
                noCuento,
                cuento,
                admins, 
                users,
                misCuentos,
                enviar,
                mensajes,
                noauth,
                deleteCuento,
                deleteMsg,
                editarCuento,
                editarMsg,
                misMensajes,
                addBlock,
                aleatorio,
                resolveAleatorio,
                resolveNoAleatorio,
                block,
                removeBlock,
            }}
        >
            {children}
        </appContext.Provider>
    );
}

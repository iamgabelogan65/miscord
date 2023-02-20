import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { MultiSelect } from 'react-multi-select-component' //https://www.npmjs.com/package/react-multi-select-component
import { AuthContext } from '../context/AuthContext';
import { db } from '../firebase/firebase';

const NewSearch = () => {

    const { currentUser } = useContext(AuthContext)

    const [users, setUsers] = useState([])
    const [selectedUsers, setSelectedUsers] = useState([]);

    // const [opt, setOpt] = useState([])

    useEffect(() => {


        const u = []
        const getUsers = async () => {
            const q = query(collection(db, "users"), where("displayName", "!=", currentUser.displayName))
            try {
                const querySnapshot = await getDocs(q)
                querySnapshot.forEach((doc) => {
                    // if (!(doc.data().uid === currentUser.uid)) {
                    //     u.push(doc.data())
                    // }
                    u.push(doc.data())
                    setUsers(u)  // IMPORTANT : PUT THE SET STATE FUNCTION INSIDE THE FOR EACH FUNCTION. NOT OUTSIDE
                })
                // setUsers(u)
            } catch (err) {
                console.log(err)
            }

        }

        currentUser.displayName && getUsers()

    }, [currentUser.displayName])

    const getOptions = () => {

            const o = users.map((user) => {
            return { label: user.displayName, value: user}
        })
        // console.log(o)
        return o
    }   



    const createDM = async () => {

        // get members field
        const memberIDs = [currentUser.uid]
        selectedUsers.map((s) => {
            return memberIDs.push(s.value.uid)
        })

        // get all members name (this will be the default group chat name)
        const memberNames = [currentUser.displayName]
        selectedUsers.map((s) => {
            return memberNames.push(s.value.displayName)
        })
        const convoName = memberNames.join(', ')

        // console.log(memberIDs)
        const q = query(collection(db, "convos"), where("creator", "==", currentUser.uid), where("members", "==", memberIDs));
        const querySnapshot = await getDocs(q)

        if (querySnapshot.empty) {
            console.log('Creating a new document')
            const convoReference = doc(collection(db, "convos"))
            await setDoc(convoReference, {
                convoID: convoReference.id,
                creator: currentUser.uid,
                members: memberIDs,
                name: convoName
            })
        }

        querySnapshot.forEach((doc) => {
            if (doc.exists()) {
                console.log('Document already exists')
            }
        })

      }

    //   console.log('users at end', users)

    return (
        <div className='search-friends'>
            <p>Select users to DM</p>
           <MultiSelect
                options={() => getOptions}
                value={selectedUsers}
                onChange={setSelectedUsers}
                labelledBy="Select users"
                hasSelectAll={false}
                disableSearch={true}
           />
           <button onClick={createDM}>Create DM</button>
        </div>
    )
}

export default NewSearch

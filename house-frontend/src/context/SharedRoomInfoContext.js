/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { useContext, createContext, useState, useEffect, useReducer, useMemo } from "react";
import backendService from "services/backend-service";
import AuthContext from "./AuthContext";

const SharedRoomInfoContext = createContext();
export default SharedRoomInfoContext;

function reducer(state, item) {
  return [...state, item];
}

// eslint-disable-next-line react/prop-types
export function GetSharedRoomInfo({ children }) {
  const { user } = useContext(AuthContext);
  //   const [roomsListRenderedElements, setRoomsRenderedElements] = useState([]);
  const [roomsList, setRoomsList] = useReducer(reducer, []);
  const [tenantsList, setTenantsList] = useReducer(reducer, []);
  const [joinRoomsList, setJoinRoomListData] = useReducer(reducer, []);

  const contextData = useMemo(
    () => ({
      setRoomsList,
      roomsList,
      setTenantsList,
      tenantsList,
      setJoinRoomListData,
      joinRoomsList,
    }),
    []
  );

  useEffect(() => {
    if (user) {
      const fetchRoomsData = async () => {
        // const users = await axios.get("http://127.0.0.1:8000/api/users/").then((response) => {
        const roomsData = await backendService.getAll("rooms").then(
          (response) =>
            // console.log(`response: ${JSON.stringify(response.data)}`);
            // console.log(response.data);
            // console.log(response.status);
            // console.log(response.statusText);
            // console.log(response.headers);
            // console.log(response.config);
            response.data
        );
        // console.log(`Rooms API Response JSON: ${JSON.stringify(roomsData)}`);
        if (roomsData) {
          // setProfilesRenderedElements(users2);
          // setProfilesJSON(users);
          // console.log(`JSON DATA: ${JSON.stringify(profilesJSON)}`);
          // console.log(`Profiles Loaded?: ${profilesDidLoad}`);
          setRoomsList(roomsData);
          // console.log(`Profile Rendered Component: ${roomsData}`);
        }
        // else {
        //   console.log(`Can't render rooms!`);
        // }
      };
      fetchRoomsData();

      const fetchTenantsData = async () => {
        // const users = await axios.get("http://127.0.0.1:8000/api/users/").then((response) => {
        const tenantsData = await backendService.getAll("tenant").then(
          (response) =>
            // console.log(`response: ${JSON.stringify(response.data)}`);
            response.data
        );
        // console.log(`Rooms API Response JSON: ${JSON.stringify(tenantsData)}`);
        if (tenantsData) {
          // setProfilesRenderedElements(users2);
          // setProfilesJSON(users);
          // console.log(`JSON DATA: ${JSON.stringify(profilesJSON)}`);
          // console.log(`Profiles Loaded?: ${profilesDidLoad}`);
          setTenantsList(tenantsData);
          // console.log(`Profile Rendered Component: ${tenantsData}`);
        }
      };
      fetchTenantsData();

      const fetchJoinRoomList = async () => {
        // const users = await axios.get("http://127.0.0.1:8000/api/users/").then((response) => {
        const joinRoomListData = await backendService.getAll("joinroom").then(
          (response) =>
            // console.log(`response: ${JSON.stringify(response.data)}`);
            response.data
        );
        // console.log(`Rooms API Response JSON: ${JSON.stringify(tenantsData)}`);
        if (joinRoomListData) {
          // setProfilesRenderedElements(users2);
          // setProfilesJSON(users);
          // console.log(`JSON DATA: ${JSON.stringify(profilesJSON)}`);
          // console.log(`Profiles Loaded?: ${profilesDidLoad}`);
          setJoinRoomListData(joinRoomListData);
          // console.log(`Profile Rendered Component: ${tenantsData}`);
        }
      };
      fetchJoinRoomList();
    }

    //
    //
  }, []);

  return (
    <SharedRoomInfoContext.Provider value={contextData}>
      {!user ? null : children}
    </SharedRoomInfoContext.Provider>
  );
}

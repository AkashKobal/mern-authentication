// import { createContext, useState } from "react";

// export const AppContext = createContext();

// export const AppContextProvider = ({ props }) => {

//     const backendURL = import.meta.env.BACKED_URL;
//     const [isLoggedin, setIsLoggedin] = useState(false);
//     const [userData, setUserData] = useState(null);

//     const value = {
//         backendURL,
//         isLoggedin,
//         setIsLoggedin,
//         userData,
//         setUserData,
//     }

//   return (
//     <AppContext.Provider value={value}>
//       {props.children}
//     </AppContext.Provider>
//   );
// };
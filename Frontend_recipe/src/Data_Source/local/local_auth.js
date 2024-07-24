export const local_auth = {
  saveuserid: (userid) => {
    localStorage.setItem("userid", userid);
    console.log("save inside the localstorage", localStorage.userid);
  },
  getuserid: () => {
    const userid = localStorage.getItem("userid");
    return userid ? userid : null;
  },
};

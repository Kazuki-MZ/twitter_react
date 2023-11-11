import { useEffect } from "react";
import { getCurrentUser } from "../lib/api/auth";
import { useSetRecoilState } from "recoil";
import { loginUserState } from "../Atoms/user/LoginUserState";

export const useLoginUser = () => {
  const setLoginUser = useSetRecoilState(loginUserState);

  return useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await getCurrentUser();
        setLoginUser(res.data.currentUser);
      } catch (e) {
        console.log(e);
      }
    };
    fetchCurrentUser();
  }, []);
};

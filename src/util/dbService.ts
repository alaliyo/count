import { collection, doc, onSnapshot, orderBy, query, setDoc } from "firebase/firestore";
import { dbService } from "../firebase";
import { useRecoilValue } from "recoil";
import { millisecondsState, nickNameState, timerState } from "../atom";
 
export interface RecordGetProps {
    id: number;
    nickName: string;
    time: string;
}
 
export function RecordGet(): Promise<RecordGetProps[]> {
    const q = query(
        collection(dbService, "album"),
        orderBy("time", "desc")
    );

    return new Promise<RecordGetProps[]>(resolve => {
        onSnapshot(q, (snapshot) => {
            const dataArr: any = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            resolve(dataArr);
        });
    })    
}

interface RecordPostProps {
    nickName: string;
    timer: number;
    milliseconds: number;
}

// Common POST
export const RecordPost = async ({nickName, timer, milliseconds}: RecordPostProps) => {
    try {
        if (nickName.replace(/\s+/g, "") === "") {
            return alert("닉네임이 없어 순위에 미등록되었습니다.");
        }

        const id = Date.now();
        const decadDocRef = doc(dbService, "record", `${id}`);
        const time = `${timer}.${milliseconds <= 9 ? "0" + milliseconds : milliseconds}`;

        await setDoc(decadDocRef, {
            id: id,
            nickName: nickName,
            time: time,
        })

        alert("순위에 등록되었습니다.");
    } catch (error) {
        return alert("새로고침 후 다시 시도해주세요" + error);
    }
};
